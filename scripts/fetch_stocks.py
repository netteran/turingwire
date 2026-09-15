#!/usr/bin/env python3
"""
fetch_stocks.py — Fetch stock quotes from Finnhub for the AI Index ticker universe.

Rate limit: Finnhub free tier = 60 calls/min. With 28 tickers + 1 batch quote call,
well within limits. Uses exponential backoff on 429 responses.

Writes _data/stocks_snapshot.json with latest quotes + daily change.
"""
from __future__ import annotations

import json
import logging
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import finnhub
import yaml
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
TICKERS_FILE = DATA_DIR / "tickers.yml"
SNAPSHOT_FILE = DATA_DIR / "stocks_snapshot.json"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("fetch_stocks")

INTER_REQUEST_DELAY = 1.2  # seconds between calls (50/min = safe under 60/min limit)


def load_tickers() -> list[dict]:
    with TICKERS_FILE.open() as f:
        data = yaml.safe_load(f)
    return data.get("tickers", [])


def load_snapshot() -> dict:
    if SNAPSHOT_FILE.exists():
        with SNAPSHOT_FILE.open() as f:
            return json.load(f)
    return {"updated_at": "", "quotes": {}}


@retry(
    stop=stop_after_attempt(4),
    wait=wait_exponential(multiplier=2, min=2, max=16),
)
def fetch_quote(client: finnhub.Client, symbol: str) -> dict:
    return client.quote(symbol)


def main() -> int:
    api_key = os.environ.get("FINNHUB_API_KEY")
    if not api_key:
        log.error("FINNHUB_API_KEY not set")
        return 1

    tickers = load_tickers()
    if not tickers:
        log.error("no tickers found in %s", TICKERS_FILE)
        return 1

    client = finnhub.Client(api_key=api_key)
    snapshot = load_snapshot()
    quotes = snapshot.get("quotes", {})

    errors = 0
    for ticker_info in tickers:
        symbol = ticker_info["symbol"]
        try:
            quote = fetch_quote(client, symbol)
            # Finnhub quote fields: c=current, d=change, dp=pct_change, h=high, l=low, o=open, pc=prev_close
            if quote.get("c", 0) == 0:
                log.warning("empty quote for %s, skipping", symbol)
                continue

            quotes[symbol] = {
                "symbol": symbol,
                "name": ticker_info.get("name", symbol),
                "sector": ticker_info.get("sector", ""),
                "price": round(float(quote.get("c", 0)), 2),
                "change": round(float(quote.get("d", 0)), 2),
                "change_pct": round(float(quote.get("dp", 0)), 2),
                "high": round(float(quote.get("h", 0)), 2),
                "low": round(float(quote.get("l", 0)), 2),
                "open": round(float(quote.get("o", 0)), 2),
                "prev_close": round(float(quote.get("pc", 0)), 2),
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }
            log.info("%s: $%.2f (%+.2f%%)", symbol, quotes[symbol]["price"], quotes[symbol]["change_pct"])
        except Exception as exc:
            log.warning("failed to fetch %s: %s", symbol, exc)
            errors += 1

        time.sleep(INTER_REQUEST_DELAY)

    snapshot["quotes"] = quotes
    snapshot["updated_at"] = datetime.now(timezone.utc).isoformat()
    snapshot["error_count"] = errors

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with SNAPSHOT_FILE.open("w") as f:
        json.dump(snapshot, f, indent=2)

    log.info(
        "snapshot updated: %d tickers, %d errors. Written to %s",
        len(quotes), errors, SNAPSHOT_FILE,
    )
    return 0 if errors < len(tickers) else 1


if __name__ == "__main__":
    sys.exit(main())
