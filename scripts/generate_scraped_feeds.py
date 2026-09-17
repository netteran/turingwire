#!/usr/bin/env python3
"""
generate_scraped_feeds.py — Synthesize RSS feeds by scraping blog listing
pages, for sources whose official RSS/Atom feed no longer works.

Runs as a pipeline step *before* fetch_feeds.py. Reads scrape rules from
feeds/scrape_targets.yml, keyed by ingest_sources.name, but only acts on
sources the database currently has active with type='scrape' — the YAML
supplies how to scrape a target, ingest_sources remains the single source
of truth for which sources are active, same as every other source type.

Writes one RSS 2.0 file per target to _data/scraped_feeds/<slug>.xml.
fetch_feeds.py reads these back in for any source with type='scrape'
instead of doing an HTTP GET, so from that point on a scraped source flows
through the exact same cutoff/dedup/full-text pipeline as a real feed.

Never lets one bad target take the run down — a scrape failure here just
means that source contributes nothing this run, same as a feed timeout
would.
"""
from __future__ import annotations

import argparse
import logging
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse
from xml.sax.saxutils import escape

import requests
import yaml
from bs4 import BeautifulSoup
from dateutil import parser as dateparser
from slugify import slugify

from ingest_store import load_sources

ROOT = Path(__file__).parent.parent
TARGETS_FILE = ROOT / "feeds" / "scrape_targets.yml"
OUT_DIR = ROOT / "_data" / "scraped_feeds"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("generate_scraped_feeds")

USER_AGENT = (
    "TuringWire/1.0 (+https://turingwire.com; news aggregator; "
    "contact: webmaster@turingwire.com)"
)
REQUEST_TIMEOUT = 20
MAX_ITEMS = 20

# Link text that's chrome around an article link, never the headline itself.
NAV_TEXT_DENYLIST = {
    "home", "blog", "news", "all", "next", "previous", "prev", "more",
    "read more", "learn more", "view all", "see all", "load more",
    "subscribe", "rss", "newsletter", "contact", "about", "careers",
}

_DATE_CLASS_RE = re.compile(r"date|publish|posted", re.I)


def _find_title(link_tag) -> str:
    """Best-effort headline for a candidate article link.

    Checks for a heading *inside* the link first: many blog grids wrap a
    whole card (image + heading + date) in one <a>, whose own full text is
    all of those concatenated — not usable as a title even though it's
    "long enough". Only once that's ruled out does the link's own text
    become trustworthy, then a heading in a nearby ancestor "card" (for the
    "heading IS the link" layout), then title/alt attributes.
    """
    heading = link_tag.find(["h1", "h2", "h3", "h4"])
    if heading:
        text = re.sub(r"\s+", " ", heading.get_text(strip=True))
        if len(text) >= 10:
            return text

    text = re.sub(r"\s+", " ", link_tag.get_text(" ", strip=True))
    if len(text) >= 10 and text.lower() not in NAV_TEXT_DENYLIST:
        return text

    node = link_tag
    for _ in range(4):
        node = node.parent
        if node is None or node.name in ("body", "html"):
            break
        heading = node.find(["h1", "h2", "h3", "h4"])
        if heading:
            heading_text = re.sub(r"\s+", " ", heading.get_text(strip=True))
            if len(heading_text) >= 10:
                return heading_text

    if link_tag.get("title", "").strip():
        return re.sub(r"\s+", " ", link_tag["title"].strip())
    img = link_tag.find("img")
    if img and len(img.get("alt", "").strip()) >= 10:
        return re.sub(r"\s+", " ", img["alt"].strip())
    return ""


def _try_parse_date(raw: str) -> datetime | None:
    if not raw or not raw.strip():
        return None
    try:
        dt = dateparser.parse(raw, fuzzy=True)
    except (ValueError, OverflowError, TypeError):
        return None
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def _find_date(link_tag) -> datetime | None:
    """Best-effort publish date from a <time> element, or a date-ish class
    name (very common on non-semantic markup), in the same card."""
    node = link_tag
    for _ in range(4):
        node = node.parent
        if node is None or node.name in ("body", "html"):
            break

        time_tag = node.find("time")
        if time_tag:
            dt = _try_parse_date(time_tag.get("datetime") or time_tag.get_text(strip=True))
            if dt:
                return dt

        date_el = node.find(class_=_DATE_CLASS_RE)
        if date_el:
            dt = _try_parse_date(date_el.get_text(strip=True))
            if dt:
                return dt
    return None


def scrape_target(name: str, cfg: dict) -> list[dict]:
    listing_url = cfg["listing_url"]
    link_re = re.compile(cfg["link_pattern"])
    exclude_re = re.compile(cfg["exclude_pattern"]) if cfg.get("exclude_pattern") else None
    origin = urlparse(listing_url).netloc

    resp = requests.get(listing_url, headers={"User-Agent": USER_AGENT}, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "lxml")

    all_links = soup.find_all("a", href=True)
    items: list[dict] = []
    seen_urls: set[str] = set()

    for a in all_links:
        href = urljoin(listing_url, a["href"])
        parsed = urlparse(href)
        if parsed.netloc != origin:
            continue
        if not link_re.match(parsed.path):
            continue
        if exclude_re and exclude_re.match(parsed.path):
            continue

        clean_url = href.split("#")[0]
        if clean_url in seen_urls or clean_url.rstrip("/") == listing_url.rstrip("/"):
            continue

        title = _find_title(a)
        if not title:
            continue

        seen_urls.add(clean_url)
        items.append({"title": title, "url": clean_url, "date": _find_date(a)})
        if len(items) >= MAX_ITEMS:
            break

    log.info("%s: %d links on page -> %d items extracted", name, len(all_links), len(items))
    if not items:
        log.warning(
            "%s: 0 items extracted from %s — link_pattern %r likely needs "
            "tuning against the real page",
            name, listing_url, cfg["link_pattern"],
        )
    return items


def to_rss(name: str, listing_url: str, items: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        "<rss version=\"2.0\"><channel>",
        f"<title>{escape(name)}</title>",
        f"<link>{escape(listing_url)}</link>",
        f"<description>Scraped from {escape(listing_url)} (no official feed available)</description>",
        f"<lastBuildDate>{now}</lastBuildDate>",
    ]
    for item in items:
        pub = item["date"].strftime("%a, %d %b %Y %H:%M:%S %z") if item["date"] else now
        parts.append(
            "<item>"
            f"<title>{escape(item['title'])}</title>"
            f"<link>{escape(item['url'])}</link>"
            f"<guid isPermaLink=\"true\">{escape(item['url'])}</guid>"
            f"<pubDate>{escape(pub)}</pubDate>"
            "</item>"
        )
    parts.append("</channel></rss>")
    return "\n".join(parts)


def main(dry_run: bool = False) -> int:
    if not TARGETS_FILE.exists():
        log.info("no %s, nothing to scrape", TARGETS_FILE)
        return 0

    targets = yaml.safe_load(TARGETS_FILE.read_text()) or {}
    scrape_sources = [s for s in load_sources(active_only=True) if s.get("type") == "scrape"]

    if not scrape_sources:
        log.info("no active sources with type='scrape', nothing to do")
        return 0

    if dry_run:
        log.info("[DRY RUN] would scrape %d target(s): %s", len(scrape_sources),
                  ", ".join(s["name"] for s in scrape_sources))
        return 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0

    for source in scrape_sources:
        name = source["name"]
        cfg = targets.get(name)
        if not cfg:
            log.warning("%s is type='scrape' but has no entry in %s, skipping", name, TARGETS_FILE)
            continue

        listing_url = cfg.get("listing_url", source["url"])
        try:
            items = scrape_target(name, cfg)
        except Exception as exc:  # one bad target must not block the rest
            log.warning("scrape failed for %s (%s): %s", name, listing_url, exc)
            continue

        out_path = OUT_DIR / f"{slugify(name)}.xml"
        out_path.write_text(to_rss(name, listing_url, items), encoding="utf-8")
        written += 1

    log.info("wrote %d scraped feed(s) to %s", written, OUT_DIR)
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="skip scraping without writing output")
    args = parser.parse_args()
    sys.exit(main(dry_run=args.dry_run))
