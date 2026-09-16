"use client";

import { useRef, useState, useTransition } from "react";
import { addSource } from "@/app/admin/actions";

export function AddSourceForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      ref={formRef}
      action={(fd) =>
        startTransition(async () => {
          setError(null);
          try {
            await addSource(fd);
            formRef.current?.reset();
          } catch (e) {
            setError(e instanceof Error ? e.message : "Could not add source");
          }
        })
      }
      className="tw-card border tw-border rounded-lg p-4 grid gap-3 sm:grid-cols-2 max-w-3xl"
    >
      <label className="text-xs font-mono tw-muted">
        Name
        <input name="name" required className="tw-input w-full font-mono text-sm mt-1" />
      </label>
      <label className="text-xs font-mono tw-muted">
        Feed URL
        <input name="url" type="url" required className="tw-input w-full font-mono text-sm mt-1" />
      </label>
      <label className="text-xs font-mono tw-muted">
        Section
        <select name="kind" className="tw-input w-full font-mono text-sm mt-1">
          <option value="news">news</option>
          <option value="research">research</option>
        </select>
      </label>
      <label className="text-xs font-mono tw-muted">
        Type
        <select name="type" className="tw-input w-full font-mono text-sm mt-1">
          <option value="rss">rss</option>
          <option value="atom">atom</option>
          <option value="api">api</option>
        </select>
      </label>
      <label className="text-xs font-mono tw-muted">
        Priority (1 highest)
        <input
          name="priority"
          type="number"
          min={1}
          max={3}
          defaultValue={2}
          className="tw-input w-full font-mono text-sm mt-1"
        />
      </label>
      <label className="text-xs font-mono tw-muted">
        Company (optional)
        <input name="company" className="tw-input w-full font-mono text-sm mt-1" />
      </label>

      <div className="sm:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="tw-btn-primary font-mono text-sm px-4 py-2 disabled:opacity-50"
        >
          {pending ? "Adding…" : "Add source"}
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
