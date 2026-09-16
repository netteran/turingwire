#!/usr/bin/env python3
"""
supabase_store.py — Article storage for the ingest pipeline.

Replaces the old "write a .md file into _posts/" step. Everything the pipeline
produces now lands in Postgres, which is the single source of truth for the
Next.js front end.

Writes use the service-role key and therefore bypass RLS. That key must only
ever be present in GitHub Actions secrets — never in the web app's environment.

Requires:
    SUPABASE_URL                 https://<ref>.supabase.co
    SUPABASE_SERVICE_ROLE_KEY    service-role JWT
"""
from __future__ import annotations

import logging
import os
import re
from datetime import datetime, timezone

import requests
from slugify import slugify

log = logging.getLogger("supabase_store")

SLUG_MAX = 80
VALID_SLUG = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
VALID_IMPACT = {"critical", "major", "notable", "minor"}

TIMEOUT = 30


class SupabaseError(RuntimeError):
    pass


def _config() -> tuple[str, str]:
    url = os.environ.get("SUPABASE_URL", "").rstrip("/")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not url or not key:
        raise SupabaseError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to write articles"
        )
    return url, key


def _headers(prefer: str = "return=representation") -> dict[str, str]:
    _, key = _config()
    return {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": prefer,
    }


def _rest(path: str) -> str:
    url, _ = _config()
    return f"{url}/rest/v1/{path}"


# --------------------------------------------------------------------------
# Slugs
# --------------------------------------------------------------------------

def clean_slug(title: str, fallback: str = "") -> str:
    """Word-boundary-aware slug, capped at SLUG_MAX.

    Must stay in sync with scripts/migrate_extract.py so newly ingested
    articles get the same URL shape as the backfilled ones.
    """
    s = slugify(title or "") or slugify(fallback or "") or "untitled"
    if len(s) > SLUG_MAX:
        cut = s[:SLUG_MAX]
        if "-" in cut:
            trimmed = cut.rsplit("-", 1)[0]
            if len(trimmed) >= SLUG_MAX // 2:
                cut = trimmed
        s = cut.strip("-")
    if not VALID_SLUG.match(s):
        s = re.sub(r"[^a-z0-9-]", "", s.lower()).strip("-")
        s = re.sub(r"-{2,}", "-", s) or "untitled"
    return s


def _unique_slug(category: str, base: str) -> str:
    """Append -2, -3… until (category, slug) is free."""
    candidate = base
    suffix = 1
    while True:
        resp = requests.get(
            _rest("articles"),
            headers=_headers(),
            params={
                "select": "id",
                "category": f"eq.{category}",
                "slug": f"eq.{candidate}",
                "limit": 1,
            },
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        if not resp.json():
            return candidate
        suffix += 1
        candidate = f"{base}-{suffix}"


# --------------------------------------------------------------------------
# Articles
# --------------------------------------------------------------------------

def build_row(
    article: dict,
    summary: str,
    pub_date: datetime,
    description: str = "",
    quality: bool = False,
    category: str | None = None,
) -> dict:
    """Map a pipeline article dict onto an `articles` row."""
    classification = article.get("classification", {}) or {}
    categories = article.get("categories", ["news"]) or ["news"]

    primary = category or next(
        (c for c in categories if c in ("news", "research")), "news"
    )
    tags = sorted({c for c in categories if c != primary})

    impact = str(classification.get("impact", "notable")).lower()
    if impact not in VALID_IMPACT:
        impact = "notable"

    confidence = classification.get("confidence")
    try:
        confidence = round(min(max(float(confidence), 0.0), 1.0), 2)
    except (TypeError, ValueError):
        confidence = None

    if pub_date.tzinfo is None:
        pub_date = pub_date.replace(tzinfo=timezone.utc)

    authors = article.get("authors") or []
    if isinstance(authors, str):
        authors = [authors]

    secondary = classification.get("secondary_companies") or []
    if isinstance(secondary, str):
        secondary = [secondary]

    # Collapse casing variants onto one spelling per slug before storing.
    raw_company = classification.get("company") or article.get("source_company") or None
    company = canonical_company(raw_company) if raw_company else None
    secondary_names = [canonical_company(str(c)) for c in secondary]

    return {
        "category": primary,
        "tags": tags,
        "status": "published",
        "title": article.get("title", "").strip(),
        "description": (description or "").strip() or None,
        "body": summary.strip(),
        "published_at": pub_date.astimezone(timezone.utc).isoformat(),
        "subcategory": classification.get("subcategory", "other") or "other",
        "impact": impact,
        "company": company,
        "secondary_companies": secondary_names,
        "classification_confidence": confidence,
        "source_publisher": article.get("source_name", "") or "Unknown",
        "source_url": article.get("url", "") or "",
        "source_truncated": bool(article.get("source_truncated", False)),
        "arxiv_id": article.get("arxiv_id") or None,
        "authors": [str(a) for a in authors],
        "summary_word_count": len(summary.split()),
        "quality": "high" if quality else None,
    }


def write_post(
    article: dict,
    summary: str,
    pub_date: datetime,
    description: str = "",
    quality: bool = False,
    category: str | None = None,
) -> str:
    """Insert an article, returning its canonical path.

    Drop-in replacement for the old filesystem `write_post`. `source_url`
    carries a unique index, so a re-run of the same article is a no-op rather
    than a duplicate — matching the old "skip if the file exists" behaviour.
    """
    row = build_row(article, summary, pub_date, description, quality, category)

    if not row["source_url"]:
        raise SupabaseError(f"article has no source_url: {row['title']!r}")

    existing = requests.get(
        _rest("articles"),
        headers=_headers(),
        params={
            "select": "category,slug",
            "source_url": f"eq.{row['source_url']}",
            "limit": 1,
        },
        timeout=TIMEOUT,
    )
    existing.raise_for_status()
    if existing.json():
        found = existing.json()[0]
        log.debug("article already stored, skipping: %s", row["title"])
        return f"/{found['category']}/{found['slug']}/"

    row["slug"] = _unique_slug(row["category"], clean_slug(row["title"]))

    resp = requests.post(
        _rest("articles"),
        headers=_headers(),
        json=row,
        timeout=TIMEOUT,
    )
    if resp.status_code >= 400:
        raise SupabaseError(f"insert failed ({resp.status_code}): {resp.text[:400]}")

    return f"/{row['category']}/{row['slug']}/"


def recent_articles(limit: int = 400) -> list[dict]:
    """Lightweight index of recent articles, for cross-article synthesis."""
    resp = requests.get(
        _rest("articles"),
        headers=_headers(),
        params={
            "select": "title,published_at,company,subcategory",
            "status": "eq.published",
            "order": "published_at.desc",
            "limit": limit,
        },
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return [
        {
            "title": r.get("title", ""),
            "date": (r.get("published_at") or "")[:10],
            "company": (r.get("company") or "").lower(),
            "subcategory": r.get("subcategory", ""),
        }
        for r in resp.json()
    ]


# --------------------------------------------------------------------------
# Companies / stories
# --------------------------------------------------------------------------

_canonical_cache: dict[str, str] | None = None


def canonical_company(name: str) -> str:
    """Map a company name onto the spelling already stored for its slug.

    The classifier emits whatever casing the source used, so the same company
    arrives as both "NVIDIA" and "Nvidia". Both slugify to `nvidia`, but the
    company page resolves its articles by *name* — so the minority spelling's
    coverage silently vanished from /companies/nvidia/. Collapsing on write
    keeps one spelling per slug.
    """
    global _canonical_cache
    if not name:
        return name

    if _canonical_cache is None:
        resp = requests.get(
            _rest("companies"),
            headers=_headers(),
            params={"select": "slug,name"},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        _canonical_cache = {r["slug"]: r["name"] for r in resp.json()}

    return _canonical_cache.get(slugify(name), name)


def upsert_company(name: str, description: str | None = None) -> None:
    payload = {"slug": slugify(name), "name": name}
    if description:
        payload["description"] = description

    resp = requests.post(
        _rest("companies") + "?on_conflict=name",
        headers=_headers("resolution=merge-duplicates,return=minimal"),
        json=payload,
        timeout=TIMEOUT,
    )
    if resp.status_code >= 400:
        raise SupabaseError(f"company upsert failed ({resp.status_code}): {resp.text[:400]}")


def distinct_companies() -> dict[str, int]:
    """Company -> primary article count, from the coverage view."""
    resp = requests.get(
        _rest("company_article_counts"),
        headers=_headers(),
        params={"select": "name,primary_count"},
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return {r["name"]: r.get("primary_count", 0) for r in resp.json()}


def companies_in_articles() -> set[str]:
    """Every company named across published articles, primary or secondary."""
    names: set[str] = set()
    offset = 0
    page = 1000
    while True:
        resp = requests.get(
            _rest("articles"),
            headers=_headers(),
            params={
                "select": "company,secondary_companies",
                "status": "eq.published",
                "order": "id.asc",
                "offset": offset,
                "limit": page,
            },
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        rows = resp.json()
        if not rows:
            break
        for r in rows:
            if r.get("company"):
                names.add(r["company"])
            for c in r.get("secondary_companies") or []:
                if c:
                    names.add(c)
        if len(rows) < page:
            break
        offset += page
    return names


def upsert_story(story: dict) -> None:
    resp = requests.post(
        _rest("stories") + "?on_conflict=slug",
        headers=_headers("resolution=merge-duplicates,return=minimal"),
        json=story,
        timeout=TIMEOUT,
    )
    if resp.status_code >= 400:
        raise SupabaseError(f"story upsert failed ({resp.status_code}): {resp.text[:400]}")


def recent_article_texts(days: int = 30, limit: int = 1000) -> list[dict]:
    """Title + body of articles published within the last `days`.

    Backs the pricing-change scan in fetch_models.py, which used to glob
    _posts/**/*.md before articles moved into Postgres.
    """
    from datetime import timedelta

    cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    resp = requests.get(
        _rest("articles"),
        headers=_headers(),
        params={
            "select": "title,body,slug,category,published_at",
            "status": "eq.published",
            "published_at": f"gte.{cutoff}",
            "order": "published_at.desc",
            "limit": limit,
        },
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()
