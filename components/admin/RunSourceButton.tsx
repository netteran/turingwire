"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Per-row counterpart to RunIngestButton: dispatches the Ingest workflow
 * restricted to this one source, via the same API route. */
export function RunSourceButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "busy" | "queued">("idle");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setState("busy");
    setError(null);

    try {
      const res = await fetch("/api/admin/ingest/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: id }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? `Request failed (${res.status})`);
        setState("idle");
        return;
      }

      setState("queued");
      setTimeout(() => router.refresh(), 6000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
      setState("idle");
    }
  }

  return (
    <span className="inline-flex flex-col items-end gap-0.5">
      <button
        type="button"
        onClick={run}
        disabled={state !== "idle"}
        title={`Run ingest for ${name} only`}
        className="text-xs font-mono tw-muted hover:text-cyan-600 transition-colors disabled:opacity-50"
      >
        {state === "busy" ? "queueing…" : state === "queued" ? "queued ✓" : "run"}
      </button>
      {error && (
        <span
          className="text-xs font-mono max-w-[16rem] text-right"
          style={{ color: "#ef4444" }}
        >
          {error}
        </span>
      )}
    </span>
  );
}
