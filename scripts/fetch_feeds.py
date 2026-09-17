#!/usr/bin/env python3
"""
fetch_feeds.py — Fetch all configured RSS/Atom/API feeds and write raw articles
to a staging JSON file for downstream processing.

Honors ETag and If-Modified-Since headers to minimize bandwidth.
Fetches full article text when requires_full_text_fetch is True, or whenever
the feed body looks like a short teaser rather than a real article (see
TEASER_CHARS) — capped to genuinely new entries via the seen-articles cache.
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
from bs4 import BeautifulSoup
from dateutil import parser as dateparser
from slugify import slugify
from tenacity import retry, stop_after_attempt, wait_exponential

from ingest_store import filter_unseen, get_setting_int, load_sources, record_source_result

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
STAGING_FILE = DATA_DIR / "staging_articles.json"
# Written by generate_scraped_feeds.py, which runs as the workflow step
# immediately before this script, for any source with type='scrape'.
SCRAPED_FEEDS_DIR = DATA_DIR / "scraped_feeds"

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
# How much of a source article to capture before summarization ever sees it.
# This used to be a flat 8000 chars (~1,300 words) for every source, which
# silently clipped long-form articles (investigative pieces, deep-dive
# essays) well before the summarizer got a chance to write from them — no
# amount of prompt tuning downstream can recover substance cut here. Kept
# generous and overridable via the `max_source_chars` setting so it can be
# tuned without a deploy. Set once per run in main(); the module-level value
# is just the fallback if Supabase is unreachable.
DEFAULT_MAX_BODY_CHARS = 24000
MAX_BODY_CHARS = DEFAULT_MAX_BODY_CHARS
# Below this, a captured feed body reads as a teaser paragraph, not the real
# article — most publisher feeds (TechCrunch, The Verge, Ars Technica, and
# nearly every other non-lab-blog source in ingest_sources) put only a
# one-paragraph <description> in the feed itself, hundreds of chars, even
# though the live page runs to several times that. Downstream, summarizer
# length targets scale off however many words this body has (see
# quality.scaled_word_target) — a short article isn't just possible here,
# it's the deterministic result of feeding the writer a snippet. Checked
# regardless of the per-source requires_full_text_fetch flag, which defaults
# false and isn't exposed in /admin/sources, so it can't be relied on alone.
TEASER_CHARS = 1500


def canonical_url(url: str) -> str:
    """Strip tracking parameters and normalize URL."""
    parsed = urlparse(url)
    qs = parse_qs(parsed.query, keep_blank_values=False)
    filtered = {k: v for k, v in qs.items() if k.lower() not in TRACKING_PARAMS}
    new_query = urlencode(filtered, doseq=True)
    return urlunparse(parsed._replace(query=new_query, fragment=""))


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


def fetch_full_text(url: str) -> tuple[str, bool]:
    """Attempt to extract main article text from a URL. Returns (text, was_truncated)."""
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
        return text[:MAX_BODY_CHARS], len(text) > MAX_BODY_CHARS
    except Exception as exc:
        log.debug("full text fetch failed for %s: %s", url, exc)
        return "", False


def fetch_rss_atom(source: dict, etag_cache: dict, dry_run: bool) -> list[dict]:
    url = source["url"]

    if dry_run:
        log.info("[DRY RUN] would fetch %s", url)
        return []

    if source.get("type") == "scrape":
        # generate_scraped_feeds.py already turned this source's listing
        # page into a local RSS file, in the workflow step just before this
        # one — no HTTP fetch or conditional-GET applies here.
        scraped_path = SCRAPED_FEEDS_DIR / f"{slugify(source['name'])}.xml"
        if not scraped_path.exists():
            log.warning(
                "no scraped feed file for %s (expected %s) — did the "
                "'Generate scraped feeds' step run first?",
                source["name"], scraped_path,
            )
            return []
        raw_text = scraped_path.read_text(encoding="utf-8")
    else:
        headers: dict[str, str] = {}
        cache_key = url

        if cache_key in etag_cache:
            entry = etag_cache[cache_key]
            if entry.get("etag"):
                headers["If-None-Match"] = entry["etag"]
            if entry.get("last_modified"):
                headers["If-Modified-Since"] = entry["last_modified"]

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
        raw_text = resp.text

    feed = feedparser.parse(raw_text)
    articles = []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=26)

    # deduplicate.py drops anything already in seen_articles anyway, so an
    # entry this pipeline ingested on a prior run doesn't need — and, now that
    # TEASER_CHARS applies broadly, can't cheaply afford — a repeat live-page
    # fetch: the 26h cutoff means most entries in this feed were already
    # fetched (and possibly already full-text-fetched) on an earlier run
    # today. Checked once per feed, up front, so the loop below only pays for
    # a real page fetch on genuinely new entries. If this lookup fails, treat
    # everything as unseen rather than silently skip real candidates.
    try:
        unseen_guids = filter_unseen(
            [getattr(e, "id", "") or getattr(e, "link", "") for e in feed.entries]
        )
    except Exception as exc:
        log.debug("unseen-guid prefetch failed for %s, assuming all unseen: %s", source["name"], exc)
        unseen_guids = None

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

        guid = getattr(entry, "id", link) or link

        # Google News links are redirect stubs, not the article itself —
        # resolve them so URL-based dedup, the stored source_url, and any
        # full-text fetch below all land on the real publisher page rather
        # than a Google interstitial. (This used to be gated on a
        # per-source `resolve_redirect` flag that was never an actual column
        # on ingest_sources, so it was permanently false — every Google News
        # link went unresolved regardless of source config.)
        if "news.google.com" in link:
            link = resolve_redirect(link)

        body = ""
        body_truncated = False
        for field in ("summary", "content"):
            raw = getattr(entry, field, None)
            if not raw:
                continue
            if isinstance(raw, list):
                raw = raw[0].get("value", "") if raw else ""
            soup = BeautifulSoup(raw or "", "lxml")
            full_text = soup.get_text(separator=" ", strip=True)
            # A feed can carry both a short <description> and a fuller
            # <content:encoded>; keep whichever field actually has more text
            # instead of settling for the first one found.
            if len(full_text) > len(body):
                body = full_text[:MAX_BODY_CHARS]
                body_truncated = len(full_text) > MAX_BODY_CHARS

        is_unseen = unseen_guids is None or guid in unseen_guids
        if is_unseen and (source.get("requires_full_text_fetch") or len(body) < TEASER_CHARS):
            fetched_text, fetched_truncated = fetch_full_text(link)
            if len(fetched_text) > len(body):
                body, body_truncated = fetched_text, fetched_truncated

        title = getattr(entry, "title", "").strip()
        if _is_cyrillic_dominant(title):
            log.debug("skipping Cyrillic-dominant article: %s", title)
            continue

        articles.append({
            "guid": guid,
            "title": title,
            "url": canonical_url(link),
            "published": pub.isoformat() if pub else datetime.now(timezone.utc).isoformat(),
            "body": body,
            "source_name": source["name"],
            "source_url": source["url"],
            "category_hint": source.get("category_hint", "news"),
            "source_company": source.get("company"),
            "priority": source.get("priority", 2),
            # True when the captured text hit MAX_BODY_CHARS — i.e. we know
            # there was more source material than we kept, so the summary is
            # necessarily based on a partial article. lib/seo.ts noindexes
            # these rather than letting a summary-of-a-fragment get indexed.
            "source_truncated": body_truncated,
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
    global MAX_BODY_CHARS
    MAX_BODY_CHARS = max(2000, get_setting_int("max_source_chars", DEFAULT_MAX_BODY_CHARS))

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    sources = load_sources(active_only=True)
    log.info("loaded %d active sources from the database", len(sources))

    all_articles: list[dict] = []
    current_month = datetime.now(timezone.utc).month

    for source in sources:
        # Some research venues only publish around their conference dates.
        months = source.get("active_months") or []
        if months and current_month not in months:
            log.debug("skipping %s (inactive month %d)", source["name"], current_month)
            record_source_result(source["id"], "skipped", 0)
            continue

        # fetch_rss_atom still takes a {url: {etag, last_modified}} mapping, so
        # hand it just this source's entry and read any refresh back out.
        cache = {source["url"]: {
            "etag": source.get("etag") or "",
            "last_modified": source.get("last_modified") or "",
        }}

        try:
            if source.get("type") == "api" and "arxiv" in (source.get("url") or ""):
                articles = fetch_arxiv(source, dry_run)
            else:
                articles = fetch_rss_atom(source, cache, dry_run)
        except Exception as exc:  # one bad feed must not end the run
            log.warning("source failed: %s: %s", source["name"], exc)
            record_source_result(source["id"], "error", 0, error=str(exc))
            continue

        all_articles.extend(articles)

        entry = cache.get(source["url"], {})
        record_source_result(
            source["id"],
            "ok" if articles else "not_modified",
            len(articles),
            etag=entry.get("etag"),
            last_modified=entry.get("last_modified"),
        )

        time.sleep(1.0 if source.get("kind") == "research" else 0.5)

    log.info("total raw articles fetched: %d", len(all_articles))

    if not dry_run:
        with STAGING_FILE.open("w") as f:
            json.dump(all_articles, f, indent=2, default=str)
        log.info("wrote %d articles to %s", len(all_articles), STAGING_FILE)

    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="fetch without writing output")
    args = parser.parse_args()
    sys.exit(main(dry_run=args.dry_run))
