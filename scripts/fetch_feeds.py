#!/usr/bin/env python3
"""
fetch_feeds.py — Fetch all configured RSS/Atom/API feeds and write raw articles
to a staging JSON file for downstream processing.

Honors ETag and If-Modified-Since headers to minimize bandwidth.
Fetches full article text when requires_full_text_fetch is True.
"""
from __future__ import annotations

import argparse
import json
import logging
import os
import re
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlencode, urlparse, urlunparse, parse_qs

import feedparser
import requests
import yaml
from bs4 import BeautifulSoup
from dateutil import parser as dateparser
from tenacity import retry, stop_after_attempt, wait_exponential

ROOT = Path(__file__).parent.parent
FEEDS_DIR = ROOT / "feeds"
DATA_DIR = ROOT / "_data"
STAGING_FILE = DATA_DIR / "staging_articles.json"
ETAG_CACHE_FILE = DATA_DIR / "etag_cache.json"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("fetch_feeds")

TRACKING_PARAMS = {
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "fbclid", "gclid", "ref", "referer", "_ga", "mc_cid", "mc_eid",
}

_CYRILLIC_RE = re.compile(r"[Ѐ-ӿ]")
_ALPHA_RE = re.compile(r"[A-Za-zЀ-ӿ]")


def _is_cyrillic_dominant(text: str, threshold: float = 0.5) -> bool:
    """Return True if over half of alphabetic characters in text are Cyrillic."""
    alpha = _ALPHA_RE.findall(text)
    if not alpha:
        return False
    return len(_CYRILLIC_RE.findall(text)) / len(alpha) > threshold

USER_AGENT = (
    "TuringWire/1.0 (+https://turingwire.com; news aggregator; "
    "contact: webmaster@turingwire.com)"
)
REQUEST_TIMEOUT = 20
FULL_TEXT_TIMEOUT = 15
MAX_BODY_CHARS = 8000


def canonical_url(url: str) -> str:
    """Strip tracking parameters and normalize URL."""
    parsed = urlparse(url)
    qs = parse_qs(parsed.query, keep_blank_values=False)
    filtered = {k: v for k, v in qs.items() if k.lower() not in TRACKING_PARAMS}
    new_query = urlencode(filtered, doseq=True)
    return urlunparse(parsed._replace(query=new_query, fragment=""))


def load_yaml(path: Path) -> dict:
    with path.open() as f:
        return yaml.safe_load(f)


def load_etag_cache() -> dict:
    if ETAG_CACHE_FILE.exists():
        with ETAG_CACHE_FILE.open() as f:
            return json.load(f)
    return {}


def save_etag_cache(cache: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with ETAG_CACHE_FILE.open("w") as f:
        json.dump(cache, f, indent=2)


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def fetch_url(url: str, headers: dict | None = None) -> requests.Response:
    h = {"User-Agent": USER_AGENT}
    if headers:
        h.update(headers)
    return requests.get(url, headers=h, timeout=REQUEST_TIMEOUT)


def resolve_redirect(url: str) -> str:
    """Follow HTTP redirects and return the final canonical URL.
    Used for Google News links which redirect to the actual source article."""
    try:
        resp = requests.head(
            url,
            headers={"User-Agent": USER_AGENT},
            timeout=10,
            allow_redirects=True,
        )
        final = resp.url
        # HEAD sometimes stops at a soft redirect page; fall back to GET
        if "news.google.com" in final:
            resp = requests.get(
                url,
                headers={"User-Agent": USER_AGENT},
                timeout=10,
                allow_redirects=True,
            )
            final = resp.url
        return final if final else url
    except Exception as exc:
        log.debug("redirect resolution failed for %s: %s", url, exc)
        return url


def fetch_full_text(url: str) -> str:
    """Attempt to extract main article text from a URL."""
    try:
        resp = requests.get(
            url,
            headers={"User-Agent": USER_AGENT},
            timeout=FULL_TEXT_TIMEOUT,
        )
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "lxml")
        for tag in soup(["script", "style", "nav", "header", "footer", "aside"]):
            tag.decompose()
        article = soup.find("article") or soup.find("main") or soup.find("body")
        text = article.get_text(separator=" ", strip=True) if article else ""
        return text[:MAX_BODY_CHARS]
    except Exception as exc:
        log.debug("full text fetch failed for %s: %s", url, exc)
        return ""


def fetch_rss_atom(source: dict, etag_cache: dict, dry_run: bool) -> list[dict]:
    url = source["url"]
    headers: dict[str, str] = {}
    cache_key = url

    if cache_key in etag_cache:
        entry = etag_cache[cache_key]
        if entry.get("etag"):
            headers["If-None-Match"] = entry["etag"]
        if entry.get("last_modified"):
            headers["If-Modified-Since"] = entry["last_modified"]

    if dry_run:
        log.info("[DRY RUN] would fetch %s", url)
        return []

    try:
        resp = fetch_url(url, headers)
    except Exception as exc:
        log.warning("failed to fetch %s: %s", url, exc)
        return []

    if resp.status_code == 304:
        log.info("304 not modified: %s", url)
        return []

    if resp.status_code != 200:
        log.warning("HTTP %d for %s", resp.status_code, url)
        return []

    etag_cache[cache_key] = {
        "etag": resp.headers.get("ETag", ""),
        "last_modified": resp.headers.get("Last-Modified", ""),
    }

    feed = feedparser.parse(resp.text)
    articles = []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=26)

    for entry in feed.entries:
        pub = None
        for field in ("published_parsed", "updated_parsed"):
            val = getattr(entry, field, None)
            if val:
                try:
                    pub = datetime(*val[:6], tzinfo=timezone.utc)
                    break
                except Exception:
                    pass

        if pub and pub < cutoff:
            continue

        link = getattr(entry, "link", "") or ""
        if not link:
            continue

        # For Google News sources, resolve the redirect to the real article URL
        # so URL-based deduplication works against articles from direct feeds.
        if source.get("resolve_redirect") and "news.google.com" in link:
            link = resolve_redirect(link)

        body = ""
        for field in ("summary", "content"):
            raw = getattr(entry, field, None)
            if raw:
                if isinstance(raw, list):
                    raw = raw[0].get("value", "") if raw else ""
                soup = BeautifulSoup(raw or "", "lxml")
                body = soup.get_text(separator=" ", strip=True)[:MAX_BODY_CHARS]
                if body:
                    break

        if source.get("requires_full_text_fetch") and len(body) < 200:
            body = fetch_full_text(link) or body

        title = getattr(entry, "title", "").strip()
        if _is_cyrillic_dominant(title):
            log.debug("skipping Cyrillic-dominant article: %s", title)
            continue

        articles.append({
            "guid": getattr(entry, "id", link) or link,
            "title": title,
            "url": canonical_url(link),
            "published": pub.isoformat() if pub else datetime.now(timezone.utc).isoformat(),
            "body": body,
            "source_name": source["name"],
            "source_url": source["url"],
            "category_hint": source.get("category_hint", "news"),
            "source_company": source.get("company"),
            "priority": source.get("priority", 2),
            "source_truncated": source.get("notes", "").find("source_truncated: true") != -1,
        })

    max_articles = source.get("max_articles")
    if max_articles:
        articles = articles[:max_articles]

    log.info("fetched %d articles from %s", len(articles), source["name"])
    return articles


def fetch_arxiv(source: dict, dry_run: bool) -> list[dict]:
    """Fetch papers from arXiv API."""
    if dry_run:
        log.info("[DRY RUN] would query arXiv: %s", source.get("params", {}).get("search_query"))
        return []

    params = source.get("params", {})
    cutoff = datetime.now(timezone.utc) - timedelta(hours=26)

    query_params = {
        "search_query": params.get("search_query", "cat:cs.AI"),
        "sortBy": "submittedDate",
        "sortOrder": "descending",
        "max_results": str(params.get("max_results", 30)),
    }

    try:
        resp = fetch_url(
            "https://export.arxiv.org/api/query?" + urlencode(query_params)
        )
        resp.raise_for_status()
    except Exception as exc:
        log.warning("arXiv fetch failed for %s: %s", params.get("search_query"), exc)
        return []

    feed = feedparser.parse(resp.text)
    articles = []

    for entry in feed.entries:
        pub = None
        for field in ("published_parsed", "updated_parsed"):
            val = getattr(entry, field, None)
            if val:
                try:
                    pub = datetime(*val[:6], tzinfo=timezone.utc)
                    break
                except Exception:
                    pass

        if pub and pub < cutoff:
            continue

        link = getattr(entry, "link", "") or ""
        abstract = getattr(entry, "summary", "").strip()
        authors = []
        if hasattr(entry, "authors"):
            authors = [a.get("name", "") for a in entry.authors]

        arxiv_id = ""
        if link:
            m = re.search(r"arxiv\.org/abs/([0-9]+\.[0-9]+)", link)
            if m:
                arxiv_id = m.group(1)

        articles.append({
            "guid": arxiv_id or link,
            "title": getattr(entry, "title", "").strip().replace("\n", " "),
            "url": link,
            "published": pub.isoformat() if pub else datetime.now(timezone.utc).isoformat(),
            "body": abstract,
            "authors": authors,
            "arxiv_id": arxiv_id,
            "source_name": source["name"],
            "source_url": source["url"],
            "category_hint": "research",
            "source_company": None,
            "priority": source.get("priority", 1),
            "source_truncated": False,
        })

    log.info("fetched %d papers from %s", len(articles), source["name"])
    return articles


def main(dry_run: bool = False) -> int:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    etag_cache = load_etag_cache()

    news_config = load_yaml(FEEDS_DIR / "news_sources.yml")
    research_config = load_yaml(FEEDS_DIR / "research_sources.yml")

    all_articles: list[dict] = []
    current_month = datetime.now(timezone.utc).month

    for source in news_config.get("sources", []):
        articles = fetch_rss_atom(source, etag_cache, dry_run)
        all_articles.extend(articles)
        time.sleep(0.5)

    for source in research_config.get("sources", []):
        active_months = source.get("active_months")
        if active_months and current_month not in active_months:
            log.debug("skipping %s (inactive month %d)", source["name"], current_month)
            continue

        if source.get("type") == "api" and "arxiv" in source.get("url", ""):
            articles = fetch_arxiv(source, dry_run)
        else:
            articles = fetch_rss_atom(source, etag_cache, dry_run)

        all_articles.extend(articles)
        time.sleep(1.0)

    log.info("total raw articles fetched: %d", len(all_articles))

    if not dry_run:
        with STAGING_FILE.open("w") as f:
            json.dump(all_articles, f, indent=2, default=str)
        save_etag_cache(etag_cache)
        log.info("wrote %d articles to %s", len(all_articles), STAGING_FILE)

    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="fetch without writing output")
    args = parser.parse_args()
    sys.exit(main(dry_run=args.dry_run))
