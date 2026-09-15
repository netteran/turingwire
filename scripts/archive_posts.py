#!/usr/bin/env python3
"""
archive_posts.py — Archive posts older than ARCHIVE_AFTER_DAYS days.

Reads _posts/YYYY/MM/*.md files older than the threshold,
extracts front matter, appends to archive/YYYY.json,
and removes the .md files from _posts/.

Run monthly via a GitHub Actions scheduled workflow.
"""
from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import yaml

ROOT = Path(__file__).parent.parent
POSTS_DIR = ROOT / "_posts"
ARCHIVE_DIR = ROOT / "archive"

ARCHIVE_AFTER_DAYS = 90

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("archive_posts")


def parse_front_matter(path: Path) -> dict | None:
    text = path.read_text()
    if not text.startswith("---"):
        return None
    end = text.index("---", 3)
    try:
        return yaml.safe_load(text[3:end])
    except Exception:
        return None


def load_archive(year: int) -> list[dict]:
    path = ARCHIVE_DIR / f"{year}.json"
    if path.exists():
        with path.open() as f:
            return json.load(f)
    return []


def save_archive(year: int, records: list[dict]) -> None:
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    path = ARCHIVE_DIR / f"{year}.json"
    with path.open("w") as f:
        json.dump(records, f, indent=2, default=str)


def main() -> int:
    cutoff = datetime.now(timezone.utc) - timedelta(days=ARCHIVE_AFTER_DAYS)
    archived_count = 0
    archives: dict[int, list[dict]] = {}

    for md_file in sorted(POSTS_DIR.rglob("*.md")):
        if md_file.name == ".gitkeep":
            continue

        fm = parse_front_matter(md_file)
        if not fm:
            continue

        pub_date = fm.get("date")
        if not pub_date:
            continue

        if isinstance(pub_date, str):
            try:
                pub_dt = datetime.fromisoformat(pub_date.replace(" +0000", "+00:00"))
            except Exception:
                continue
        elif isinstance(pub_date, datetime):
            pub_dt = pub_date
        else:
            continue

        if pub_dt.tzinfo is None:
            pub_dt = pub_dt.replace(tzinfo=timezone.utc)

        if pub_dt >= cutoff:
            continue

        year = pub_dt.year
        record = {
            **fm,
            "archived_from": str(md_file.relative_to(ROOT)),
            "archived_at": datetime.now(timezone.utc).isoformat(),
        }

        if year not in archives:
            archives[year] = load_archive(year)
        archives[year].append(record)

        md_file.unlink()
        log.info("archived: %s", md_file.name)
        archived_count += 1

    for year, records in archives.items():
        save_archive(year, records)
        log.info("saved archive/%d.json (%d records)", year, len(records))

    log.info("archived %d posts total", archived_count)
    return 0


if __name__ == "__main__":
    sys.exit(main())
