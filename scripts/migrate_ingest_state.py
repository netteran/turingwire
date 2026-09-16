#!/usr/bin/env python3
"""
migrate_ingest_state.py — Move pipeline state out of the repo into Postgres.

One-off, idempotent. Run after applying 0004_admin_and_ingest.sql.

    _data/seen_articles.json -> seen_articles       (5,252 GUIDs)
    _data/etag_cache.json    -> ingest_sources.etag / last_modified

The feed sources themselves are seeded by the migration, since they are
configuration rather than state.

Usage:
    SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... python scripts/migrate_ingest_state.py
    python scripts/migrate_ingest_state.py --dry-run
"""
from __future__ import annotations

import argparse
import json
import logging
import sys
from pathlib import Path

import requests

from supabase_store import SupabaseError, _headers, _rest, TIMEOUT

ROOT = Path(__file__).parent.parent
SEEN_FILE = ROOT / "_data" / "seen_articles.json"
ETAG_FILE = ROOT / "_data" / "etag_cache.json"
BATCH = 500

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("migrate_ingest_state")


def migrate_seen(dry_run: bool) -> int:
    if not SEEN_FILE.exists():
        log.info("no seen_articles.json — nothing to migrate")
        return 0

    seen = json.loads(SEEN_FILE.read_text())
    rows = [{"guid": guid, "first_seen_at": ts} for guid, ts in seen.items() if guid]
    log.info("seen_articles.json: %d GUIDs", len(rows))

    if dry_run:
        return len(rows)

    done = 0
    for i in range(0, len(rows), BATCH):
        batch = rows[i : i + BATCH]
        resp = requests.post(
            _rest("seen_articles") + "?on_conflict=guid",
            headers=_headers("resolution=ignore-duplicates,return=minimal"),
            json=batch,
            timeout=TIMEOUT,
        )
        if resp.status_code >= 400:
            raise SupabaseError(f"seen batch failed ({resp.status_code}): {resp.text[:300]}")
        done += len(batch)
        log.info("  seen_articles: %d/%d", done, len(rows))
    return done


def migrate_etags(dry_run: bool) -> int:
    if not ETAG_FILE.exists():
        log.info("no etag_cache.json — nothing to migrate")
        return 0

    cache = json.loads(ETAG_FILE.read_text())
    log.info("etag_cache.json: %d feeds", len(cache))

    if dry_run:
        return len(cache)

    updated = 0
    for url, entry in cache.items():
        etag = (entry or {}).get("etag") or None
        last_modified = (entry or {}).get("last_modified") or None
        if not etag and not last_modified:
            continue

        resp = requests.patch(
            _rest("ingest_sources"),
            headers=_headers("return=minimal"),
            params={"url": f"eq.{url}"},
            json={"etag": etag, "last_modified": last_modified},
            timeout=TIMEOUT,
        )
        if resp.status_code >= 400:
            log.warning("  could not set etag for %s: %s", url, resp.text[:150])
            continue
        updated += 1

    log.info("  updated validators on %d sources", updated)
    return updated


def verify() -> None:
    for table in ("ingest_sources", "seen_articles", "settings"):
        resp = requests.get(
            _rest(table),
            headers={**_headers(), "Prefer": "count=exact"},
            params={"select": "*", "limit": 1},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        count = resp.headers.get("content-range", "0/0").split("/")[-1]
        log.info("  %-18s %s", table, count)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    try:
        # ingest_sources must already exist, seeded by the migration.
        probe = requests.get(
            _rest("ingest_sources"), headers=_headers(), params={"select": "id", "limit": 1}, timeout=TIMEOUT
        )
        if probe.status_code == 404 or "does not exist" in probe.text:
            log.error("ingest_sources not found — apply 0004_admin_and_ingest.sql first")
            return 1

        seen = migrate_seen(args.dry_run)
        etags = migrate_etags(args.dry_run)
    except (SupabaseError, requests.RequestException) as exc:
        log.error("%s", exc)
        return 1

    if args.dry_run:
        log.info("[dry-run] would migrate %d GUIDs and %d feed validators", seen, etags)
        return 0

    log.info("--- verification ---")
    verify()
    log.info("done — _data/seen_articles.json and etag_cache.json can now be deleted")
    return 0


if __name__ == "__main__":
    sys.exit(main())
