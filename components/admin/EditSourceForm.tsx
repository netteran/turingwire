"use client";

import { useState, useTransition } from "react";
import { updateSource } from "@/app/admin/actions";
import type { IngestSource } from "@/lib/admin";

function when(iso: string | null): string {
  if (!iso) return "never";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
}

export function EditSourceForm({ source }: { source: IngestSource }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={(formData: FormData) =>
        startTransition(async () => {
          setError(null);
          setSaved(false);
          try {
            const priority = Number(formData.get("priority"));
            const activeMonths = String(formData.get("active_months") ?? "")
              .split(",")
              .map((s) => Number(s.trim()))
              .filter((n) => Number.isInteger(n) && n >= 1 && n <= 12);

            await updateSource(source.id, {
              name: String(formData.get("name") ?? "").trim(),
              url: String(formData.get("url") ?? "").trim(),
              kind: String(formData.get("kind")),
              type: String(formData.get("type")),
              priority: Number.isFinite(priority) ? Math.min(Math.max(priority, 1), 3) : source.priority,
              category_hint: String(formData.get("category_hint") ?? "").trim() || null,
              company: String(formData.get("company") ?? "").trim() || null,
              requires_full_text_fetch: formData.get("requires_full_text_fetch") === "on",
              active_months: activeMonths,
              active: formData.get("active") === "on",
            });
            setSaved(true);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Save failed");
          }
        })
      }
      className="tw-card border tw-border rounded-lg p-4 grid gap-3 max-w-2xl"
    >
      <p className="text-xs font-mono tw-muted">
        id {source.id} · last run {when(source.last_run_at)}
        {source.last_status && ` · last status ${source.last_status}`}
      </p>
      {source.last_error && (
        <p className="text-xs font-mono" style={{ color: "#ef4444" }}>
          {source.last_error}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-mono tw-muted">
          Name
          <input
            name="name"
            defaultValue={source.name}
            required
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted sm:col-span-1">
          Feed URL
          <input
            name="url"
            type="url"
            defaultValue={source.url}
            required
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted">
          Section
          <select
            name="kind"
            defaultValue={source.kind}
            className="tw-input w-full font-mono text-sm mt-1"
          >
            <option value="news">news</option>
            <option value="research">research</option>
          </select>
        </label>

        <label className="text-xs font-mono tw-muted">
          Type
          <select
            name="type"
            defaultValue={source.type}
            className="tw-input w-full font-mono text-sm mt-1"
          >
            <option value="rss">rss</option>
            <option value="atom">atom</option>
            <option value="api">api</option>
            <option value="scrape">scrape (needs a feeds/scrape_targets.yml entry)</option>
          </select>
        </label>

        <label className="text-xs font-mono tw-muted">
          Priority (1 highest)
          <input
            name="priority"
            type="number"
            min={1}
            max={3}
            defaultValue={source.priority}
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted">
          Company (optional)
          <input
            name="company"
            defaultValue={source.company ?? ""}
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted">
          Category hint (optional)
          <input
            name="category_hint"
            defaultValue={source.category_hint ?? ""}
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted">
          Active months (optional)
          <input
            name="active_months"
            defaultValue={source.active_months.join(", ")}
            placeholder="e.g. 12 — blank means always active"
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-xs font-mono tw-muted">
        <input
          name="requires_full_text_fetch"
          type="checkbox"
          defaultChecked={source.requires_full_text_fetch}
        />
        Requires full-text fetch (feed body is a teaser)
      </label>

      <label className="flex items-center gap-2 text-xs font-mono tw-muted">
        <input name="active" type="checkbox" defaultChecked={source.active} />
        Active (unchecking is the same as "deactivate" from the source list)
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="tw-btn-primary font-mono text-sm px-4 py-2 disabled:opacity-50"
        >
          {pending ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
        </button>
        {error && (
          <span className="text-xs font-mono" style={{ color: "#ef4444" }}>
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
