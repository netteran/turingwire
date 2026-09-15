#!/usr/bin/env python3
"""
generate_company_pages.py — Generate _companies/<slug>.md files from classified posts.

Reads all _posts/**/*.md front matter to find company tags, then creates
one company page file per unique company. These are Jekyll collection items
served at /companies/<slug>/.

Run as part of the ingest pipeline after summarization.
"""
from __future__ import annotations

import logging
import re
import sys
from pathlib import Path

import yaml
from slugify import slugify

ROOT = Path(__file__).parent.parent
POSTS_DIR = ROOT / "_posts"
COMPANIES_DIR = ROOT / "_companies"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("generate_company_pages")


def extract_company_from_post(path: Path) -> str | None:
    text = path.read_text()
    if not text.startswith("---"):
        return None
    try:
        end = text.index("---", 3)
    except ValueError:
        return None
    try:
        fm = yaml.safe_load(text[3:end])
        return fm.get("company")
    except Exception:
        return None


def main() -> int:
    company_counts: dict[str, int] = {}

    for md_file in POSTS_DIR.rglob("*.md"):
        co = extract_company_from_post(md_file)
        if co:
            company_counts[co] = company_counts.get(co, 0) + 1

    COMPANIES_DIR.mkdir(parents=True, exist_ok=True)

    created = 0
    for company in sorted(company_counts):
        slug = slugify(company)
        page_path = COMPANIES_DIR / f"{slug}.md"

        if not page_path.exists():
            count = company_counts[company]
            description = (
                f"Turing Wire coverage of {company}: AI news, research summaries, "
                f"and analysis across {count} article{'s' if count != 1 else ''}."
            )
            content = (
                f'---\ntitle: "{company}"\n'
                f'description: "{description}"\n'
                f"layout: company\n---\n"
            )
            page_path.write_text(content)
            log.info("created company page: %s", page_path.name)
            created += 1

    log.info("company pages: %d created, %d total", created, len(company_counts))
    return 0


if __name__ == "__main__":
    sys.exit(main())
