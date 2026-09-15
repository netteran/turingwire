#!/usr/bin/env python3
"""
summarize_news.py — Generate news summaries using OpenAI gpt-4o-mini.

Processes articles classified as category=news from classified_articles.json.
Writes Jekyll-formatted Markdown post files to _posts/YYYY/MM/.
"""
from __future__ import annotations

import json
import logging
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from openai import OpenAI
from slugify import slugify
from tenacity import retry, stop_after_attempt, wait_exponential

from quality import clean_headline, parse_summary_output, passes_quality

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "_data"
POSTS_DIR = ROOT / "_posts"
CLASSIFIED_FILE = DATA_DIR / "classified_articles.json"
SEEN_FILE = DATA_DIR / "seen_articles.json"

# Override with SUMMARIZER_MODEL (e.g. gpt-4o) to upgrade quality; default keeps cost low.
MODEL = os.environ.get("SUMMARIZER_MODEL", "gpt-4o-mini")
TEMPERATURE = 0.3
# Length follows substance, not a target. No floor that forces padding; the ceiling
# is generous enough for a genuinely rich single-source story.
MIN_WORDS = 120
MAX_WORDS = 500

# Stage 1: extract structured facts from raw article body
EXTRACTOR_SYSTEM = (
    "You are a cold, analytical Data Extraction Engine. "
    "Your sole purpose is to ingest third-party articles and strip away all narrative flow, "
    "author bias, editorial voice, transitions, and stylistic choices. "
    "Output ONLY raw, verified facts, data points, entity definitions, and precise chronological milestones. "
    "Act as a firewall — the stylistic cadence, structure, or vocabulary of the source text must not pass through."
)

EXTRACTOR_USER = """Extract all verifiable facts from the article below. Output nothing except the structured schema.

### 1. HARD ENTITIES & ATTRIBUTES
[All specific people, companies, software tools, model names, or organizations with their exact role or context.]
- **Entity Name:** [Role / Exact Context]

### 2. DISCRETE DATAPOINTS & STATS
[Every percentage, monetary value, number, or statistical claim. Context under 15 words.]
- **[Data/Stat]:** [Exact context]

### 3. CHRONOLOGICAL MILESTONES
[All dates, historical comparisons, deadlines, or timelines.]
- **[Date/Timeframe]:** [Event or change]

### 4. DIRECT QUOTES & CLAIMS
[Verbatim quotes or specific technical claims by named individuals. Prefix unverified author opinions with [UNVERIFIED CLAIM BY SOURCE].]
- **Source Claim:** "[Quote or claim]" — Attributed to: [Name/Source]

Article title: {title}
Article body:
{body}"""

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%SZ",
)
log = logging.getLogger("summarize_news")

SYSTEM_PROMPT = (
    "You are a senior editor at an AI industry publication read by AI engineers, ML "
    "researchers, and technical product managers. You write for people who can already "
    "build with this technology and want signal, not filler. Write as someone who has read "
    "the source — never say 'the article says' or 'according to the article'. Every sentence "
    "must carry a specific fact, number, or named entity. If you have nothing specific to add, "
    "stop writing."
)

USER_PROMPT = """Write a tight, useful summary of the following AI industry news for an expert audience.

Return ONLY a single JSON object with exactly these keys:
- "title": a clear, accurate, specific headline (≤ ~80 chars) drawn only from the facts. No marketing superlatives (fastest/best/strongest/revolutionary), no clickbait, no promising content you don't deliver. Do not copy a promotional source headline verbatim.
- "meta": one sentence, 120–155 characters, describing the news for search snippets. No quotes.
- "body": the article in Markdown (see rules below).

Rules for "body":
- Open with the single most specific, concrete fact (a number, a name, a decision) — not scene-setting.
- Cover what happened, who is involved, the concrete figures, and who else is affected. Attribute claims to whom.
- If there is a genuine, specific consequence for practitioners (what this changes about what they can build, buy, or rely on), state it in one concrete sentence. If there isn't one, do not invent generic "implications".
- {context_block}
- Length follows substance: roughly {min_words}–{max_words} words, but a shorter, denser summary is better than a padded one. Never add a paragraph just to reach a length.
- Do NOT invent facts, numbers, or quotes. Use only what the source supports.
- BANNED — do not write any of these or similar filler: "the competitive landscape is heating up", "implications could be substantial", "for users, this means", "looking ahead", "it will be crucial/important to monitor", "remains to be seen", "game-changer", "in a rapidly evolving". Do not end with a vague "what to watch next" sentence — end on a concrete fact.
- You MUST reference the source publication once using a markdown hyperlink, e.g. "according to [{source_name}]({url})" or "[{source_name}]({url}) reported". No standalone source footer.

Article title: {title}
Article facts (structured):
{body}
Source publisher: {source_name}
URL: {url}"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def _call(client: OpenAI, system: str, user: str, temperature: float = TEMPERATURE, json_mode: bool = False) -> str:
    kwargs = {
        "model": MODEL,
        "temperature": temperature,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    }
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    response = client.chat.completions.create(**kwargs)
    return (response.choices[0].message.content or "").strip()


def _read_front_matter(path: Path) -> dict:
    fm: dict[str, str] = {}
    try:
        with path.open() as f:
            if f.readline().strip() != "---":
                return fm
            for line in f:
                if line.strip() == "---":
                    break
                m = re.match(r"(\w+):\s*(.*)$", line.rstrip("\n"))
                if m:
                    fm[m.group(1)] = m.group(2).strip().strip('"')
    except OSError:
        pass
    return fm


def build_post_index() -> list[dict]:
    """Lightweight index of existing posts for cross-article synthesis."""
    index = []
    for path in POSTS_DIR.rglob("*.md"):
        fm = _read_front_matter(path)
        if not fm.get("title"):
            continue
        index.append(
            {
                "title": fm.get("title", ""),
                "date": fm.get("date", "")[:10],
                "company": (fm.get("company") or "").lower(),
                "subcategory": fm.get("subcategory", ""),
            }
        )
    index.sort(key=lambda e: e["date"], reverse=True)
    log.info("indexed %d existing posts for cross-linking", len(index))
    return index


def related_context(index: list[dict], company: str | None, subcategory: str, title: str, limit: int = 5) -> str:
    """Build a prior-coverage block to inject into the prompt, or guidance if none."""
    company_l = (company or "").lower()
    same_title = title.strip().lower()
    picks: list[dict] = []
    if company_l:
        picks = [e for e in index if e["company"] == company_l and e["title"].strip().lower() != same_title]
    if len(picks) < 2 and subcategory:
        more = [e for e in index if e["subcategory"] == subcategory and e["title"].strip().lower() != same_title]
        picks = (picks + more)[:limit]
    picks = picks[:limit]
    if not picks:
        return "If this clearly continues an earlier development, note that in one clause; otherwise do not speculate about history."
    lines = "\n".join(f"  - {e['title']} ({e['date']})" for e in picks)
    return (
        "Turing Wire has covered related stories before. Where genuinely relevant, connect this "
        "to that timeline in one specific clause (e.g. 'this follows ...'). Do NOT force a "
        "connection if none is real.\nPrior coverage:\n" + lines
    )


def summarize_one(client: OpenAI, article: dict, index: list[dict] | None = None) -> tuple[str, str, str]:
    """Two-stage pipeline: extract facts → write article. Returns (title, description, summary_body)."""
    raw_body = (article.get("body") or "")[:12000]
    title = article.get("title", "")
    classification = article.get("classification", {})

    # Stage 1 — extract structured facts (temperature 0 for determinism)
    extracted = _call(
        client,
        EXTRACTOR_SYSTEM,
        EXTRACTOR_USER.format(title=title, body=raw_body),
        temperature=0,
    )
    log.debug("extracted facts (%d chars) for: %s", len(extracted), title)

    context_block = related_context(
        index or [],
        classification.get("company") or article.get("source_company"),
        classification.get("subcategory", "other"),
        title,
    )

    # Stage 2 — write article from structured facts
    prompt = USER_PROMPT.format(
        min_words=MIN_WORDS,
        max_words=MAX_WORDS,
        title=title,
        body=extracted,
        context_block=context_block,
        source_name=article.get("source_name", ""),
        url=article.get("url", ""),
    )
    raw = _call(client, SYSTEM_PROMPT, prompt, json_mode=True)
    return parse_summary_output(raw)


def word_count(text: str) -> int:
    return len(text.split())


def has_source_link(summary: str) -> bool:
    """Return True if the summary contains at least one markdown hyperlink."""
    return bool(re.search(r'\[.+?\]\(https?://', summary))


def build_front_matter(article: dict, summary: str, pub_date: datetime, description: str = "", quality: bool = False) -> str:
    classification = article.get("classification", {})
    categories = article.get("categories", ["news"])
    company = classification.get("company") or article.get("source_company")
    secondary = classification.get("secondary_companies", [])
    impact = classification.get("impact", "notable")
    subcategory = classification.get("subcategory", "other")
    confidence = float(classification.get("confidence", 0.0))
    source_name = article.get("source_name", "")
    source_url = article.get("url", "")

    slug = slugify(article.get("title", "untitled"))[:60]
    wc = word_count(summary)

    # Escape any double quotes in title
    title = article.get("title", "").replace('"', '\\"')

    category_yaml = categories[0] if len(categories) == 1 else str(categories)
    secondary_yaml = json.dumps(secondary) if secondary else "[]"

    company_line = f'company: "{company}"' if company else "company: null"

    desc_escaped = description.replace('"', '\\"') if description else ""

    lines = [
        "---",
        f'title: "{title}"',
        f'date: {pub_date.strftime("%Y-%m-%d %H:%M:%S")} +0000',
        f"category: {category_yaml}",
        f"subcategory: {subcategory}",
        company_line,
        f"secondary_companies: {secondary_yaml}",
        f"impact: {impact}",
        f'source_publisher: "{source_name}"',
        f'source_url: "{source_url}"',
        f"slug: {slug}",
        f"summary_word_count: {wc}",
        f"classification_confidence: {confidence:.2f}",
        f"source_truncated: {str(article.get('source_truncated', False)).lower()}",
        f'layout: post',
    ]
    if quality:
        lines.append("quality: high")
    if desc_escaped:
        lines.append(f'description: "{desc_escaped}"')
    lines.append("---")
    return "\n".join(lines)


def write_post(article: dict, summary: str, pub_date: datetime, description: str = "", quality: bool = False) -> Path:
    year = pub_date.strftime("%Y")
    month = pub_date.strftime("%m")
    date_prefix = pub_date.strftime("%Y-%m-%d")
    slug = slugify(article.get("title", "untitled"))[:60]
    filename = f"{date_prefix}-{slug}.md"

    post_dir = ROOT / "_posts" / year / month
    post_dir.mkdir(parents=True, exist_ok=True)

    post_path = post_dir / filename

    # Avoid overwriting if already exists (idempotency)
    if post_path.exists():
        log.debug("post already exists, skipping: %s", post_path)
        return post_path

    front_matter = build_front_matter(article, summary, pub_date, description, quality)
    content = f"{front_matter}\n\n{summary}\n"

    with post_path.open("w") as f:
        f.write(content)

    return post_path


def main() -> int:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        log.error("OPENAI_API_KEY not set")
        return 1

    if not CLASSIFIED_FILE.exists():
        log.error("classified articles file not found: %s", CLASSIFIED_FILE)
        return 1

    with CLASSIFIED_FILE.open() as f:
        articles = json.load(f)

    # Load seen cache to update after writing posts
    seen: dict[str, str] = {}
    if SEEN_FILE.exists():
        with SEEN_FILE.open() as f:
            seen = json.load(f)

    client = OpenAI(api_key=api_key)
    news_articles = [a for a in articles if "news" in a.get("categories", [])]
    log.info("summarizing %d news articles", len(news_articles))

    index = build_post_index()

    new_posts = 0
    skipped = 0
    for article in news_articles:
        title = article.get("title", "")
        try:
            gen_title, description, summary = summarize_one(client, article, index)
        except Exception as exc:
            log.warning("summarization failed for '%s': %s", title, exc)
            continue

        # Use the editorial headline if it is clean; otherwise keep the source title.
        final_title = clean_headline(gen_title) or title
        if final_title != title:
            log.info("headline rewritten: %r -> %r", title, final_title)
            article["title"] = final_title
            title = final_title

        wc = word_count(summary)
        if wc < 100:
            log.warning("summary too short (%d words), skipping: %s", wc, title)
            continue

        if not has_source_link(summary):
            log.warning("summary missing source hyperlink, skipping: %s", title)
            continue

        # Quality gate — boilerplate / deceptive headline / fabricated figures.
        ok, reason = passes_quality(summary, title, article.get("body", ""), check_numbers=True)
        if not ok:
            log.warning("quality gate failed (%s), skipping: %s", reason, title)
            skipped += 1
            continue

        pub_str = article.get("published", "")
        try:
            pub_date = datetime.fromisoformat(pub_str.replace("Z", "+00:00"))
        except Exception:
            pub_date = datetime.now(timezone.utc)

        path = write_post(article, summary, pub_date, description, quality=True)
        seen[article["guid"]] = datetime.now(timezone.utc).isoformat()

        log.info("wrote post: %s (%d words)", path.name, wc)
        new_posts += 1

        time.sleep(0.3)

    log.info("quality gate skipped %d summaries", skipped)

    # Persist seen cache
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with SEEN_FILE.open("w") as f:
        json.dump(seen, f, indent=2)

    log.info("wrote %d new news posts", new_posts)
    return 0


if __name__ == "__main__":
    sys.exit(main())
