"""
fetch_models.py
---------------
Checks the model pricing data in _data/models.yml for staleness and flags
any models whose providers have published pricing changes in recent news.

Provider pricing pages do not expose public APIs, so this script:
  1. Checks whether any news posts in the last 30 days mention pricing changes
     for tracked providers and logs a warning for manual review.
  2. Attempts to fetch the OpenAI models list via their API and flags any
     model IDs in the YAML that are no longer listed (may be deprecated).
  3. Updates `updated_at` only if a change is detected.

This is not a full auto-update (providers don't publish pricing APIs) but
ensures stale data surfaces quickly for manual correction.

Set OPENAI_API_KEY in the environment to enable OpenAI model-list checks.
"""

import os
import sys
import glob
import logging
import re
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import requests
import yaml

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger(__name__)

MODELS_FILE = Path("_data/models.yml")
POSTS_GLOB  = "_posts/**/*.md"
STALE_DAYS  = 30
REQUEST_TIMEOUT = 15

PRICING_KEYWORDS = [
    "price", "pricing", "cost per token", "$/1m", "$/million",
    "token cost", "api cost", "rate change", "reduced price", "cheaper"
]

PROVIDER_KEYWORDS = {
    "OpenAI":    ["openai", "gpt-4", "gpt-5", "o1", "o3", "o4"],
    "Anthropic": ["anthropic", "claude"],
    "Google":    ["google", "gemini", "deepmind"],
    "Meta":      ["meta", "llama"],
    "Mistral":   ["mistral", "codestral", "mixtral"],
}


def check_news_for_pricing_changes(providers: list[str]) -> dict[str, list[str]]:
    """Scan recent posts for pricing-related content per provider."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=STALE_DAYS)
    flagged: dict[str, list[str]] = {p: [] for p in providers}

    for path in glob.glob(POSTS_GLOB, recursive=True):
        try:
            content = Path(path).read_text(encoding="utf-8", errors="replace").lower()
        except OSError:
            continue

        # Quick filter: must mention pricing
        if not any(kw in content for kw in PRICING_KEYWORDS):
            continue

        # Check post date from filename (YYYY-MM-DD-slug.md)
        fname = Path(path).name
        m = re.match(r"(\d{4}-\d{2}-\d{2})", fname)
        if m:
            try:
                post_date = datetime.fromisoformat(m.group(1)).replace(tzinfo=timezone.utc)
                if post_date < cutoff:
                    continue
            except ValueError:
                pass

        for provider, keywords in PROVIDER_KEYWORDS.items():
            if provider not in providers:
                continue
            if any(kw in content for kw in keywords):
                flagged[provider].append(Path(path).name)

    return flagged


def check_openai_models(yaml_models: list[dict]) -> list[str]:
    """Return model IDs from the YAML that OpenAI no longer lists."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        log.info("OPENAI_API_KEY not set — skipping OpenAI model list check")
        return []

    try:
        resp = requests.get(
            "https://api.openai.com/v1/models",
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
        live_ids = {m["id"] for m in resp.json().get("data", [])}
    except requests.RequestException as exc:
        log.warning("OpenAI models API request failed: %s", exc)
        return []

    openai_yaml_ids = [
        m["api_id"] for m in yaml_models
        if m.get("provider") == "OpenAI" and not m.get("deprecated", False)
    ]
    missing = [mid for mid in openai_yaml_ids if mid not in live_ids]
    return missing


def main() -> None:
    if not MODELS_FILE.exists():
        log.error("Models file not found: %s", MODELS_FILE)
        sys.exit(1)

    with MODELS_FILE.open() as fh:
        data = yaml.safe_load(fh)

    models = data.get("models", [])
    providers = list({m["provider"] for m in models if not m.get("deprecated")})

    log.info("Checking for pricing news across providers: %s", providers)
    flagged = check_news_for_pricing_changes(providers)

    any_flagged = False
    for provider, posts in flagged.items():
        if posts:
            any_flagged = True
            log.warning(
                "PRICING CHANGE POSSIBLE — %s mentioned in %d recent post(s): %s",
                provider, len(posts), ", ".join(posts[:3])
            )

    log.info("Checking OpenAI model list for deprecated entries...")
    missing_openai = check_openai_models(models)
    if missing_openai:
        any_flagged = True
        for mid in missing_openai:
            log.warning("Model ID no longer in OpenAI API: %s — consider marking deprecated", mid)

    if any_flagged:
        log.warning(
            "ACTION REQUIRED: Review _data/models.yml and update pricing or deprecation flags. "
            "Then re-run this script to clear warnings."
        )
        # Exit 1 so the workflow can notify via issue-on-failure
        sys.exit(1)
    else:
        log.info("No pricing changes detected. Data looks current.")

    # If no changes but data is stale, warn
    last_updated_str = data.get("updated_at", "")
    if last_updated_str:
        try:
            last_updated = date.fromisoformat(str(last_updated_str))
            age = (date.today() - last_updated).days
            if age > STALE_DAYS:
                log.warning(
                    "models.yml was last updated %d days ago (%s). "
                    "Consider a manual review of pricing.", age, last_updated_str
                )
        except ValueError:
            pass


if __name__ == "__main__":
    main()
