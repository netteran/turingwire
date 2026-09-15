#!/usr/bin/env python3
"""
quality.py — shared quality gate for the summarizer pipeline.

Rejects thin/boilerplate/fabricated summaries before they are written to _posts/.
The goal is Google's test: an original, satisfying answer the reader can't easily
find elsewhere. A summary that fails the gate is not published.
"""
from __future__ import annotations

import json
import re

# Boilerplate phrases observed in the thin-content audit. These are filler that
# pads length without adding information; any match fails the gate.
BAN_PHRASES = [
    "competitive landscape is heating up",
    "heating up",
    "implications could be substantial",
    "implications are substantial",
    "could be substantial",
    "for users, this means",
    "for users, the",
    "looking ahead",
    "crucial to monitor",
    "important to monitor",
    "remains to be seen",
    "game-changer",
    "game changer",
    "in a rapidly evolving",
    "rapidly evolving",
    "only time will tell",
    "it will be crucial",
    "it will be important",
    "this could lead to a cascade",
]

# Headlines that promise instructional content the summaries never deliver.
_GUIDE_RE = re.compile(r"\b(guide|how to|how-to|tutorial|step[-\s]?by[-\s]?step|walkthrough)\b", re.I)
_STEP_RE = re.compile(r"(^\s*\d+[\.\)]\s)|(\bstep\s*\d)|(^\s*[-*]\s)", re.I | re.M)

# Numeric tokens (percentages, money, multi-digit figures) for source grounding.
_NUM_RE = re.compile(r"\d[\d,]*\.?\d*")
# arXiv IDs look like decimal numbers (e.g. 2606.25886) but are identifiers, not stats.
_ARXIV_ID_RE = re.compile(r"\b\d{4}\.\d{4,5}\b")


# Marketing superlatives / clickbait that should not appear in an editorial headline.
SUPERLATIVE_RE = re.compile(
    r"\b(fastest|largest|strongest|biggest|best|smartest|most powerful|revolutionary|"
    r"groundbreaking|game[-\s]?chang\w+|unbelievable|insane|mind[-\s]?blowing|"
    r"you won'?t believe|shocking|stunning|jaw[-\s]?dropping)\b",
    re.I,
)


def clean_headline(raw: str) -> str | None:
    """Normalize a generated headline; return None if it should be rejected
    (empty, too short/long, or marketing/clickbait) so the caller can fall back
    to the source title."""
    if not raw:
        return None
    h = raw.strip()
    if h.upper().startswith("TITLE:"):
        h = h[6:].strip()
    h = h.strip().strip('"').strip("'")
    h = re.sub(r"\s+", " ", h)
    if not (15 <= len(h) <= 110):
        return None
    if SUPERLATIVE_RE.search(h):
        return None
    return h


def parse_summary_output(raw: str) -> tuple[str, str, str]:
    """Return (title, meta, body) from a model response.

    Prefers a JSON object {title, meta, body}; falls back to the legacy
    TITLE:/META: header-line protocol so a non-JSON response can never leak a
    raw "META:" line into the published body.
    """
    raw = (raw or "").strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw).strip()

    # JSON-first
    try:
        d = json.loads(raw)
        if isinstance(d, dict):
            title = str(d.get("title", "") or "").strip()
            meta = str(d.get("meta", d.get("description", "")) or "").strip()
            body = str(d.get("body", "") or "").strip()
            if body:
                return title, meta, body
    except (ValueError, TypeError):
        pass

    # Fallback: TITLE:/META: header lines (order-independent), then body.
    lines = raw.splitlines()
    title = ""
    meta = ""
    i = 0
    while i < len(lines):
        s = lines[i].strip().lstrip("*").strip()
        if s.upper().startswith("TITLE:"):
            title = s.split(":", 1)[1].strip().strip('"').strip("'")
            i += 1
        elif s.upper().startswith("META:"):
            meta = s.split(":", 1)[1].strip().strip('"').strip("'")
            i += 1
        elif s == "" and (title or meta):
            i += 1
            break
        else:
            break
    body = "\n".join(lines[i:]).strip()
    return title, meta, body


def find_banned_phrases(text: str) -> list[str]:
    low = text.lower()
    return [p for p in BAN_PHRASES if p in low]


def is_deceptive_headline(title: str, summary: str) -> bool:
    """Title promises a guide/tutorial but the body has no enumerated steps."""
    if not _GUIDE_RE.search(title or ""):
        return False
    return not _STEP_RE.search(summary or "")


def _norm_nums(text: str) -> set[str]:
    out = set()
    for m in _NUM_RE.findall(text or ""):
        digits = m.replace(",", "").rstrip(".")
        # ignore 1–3 digit values (years, counts, list numbers) — too noisy to ground
        if len(digits.replace(".", "")) >= 4 or "%" in text:
            out.add(digits)
    return out


def ungrounded_numbers(summary: str, source_body: str) -> list[str]:
    """Return numeric tokens asserted in the summary but absent from the source.

    Used to catch fabricated statistics (e.g. invented benchmark scores). Only the
    digit string must appear somewhere in the source; this is a conservative check.
    """
    src = (source_body or "").replace(",", "")
    arxiv_ids = {m.replace(",", "") for m in _ARXIV_ID_RE.findall(summary or "")}
    bad = []
    for m in _NUM_RE.findall(summary or ""):
        digits = m.replace(",", "").rstrip(".")
        core = digits.replace(".", "")
        if len(core) < 2:
            continue  # skip single digits (list markers, trivial counts)
        if digits in arxiv_ids:
            continue  # arXiv IDs are identifiers, not grounded statistics
        if digits not in src and core not in src:
            bad.append(digits)
    return bad


def passes_quality(
    summary: str,
    title: str,
    source_body: str = "",
    *,
    check_numbers: bool = False,
) -> tuple[bool, str]:
    """Return (ok, reason). reason is empty when ok."""
    banned = find_banned_phrases(summary)
    if banned:
        return False, f"boilerplate phrase(s): {', '.join(banned[:3])}"
    if is_deceptive_headline(title, summary):
        return False, "headline promises a guide but body has no steps"
    if check_numbers and source_body:
        bad = ungrounded_numbers(summary, source_body)
        if bad:
            return False, f"ungrounded number(s) not in source: {', '.join(bad[:5])}"
    return True, ""
