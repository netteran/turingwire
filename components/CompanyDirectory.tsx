"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import type { CompanyCount } from "@/lib/queries";

/**
 * Searchable, sortable grid of every covered company, for /companies/.
 *
 * The whole list is server-rendered, so every company page has a plain link
 * from here; filtering only hides cards. Filters mirror into the query
 * string (?q=, ?sort=, ?active=, ?letter=, ?mentions=1) for sharing.
 */

type Sort = "coverage" | "recent" | "name";

const SORT_CHIPS: { value: Sort; label: string }[] = [
  { value: "coverage", label: "Most covered" },
  { value: "recent", label: "Recently active" },
  { value: "name", label: "A–Z" },
];

const ACTIVE_CHIPS = [
  { value: "all", label: "Any time" },
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
];

const LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

type Filters = {
  q: string;
  sort: Sort;
  active: string;
  letter: string;
  mentions: boolean;
};

const DEFAULTS: Filters = { q: "", sort: "coverage", active: "all", letter: "all", mentions: false };

const DAY_MS = 86_400_000;

function letterOf(name: string): string {
  const first = name.trim().charAt(0).toUpperCase();
  return first >= "A" && first <= "Z" ? first : "#";
}

/** The pipeline used to store this placeholder for every company (cleared by migration 0018). */
function profileOf(description: string | null): string | null {
  const d = description?.trim();
  return d && !d.startsWith("Turing Wire coverage of ") ? d : null;
}

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function CompanyDirectory({
  companies,
  nowMs,
}: {
  companies: CompanyCount[];
  /** Render time, passed from the server so the activity filter hydrates identically. */
  nowMs: number;
}) {
  const [filters, setFilters] = useState<Filters>(DEFAULTS);
  // False until the query string has been read, so the URL mirror below
  // never overwrites it with the defaults.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Filters = { ...DEFAULTS };
    next.q = params.get("q") ?? "";
    const sort = params.get("sort");
    if (SORT_CHIPS.some((c) => c.value === sort)) next.sort = sort as Sort;
    const active = params.get("active");
    if (active && ACTIVE_CHIPS.some((c) => c.value === active)) next.active = active;
    const letter = params.get("letter")?.toUpperCase();
    if (letter && LETTERS.includes(letter)) next.letter = letter;
    next.mentions = params.get("mentions") === "1";
    setFilters(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    const q = filters.q.trim();
    if (q) params.set("q", q);
    else params.delete("q");
    if (filters.sort !== DEFAULTS.sort) params.set("sort", filters.sort);
    else params.delete("sort");
    if (filters.active !== "all") params.set("active", filters.active);
    else params.delete("active");
    if (filters.letter !== "all") params.set("letter", filters.letter);
    else params.delete("letter");
    if (filters.mentions) params.set("mentions", "1");
    else params.delete("mentions");
    const qs = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}`,
    );
  }, [filters, ready]);

  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  const hasActiveFilters =
    filters.q.trim() !== "" ||
    filters.sort !== DEFAULTS.sort ||
    filters.active !== "all" ||
    filters.letter !== "all" ||
    filters.mentions;

  // Pool before the letter filter, so the A–Z bar can dim letters with no
  // matches under the other filters.
  const pool = useMemo(() => {
    const needle = filters.q.trim().toLowerCase();
    const cutoff = filters.active === "all" ? 0 : nowMs - Number(filters.active) * DAY_MS;
    return companies.filter((c) => {
      if (!filters.mentions && c.primary_count === 0) return false;
      if (cutoff && (!c.latest_published_at || new Date(c.latest_published_at).getTime() < cutoff))
        return false;
      if (needle) {
        const haystack = `${c.name} ${profileOf(c.description) ?? ""}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [companies, filters.q, filters.active, filters.mentions, nowMs]);

  const lettersInPool = useMemo(() => new Set(pool.map((c) => letterOf(c.name))), [pool]);

  const visible = useMemo(() => {
    const list =
      filters.letter === "all" ? [...pool] : pool.filter((c) => letterOf(c.name) === filters.letter);
    list.sort((a, b) => {
      if (filters.sort === "name") return a.name.localeCompare(b.name);
      if (filters.sort === "recent") {
        const ta = a.latest_published_at ? new Date(a.latest_published_at).getTime() : 0;
        const tb = b.latest_published_at ? new Date(b.latest_published_at).getTime() : 0;
        return tb - ta || a.name.localeCompare(b.name);
      }
      return (
        b.primary_count - a.primary_count ||
        b.article_count - a.article_count ||
        a.name.localeCompare(b.name)
      );
    });
    return list;
  }, [pool, filters.letter, filters.sort]);

  const maxCount = useMemo(
    () => Math.max(1, ...companies.map((c) => c.article_count)),
    [companies],
  );

  return (
    <>
      <div className="tw-card rounded-lg border tw-border p-4 mb-6 space-y-4">
        <label className="relative block">
          <span className="sr-only">Search companies</span>
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 tw-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={filters.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Find a company…"
            className="tw-input w-full font-mono text-sm"
              style={{ paddingLeft: "2.25rem" }}
          />
        </label>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <FilterRow label="Sort">
            {SORT_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`tw-filter-chip${filters.sort === chip.value ? " active" : ""}`}
                onClick={() => set("sort", chip.value)}
                aria-pressed={filters.sort === chip.value}
              >
                {chip.label}
              </button>
            ))}
          </FilterRow>

          <FilterRow label="Active">
            {ACTIVE_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`tw-filter-chip${filters.active === chip.value ? " active" : ""}`}
                onClick={() => set("active", chip.value)}
                aria-pressed={filters.active === chip.value}
              >
                {chip.label}
              </button>
            ))}
          </FilterRow>
        </div>

        <FilterRow label="Name">
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              className={`tw-filter-chip px-2${filters.letter === "all" ? " active" : ""}`}
              onClick={() => set("letter", "all")}
              aria-pressed={filters.letter === "all"}
            >
              All
            </button>
            {LETTERS.map((l) => {
              const has = lettersInPool.has(l);
              return (
                <button
                  key={l}
                  type="button"
                  disabled={!has && filters.letter !== l}
                  className={`tw-filter-chip w-7 justify-center px-0 disabled:opacity-30 disabled:cursor-not-allowed${
                    filters.letter === l ? " active" : ""
                  }`}
                  onClick={() => set("letter", filters.letter === l ? "all" : l)}
                  aria-pressed={filters.letter === l}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </FilterRow>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t tw-border">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs font-mono tw-muted" aria-live="polite">
              {visible.length} of {companies.length} companies
            </p>
            <label className="inline-flex items-center gap-2 text-xs font-mono tw-muted cursor-pointer">
              <input
                type="checkbox"
                checked={filters.mentions}
                onChange={(e) => set("mentions", e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Include mention-only companies
            </label>
          </div>
          <button
            type="button"
            onClick={() => setFilters(DEFAULTS)}
            disabled={!hasActiveFilters}
            className="tw-filter-chip inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset filters
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No companies match these filters.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map((c) => {
            const profile = profileOf(c.description);
            return (
              <li key={c.slug}>
                <Link
                  href={`/companies/${c.slug}/`}
                  className="tw-card group flex h-full flex-col rounded-lg border tw-border p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-semibold tw-heading group-hover:tw-accent transition-colors truncate">
                      {c.name}
                    </h2>
                    <span className="flex-shrink-0 font-mono text-xs tw-muted">
                      {c.article_count}
                    </span>
                  </div>
                  {profile && (
                    <p className="mt-1.5 text-sm tw-muted leading-snug line-clamp-2">{profile}</p>
                  )}
                  <div className="mt-auto pt-3">
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "var(--border)" }}
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(2, (c.article_count / maxCount) * 100)}%`,
                          background: "var(--accent)",
                        }}
                      />
                    </div>
                    <p className="mt-2 flex flex-wrap gap-x-3 font-mono text-[11px] tw-muted">
                      <span>{c.primary_count} featured</span>
                      {c.mention_count > 0 && <span>{c.mention_count} mentions</span>}
                      {c.latest_published_at && (
                        <span className="ml-auto">Latest {shortDate(c.latest_published_at)}</span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-mono uppercase tracking-widest tw-muted w-14 flex-shrink-0">
        {label}
      </span>
      {children}
    </div>
  );
}
