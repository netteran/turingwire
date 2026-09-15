#!/usr/bin/env python3
"""
migrate_load.py — Push the migration bundle into Supabase.

Reads the JSON produced by migrate_extract.py and inserts articles, companies
and stories in batches. Idempotent: articles conflict on (category, slug),
companies on name, stories on slug, so a re-run updates rather than duplicates.

Usage:
    SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... python scripts/migrate_load.py
    python scripts/migrate_load.py --dry-run     # validate without writing
"""
from __future__ import annotations

import argparse
import json
import logging
import sys
from pathlib import Path

import requests

from supabase_store import SupabaseError, _headers, _rest

ROOT = Path(__file__).parent.parent
BUNDLE = ROOT / "_data" / "migration_bundle.json"
BATCH = 250
TIMEOUT = 120

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("migrate_load")

# Keys that exist only in the bundle, not in the table.
INTERNAL_KEYS = {"_origin"}


def chunks(items: list, size: int):
    for i in range(0, len(items), size):
        yield items[i : i + size]


def post_batch(table: str, rows: list[dict], on_conflict: str) -> None:
    resp = requests.post(
        f"{_rest(table)}?on_conflict={on_conflict}",
        headers=_headers("resolution=merge-duplicates,return=minimal"),
        json=rows,
        timeout=TIMEOUT,
    )
    if resp.status_code >= 400:
        raise SupabaseError(
            f"{table} batch failed ({resp.status_code}): {resp.text[:500]}"
        )


def load_articles(rows: list[dict], dry_run: bool) -> int:
    clean = [{k: v for k, v in r.items() if k not in INTERNAL_KEYS} for r in rows]
    if dry_run:
        log.info("[dry-run] would insert %d articles", len(clean))
        return len(clean)

    done = 0
    for batch in chunks(clean, BATCH):
        post_batch("articles", batch, "category,slug")
        done += len(batch)
        log.info("articles: %d/%d", done, len(clean))
    return done


def load_companies(rows: list[dict], dry_run: bool) -> int:
    if dry_run:
        log.info("[dry-run] would insert %d companies", len(rows))
        return len(rows)
    for batch in chunks(rows, BATCH):
        post_batch("companies", batch, "name")
    log.info("companies: %d", len(rows))
    return len(rows)


def load_stories(rows: list[dict], dry_run: bool) -> int:
    if dry_run:
        log.info("[dry-run] would insert %d stories", len(rows))
        return len(rows)
    for batch in chunks(rows, BATCH):
        post_batch("stories", batch, "slug")
    log.info("stories: %d", len(rows))
    return len(rows)


def verify() -> None:
    """Read back counts so the migration can be checked at a glance."""
    for table, params in (
        ("articles", {"select": "id", "status": "eq.published"}),
        ("articles", {"select": "id", "status": "eq.archived"}),
        ("companies", {"select": "id"}),
        ("stories", {"select": "id"}),
    ):
        resp = requests.get(
            _rest(table),
            headers={**_headers(), "Prefer": "count=exact"},
            params={**params, "limit": 1},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        count = resp.headers.get("content-range", "0/0").split("/")[-1]
        label = f"{table} ({params.get('status', 'all')})"
        log.info("  %-24s %s", label, count)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--bundle", default=str(BUNDLE))
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    path = Path(args.bundle)
    if not path.exists():
        log.error("bundle not found: %s — run scripts/migrate_extract.py first", path)
        return 1

    bundle = json.loads(path.read_text(encoding="utf-8"))
    articles = bundle.get("articles", [])
    companies = bundle.get("companies", [])
    stories = bundle.get("stories", [])

    log.info(
        "loading %d articles, %d companies, %d stories",
        len(articles),
        len(companies),
        len(stories),
    )

    try:
        # Companies first so article pages can resolve their links immediately.
        load_companies(companies, args.dry_run)
        load_articles(articles, args.dry_run)
        load_stories(stories, args.dry_run)
    except SupabaseError as exc:
        log.error("%s", exc)
        return 1

    if not args.dry_run:
        log.info("--- verification ---")
        verify()

    log.info("done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
