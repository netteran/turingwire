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

from quality import parse_summary_output, passes_quality, scaled_word_target
from supabase_store import recent_articles, write_post
from ingest_store import current_run_id, mark_seen, update_run_stats, get_setting, get_setting_int
from prompts import get_prompt, render

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"

# The `summarizer_model` Admin setting wins when set; SUMMARIZER_MODEL (e.g. a
# GitHub Actions repo variable) is the fallback for when nobody has opted into
# the DB-driven override yet; gpt-4o-mini keeps cost low if neither is set.
# Resolved for real in main() — this is just the pre-settings-lookup default.
MODEL = os.environ.get("SUMMARIZER_MODEL", "gpt-4o-mini")
TEMPERATURE = 0.0
# Length follows substance, not a fixed target: scaled_word_target() grows the
# ceiling with how much source material there is, up to the
# `research_max_words` setting. These are just its floors.
MIN_WORDS_FLOOR = 200
MAX_WORDS_FLOOR = 700
DEFAULT_MAX_WORDS_CAP = 2200

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


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def _call(client: OpenAI, system: str, user: str, temperature: float = TEMPERATURE, json_mode: bool = False) -> str:
    kwargs = {
        "model": MODEL,
        "temperature": temperature,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    }
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    response = client.chat.completions.create(**kwargs)
    return (response.choices[0].message.content or "").strip()


def summarize_one(client: OpenAI, article: dict) -> tuple[str, str]:
    """Two-stage pipeline: extract facts → write article. Returns (description, summary_body)."""
    body = article.get("body") or ""
    title = article.get("title", "")
    authors_str = ", ".join(article.get("authors", [])[:8])
    if len(article.get("authors", [])) > 8:
        authors_str += " et al."

    max_words_cap = get_setting_int("research_max_words", DEFAULT_MAX_WORDS_CAP)
    min_words, max_words = scaled_word_target(
        len(body.split()),
        min_floor=MIN_WORDS_FLOOR,
        max_floor=MAX_WORDS_FLOOR,
        max_cap=max_words_cap,
    )

    if is_real_paper(article):
        # Stage 1 — extract structured facts from the paper (temperature 0 for determinism)
        extracted = _call(
            client,
            get_prompt("prompt.research_extract.system"),
            render("prompt.research_extract.user", title=title, authors=authors_str or "unknown", body=body),
            temperature=0,
        )
        # Stage 2 — write the article from the extracted facts
        prompt = render(
            "prompt.research_write.user",
            min_words=min_words,
            max_words=max_words,
            title=title,
            authors=authors_str or "unknown",
            body=extracted,
            source_name=article.get("source_name", ""),
            url=article.get("url", ""),
            arxiv_id=article.get("arxiv_id", ""),
        )
    else:
        # News about research — reuse the generic news extractor, then a
        # softer reporting prompt with no Method/Results template (avoids
        # fabricated metrics for a source that isn't the primary paper).
        extracted = _call(
            client,
            get_prompt("prompt.news_extract.system"),
            render("prompt.news_extract.user", title=title, body=body),
            temperature=0,
        )
        prompt = render(
            "prompt.research_reporting_write.user",
            min_words=min_words,
            max_words=max_words,
            title=title,
            body=extracted,
            source_name=article.get("source_name", ""),
            url=article.get("url", ""),
        )

    raw = _call(client, get_prompt("prompt.research_write.system"), prompt, json_mode=True)
    _title, description, summary = parse_summary_output(raw)
    return description, summary


def word_count(text: str) -> int:
    return len(text.split())






def main() -> int:
    global MODEL
    MODEL = get_setting("summarizer_model", MODEL)

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        log.error("OPENAI_API_KEY not set")
        return 1

    if not CLASSIFIED_FILE.exists():
        log.error("classified articles file not found: %s", CLASSIFIED_FILE)
        return 1

    with CLASSIFIED_FILE.open() as f:
        articles = json.load(f)

    newly_seen: list[str] = []

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
        newly_seen.append(article["guid"])

        log.info("stored research article: %s (%d words)", url, wc)
        new_posts += 1
        time.sleep(0.3)

    log.info("quality gate skipped %d summaries", skipped)

    mark_seen(newly_seen)
    update_run_stats(current_run_id(), research_published=new_posts, research_skipped=skipped)

    log.info("wrote %d new research posts", new_posts)
    return 0


if __name__ == "__main__":
    sys.exit(main())
