"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RunIngestButton() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "busy" | "queued">("idle");
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);

  async function run() {
    setState("busy");
    setError(null);
    setDetail(null);

    try {
      const res = await fetch("/api/admin/ingest/", { method: "POST" });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? `Request failed (${res.status})`);
        // GitHub's own message says which permission is missing; dropping it
        // left "GitHub returned 403" as the only clue.
        setDetail(body.detail ?? null);
        setState("idle");
        return;
      }

      setState("queued");
      // GitHub takes a few seconds to register the run, so give it a moment
      // before refreshing the run list.
      setTimeout(() => router.refresh(), 6000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
      setState("idle");
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={run}
        disabled={state !== "idle"}
        className="tw-btn-primary font-mono text-sm px-4 py-2 disabled:opacity-50"
      >
        {state === "busy" ? "Queueing…" : state === "queued" ? "Queued ✓" : "Run ingest"}
      </button>
      {state === "queued" && (
        <p className="text-xs font-mono tw-muted">
          Started — it appears below once the runner picks it up.
        </p>
      )}
      {error && (
        <div className="max-w-md text-right">
          <p className="text-xs font-mono leading-relaxed" style={{ color: "#ef4444" }}>
            {error}
          </p>
          {detail && (
            <p className="text-xs font-mono tw-muted mt-1">GitHub said: {detail}</p>
          )}
        </div>
      )}
    </div>
  );
}
