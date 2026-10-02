#!/usr/bin/env python3
"""
fetch_model_prices.py — Refresh tracked AI model prices.

Replaces fetch_models.py, which only warned that the hand-maintained
_data/models.yml was stale. Which models are tracked is curated in
_data/model_catalog.yml; everything else comes from LiteLLM's public model
price list (MIT licence), which records each provider's first-party API list
price:

    https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json

Each run:
  1. upserts every catalog model into `ai_models` with its current price,
     context window and capability flags;
  2. adds a `model_price_history` row (observed today) for any model whose
     input or output price differs from its latest recorded price, or that
     has no history yet.

A model missing from the price list keeps its last stored data and is
logged, so a renamed key surfaces instead of silently zeroing a price.

Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see supabase_store.py).
"""
from __future__ import annotations

import logging
import sys
from datetime import date, datetime, timezone
from pathlib import Path

import requests
import yaml

from supabase_store import SupabaseError, _headers, _rest

PRICE_LIST_URL = (
    "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json"
)
CATALOG = Path(__file__).parent.parent / "_data" / "model_catalog.yml"
TIMEOUT = 30

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("fetch_model_prices")


def per_million(entry: dict, field: str) -> float | None:
    value = entry.get(field)
    return None if value is None else round(float(value) * 1_000_000, 6)


def as_int(value) -> int | None:
    try:
        return int(value) if value else None
    except (TypeError, ValueError):
        return None


def latest_prices() -> dict[str, tuple[float | None, float | None]]:
    """Most recent (input, output) price per model slug."""
    resp = requests.get(
        _rest("model_price_history"),
        headers=_headers(),
        params={"select": "model_slug,observed_on,input_price,output_price", "order": "observed_on.asc"},
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    latest: dict[str, tuple[float | None, float | None]] = {}
    for row in resp.json():
        latest[row["model_slug"]] = (
            None if row["input_price"] is None else float(row["input_price"]),
            None if row["output_price"] is None else float(row["output_price"]),
        )
    return latest


def first_listed() -> dict[str, str | None]:
    resp = requests.get(
        _rest("ai_models"), headers=_headers(), params={"select": "slug,first_listed"}, timeout=TIMEOUT
    )
    resp.raise_for_status()
    return {r["slug"]: r["first_listed"] for r in resp.json()}


def main() -> int:
    catalog = yaml.safe_load(CATALOG.read_text())["models"]

    try:
        price_list = requests.get(PRICE_LIST_URL, timeout=TIMEOUT).json()
    except (requests.RequestException, ValueError) as exc:
        log.error("could not download the model price list: %s", exc)
        return 1

    try:
        latest = latest_prices()
        listed = first_listed()
    except (requests.RequestException, SupabaseError) as exc:
        log.error("could not read stored model prices: %s", exc)
        return 1

    today = date.today().isoformat()
    upserts: list[dict] = []
    history: list[dict] = []

    for model in catalog:
        slug = model["slug"]
        entry = price_list.get(model["key"])
        row = {
            "slug": slug,
            "name": model["name"],
            "provider": model["provider"],
            "company": model.get("company"),
            "litellm_key": model["key"],
            "retired": bool(model.get("retired", False)),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        if not isinstance(entry, dict) or entry.get("input_cost_per_token") is None:
            log.warning("%s: key %r not in the price list — keeping stored data", slug, model["key"])
            upserts.append(row)
            continue

        price = (per_million(entry, "input_cost_per_token"), per_million(entry, "output_cost_per_token"))
        row.update(
            {
                "input_price": price[0],
                "output_price": price[1],
                "cached_input_price": per_million(entry, "cache_read_input_token_cost"),
                "context_tokens": as_int(entry.get("max_input_tokens")),
                "max_output_tokens": as_int(entry.get("max_output_tokens")),
                "supports_vision": entry.get("supports_vision"),
                "supports_tools": entry.get("supports_function_calling"),
                "supports_reasoning": entry.get("supports_reasoning"),
                "first_listed": listed.get(slug) or today,
            }
        )
        upserts.append(row)

        if latest.get(slug) != price:
            if slug in latest:
                log.info("%s: price change %s -> %s", slug, latest[slug], price)
            else:
                log.info("%s: first price recorded %s", slug, price)
            history.append(
                {"model_slug": slug, "observed_on": today, "input_price": price[0], "output_price": price[1]}
            )

    resp = requests.post(
        _rest("ai_models") + "?on_conflict=slug",
        headers=_headers("resolution=merge-duplicates,return=minimal"),
        json=upserts,
        timeout=TIMEOUT,
    )
    if resp.status_code >= 400:
        log.error("ai_models upsert failed (%s): %s", resp.status_code, resp.text[:400])
        return 1

    if history:
        resp = requests.post(
            _rest("model_price_history") + "?on_conflict=model_slug,observed_on",
            headers=_headers("resolution=merge-duplicates,return=minimal"),
            json=history,
            timeout=TIMEOUT,
        )
        if resp.status_code >= 400:
            log.error("price history insert failed (%s): %s", resp.status_code, resp.text[:400])
            return 1

    log.info("models: %d synced, %d price change(s) recorded", len(upserts), len(history))
    return 0


if __name__ == "__main__":
    sys.exit(main())
