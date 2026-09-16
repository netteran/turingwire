#!/usr/bin/env python3
"""
summarize_news.py — Generate news summaries via OpenAI or Gemini (see llm.py).

Processes articles classified as category=news from classified_articles.json.
Writes rows to the Supabase `articles` table (the source of truth).
"""
from __future__ import annotations

import json
import logging
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from slugify import slugify

from quality import clean_headline, parse_summary_output, passes_quality, scaled_word_target
from supabase_store import recent_articles, write_post
from ingest_store import current_run_id, mark_seen, update_run_stats, get_setting, get_setting_int
from prompts import get_prompt, render
from llm import call_llm, required_env_var

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"

# The `summarizer_model` Admin setting wins when set; SUMMARIZER_MODEL (e.g. a
# GitHub Actions repo variable) is the fallback for when nobody has opted into
# the DB-driven override yet; gpt-4o-mini keeps cost low if neither is set.
# Resolved for real in main() — this is just the pre-settings-lookup default.
MODEL = os.environ.get("SUMMARIZER_MODEL", "gpt-4o-mini")
TEMPERATURE = 0.3
# Length follows substance, not a fixed target: scaled_word_target() grows the
# ceiling with how much source material there is, up to the `news_max_words`
# setting (see quality.scaled_word_target). These are just its floors.
MIN_WORDS_FLOOR = 120
MAX_WORDS_FLOOR = 500
DEFAULT_MAX_WORDS_CAP = 1500

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("summarize_news")




def related_context(index: list[dict], company: str | None, subcategory: str, title: str, limit: int = 5) -> str:
    """Build a prior-coverage block to inject into the prompt, or guidance if none."""
    company_l = (company or "").lower()
    same_title = title.strip().lower()
    picks: list[dict] = []
    if company_l:
        picks = [e for e in index if e["company"] == company_l and e["title"].strip().lower() != same_title]
    if len(picks) < 2 and subcategory:
        more = [e for e in index if e["subcategory"] == subcategory and e["title"].strip().lower() != same_title]
        picks = (picks + more)[:limit]
    picks = picks[:limit]
    if not picks:
        return "If this clearly continues an earlier development, note that in one clause; otherwise do not speculate about history."
    lines = "\n".join(f"  - {e['title']} ({e['date']})" for e in picks)
    return (
        "Turing Wire has covered related stories before. Where genuinely relevant, connect this "
        "to that timeline in one specific clause (e.g. 'this follows ...'). Do NOT force a "
        "connection if none is real.\nPrior coverage:\n" + lines
    )


def summarize_one(article: dict, index: list[dict] | None = None) -> tuple[str, str, str]:
    """Two-stage pipeline: extract facts → write article. Returns (title, description, summary_body)."""
    raw_body = article.get("body") or ""
    title = article.get("title", "")
    classification = article.get("classification", {})

    # Stage 1 — extract structured facts (temperature 0 for determinism)
    extracted = call_llm(
        MODEL,
        get_prompt("prompt.news_extract.system"),
        render("prompt.news_extract.user", title=title, body=raw_body),
        temperature=0,
    )
    log.debug("extracted facts (%d chars) for: %s", len(extracted), title)

    context_block = related_context(
        index or [],
        classification.get("company") or article.get("source_company"),
        classification.get("subcategory", "other"),
        title,
    )

    max_words_cap = get_setting_int("news_max_words", DEFAULT_MAX_WORDS_CAP)
    min_words, max_words = scaled_word_target(
        len(raw_body.split()),
        min_floor=MIN_WORDS_FLOOR,
        max_floor=MAX_WORDS_FLOOR,
        max_cap=max_words_cap,
    )

    # Stage 2 — write article from structured facts
    prompt = render(
        "prompt.news_write.user",
        min_words=min_words,
        max_words=max_words,
        title=title,
        body=extracted,
        context_block=context_block,
        source_name=article.get("source_name", ""),
        url=article.get("url", ""),
    )
    raw = call_llm(MODEL, get_prompt("prompt.news_write.system"), prompt, temperature=TEMPERATURE, json_mode=True)
    return parse_summary_output(raw)


def word_count(text: str) -> int:
    return len(text.split())




def main() -> int:
    global MODEL
    MODEL = get_setting("summarizer_model", MODEL)

    required_key = required_env_var(MODEL)
    if not os.environ.get(required_key):
        log.error("%s not set (required for model %r)", required_key, MODEL)
        return 1

    if not CLASSIFIED_FILE.exists():
        log.error("classified articles file not found: %s", CLASSIFIED_FILE)
        return 1

    with CLASSIFIED_FILE.open() as f:
        articles = json.load(f)

    newly_seen: list[str] = []

    news_articles = [a for a in articles if "news" in a.get("categories", [])]
    log.info("summarizing %d news articles", len(news_articles))

    index = recent_articles()

    new_posts = 0
    skipped = 0
    for article in news_articles:
        title = article.get("title", "")
        try:
            gen_title, description, summary = summarize_one(article, index)
        except Exception as exc:
            log.warning("summarization failed for '%s': %s", title, exc)
            continue

        # Use the editorial headline if it is clean; otherwise keep the source title.
        final_title = clean_headline(gen_title) or title
        if final_title != title:
            log.info("headline rewritten: %r -> %r", title, final_title)
            article["title"] = final_title
            title = final_title

        wc = word_count(summary)
        if wc < 100:
            log.warning("summary too short (%d words), skipping: %s", wc, title)
            continue

        # Quality gate — boilerplate / deceptive headline / fabricated figures.
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

        log.info("stored article: %s (%d words)", url, wc)
        new_posts += 1

        time.sleep(0.3)

    log.info("quality gate skipped %d summaries", skipped)

    mark_seen(newly_seen)
    update_run_stats(current_run_id(), news_published=new_posts, news_skipped=skipped)

    log.info("wrote %d new news posts", new_posts)
    return 0


if __name__ == "__main__":
    sys.exit(main())
