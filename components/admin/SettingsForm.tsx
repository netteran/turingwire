"use client";

import { useState, useTransition } from "react";
import { updateSetting } from "@/app/admin/actions";
import type { Setting } from "@/lib/admin";
import { ModelPicker } from "./ModelPicker";

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""])),
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

  return (
    <div className="space-y-3 max-w-3xl">
      {settings.map((s) => (
        <div key={s.key} className="tw-card border tw-border rounded-lg p-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex-1 min-w-48 text-xs font-mono tw-muted">
              {s.key}
              {s.key === "summarizer_model" ? (
                <ModelPicker
                  value={values[s.key] ?? ""}
                  onChange={(v) => setValues((vals) => ({ ...vals, [s.key]: v }))}
                />
              ) : (
                <input
                  value={values[s.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [s.key]: e.target.value }))}
                  className="tw-input w-full font-mono text-sm mt-1"
                />
              )}
            </label>
            <button
              onClick={() => save(s.key)}
              disabled={pending || values[s.key] === (s.value ?? "")}
              className="tw-filter-chip text-xs disabled:opacity-40"
            >
              {saved === s.key ? "Saved ✓" : "Save"}
            </button>
          </div>
          {s.description && (
            <p className="text-xs tw-muted mt-2 leading-relaxed">{s.description}</p>
          )}
        </div>
      ))}
      {error && (
        <p className="text-xs font-mono" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}
