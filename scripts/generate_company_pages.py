#!/usr/bin/env python3
"""
generate_company_pages.py — Keep the `companies` table in sync with coverage.

Previously wrote _companies/<slug>.md files for Jekyll's collection. Company
pages are now rendered from Postgres at /companies/<slug>/, so this just makes
sure every organisation named in an article has a row.

Run as part of the ingest pipeline, after summarization.
"""
from __future__ import annotations

import logging
import sys

from slugify import slugify

from supabase_store import (
    SupabaseError,
    companies_in_articles,
    distinct_companies,
    upsert_company,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("generate_company_pages")


def main() -> int:
    try:
        named = companies_in_articles()
        existing = set(distinct_companies())
    except SupabaseError as exc:
        log.error("%s", exc)
        return 1

    missing = sorted(named - existing)
    if not missing:
        log.info("companies up to date (%d tracked)", len(existing))
        return 0

    created = 0
    for name in missing:
        if not slugify(name):
            log.warning("skipping company with unusable name: %r", name)
            continue
        description = (
            f"Turing Wire coverage of {name}: AI news, research summaries, and analysis."
        )
        try:
            upsert_company(name, description)
        except SupabaseError as exc:
            log.error("failed to upsert %r: %s", name, exc)
            continue
        log.info("created company: %s", name)
        created += 1

    log.info("companies: %d created, %d total", created, len(existing) + created)
    return 0


if __name__ == "__main__":
    sys.exit(main())
