"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { setSourceActive } from "@/app/admin/actions";
import { RunSourceButton } from "./RunSourceButton";
import type { IngestSource } from "@/lib/admin";

const STATUS_COLOR: Record<string, string> = {
  ok: "#16a34a",
  not_modified: "var(--fg-muted)",
  skipped: "var(--fg-muted)",
  error: "#ef4444",
};

function when(iso: string | null): string {
  if (!iso) return "never";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
}

export function SourceTable({ sources }: { sources: IngestSource[] }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (sources.length === 0) {
    return <p className="tw-muted text-sm font-mono mb-4">No sources.</p>;
  }

  const act = (fn: () => Promise<void>) =>
    startTransition(async () => {
      setError(null);
      try {
        await fn();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Update failed");
      }
    });

  return (
    <>
      {error && (
        <p className="text-xs font-mono mb-2" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
      <div
        className={`tw-card rounded-xl border tw-border overflow-hidden mb-2 ${
          pending ? "opacity-60" : ""
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b tw-border"
                style={{ background: "color-mix(in srgb, var(--border) 30%, transparent)" }}
              >
                {["Source", "Kind", "Pri", "Last run", "Items", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2 text-xs font-mono uppercase tracking-widest tw-muted font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} className="border-b tw-border last:border-0">
                  <td className="px-3 py-2 min-w-0">
                    <div className="font-medium text-sm tw-heading">{s.name}</div>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono tw-muted hover:tw-accent truncate block max-w-md"
                    >
                      {s.url}
                    </a>
                    {s.last_error && (
                      <div className="text-xs font-mono mt-1" style={{ color: "#ef4444" }}>
                        {s.last_error.slice(0, 160)}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs tw-muted whitespace-nowrap">
                    {s.kind}
                    {s.type !== "rss" && s.type !== "atom" && ` · ${s.type}`}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs tw-muted">{s.priority}</td>
                  <td className="px-3 py-2 font-mono text-xs tw-muted whitespace-nowrap">
                    {when(s.last_run_at)}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs tw-heading">
                    {s.last_item_count ?? "—"}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className="font-mono text-xs"
                      style={{ color: STATUS_COLOR[s.last_status ?? ""] ?? "var(--fg-muted)" }}
                    >
                      {s.last_status ?? "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/sources/${s.id}`}
                        className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
                      >
                        edit
                      </Link>
                      <span className="tw-muted">·</span>
                      <RunSourceButton id={s.id} name={s.name} />
                      <span className="tw-muted">·</span>
                      <button
                        onClick={() => act(() => setSourceActive(s.id, !s.active))}
                        disabled={pending}
                        className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
                      >
                        {s.active ? "deactivate" : "activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
