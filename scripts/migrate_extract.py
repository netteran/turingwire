#!/usr/bin/env python3
"""
migrate_extract.py — Normalise every Jekyll article into rows for Supabase.

Reads:
  _posts/**/*.md        live posts (front matter + markdown body)
  archive/YYYY.json     archived posts (front matter ONLY — bodies were deleted
                        by the old archive_posts.py, so these land as
                        status='archived' with body = null)
  _companies/*.md       company collection pages
  _stories/*.md         story collection pages

Writes a single JSON bundle to --out (default: _data/migration_bundle.json).

Slug policy
-----------
The old pipeline truncated slugs to a hard 60 characters, which cut words in
half. We regenerate from the title with a word-boundary-aware cap, keep the old
slug as `legacy_slug`, and record the old permalink as `legacy_path` so the new
site can 301 every indexed URL.

URL contract: /<category>/<slug>/  where category is news | research.
"""
from __future__ import annotations

import argparse
import json
import logging
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import yaml
from slugify import slugify

ROOT = Path(__file__).parent.parent
POSTS_DIR = ROOT / "_posts"
ARCHIVE_DIR = ROOT / "archive"
COMPANIES_DIR = ROOT / "_companies"
STORIES_DIR = ROOT / "_stories"

SLUG_MAX = 80
VALID_SLUG = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("migrate_extract")


# --------------------------------------------------------------------------
# Tolerant front-matter parsing
# --------------------------------------------------------------------------

# Escapes YAML actually allows inside a double-quoted scalar.
_YAML_OK_ESCAPE = re.compile(r'\\([0abtnvfre"/\\N_LP \t]|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})')


def _repair_backslashes(fm_text: str) -> str:
    """Double any backslash that isn't a legal YAML escape.

    Three research posts carry raw LaTeX in the title/description
    (``\\&``, ``$\\mathbb{Z}_2$``, ``$\\unicode{x2013}$``). Inside a
    double-quoted YAML scalar those read as invalid escape sequences and
    blow up safe_load, so we neutralise them rather than drop the article.
    """
    out = []
    i = 0
    while i < len(fm_text):
        ch = fm_text[i]
        if ch == "\\":
            m = _YAML_OK_ESCAPE.match(fm_text, i)
            if m:
                out.append(m.group(0))
                i = m.end()
                continue
            out.append("\\\\")
            i += 1
            continue
        out.append(ch)
        i += 1
    return "".join(out)


def split_front_matter(text: str) -> tuple[dict, str] | None:
    """Return (front_matter, body) or None when the file has no front matter."""
    if not text.startswith("---"):
        return None
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.S)
    if not m:
        return None
    raw_fm, body = m.group(1), m.group(2)

    try:
        fm = yaml.safe_load(raw_fm)
    except yaml.YAMLError:
        try:
            fm = yaml.safe_load(_repair_backslashes(raw_fm))
            log.warning("repaired malformed YAML escapes in front matter")
        except yaml.YAMLError as exc:
            log.error("unparseable front matter: %s", exc)
            return None

    if not isinstance(fm, dict):
        return None
    return fm, body.strip()


# --------------------------------------------------------------------------
# Field normalisation
# --------------------------------------------------------------------------

def parse_date(value) -> datetime | None:
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=timezone.utc)
    if not isinstance(value, str):
        return None
    raw = value.strip()
    for fmt in ("%Y-%m-%d %H:%M:%S %z", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(raw, fmt)
            return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
        except ValueError:
            continue
    try:
        dt = datetime.fromisoformat(raw.replace(" +0000", "+00:00"))
        return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except ValueError:
        return None


# --------------------------------------------------------------------------
# LaTeX / TeX artifact cleanup
#
# arXiv titles arrive with raw TeX that would otherwise render literally on the
# page ("Newton$\unicode{x2013}$Schulz", "CLOVER: ... \& Ranking"). Currency is
# NOT an artifact, so inline-math stripping only fires when the span between two
# '$' actually contains TeX markup — "$50B round at a valuation of $900B" is
# left exactly as written.
# --------------------------------------------------------------------------

_SUPERSCRIPT = str.maketrans("0123456789n+-", "⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁺⁻")
_SUBSCRIPT = str.maketrans("0123456789+-", "₀₁₂₃₄₅₆₇₈₉₊₋")

_TEX_UNICODE = re.compile(r"\$?\\unicode\{x([0-9A-Fa-f]+)\}\$?")
_TEX_SUP = re.compile(r"\$\^\{?([0-9n+-]+)\}?\$")
_TEX_SUB = re.compile(r"\$_\{?([0-9+-]+)\}?\$")
_TEX_MATH = re.compile(r"\$([^$]*[\\{}^_][^$]*)\$")
_TEX_COMMAND = re.compile(r"\\([a-zA-Z]+)")
_TEX_ESCAPED_PUNCT = re.compile(r"\\([&%#_${}])")


def _strip_math(match: re.Match) -> str:
    """Reduce an inline-math span to readable plain text."""
    inner = match.group(1)
    inner = _TEX_COMMAND.sub(r"\1 ", inner)      # \ln\ln T -> ln ln T
    inner = inner.replace("{", "").replace("}", "")
    inner = re.sub(r"\s+", " ", inner)
    return inner.strip()


def clean_text(value: str | None) -> str | None:
    """Normalise TeX artifacts in a title or description."""
    if not value:
        return value
    out = value
    out = _TEX_UNICODE.sub(lambda m: chr(int(m.group(1), 16)), out)
    out = _TEX_SUP.sub(lambda m: m.group(1).translate(_SUPERSCRIPT), out)
    out = _TEX_SUB.sub(lambda m: m.group(1).translate(_SUBSCRIPT), out)
    out = _TEX_MATH.sub(_strip_math, out)
    out = _TEX_ESCAPED_PUNCT.sub(r"\1", out)     # \& -> &
    out = re.sub(r"\s+", " ", out).strip()
    return out or None


def clean_slug(title: str, fallback: str = "") -> str:
    """Word-boundary-aware slug, capped at SLUG_MAX characters."""
    s = slugify(title or "") or slugify(fallback or "") or "untitled"
    if len(s) > SLUG_MAX:
        cut = s[:SLUG_MAX]
        if "-" in cut:
            trimmed = cut.rsplit("-", 1)[0]
            # only honour the word boundary if it leaves a usable slug
            if len(trimmed) >= SLUG_MAX // 2:
                cut = trimmed
        s = cut.strip("-")
    if not VALID_SLUG.match(s):
        s = re.sub(r"[^a-z0-9-]", "", s.lower()).strip("-")
        s = re.sub(r"-{2,}", "-", s) or "untitled"
    return s


def split_category(raw) -> tuple[str, list[str]]:
    """Map Jekyll's category field to (primary_category, tags).

    The pipeline emitted either a bare string ('news', 'research') or a
    stringified list ("['news', 'stocks']") for market coverage. Primary
    category drives the URL; everything else becomes a tag.
    """
    values: list[str] = []
    if isinstance(raw, list):
        values = [str(v).strip() for v in raw]
    elif isinstance(raw, str):
        s = raw.strip()
        if s.startswith("["):
            try:
                parsed = yaml.safe_load(s.replace("'", '"'))
                if isinstance(parsed, list):
                    values = [str(v).strip() for v in parsed]
            except yaml.YAMLError:
                values = []
        if not values:
            values = [s]

    values = [v for v in values if v]
    primary = next((v for v in values if v in ("news", "research")), "news")
    tags = sorted({v for v in values if v != primary})
    return primary, tags


def as_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return []


def clamp_confidence(value) -> float | None:
    try:
        f = float(value)
    except (TypeError, ValueError):
        return None
    return round(min(max(f, 0.0), 1.0), 2)


VALID_IMPACT = {"critical", "major", "notable", "minor"}


def build_row(fm: dict, body: str | None, origin: str) -> dict | None:
    title = clean_text((fm.get("title") or "").strip()) or ""
    published = parse_date(fm.get("date"))
    if not title or not published:
        log.warning("skipping record without title/date (%s)", origin)
        return None

    category, tags = split_category(fm.get("category"))
    legacy_slug = (fm.get("slug") or "").strip() or None

    impact = str(fm.get("impact") or "notable").strip().lower()
    if impact not in VALID_IMPACT:
        impact = "notable"

    has_body = bool(body and body.strip())

    return {
        "slug": clean_slug(title, legacy_slug or ""),
        "category": category,
        "tags": tags,
        "status": "published" if has_body else "archived",
        "title": title,
        "description": clean_text((fm.get("description") or "").strip()) or None,
        "body": body.strip() if has_body else None,
        "published_at": published.astimezone(timezone.utc).isoformat(),
        "subcategory": (fm.get("subcategory") or "other").strip() or "other",
        "impact": impact,
        "company": (fm.get("company") or None) if isinstance(fm.get("company"), str) else None,
        "secondary_companies": as_list(fm.get("secondary_companies")),
        "classification_confidence": clamp_confidence(fm.get("classification_confidence")),
        "source_publisher": (fm.get("source_publisher") or "").strip() or "Unknown",
        "source_url": (fm.get("source_url") or "").strip(),
        "source_truncated": bool(fm.get("source_truncated", False)),
        "arxiv_id": (fm.get("arxiv_id") or None) if isinstance(fm.get("arxiv_id"), str) else None,
        "authors": as_list(fm.get("authors")),
        "summary_word_count": int(fm.get("summary_word_count") or 0),
        "quality": "high" if fm.get("quality") == "high" else None,
        "legacy_slug": legacy_slug,
        "legacy_path": (
            f"/post/{published.strftime('%Y/%m/%d')}/{legacy_slug}/" if legacy_slug else None
        ),
        "archived_from": fm.get("archived_from"),
        "archived_at": fm.get("archived_at"),
        "_origin": origin,
    }


# --------------------------------------------------------------------------
# Collection readers
# --------------------------------------------------------------------------

def read_posts() -> tuple[list[dict], list[str]]:
    rows, failures = [], []
    for path in sorted(POSTS_DIR.rglob("*.md")):
        parsed = split_front_matter(path.read_text(encoding="utf-8"))
        if not parsed:
            failures.append(str(path.relative_to(ROOT)))
            continue
        fm, body = parsed
        row = build_row(fm, body, str(path.relative_to(ROOT)))
        if row:
            rows.append(row)
        else:
            failures.append(str(path.relative_to(ROOT)))
    return rows, failures


def read_archive() -> list[dict]:
    rows = []
    for path in sorted(ARCHIVE_DIR.glob("*.json")):
        for rec in json.loads(path.read_text(encoding="utf-8")):
            row = build_row(rec, None, f"{path.name}")
            if row:
                rows.append(row)
    return rows


def read_companies() -> list[dict]:
    rows = []
    for path in sorted(COMPANIES_DIR.glob("*.md")):
        parsed = split_front_matter(path.read_text(encoding="utf-8"))
        if not parsed:
            continue
        fm, _ = parsed
        name = (fm.get("title") or "").strip()
        if not name:
            continue
        rows.append({
            "slug": path.stem,
            "name": name,
            "description": (fm.get("description") or "").strip() or None,
        })
    return rows


def read_stories() -> list[dict]:
    rows = []
    for path in sorted(STORIES_DIR.glob("*.md")):
        parsed = split_front_matter(path.read_text(encoding="utf-8"))
        if not parsed:
            continue
        fm, _ = parsed
        title = (fm.get("title") or "").strip()
        if not title:
            continue
        first_seen = parse_date(fm.get("first_seen")) or parse_date(fm.get("date"))
        last_updated = parse_date(fm.get("last_updated")) or first_seen
        rows.append({
            "slug": (fm.get("slug") or path.stem).strip(),
            "title": title,
            "lead": (fm.get("lead") or "").strip() or None,
            "trust_score": clamp_confidence(fm.get("trust_score")),
            "companies": as_list(fm.get("companies")),
            "sources": fm.get("sources") or [],
            "claims": fm.get("claims") or [],
            "first_seen": first_seen.isoformat() if first_seen else None,
            "last_updated": last_updated.isoformat() if last_updated else None,
            "status": "published",
        })
    return rows


# --------------------------------------------------------------------------
# Deduplication / collision resolution
# --------------------------------------------------------------------------

def dedupe_source_urls(rows: list[dict]) -> tuple[list[dict], int]:
    """source_url is the pipeline's dedupe key and carries a unique index.

    Where the old pipeline let a duplicate through, keep the richer record:
    a published row (one that still has a body) beats a metadata-only archive
    row; ties break on the earlier publication date.
    """
    best: dict[str, dict] = {}
    dropped = 0
    for row in rows:
        url = row["source_url"]
        if not url:
            continue
        current = best.get(url)
        if current is None:
            best[url] = row
            continue
        dropped += 1
        current_rank = (current["status"] == "published", current["published_at"] < row["published_at"])
        row_rank = (row["status"] == "published", row["published_at"] < current["published_at"])
        if row_rank > current_rank:
            best[url] = row
    kept = [r for r in rows if r["source_url"] and best.get(r["source_url"]) is r]
    return kept, dropped


def resolve_slug_collisions(rows: list[dict]) -> int:
    """Enforce the (category, slug) unique index, oldest article keeps the clean slug."""
    buckets: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for row in rows:
        buckets[(row["category"], row["slug"])].append(row)

    renamed = 0
    # Reserve every base slug up front. A natural slug can already end in a
    # digit ("Qwen2.5" -> qwen2-5), so a generated "-2" suffix must be checked
    # against the whole namespace, not just the buckets processed so far.
    taken = set(buckets.keys())
    for (category, slug), group in buckets.items():
        if len(group) == 1:
            continue
        group.sort(key=lambda r: r["published_at"])
        for index, row in enumerate(group):
            if index == 0:
                continue  # oldest article keeps the clean slug
            suffix = 2
            while (category, f"{slug}-{suffix}") in taken:
                suffix += 1
            row["slug"] = f"{slug}-{suffix}"
            taken.add((category, row["slug"]))
            renamed += 1
    return renamed


def resolve_legacy_path_collisions(rows: list[dict]) -> int:
    """legacy_path carries a unique index; keep the first, blank out the rest."""
    seen: set[str] = set()
    cleared = 0
    for row in sorted(rows, key=lambda r: r["published_at"]):
        path = row.get("legacy_path")
        if not path:
            continue
        if path in seen:
            row["legacy_path"] = None
            cleared += 1
        else:
            seen.add(path)
    return cleared


# --------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "_data" / "migration_bundle.json"))
    args = ap.parse_args()

    posts, failures = read_posts()
    archived = read_archive()
    log.info("read %d live posts (%d unreadable), %d archived records", len(posts), len(failures), len(archived))
    for f in failures:
        log.error("UNREADABLE: %s", f)

    rows = posts + archived
    rows, dropped = dedupe_source_urls(rows)
    if dropped:
        log.warning("dropped %d duplicate source_url records", dropped)

    renamed = resolve_slug_collisions(rows)
    if renamed:
        log.info("suffixed %d colliding slugs", renamed)

    cleared = resolve_legacy_path_collisions(rows)
    if cleared:
        log.warning("cleared %d duplicate legacy_path values", cleared)

    rows.sort(key=lambda r: r["published_at"])

    companies = read_companies()
    stories = read_stories()

    bundle = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "articles": rows,
        "companies": companies,
        "stories": stories,
    }

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(bundle, indent=1, ensure_ascii=False, default=str), encoding="utf-8")

    published = sum(1 for r in rows if r["status"] == "published")
    log.info("---")
    log.info("articles:  %d  (%d published, %d archived/body-less)", len(rows), published, len(rows) - published)
    log.info("  news:      %d", sum(1 for r in rows if r["category"] == "news"))
    log.info("  research:  %d", sum(1 for r in rows if r["category"] == "research"))
    log.info("  tagged stocks: %d", sum(1 for r in rows if "stocks" in r["tags"]))
    log.info("companies: %d", len(companies))
    log.info("stories:   %d", len(stories))
    log.info("wrote %s", out_path.relative_to(ROOT))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
