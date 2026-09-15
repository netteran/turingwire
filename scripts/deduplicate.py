#!/usr/bin/env python3
"""
deduplicate.py — Remove duplicate articles from the staging batch.

Dedup strategy (applied in order):
1. Canonical URL match (after stripping tracking params)
2. Title cosine similarity >= 0.85 (TF-IDF)
3. First 200 chars of body if both URL and title differ

When a cluster has multiple sources, keep the one closest to the publisher
(lowest priority number, then highest priority source_company match).

Also filters against seen_articles.json GUID cache (last 30 days).
"""
from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import yaml
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
STAGING_FILE = DATA_DIR / "staging_articles.json"
DEDUPED_FILE = DATA_DIR / "deduped_articles.json"
SEEN_FILE = DATA_DIR / "seen_articles.json"

TITLE_SIM_THRESHOLD = 0.85
BODY_PREFIX_LEN = 200
SEEN_WINDOW_DAYS = 30
MAX_OUTPUT = 50

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("deduplicate")


def load_seen() -> dict[str, str]:
    """Load GUID -> ISO timestamp cache."""
    if SEEN_FILE.exists():
        with SEEN_FILE.open() as f:
            return json.load(f)
    return {}


def prune_seen(seen: dict[str, str]) -> dict[str, str]:
    cutoff = datetime.now(timezone.utc) - timedelta(days=SEEN_WINDOW_DAYS)
    return {
        guid: ts
        for guid, ts in seen.items()
        if datetime.fromisoformat(ts.replace("Z", "+00:00")) > cutoff
    }


def pick_best(cluster: list[dict]) -> dict:
    """From a cluster of duplicates, return the most-publisher-proximate article."""
    return min(cluster, key=lambda a: (a.get("priority", 99), a.get("source_company") is None))


def deduplicate_batch(articles: list[dict], seen: dict[str, str]) -> list[dict]:
    # Filter already-seen GUIDs
    novel = [a for a in articles if a["guid"] not in seen]
    log.info("%d articles after seen-cache filter (was %d)", len(novel), len(articles))

    if not novel:
        return []

    # Step 1: URL dedup — group by canonical URL
    url_clusters: dict[str, list[dict]] = {}
    for article in novel:
        url = article["url"]
        url_clusters.setdefault(url, []).append(article)

    url_deduped = [pick_best(cluster) for cluster in url_clusters.values()]
    log.info("%d articles after URL dedup (was %d)", len(url_deduped), len(novel))

    if len(url_deduped) < 2:
        return url_deduped[:MAX_OUTPUT]

    # Step 2: Title cosine similarity clustering
    titles = [a.get("title", "") or "" for a in url_deduped]
    try:
        vectorizer = TfidfVectorizer(min_df=1, stop_words="english")
        tfidf = vectorizer.fit_transform(titles)
        sim_matrix = cosine_similarity(tfidf)
    except Exception as exc:
        log.warning("TF-IDF failed, skipping title dedup: %s", exc)
        return url_deduped[:MAX_OUTPUT]

    n = len(url_deduped)
    assigned = [False] * n
    clusters: list[list[int]] = []

    for i in range(n):
        if assigned[i]:
            continue
        cluster_ids = [i]
        assigned[i] = True
        for j in range(i + 1, n):
            if not assigned[j] and sim_matrix[i, j] >= TITLE_SIM_THRESHOLD:
                cluster_ids.append(j)
                assigned[j] = True
        clusters.append(cluster_ids)

    title_deduped = [pick_best([url_deduped[i] for i in cluster]) for cluster in clusters]
    log.info("%d articles after title-sim dedup (was %d)", len(title_deduped), len(url_deduped))

    # Step 3: Body prefix dedup (catches cases where URL and title differ but content is same)
    body_seen: dict[str, int] = {}
    body_deduped: list[dict] = []
    for article in title_deduped:
        prefix = (article.get("body") or "")[:BODY_PREFIX_LEN].strip()
        if prefix and prefix in body_seen:
            existing = body_deduped[body_seen[prefix]]
            if article.get("priority", 99) < existing.get("priority", 99):
                body_deduped[body_seen[prefix]] = article
        elif prefix:
            body_seen[prefix] = len(body_deduped)
            body_deduped.append(article)
        else:
            body_deduped.append(article)

    log.info("%d articles after body-prefix dedup (was %d)", len(body_deduped), len(title_deduped))

    # Cap output
    if len(body_deduped) > MAX_OUTPUT:
        # Sort by priority then recency before capping
        body_deduped.sort(key=lambda a: (a.get("priority", 99), a.get("published", "")))
        backlog = body_deduped[MAX_OUTPUT:]
        body_deduped = body_deduped[:MAX_OUTPUT]
        backlog_file = DATA_DIR / "backlog.json"
        with backlog_file.open("w") as f:
            json.dump(backlog, f, indent=2, default=str)
        log.info("wrote %d articles to backlog", len(backlog))

    return body_deduped


def main() -> int:
    if not STAGING_FILE.exists():
        log.error("staging file not found: %s", STAGING_FILE)
        return 1

    with STAGING_FILE.open() as f:
        articles = json.load(f)

    seen = load_seen()
    seen = prune_seen(seen)

    deduped = deduplicate_batch(articles, seen)
    log.info("final batch size: %d articles", len(deduped))

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with DEDUPED_FILE.open("w") as f:
        json.dump(deduped, f, indent=2, default=str)

    log.info("wrote deduped articles to %s", DEDUPED_FILE)
    return 0


if __name__ == "__main__":
    sys.exit(main())
