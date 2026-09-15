#!/usr/bin/env python3
"""
tag_company.py — Company tagging via deterministic alias lookup + LLM fallback.

Strategy:
1. Scan title + first 500 chars of body against company_aliases.yml.
2. If exactly one match found: done.
3. If zero or 2+ matches found: call LLM for verification.
4. Update classified_articles.json in-place with company tags.
"""
from __future__ import annotations

import json
import logging
import os
import re
import sys
import time
from pathlib import Path

import yaml
from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_exponential

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
FEEDS_DIR = ROOT / "feeds"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("tag_company")

MODEL = "gpt-4o-mini"

LLM_PROMPT = """Which company or companies are PRIMARILY featured in this article?
Return ONLY a JSON object: {{"primary": "<name or null>", "secondary": ["<name>"]}}

Use only these canonical names (null if none apply):
OpenAI, Anthropic, Google DeepMind, Google, Microsoft, Meta, NVIDIA, AMD, Intel, TSMC,
Apple, Amazon, Mistral, Hugging Face, Cohere, Stability AI, Runway, ElevenLabs, Perplexity,
Databricks, Cognition, Suno, Alibaba, Palantir, Snowflake, Salesforce, ServiceNow, Oracle,
IBM, UiPath, xAI, DeepSeek, Cerebras, Scale AI, Character.AI, ASML, Applied Materials,
Lam Research, Micron, ARM, Broadcom, Super Micro, Baidu

Title: {title}
Text: {text}"""


def load_aliases() -> dict[str, list[str]]:
    path = FEEDS_DIR / "company_aliases.yml"
    with path.open() as f:
        data = yaml.safe_load(f)
    return data.get("aliases", {})


def build_alias_map(aliases: dict[str, list[str]]) -> dict[str, str]:
    """Returns {alias_lower: canonical_name}."""
    mapping: dict[str, str] = {}
    for canonical, variants in aliases.items():
        for v in variants:
            mapping[v.lower()] = canonical
    return mapping


def find_companies_deterministic(
    text: str, alias_map: dict[str, str]
) -> list[str]:
    text_lower = text.lower()
    found: set[str] = set()
    for alias, canonical in alias_map.items():
        # Word-boundary match to avoid partial hits
        pattern = r"\b" + re.escape(alias) + r"\b"
        if re.search(pattern, text_lower):
            found.add(canonical)
    return sorted(found)


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def llm_tag(client: OpenAI, title: str, text: str) -> dict:
    prompt = LLM_PROMPT.format(title=title, text=text[:1500])
    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.0,
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )
    raw = response.choices[0].message.content or "{}"
    return json.loads(raw)


def main() -> int:
    if not CLASSIFIED_FILE.exists():
        log.error("classified articles file not found: %s", CLASSIFIED_FILE)
        return 1

    with CLASSIFIED_FILE.open() as f:
        articles = json.load(f)

    aliases = load_aliases()
    alias_map = build_alias_map(aliases)

    api_key = os.environ.get("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key) if api_key else None

    llm_calls = 0

    for article in articles:
        title = article.get("title", "")
        body = (article.get("body") or "")[:500]
        search_text = f"{title} {body}"

        # Classification already assigned company — verify/augment
        existing_company = article.get("classification", {}).get("company")
        existing_secondary = article.get("classification", {}).get("secondary_companies", [])

        found = find_companies_deterministic(search_text, alias_map)

        if len(found) == 1:
            # Unambiguous alias match
            article.setdefault("classification", {})["company"] = found[0]
            article["classification"]["secondary_companies"] = []
            log.debug("alias match: '%s' → %s", title[:40], found[0])

        elif len(found) == 0 and not existing_company:
            # No alias found and LLM didn't assign one either — use LLM
            if client:
                try:
                    result = llm_tag(client, title, search_text)
                    primary = result.get("primary")
                    secondary = result.get("secondary", [])
                    article.setdefault("classification", {})["company"] = primary
                    article["classification"]["secondary_companies"] = secondary
                    llm_calls += 1
                    time.sleep(0.3)
                except Exception as exc:
                    log.warning("LLM tag failed for '%s': %s", title[:40], exc)

        elif len(found) >= 2:
            # Multiple alias matches — use first as primary, rest secondary
            # unless LLM already resolved it better
            if existing_company and existing_company in found:
                # Trust LLM primary, add remaining as secondary
                secondary = [c for c in found if c != existing_company]
                existing_secondary_set = set(existing_secondary)
                merged = list(existing_secondary_set | set(secondary))
                article["classification"]["secondary_companies"] = merged
            elif client:
                try:
                    result = llm_tag(client, title, search_text)
                    primary = result.get("primary")
                    secondary = result.get("secondary", [])
                    article.setdefault("classification", {})["company"] = primary
                    article["classification"]["secondary_companies"] = secondary
                    llm_calls += 1
                    time.sleep(0.3)
                except Exception as exc:
                    # Fall back to first found
                    article.setdefault("classification", {})["company"] = found[0]
                    article["classification"]["secondary_companies"] = found[1:]
                    log.warning("LLM fallback failed for '%s', using first alias: %s", title[:40], exc)
            else:
                article.setdefault("classification", {})["company"] = found[0]
                article["classification"]["secondary_companies"] = found[1:]

    log.info("company tagging complete. LLM calls: %d", llm_calls)

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with CLASSIFIED_FILE.open("w") as f:
        json.dump(articles, f, indent=2, default=str)

    return 0


if __name__ == "__main__":
    sys.exit(main())
