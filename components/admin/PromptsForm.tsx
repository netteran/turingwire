"use client";

import { useState, useTransition } from "react";
import { updateSetting } from "@/app/admin/actions";
import type { Setting } from "@/lib/admin";

/**
 * Every LLM prompt the ingest pipeline sends, grouped by pipeline stage.
 * Textarea-based twin of SettingsForm — prompts are paragraphs, not values.
 */

const STAGE_ORDER = [
  "classify",
  "tag_company",
  "news_extract",
  "news_write",
  "research_extract",
  "research_write",
  "research_reporting_write",
] as const;

const STAGE_LABELS: Record<string, string> = {
  classify: "Classification",
  tag_company: "Company tagging (fallback)",
  news_extract: "News — step 1: extract facts",
  news_write: "News — step 2: write article",
  research_extract: "Research — step 1: extract facts (primary papers)",
  research_write: "Research — step 2: write article (primary papers)",
  research_reporting_write: "Research — step 2: write article (secondary reporting)",
};

const ROLE_LABELS: Record<string, string> = {
  system: "System prompt",
  user: "User prompt",
};

function parseKey(key: string): { stage: string; role: string } | null {
  const m = key.match(/^prompt\.([a-z_]+)\.(system|user)$/);
  return m ? { stage: m[1], role: m[2] } : null;
}

function wordCount(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

export function PromptsForm({ prompts }: { prompts: Setting[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(prompts.map((p) => [p.key, p.value ?? ""])),
  );
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const save = (key: string) =>
    startTransition(async () => {
      setError(null);
      setSaved(null);
      try {
        await updateSetting(key, values[key] ?? "");
        setSaved(key);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });

  const byStage = new Map<string, Setting[]>();
  for (const p of prompts) {
    const stage = parseKey(p.key)?.stage ?? "other";
    if (!byStage.has(stage)) byStage.set(stage, []);
    byStage.get(stage)!.push(p);
  }
  const stages = [
    ...STAGE_ORDER.filter((s) => byStage.has(s)),
    ...[...byStage.keys()].filter((s) => !(STAGE_ORDER as readonly string[]).includes(s)),
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {error && (
        <p className="text-xs font-mono" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
      {stages.map((stage) => {
        const items = [...(byStage.get(stage) ?? [])].sort((a, b) => {
          const ra = parseKey(a.key)?.role ?? "";
          const rb = parseKey(b.key)?.role ?? "";
          if (ra === rb) return 0;
          return ra === "system" ? -1 : 1;
        });

        return (
          <section key={stage}>
            <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">
              {STAGE_LABELS[stage] ?? stage}
            </h2>
            <div className="space-y-3">
              {items.map((p) => {
                const role = parseKey(p.key)?.role ?? "";
                return (
                  <div key={p.key} className="tw-card border tw-border rounded-lg p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <label htmlFor={p.key} className="text-sm font-medium tw-heading">
                        {ROLE_LABELS[role] ?? p.key}
                      </label>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono tw-muted">
                          {wordCount(values[p.key] ?? "")} words
                        </span>
                        <button
                          onClick={() => save(p.key)}
                          disabled={pending || values[p.key] === (p.value ?? "")}
                          className="tw-filter-chip text-xs disabled:opacity-40"
                        >
                          {saved === p.key ? "Saved ✓" : "Save"}
                        </button>
                      </div>
                    </div>
                    <textarea
                      id={p.key}
                      value={values[p.key] ?? ""}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, [p.key]: e.target.value }));
                        setSaved(null);
                      }}
                      rows={role === "system" ? 5 : 16}
                      spellCheck={false}
                      className="tw-input w-full font-mono text-xs leading-relaxed resize-y"
                    />
                    {p.description && (
                      <p className="text-xs tw-muted mt-2 leading-relaxed">{p.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
