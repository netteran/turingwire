#!/usr/bin/env python3
"""
seed_index_history.py — Backfill TW AI Index history using yfinance.

Fetches daily closing prices for all tickers from BASE_DATE to today,
computes the equal-weighted index, and writes ai_index_history.json.
Run once manually or via the seed_index.yml workflow.

Usage:
    pip install yfinance pyyaml
    python scripts/seed_index_history.py [--base-date YYYY-MM-DD]
"""
from __future__ import annotations

import argparse
import json
import logging
import sys
from datetime import datetime, timezone
from pathlib import Path

import yaml

try:
    import yfinance as yf
except ImportError:
    print("yfinance not installed. Run: pip install yfinance", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
HISTORY_FILE = DATA_DIR / "ai_index_history.json"
TICKERS_FILE = DATA_DIR / "tickers.yml"

DEFAULT_BASE_DATE = "2025-01-02"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("seed_index")


def load_tickers() -> list[str]:
    with TICKERS_FILE.open() as f:
        data = yaml.safe_load(f)
    return [t["symbol"] for t in data.get("tickers", [])]


def fetch_prices(symbols: list[str], start: str, end: str) -> dict[str, dict[str, float]]:
    """Returns {symbol: {date_str: close_price}}"""
    log.info("downloading price history for %d tickers (%s → %s)", len(symbols), start, end)
    raw = yf.download(
        symbols,
        start=start,
        end=end,
        auto_adjust=True,
        progress=False,
        threads=True,
    )
    if raw.empty:
        log.error("yfinance returned no data")
        return {}

    close = raw["Close"] if "Close" in raw.columns else raw.xs("Close", level=0, axis=1)

    result: dict[str, dict[str, float]] = {}
    for sym in symbols:
        if sym not in close.columns:
            log.warning("no data for %s", sym)
            continue
        series = close[sym].dropna()
        result[sym] = {
            d.strftime("%Y-%m-%d"): float(p)
            for d, p in series.items()
        }
        log.info("  %s: %d trading days", sym, len(result[sym]))

    return result


def compute_index(prices_by_sym: dict[str, dict[str, float]], base_prices: dict[str, float]) -> list[dict]:
    all_dates = sorted({d for sym_prices in prices_by_sym.values() for d in sym_prices})
    series = []

    for date_str in all_dates:
        indexed = []
        for sym, base in base_prices.items():
            price = prices_by_sym.get(sym, {}).get(date_str)
            if price and base > 0:
                indexed.append(price / base * 100)
        if not indexed:
            continue

        value = round(sum(indexed) / len(indexed), 2)
        series.append({
            "timestamp": date_str + "T16:00:00+00:00",
            "date": date_str,
            "value": value,
            "n_tickers": len(indexed),
        })

    # Compute change fields
    for i, pt in enumerate(series):
        prev = series[i - 1]["value"] if i > 0 else pt["value"]
        pt["change"] = round(pt["value"] - prev, 2)
        pt["change_pct"] = round((pt["value"] - prev) / prev * 100, 2) if prev > 0 else 0.0

    return series


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-date", default=DEFAULT_BASE_DATE,
                        help="Index base date (YYYY-MM-DD). Default: %(default)s")
    args = parser.parse_args()

    base_date = args.base_date
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    symbols = load_tickers()
    log.info("tickers: %s", symbols)

    prices_by_sym = fetch_prices(symbols, start=base_date, end=today)
    if not prices_by_sym:
        log.error("no price data fetched")
        return 1

    # Base prices = closing prices on base_date (or first available day)
    base_prices: dict[str, float] = {}
    for sym, daily in prices_by_sym.items():
        if base_date in daily:
            base_prices[sym] = daily[base_date]
        else:
            first_day = sorted(daily.keys())[0]
            base_prices[sym] = daily[first_day]
            log.info("%s not available on %s, using %s as base", sym, base_date, first_day)

    log.info("base prices set for %d tickers on %s", len(base_prices), base_date)

    series = compute_index(prices_by_sym, base_prices)
    if not series:
        log.error("computed empty series")
        return 1

    latest = series[-1]
    history = {
        "name": "TW AI Index",
        "description": "Equal-weighted index of AI-related equities. Base = 100 on base_date.",
        "base_date": base_date,
        "base_prices": base_prices,
        "series": series,
        "latest": latest,
    }

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with HISTORY_FILE.open("w") as f:
        json.dump(history, f, indent=2)

    log.info(
        "wrote %d data points. Latest: %.2f (%+.2f%%) on %s",
        len(series), latest["value"], latest["change_pct"], latest["date"],
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
