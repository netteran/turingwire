#!/usr/bin/env python3
"""
summarize_research.py — Generate research summaries using OpenAI gpt-4o-mini.

Processes articles classified as category=research from classified_articles.json.
Uses structured headings: Problem, Method, Results, Limitations, Why it matters.
"""
from __future__ import annotations

import json
import logging
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from openai import OpenAI
from slugify import slugify
from tenacity import retry, stop_after_attempt, wait_exponential

from quality import parse_summary_output, passes_quality
from supabase_store import recent_articles, write_post

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"
SEEN_FILE = DATA_DIR / "seen_articles.json"

MODEL = os.environ.get("SUMMARIZER_MODEL", "gpt-4o-mini")
TEMPERATURE = 0.0
# No floor that forces padding; ceiling allows real depth for genuine papers.
MIN_WORDS = 200
MAX_WORDS = 750

# Source venues that genuinely host primary research (papers), beyond arXiv.
PAPER_VENUES = (
    "arxiv", "openreview", "papers with code", "paperswithcode",
    "nature", "jmlr", "neurips", "icml", "iclr", "acl", "aclanthology",
    "proceedings", "pmlr", "semantic scholar", "biorxiv",
)


def is_real_paper(article: dict) -> bool:
    """True only when we have a primary paper to summarize (avoids fabricating
    Method/Results sections for news *about* research)."""
    if (article.get("arxiv_id") or "").strip():
        return True
    src = (article.get("source_name") or "").lower()
    url = (article.get("url") or "").lower()
    return any(v in src or v in url for v in PAPER_VENUES)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("summarize_research")

SYSTEM_PROMPT = (
    "You are an ML research engineer with strong technical writing skills. "
    "Summarize papers for engineers and researchers deciding whether to read the full work. "
    "Use precise terminology. Do not soften jargon for a general audience."
)

USER_PROMPT = """Summarize the following AI research paper.

Return ONLY a single JSON object with exactly these keys:
- "meta": one sentence, 120–155 characters, describing the paper's contribution for search snippets. No quotes.
- "body": Markdown using these exact headings:
  **Problem** — what gap in capability or literature does this address?
  **Method** — the core technical contribution. Be specific: architecture, loss, data, training compute if disclosed.
  **Results** — headline numbers vs named baselines on named benchmarks, ONLY where the source provides them.
  **Limitations** — what the authors flag, plus any obvious ones they don't.
  **Why it matters** — implications for downstream work. This section MUST include a natural contextual citation linking to the source: e.g. "as published in [{source_name}]({url})" or "available on [arXiv]({url})".

Constraints for "body":
- Length follows substance: up to {min_words}–{max_words} words, but never pad. A dense, shorter summary is better than a long one.
- Use precise ML terminology. This is for an expert audience.
- CRITICAL — do not fabricate. Cite ONLY numbers, baselines, benchmarks, and method details that appear in the provided text. If the text gives no quantitative results, write "the available text does not report quantitative results" in the Results section. Never estimate, infer, or supply plausible-sounding figures or model names that are not in the source.
- If the work is preprint and unreviewed, state that in the Problem section.
- Do not add a standalone Authors/Source footer block — author names belong in the Method or Problem section if relevant.

Paper title: {title}
Authors: {authors}
Abstract / body:
{body}
Source: {source_name}
URL: {url}
arXiv ID: {arxiv_id}"""

# Used when the item is news *about* research (no primary paper). Avoids the
# Method/Results template that induces fabricated metrics.
REPORTING_PROMPT = """Summarize the following article, which reports on AI research but is NOT the primary paper.

Return ONLY a single JSON object with exactly these keys:
- "meta": one sentence, 120–155 characters, for search snippets. No quotes.
- "body": 2–4 tight Markdown paragraphs covering what the research claims, who did it, and any concrete findings the article actually states. Treat this as secondary reporting.

Hard rules for "body":
- Length follows substance ({min_words}–{max_words} words max); never pad.
- Do NOT fabricate. Use only figures, model names, and benchmarks explicitly present in the text below. Do not produce a Method/Results breakdown or invent metrics.
- Make clear this is reporting on research, not a primary paper.
- Reference the source once as a markdown link: "[{source_name}]({url})".

Article title: {title}
Article body:
{body}
Source: {source_name}
URL: {url}"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def summarize_one(client: OpenAI, article: dict) -> tuple[str, str]:
    """Returns (description, summary_body)."""
    body = (article.get("body") or "")[:10000]
    authors_str = ", ".join(article.get("authors", [])[:8])
    if len(article.get("authors", [])) > 8:
        authors_str += " et al."

    if is_real_paper(article):
        prompt = USER_PROMPT.format(
            min_words=MIN_WORDS,
            max_words=MAX_WORDS,
            title=article.get("title", ""),
            authors=authors_str or "unknown",
            body=body,
            source_name=article.get("source_name", ""),
            url=article.get("url", ""),
            arxiv_id=article.get("arxiv_id", ""),
        )
    else:
        # News about research — softer prompt, no Method/Results template.
        prompt = REPORTING_PROMPT.format(
            min_words=MIN_WORDS,
            max_words=MAX_WORDS,
            title=article.get("title", ""),
            body=body,
            source_name=article.get("source_name", ""),
            url=article.get("url", ""),
        )
    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )
    raw = (response.choices[0].message.content or "").strip()
    _title, description, summary = parse_summary_output(raw)
    return description, summary


def word_count(text: str) -> int:
    return len(text.split())






def main() -> int:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        log.error("OPENAI_API_KEY not set")
        return 1

    if not CLASSIFIED_FILE.exists():
        log.error("classified articles file not found: %s", CLASSIFIED_FILE)
        return 1

    with CLASSIFIED_FILE.open() as f:
        articles = json.load(f)

    seen: dict[str, str] = {}
    if SEEN_FILE.exists():
        with SEEN_FILE.open() as f:
            seen = json.load(f)

    client = OpenAI(api_key=api_key)
    research_articles = [a for a in articles if "research" in a.get("categories", [])]
    log.info("summarizing %d research articles", len(research_articles))

    new_posts = 0
    skipped = 0
    for article in research_articles:
        title = article.get("title", "")
        try:
            description, summary = summarize_one(client, article)
        except Exception as exc:
            log.warning("summarization failed for '%s': %s", title, exc)
            continue

        wc = word_count(summary)
        if wc < 100:
            log.warning("summary too short (%d words), skipping: %s", wc, title)
            continue

        # Quality gate — boilerplate / fabricated figures (numbers must be in source).
        ok, reason = passes_quality(summary, title, article.get("body", ""), check_numbers=True)
        if not ok:
            log.warning("quality gate failed (%s), skipping: %s", reason, title)
            skipped += 1
            continue

        pub_str = article.get("published", "")
        try:
            pub_date = datetime.fromisoformat(pub_str.replace("Z", "+00:00"))
        except Exception:
            pub_date = datetime.now(timezone.utc)

        url = write_post(article, summary, pub_date, description, quality=True)
        seen[article["guid"]] = datetime.now(timezone.utc).isoformat()

        log.info("stored research article: %s (%d words)", url, wc)
        new_posts += 1
        time.sleep(0.3)

    log.info("quality gate skipped %d summaries", skipped)

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with SEEN_FILE.open("w") as f:
        json.dump(seen, f, indent=2)

    log.info("wrote %d new research posts", new_posts)
    return 0


if __name__ == "__main__":
    sys.exit(main())
