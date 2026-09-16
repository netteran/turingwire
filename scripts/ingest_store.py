#!/usr/bin/env python3
"""
ingest_store.py — Pipeline control plane, backed by Postgres.

Replaces the three pieces of pipeline state that used to live in the repo:

    feeds/*.yml              -> ingest_sources
    _data/etag_cache.json    -> ingest_sources.etag / last_modified
    _data/seen_articles.json -> seen_articles

which is what lets the Ingest workflow run without committing anything, and
gives the admin page something to read and edit.

Uses the service-role key, so it bypasses RLS. That key belongs only in
GitHub Actions secrets.
"""
from __future__ import annotations

import logging
import os
from datetime import datetime, timezone

import requests

from supabase_store import SupabaseError, _headers, _rest, TIMEOUT

log = logging.getLogger("ingest_store")

# Postgres rejects an `in.()` filter with an empty list, and a URL with
# thousands of ids blows past header limits, so membership checks are chunked.
CHUNK = 500


# --------------------------------------------------------------------------
# Sources
# --------------------------------------------------------------------------

def load_sources(kind: str | None = None, active_only: bool = True) -> list[dict]:
    """Feed sources, in the shape fetch_feeds.py already expects.

    Keys mirror the old YAML (name, url, type, priority, …) so the fetching
    code did not need reshaping, plus `id` and the conditional-GET cache.
    """
    params = {"select": "*", "order": "priority.asc,name.asc"}
    if kind:
        params["kind"] = f"eq.{kind}"
    if active_only:
        params["active"] = "is.true"

    resp = requests.get(_rest("ingest_sources"), headers=_headers(), params=params, timeout=TIMEOUT)
    resp.raise_for_status()
    return resp.json()


def record_source_result(
    source_id: int,
    status: str,
    item_count: int = 0,
    error: str | None = None,
    etag: str | None = None,
    last_modified: str | None = None,
) -> None:
    """Store per-source telemetry so the admin page can surface failing feeds."""
    payload = {
        "last_run_at": datetime.now(timezone.utc).isoformat(),
        "last_status": status,
        "last_item_count": item_count,
        "last_error": (error or "")[:2000] or None,
    }
    # Only overwrite the cache when the fetch actually returned validators;
    # a 304 or an error must not clear them or every run re-downloads.
    if etag is not None:
        payload["etag"] = etag
    if last_modified is not None:
        payload["last_modified"] = last_modified

    resp = requests.patch(
        _rest("ingest_sources"),
        headers=_headers("return=minimal"),
        params={"id": f"eq.{source_id}"},
        json=payload,
        timeout=TIMEOUT,
    )
    if resp.status_code >= 400:
        log.warning("could not record source telemetry (%s): %s", resp.status_code, resp.text[:200])


# --------------------------------------------------------------------------
# Dedupe
# --------------------------------------------------------------------------

def filter_unseen(guids: list[str]) -> set[str]:
    """Return the subset of `guids` not already recorded."""
    if not guids:
        return set()

    seen: set[str] = set()
    unique = list({g for g in guids if g})
    for i in range(0, len(unique), CHUNK):
        batch = unique[i : i + CHUNK]
        quoted = ",".join('"' + g.replace('"', '\\"') + '"' for g in batch)
        resp = requests.get(
            _rest("seen_articles"),
            headers=_headers(),
            params={"select": "guid", "guid": f"in.({quoted})"},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        seen.update(r["guid"] for r in resp.json())

    return {g for g in unique if g not in seen}


def mark_seen(guids: list[str]) -> int:
    """Record guids as seen. Idempotent."""
    rows = [{"guid": g} for g in {g for g in guids if g}]
    if not rows:
        return 0

    written = 0
    for i in range(0, len(rows), CHUNK):
        batch = rows[i : i + CHUNK]
        resp = requests.post(
            _rest("seen_articles") + "?on_conflict=guid",
            headers=_headers("resolution=ignore-duplicates,return=minimal"),
            json=batch,
            timeout=TIMEOUT,
        )
        if resp.status_code >= 400:
            raise SupabaseError(f"mark_seen failed ({resp.status_code}): {resp.text[:300]}")
        written += len(batch)
    return written


# --------------------------------------------------------------------------
# Run history
# --------------------------------------------------------------------------

def start_run(trigger: str = "schedule") -> int | None:
    """Open an ingest_runs row. Returns its id, or None if logging failed.

    Telemetry must never take the pipeline down, so failures here are logged
    and swallowed.
    """
    run_id = os.environ.get("GITHUB_RUN_ID")
    repo = os.environ.get("GITHUB_REPOSITORY")
    payload = {
        "trigger": trigger,
        "status": "running",
        "github_run_id": run_id,
        "github_run_url": f"https://github.com/{repo}/actions/runs/{run_id}" if run_id and repo else None,
    }
    try:
        resp = requests.post(_rest("ingest_runs"), headers=_headers(), json=payload, timeout=TIMEOUT)
        resp.raise_for_status()
        return resp.json()[0]["id"]
    except (requests.RequestException, KeyError, IndexError, ValueError) as exc:
        log.warning("could not open ingest run: %s", exc)
        return None


def finish_run(run_id: int | None, status: str, stats: dict, error: str | None = None) -> None:
    if run_id is None:
        return
    payload = {
        "finished_at": datetime.now(timezone.utc).isoformat(),
        "status": status,
        "stats": stats,
        "error": (error or "")[:4000] or None,
    }
    try:
        requests.patch(
            _rest("ingest_runs"),
            headers=_headers("return=minimal"),
            params={"id": f"eq.{run_id}"},
            json=payload,
            timeout=TIMEOUT,
        )
    except requests.RequestException as exc:
        log.warning("could not close ingest run: %s", exc)


def update_run_stats(run_id: int | None, **stats) -> None:
    """Merge counters into the run row as each stage completes."""
    if run_id is None:
        return
    try:
        current = requests.get(
            _rest("ingest_runs"),
            headers=_headers(),
            params={"select": "stats", "id": f"eq.{run_id}"},
            timeout=TIMEOUT,
        )
        current.raise_for_status()
        merged = (current.json()[0].get("stats") or {}) | stats
        requests.patch(
            _rest("ingest_runs"),
            headers=_headers("return=minimal"),
            params={"id": f"eq.{run_id}"},
            json={"stats": merged},
            timeout=TIMEOUT,
        )
    except (requests.RequestException, KeyError, IndexError, ValueError) as exc:
        log.warning("could not update run stats: %s", exc)


# --------------------------------------------------------------------------
# Settings
# --------------------------------------------------------------------------

def get_settings() -> dict[str, str]:
    try:
        resp = requests.get(
            _rest("settings"), headers=_headers(), params={"select": "key,value"}, timeout=TIMEOUT
        )
        resp.raise_for_status()
        return {r["key"]: r["value"] for r in resp.json()}
    except requests.RequestException as exc:
        log.warning("could not read settings, using defaults: %s", exc)
        return {}


def get_setting(key: str, default: str = "") -> str:
    return get_settings().get(key) or default
