"""
fetch_benchmarks.py
-------------------
Fetches state-of-the-art results from the Papers With Code API and updates
_data/benchmarks.yml.  Runs weekly via .github/workflows/benchmarks.yml.

For each benchmark defined in the YAML, the script queries:
  GET https://paperswithcode.com/api/v1/sota/?task=<pwc_task>
and replaces the `results` list with the top-N results from the API.
If the API call fails for a benchmark, the existing seeded results are kept.
"""

import sys
import json
import time
import logging
from datetime import date, datetime, timezone
from pathlib import Path

import requests
import yaml

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger(__name__)

BENCHMARKS_FILE = Path("_data/benchmarks.yml")
API_BASE = "https://paperswithcode.com/api/v1"
TOP_N = 5
REQUEST_TIMEOUT = 20
REQUEST_DELAY = 1.5  # seconds between requests (be a polite API consumer)


def fetch_sota(task_slug: str) -> list[dict] | None:
    """Return raw SOTA rows for a PwC task slug, or None on failure."""
    url = f"{API_BASE}/sota/"
    params = {"task": task_slug, "format": "json"}
    try:
        resp = requests.get(url, params=params, timeout=REQUEST_TIMEOUT, headers={
            "User-Agent": "turingwire-benchmark-fetcher/1.0"
        })
        resp.raise_for_status()
        data = resp.json()
        # PwC API returns {"count":..., "results":[...]}
        return data.get("results", [])
    except requests.RequestException as exc:
        log.warning("PwC API request failed for task %s: %s", task_slug, exc)
        return None


def normalise_results(raw_rows: list[dict], top_n: int) -> list[dict]:
    """Convert PwC API rows to the schema used in benchmarks.yml."""
    results = []
    for row in raw_rows[:top_n]:
        # PwC row shape: {model_name, paper_title, paper_url, metrics:[{name,value},...], ...}
        model_name = row.get("model_name") or row.get("model") or "Unknown"
        paper_url = row.get("paper_url") or ""
        paper_date = row.get("paper_date") or ""
        if paper_date:
            try:
                paper_date = datetime.fromisoformat(paper_date).strftime("%Y-%m")
            except ValueError:
                paper_date = paper_date[:7]

        # Extract the primary metric value (first numeric metric listed)
        score = None
        metrics = row.get("metrics", [])
        for m in metrics:
            try:
                score = float(m.get("value", ""))
                break
            except (TypeError, ValueError):
                continue

        if score is None:
            continue

        results.append({
            "rank": len(results) + 1,
            "model": model_name,
            "provider": "",  # PwC doesn't reliably provide this; leave blank
            "score": round(score, 2),
            "date": paper_date,
            "paper_url": paper_url,
        })

    return results


def main() -> None:
    if not BENCHMARKS_FILE.exists():
        log.error("Benchmarks file not found: %s", BENCHMARKS_FILE)
        sys.exit(1)

    with BENCHMARKS_FILE.open() as fh:
        data = yaml.safe_load(fh)

    benchmarks = data.get("benchmarks", [])
    updated_count = 0

    for bench in benchmarks:
        task_slug = bench.get("pwc_task")
        if not task_slug:
            log.info("Skipping %s — no pwc_task defined", bench["id"])
            continue

        log.info("Fetching SOTA for %s (task: %s)", bench["name"], task_slug)
        raw = fetch_sota(task_slug)
        time.sleep(REQUEST_DELAY)

        if raw is None:
            log.warning("Keeping existing results for %s", bench["id"])
            continue

        if not raw:
            log.info("No results returned for %s — keeping existing", bench["id"])
            continue

        new_results = normalise_results(raw, TOP_N)
        if not new_results:
            log.info("Could not parse results for %s — keeping existing", bench["id"])
            continue

        # Preserve provider labels from existing seeded data where model names match
        existing_by_model = {
            r["model"]: r.get("provider", "")
            for r in bench.get("results", [])
        }
        for r in new_results:
            if not r["provider"] and r["model"] in existing_by_model:
                r["provider"] = existing_by_model[r["model"]]

        bench["results"] = new_results
        updated_count += 1
        log.info("Updated %s with %d results", bench["name"], len(new_results))

    data["updated_at"] = date.today().isoformat()

    with BENCHMARKS_FILE.open("w") as fh:
        yaml.dump(data, fh, allow_unicode=True, default_flow_style=False, sort_keys=False)

    log.info("Done — updated %d/%d benchmarks", updated_count, len(benchmarks))


if __name__ == "__main__":
    main()
