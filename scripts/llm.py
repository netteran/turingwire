#!/usr/bin/env python3
"""
llm.py — Multi-provider wrapper the summarizers call through.

Which provider handles a request is inferred from the model id's prefix
(gemini-* -> Google Gemini, everything else -> OpenAI) so a single
`summarizer_model` Admin setting picks both the provider and the model —
there is no separate provider toggle that could drift out of sync with it.

Each provider's client is constructed lazily (only when a model for that
provider is actually requested) and cached for the life of the process, so
picking an OpenAI model never requires GEMINI_API_KEY to be set, and vice
versa.
"""
from __future__ import annotations

import os
from functools import lru_cache

from tenacity import retry, stop_after_attempt, wait_exponential


def provider_for_model(model: str) -> str:
    return "gemini" if model.startswith("gemini") else "openai"


def required_env_var(model: str) -> str:
    return "GEMINI_API_KEY" if provider_for_model(model) == "gemini" else "OPENAI_API_KEY"


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


def call_llm(model: str, system: str, user: str, *, temperature: float, json_mode: bool = False) -> str:
    """Send one system+user request to whichever provider `model` belongs to.

    Same call shape regardless of provider, so callers (the summarizers)
    never need to know which one is configured.
    """
    if provider_for_model(model) == "gemini":
        return _call_gemini(model, system, user, temperature, json_mode)
    return _call_openai(model, system, user, temperature, json_mode)
