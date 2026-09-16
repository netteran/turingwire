#!/usr/bin/env python3
"""
classify_article.py — Classify each article via OpenAI gpt-4o-mini.

Returns strict JSON classification with category, subcategory, company,
impact level, confidence, and rationale. Articles with confidence < 0.6
are routed to the review queue rather than published.
"""
from __future__ import annotations

import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Any

from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_exponential

from prompts import get_prompt, render

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
DEDUPED_FILE = DATA_DIR / "deduped_articles.json"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"
REVIEW_QUEUE_FILE = DATA_DIR / "review_queue.json"

CONFIDENCE_THRESHOLD = 0.6
MODEL = "gpt-4o-mini"
TEMPERATURE = 0.0

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("classify_article")


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def classify_one(client: OpenAI, article: dict) -> dict:
    body_excerpt = (article.get("body") or "")[:3000]
    prompt = render(
        "prompt.classify.user",
        title=article.get("title", ""),
        body=body_excerpt,
        source_name=article.get("source_name", ""),
        category_hint=article.get("category_hint", "news"),
    )

    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        messages=[
            {"role": "system", "content": get_prompt("prompt.classify.system")},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content or "{}"
    result = json.loads(raw)
    return result


def main() -> int:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        log.error("OPENAI_API_KEY not set")
        return 1

    if not DEDUPED_FILE.exists():
        log.error("deduped articles file not found: %s", DEDUPED_FILE)
        return 1

    with DEDUPED_FILE.open() as f:
        articles = json.load(f)

    client = OpenAI(api_key=api_key)

    classified: list[dict] = []
    review_queue: list[dict] = []

    for i, article in enumerate(articles):
        try:
            result = classify_one(client, article)
        except Exception as exc:
            log.warning("classification failed for '%s': %s", article.get("title", ""), exc)
            result = {
                "category": "skip",
                "subcategory": "other",
                "company": None,
                "secondary_companies": [],
                "impact": "minor",
                "confidence": 0.0,
                "rationale": f"Classification failed: {exc}",
            }

        # Normalize category to list
        cat = result.get("category", "skip")
        if isinstance(cat, str):
            if cat == "skip":
                categories = []
            else:
                categories = [cat]
        else:
            categories = [c for c in cat if c != "skip"]

        confidence = float(result.get("confidence", 0.0))
        article_out = {**article, "classification": result, "categories": categories}

        if not categories:
            log.debug("skipping '%s' (category=skip)", article.get("title", ""))
            continue

        if confidence < CONFIDENCE_THRESHOLD:
            review_queue.append(article_out)
            log.info("routed to review queue (conf=%.2f): %s", confidence, article.get("title", ""))
        else:
            classified.append(article_out)
            log.info(
                "[%d/%d] %s | cat=%s impact=%s conf=%.2f",
                i + 1, len(articles),
                article.get("title", "")[:60],
                categories,
                result.get("impact"),
                confidence,
            )

        # Rate limiting: ~1 req/sec to stay well within gpt-4o-mini limits
        time.sleep(0.5)

    log.info(
        "classified %d articles, %d to review queue, %d skipped",
        len(classified), len(review_queue),
        len(articles) - len(classified) - len(review_queue),
    )

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with CLASSIFIED_FILE.open("w") as f:
        json.dump(classified, f, indent=2, default=str)

    with REVIEW_QUEUE_FILE.open("w") as f:
        json.dump(review_queue, f, indent=2, default=str)

    return 0


if __name__ == "__main__":
    sys.exit(main())
