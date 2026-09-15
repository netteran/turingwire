#!/usr/bin/env python3
"""
compute_ai_index.py — Calculate the TW AI Index from stock snapshot data.

Methodology (equal-weighted):
- Each ticker is indexed to its base-date close (base = 100).
- Daily index = mean of all individually-indexed ticker values.
- Requires base-date prices in ai_index_history.json.
  On first run (no base prices), base prices are set from current prices — this
  is correct only when the script first runs on the designated base date.
- Appends today's index value to history; history is committed to main.

Formula:
  indexed_i(t) = price_i(t) / price_i(base) * 100
  index(t) = mean(indexed_i(t) for all i)
"""
from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timezone
from pathlib import Path

import yaml

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
SNAPSHOT_FILE = DATA_DIR / "stocks_snapshot.json"
HISTORY_FILE = DATA_DIR / "ai_index_history.json"
TICKERS_FILE = DATA_DIR / "tickers.yml"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("compute_ai_index")


def load_tickers() -> list[str]:
    with TICKERS_FILE.open() as f:
        data = yaml.safe_load(f)
    return [t["symbol"] for t in data.get("tickers", [])]


def load_snapshot() -> dict:
    with SNAPSHOT_FILE.open() as f:
        return json.load(f)


def load_history() -> dict:
    if HISTORY_FILE.exists():
        with HISTORY_FILE.open() as f:
            return json.load(f)
    return {
        "base_prices": {},
        "base_date": "",
        "series": [],
        "name": "TW AI Index",
        "description": (
            "Equal-weighted index of AI-related equities. "
            "Base = 100 on base_date. "
            "Each ticker individually indexed to its base-date close, then averaged."
        ),
    }


def compute_index(
    prices: dict[str, float],
    base_prices: dict[str, float],
    symbols: list[str],
) -> float | None:
    indexed_values = []
    for sym in symbols:
        price = prices.get(sym)
        base = base_prices.get(sym)
        if price and base and base > 0:
            indexed_values.append(price / base * 100)

    if not indexed_values:
        return None

    return round(sum(indexed_values) / len(indexed_values), 2)


def main() -> int:
    if not SNAPSHOT_FILE.exists():
        log.error("snapshot file not found: %s", SNAPSHOT_FILE)
        return 1

    snapshot = load_snapshot()
    quotes = snapshot.get("quotes", {})
    tickers = load_tickers()
    history = load_history()

    # Extract current prices
    current_prices: dict[str, float] = {}
    for sym in tickers:
        q = quotes.get(sym, {})
        if q.get("price", 0) > 0:
            current_prices[sym] = q["price"]

    # Bootstrap base prices on first run
    if not history["base_prices"]:
        log.info("no base prices found — bootstrapping from current prices")
        history["base_prices"] = {sym: p for sym, p in current_prices.items()}
        history["base_date"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        log.info("base date set to %s with %d tickers", history["base_date"], len(history["base_prices"]))

    base_prices = history["base_prices"]

    # Add any new tickers to base prices at their current price
    for sym, price in current_prices.items():
        if sym not in base_prices:
            base_prices[sym] = price
            log.info("added new ticker %s to index at base price %.2f", sym, price)

    # Compute current index value
    index_value = compute_index(current_prices, base_prices, tickers)
    if index_value is None:
        log.error("could not compute index — no valid prices")
        return 1

    # Compute index change from last data point
    series = history.get("series", [])
    prev_value = series[-1]["value"] if series else index_value
    index_change = round(index_value - prev_value, 2)
    index_change_pct = round((index_value - prev_value) / prev_value * 100, 2) if prev_value > 0 else 0.0

    now = datetime.now(timezone.utc)
    data_point = {
        "timestamp": now.isoformat(),
        "date": now.strftime("%Y-%m-%d"),
        "value": index_value,
        "change": index_change,
        "change_pct": index_change_pct,
        "n_tickers": len([s for s in tickers if s in current_prices]),
    }

    # Append to series (deduplicate same-minute entries)
    if series and series[-1]["timestamp"][:16] == data_point["timestamp"][:16]:
        series[-1] = data_point
        log.debug("updated existing data point for %s", data_point["timestamp"][:16])
    else:
        series.append(data_point)

    # Trim to last 400 data points (~100 days at 4 updates/day)
    history["series"] = series[-400:]
    history["base_prices"] = base_prices
    history["latest"] = data_point

    log.info(
        "TW AI Index: %.2f (%+.2f, %+.2f%%)",
        index_value, index_change, index_change_pct,
    )

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with HISTORY_FILE.open("w") as f:
        json.dump(history, f, indent=2)

    log.info("history updated: %d data points. Written to %s", len(history["series"]), HISTORY_FILE)
    return 0


if __name__ == "__main__":
    sys.exit(main())
