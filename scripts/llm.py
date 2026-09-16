#!/usr/bin/env python3
"""
llm.py — Multi-provider wrapper the summarizers call through.

Which provider handles a request is inferred from the model id's prefix
(gemini-* -> Google Gemini, claude-* -> Anthropic, everything else ->
OpenAI) so a single `summarizer_model` Admin setting picks both the
provider and the model — there is no separate provider toggle that could
drift out of sync with it.

Each provider's client is constructed lazily (only when a model for that
provider is actually requested) and cached for the life of the process, so
picking an OpenAI model never requires GEMINI_API_KEY or ANTHROPIC_API_KEY
to be set, and so on for the other two.
"""
from __future__ import annotations

import os
from functools import lru_cache

from tenacity import retry, stop_after_attempt, wait_exponential

_REQUIRED_ENV_VAR = {
    "openai": "OPENAI_API_KEY",
    "gemini": "GEMINI_API_KEY",
    "claude": "ANTHROPIC_API_KEY",
}


def provider_for_model(model: str) -> str:
    if model.startswith("gemini"):
        return "gemini"
    if model.startswith("claude"):
        return "claude"
    return "openai"


def required_env_var(model: str) -> str:
    return _REQUIRED_ENV_VAR[provider_for_model(model)]


@lru_cache(maxsize=1)
def _openai_client():
    from openai import OpenAI

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY not set")
    return OpenAI(api_key=api_key)


@lru_cache(maxsize=1)
def _gemini_client():
    from google import genai

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set")
    return genai.Client(api_key=api_key)


@lru_cache(maxsize=1)
def _claude_client():
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY not set")
    return anthropic.Anthropic(api_key=api_key)


# Generous non-streaming ceiling (well under the ~128K point where the API
# requires streaming to avoid HTTP timeouts). Several current Claude models
# run extended thinking by default, whose tokens count against this same
# budget alongside the visible reply, so this is sized well past our actual
# target word counts (even research's 2200-word cap is ~3-4K tokens) to
# leave headroom for that.
CLAUDE_MAX_TOKENS = 16000


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def _call_openai(model: str, system: str, user: str, temperature: float, json_mode: bool) -> str:
    kwargs = {
        "model": model,
        "temperature": temperature,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    }
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    response = _openai_client().chat.completions.create(**kwargs)
    return (response.choices[0].message.content or "").strip()


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def _call_gemini(model: str, system: str, user: str, temperature: float, json_mode: bool) -> str:
    from google.genai import types

    config = types.GenerateContentConfig(
        system_instruction=system,
        temperature=temperature,
        response_mime_type="application/json" if json_mode else None,
    )
    response = _gemini_client().models.generate_content(model=model, contents=user, config=config)
    return (response.text or "").strip()


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def _call_claude(model: str, system: str, user: str, temperature: float, json_mode: bool) -> str:
    # `temperature` is intentionally not forwarded: several current Claude
    # models run extended thinking by default and reject an explicit
    # temperature/top_p/top_k while it's active (400). There's also no
    # distinct JSON-mode flag to set — the shared prompts already say
    # "return ONLY a JSON object", and quality.parse_summary_output()
    # handles the plain-text result the same way it does for the other two
    # providers, so `json_mode` doesn't need to do anything here either.
    response = _claude_client().messages.create(
        model=model,
        max_tokens=CLAUDE_MAX_TOKENS,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return "".join(block.text for block in response.content if block.type == "text").strip()


def call_llm(model: str, system: str, user: str, *, temperature: float, json_mode: bool = False) -> str:
    """Send one system+user request to whichever provider `model` belongs to.

    Same call shape regardless of provider, so callers (the summarizers)
    never need to know which one is configured.
    """
    provider = provider_for_model(model)
    if provider == "gemini":
        return _call_gemini(model, system, user, temperature, json_mode)
    if provider == "claude":
        return _call_claude(model, system, user, temperature, json_mode)
    return _call_openai(model, system, user, temperature, json_mode)
