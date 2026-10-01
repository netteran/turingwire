"use client";

import { useState, useTransition } from "react";
import { updateCompanyProfile } from "@/app/admin/actions";

export function CompanyProfileRow({
  slug,
  name,
  primaryCount,
  mentionCount,
  description,
  website,
}: {
  slug: string;
  name: string;
  primaryCount: number;
  mentionCount: number;
  description: string;
  website: string;
}) {
  const [desc, setDesc] = useState(description);
  const [site, setSite] = useState(website);
  const [saved, setSaved] = useState({ desc: description, site: website });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const dirty = desc !== saved.desc || site !== saved.site;

  const save = () =>
    startTransition(async () => {
      setError(null);
      try {
        await updateCompanyProfile(slug, { description: desc, website: site });
        setSaved({ desc, site });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });

  return (
    <div className="tw-card border tw-border rounded-lg p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <a
          href={`/companies/${slug}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="tw-heading font-semibold hover:tw-accent"
        >
          {name} ↗
        </a>
        <span className="text-xs font-mono tw-muted">
          {primaryCount} primary · {mentionCount} mentions
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-[1fr_16rem_auto] items-start">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          placeholder="One or two factual sentences: what the company does, where it is based."
          className="tw-input w-full text-sm"
        />
        <input
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="https://example.com"
          className="tw-input w-full font-mono text-sm"
        />
        <button
          type="button"
          onClick={save}
          disabled={pending || !dirty}
          className="tw-filter-chip text-xs disabled:opacity-40"
        >
          {pending ? "Saving…" : dirty ? "Save" : "Saved"}
        </button>
      </div>
      {error && (
        <p className="text-xs font-mono mt-2" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}
