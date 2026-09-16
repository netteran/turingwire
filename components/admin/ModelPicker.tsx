"use client";

import { useState } from "react";

/**
 * Curated choices for the `summarizer_model` setting, grouped by provider.
 * Both providers are selected purely by the model id's prefix
 * (scripts/llm.py: provider_for_model) — there's no separate provider field
 * that could drift out of sync with whatever is picked here.
 *
 * OpenAI and Anthropic have no genuinely free API tier — "low-cost" means
 * their cheapest per-token models, not $0. Gemini's models below do have a
 * real no-billing-required free tier via a Google AI Studio API key (rate
 * limited, not unlimited). Pricing and model lineups shift over time — if a
 * listed model ever 404s, check each provider's current pricing/model page
 * and update this list; "Custom / other…" always stays available below as
 * an escape hatch that doesn't require a code change.
 */
const MODEL_GROUPS: { label: string; options: { value: string; label: string }[] }[] = [
  {
    label: "OpenAI — low-cost",
    options: [
      { value: "gpt-4o-mini", label: "GPT-4o mini" },
      { value: "gpt-4.1-mini", label: "GPT-4.1 mini" },
      { value: "gpt-4.1-nano", label: "GPT-4.1 nano (cheapest)" },
    ],
  },
  {
    label: "Google Gemini — free tier",
    options: [
      { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
      { value: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash-Lite (cheapest/fastest)" },
      { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    ],
  },
  {
    label: "Anthropic Claude — low-cost",
    options: [
      { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (cheapest)" },
      { value: "claude-sonnet-5", label: "Claude Sonnet 5" },
    ],
  },
];

const KNOWN_VALUES = new Set(MODEL_GROUPS.flatMap((g) => g.options.map((o) => o.value)));
const CUSTOM = "__custom__";

export function ModelPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [customMode, setCustomMode] = useState(() => value !== "" && !KNOWN_VALUES.has(value));

  if (customMode) {
    return (
      <div className="flex gap-2 mt-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. gpt-4.1-mini or gemini-2.5-flash"
          className="tw-input w-full font-mono text-sm"
        />
        <button
          type="button"
          onClick={() => setCustomMode(false)}
          className="tw-filter-chip text-xs whitespace-nowrap"
        >
          Use list
        </button>
      </div>
    );
  }

  return (
    <select
      value={KNOWN_VALUES.has(value) ? value : ""}
      onChange={(e) => {
        if (e.target.value === CUSTOM) {
          setCustomMode(true);
        } else {
          onChange(e.target.value);
        }
      }}
      className="tw-input w-full font-mono text-sm mt-1"
    >
      <option value="" disabled>
        Choose a model…
      </option>
      {MODEL_GROUPS.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </optgroup>
      ))}
      <option value={CUSTOM}>Custom / other…</option>
    </select>
  );
}
