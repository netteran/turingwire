#!/usr/bin/env python3
"""
market_data_store.py — Sync the market-data files with Supabase.

The market-data stages (fetch_stocks, compute_ai_index, fetch_benchmarks)
read and write files under _data/. Those files used to be committed back to
main, which redeployed the site on every run. Now the durable copy lives in
the `market_data` table, and this script moves it to and from the runner:

    python scripts/market_data_store.py pull   # before the stages run
    python scripts/market_data_store.py push   # after they have run

`pull` overwrites a local file only when the table has a row for it, so the
first run after the migration starts from the copy in git.

Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see supabase_store.py).
"""
from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests
import yaml

from supabase_store import TIMEOUT, _headers, _rest

log = logging.getLogger("market_data_store")

DATA_DIR = Path(__file__).resolve().parent.parent / "_data"

# key -> file. The key is what the front end looks up (lib/data.ts).
DATASETS = {
    "stocks_snapshot": DATA_DIR / "stocks_snapshot.json",
    "ai_index_history": DATA_DIR / "ai_index_history.json",
    "benchmarks": DATA_DIR / "benchmarks.yml",
}


def _load(path: Path):
    with path.open() as fh:
        if path.suffix == ".json":
            return json.load(fh)
        return yaml.safe_load(fh)


def _dump(path: Path, data) -> None:
    with path.open("w") as fh:
        if path.suffix == ".json":
            json.dump(data, fh, indent=2)
        else:
            yaml.dump(data, fh, allow_unicode=True, default_flow_style=False, sort_keys=False)


def pull() -> None:
    resp = requests.get(
        _rest("market_data"),
        headers=_headers(),
        params={"select": "key,data"},
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    rows = {r["key"]: r["data"] for r in resp.json()}
    for key, path in DATASETS.items():
        if key in rows:
            _dump(path, rows[key])
            log.info("Pulled %s", key)
        else:
            log.info("No stored %s yet — keeping %s from the repo", key, path.name)


def push() -> None:
    now = datetime.now(timezone.utc).isoformat()
    rows = []
    for key, path in DATASETS.items():
        if not path.exists():
            log.warning("Missing %s — not pushed", path)
            continue
        rows.append({"key": key, "data": _load(path), "updated_at": now})
    if not rows:
        return
    resp = requests.post(
        _rest("market_data"),
        headers=_headers("resolution=merge-duplicates,return=minimal"),
        params={"on_conflict": "key"},
        json=rows,
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    log.info("Pushed %s", ", ".join(r["key"] for r in rows))


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    commands = {"pull": pull, "push": push}
    if len(sys.argv) != 2 or sys.argv[1] not in commands:
        sys.exit("usage: market_data_store.py pull|push")
    commands[sys.argv[1]]()
