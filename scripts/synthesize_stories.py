#!/usr/bin/env python3
"""
synthesize_stories.py — Cluster recent articles by topic and produce
multi-source verifiable syntheses with claim-level provenance.

For each cluster of >=2 independent-publisher articles, calls an LLM to:
  1. Extract atomic claims.
  2. For each claim, label which sources support / contradict it.
  3. Produce a short editorial synthesis that flags disputes.

Writes Jekyll markdown into _stories/, where the `story` layout renders
each claim with corroboration / contradiction pills.
"""
from __future__ import annotations

import json
import logging
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import yaml
from openai import OpenAI
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from slugify import slugify
from tenacity import retry, stop_after_attempt, wait_exponential

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"
STORIES_DIR = ROOT / "_stories"

MODEL = "gpt-4o-mini"
TEMPERATURE = 0.2
SIMILARITY_THRESHOLD = 0.35
MIN_SOURCES_PER_STORY = 2
MAX_STORIES_PER_RUN = 10

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("synthesize_stories")


SYSTEM_PROMPT = """You are an editor producing a verifiable synthesis from multiple news sources covering the same event.

Your output is consumed by readers who explicitly want to see disagreement between sources, not a smoothed single-tone summary.

For each story you receive a numbered list of source articles. Produce a JSON object with:
  - "title": short headline for the synthesis (not a source headline)
  - "lead": 2-3 sentence framing that names the event and flags any major disagreement
  - "claims": list of atomic factual claims, each with:
      - "text": the claim, stated neutrally
      - "supporting": list of source indices (0-based) that explicitly support this claim
      - "contradicting": list of source indices that explicitly contradict it (often empty)
      - "status": one of "corroborated" (>=2 supporting, 0 contradicting),
                  "disputed" (>=1 contradicting),
                  "single_source" (exactly 1 supporting, 0 contradicting),
                  "unverified"
      - "confidence": 0.0-1.0 — your confidence the claim is true given the source pool
      - "note": short string only if you need to explain a dispute or scope issue (else omit)
  - "synthesis": 2-3 paragraphs of editorial analysis. Surface what the sources disagree on, not just what they agree on. Do NOT invent facts beyond the source pool.

Rules:
- Never assert a claim no source supports.
- If a claim appears in only one source, mark it single_source — do not silently elevate it.
- If sources contradict each other, the corresponding claim must be marked disputed and the contradiction must be reflected in the synthesis paragraphs.
- Keep claim texts under 30 words each."""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def synthesize_cluster(client: OpenAI, articles: list[dict]) -> dict:
    sources_block = "\n\n".join(
        f"[{i}] {a.get('source_name', 'unknown')} — {a.get('title', '')}\n{(a.get('body') or '')[:1500]}"
        for i, a in enumerate(articles)
    )
    response = client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Source articles:\n\n{sources_block}\n\nProduce the JSON synthesis."},
        ],
    )
    return json.loads(response.choices[0].message.content or "{}")


def cluster_articles(articles: list[dict]) -> list[list[int]]:
    """Cluster articles by TF-IDF cosine similarity. Greedy single-link."""
    if len(articles) < 2:
        return []
    texts = [
        f"{a.get('title', '')} {(a.get('body') or '')[:1500]}"
        for a in articles
    ]
    vec = TfidfVectorizer(stop_words="english", max_features=4000, ngram_range=(1, 2))
    matrix = vec.fit_transform(texts)
    sims = cosine_similarity(matrix)

    n = len(articles)
    visited = [False] * n
    clusters: list[list[int]] = []
    for i in range(n):
        if visited[i]:
            continue
        cluster = [i]
        visited[i] = True
        for j in range(i + 1, n):
            if visited[j]:
                continue
            if sims[i, j] >= SIMILARITY_THRESHOLD:
                cluster.append(j)
                visited[j] = True
        # Require >=2 articles AND >=2 distinct publishers
        publishers = {articles[k].get("source_name", "") for k in cluster}
        if len(cluster) >= MIN_SOURCES_PER_STORY and len(publishers) >= MIN_SOURCES_PER_STORY:
            clusters.append(cluster)
    clusters.sort(key=len, reverse=True)
    return clusters[:MAX_STORIES_PER_RUN]


def compute_trust_score(claims: list[dict]) -> float:
    if not claims:
        return 0.0
    scored = sum(
        1.0 if c.get("status") == "corroborated"
        else 0.5 if c.get("status") == "single_source"
        else 0.2 if c.get("status") == "disputed"
        else 0.0
        for c in claims
    )
    return round(scored / len(claims), 2)


def write_story(synthesis: dict, source_articles: list[dict]) -> Path | None:
    title = synthesis.get("title", "").strip()
    if not title:
        log.warning("synthesis missing title, skipping")
        return None

    slug = slugify(title)[:64]
    out_path = STORIES_DIR / f"{slug}.md"
    if out_path.exists():
        log.debug("story already exists: %s", out_path)
        return out_path

    sources = [
        {
            "title": a.get("title", ""),
            "url": a.get("url", ""),
            "publisher": a.get("source_name", ""),
            "date": a.get("published", "")[:10] if a.get("published") else None,
            "bias": a.get("bias", "center"),
        }
        for a in source_articles
    ]

    companies = sorted({
        a.get("classification", {}).get("company")
        for a in source_articles
        if a.get("classification", {}).get("company")
    })

    now = datetime.now(timezone.utc)
    front_matter = {
        "title": title,
        "slug": slug,
        "first_seen": now.strftime("%Y-%m-%d %H:%M:%S +0000"),
        "last_updated": now.strftime("%Y-%m-%d %H:%M:%S +0000"),
        "date": now.strftime("%Y-%m-%d %H:%M:%S +0000"),
        "trust_score": compute_trust_score(synthesis.get("claims", [])),
        "companies": list(companies),
        "lead": synthesis.get("lead", ""),
        "sources": sources,
        "claims": synthesis.get("claims", []),
    }

    STORIES_DIR.mkdir(parents=True, exist_ok=True)
    body = synthesis.get("synthesis", "").strip()
    yaml_block = yaml.safe_dump(front_matter, sort_keys=False, allow_unicode=True, width=200).strip()
    out_path.write_text(f"---\n{yaml_block}\n---\n\n{body}\n")
    log.info("wrote story: %s (%d claims, %d sources)",
             out_path.name, len(synthesis.get("claims", [])), len(sources))
    return out_path


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
    news_articles = [a for a in articles if "news" in a.get("categories", [])]
    log.info("clustering %d news articles", len(news_articles))

    clusters = cluster_articles(news_articles)
    log.info("found %d multi-source clusters", len(clusters))

    client = OpenAI(api_key=api_key)
    written = 0
    for cluster_idx, cluster in enumerate(clusters):
        cluster_articles_list = [news_articles[i] for i in cluster]
        log.info("synthesizing cluster %d (%d articles)", cluster_idx, len(cluster))
        try:
            synthesis = synthesize_cluster(client, cluster_articles_list)
        except Exception as exc:
            log.warning("synthesis failed for cluster %d: %s", cluster_idx, exc)
            continue
        if write_story(synthesis, cluster_articles_list):
            written += 1
    log.info("wrote %d new stories", written)
    return 0


if __name__ == "__main__":
    sys.exit(main())
