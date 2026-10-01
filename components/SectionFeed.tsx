"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PostCard } from "./PostCard";
import { DayLabel } from "./DayLabel";
import { groupByDay, slugify } from "@/lib/format";
import type { ArticleCard, ArticleCategory } from "@/lib/types";

/** Cards revealed per scroll step. */
const BATCH_SIZE = 30;

/**
 * Filter bar + day-grouped feed for the first page of /news/ and /research/.
 *
 * The full section loads with the page and is filtered client-side. The first
 * batch is server-rendered like any other markup, and the paginated archive
 * (/news/page/2/, …) below it keeps every article reachable by plain link.
 *
 * Filters mirror into the query string (?topic=, ?impact=, ?company=,
 * ?range=, ?q=) so a filtered view can be shared or bookmarked.
 */

type Chip = { value: string; label: string };

const IMPACT_CHIPS: Chip[] = [
  { value: "all", label: "Any impact" },
  { value: "major", label: "Major+" },
  { value: "critical", label: "Critical only" },
];

const RANGE_CHIPS: Chip[] = [
  { value: "all", label: "All time" },
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
];

const TOPIC_CHIPS: Record<ArticleCategory, Chip[]> = {
  news: [
    { value: "model_release", label: "Model releases" },
    { value: "product_launch", label: "Product launches" },
    { value: "funding_round", label: "Funding" },
    { value: "regulation_policy", label: "Policy" },
    { value: "safety_alignment", label: "Safety" },
    { value: "safety_leadership_exits", label: "Safety Exodus" },
    { value: "model_welfare_ethics", label: "Model Welfare" },
    { value: "infrastructure_compute", label: "Infrastructure" },
    { value: "power_infrastructure", label: "Power & Grid" },
    { value: "agi_timelines", label: "AGI Countdown" },
    { value: "content_ecosystem", label: "AI Slop Watch" },
    { value: "partnership", label: "Partnerships" },
  ],
  research: [
    { value: "foundation_models", label: "Foundation models" },
    { value: "reasoning", label: "Reasoning" },
    { value: "alignment_safety", label: "Alignment / Safety" },
    { value: "interpretability", label: "Interpretability" },
    { value: "agents_robotics", label: "Agents / Robotics" },
    { value: "multimodal", label: "Multimodal" },
    { value: "efficiency_inference", label: "Efficiency" },
    { value: "training_methods", label: "Training" },
  ],
};

type Filters = {
  topic: string;
  impact: string;
  company: string;
  range: string;
  q: string;
};

const DEFAULTS: Filters = { topic: "all", impact: "all", company: "all", range: "all", q: "" };

const DAY_MS = 86_400_000;

export function SectionFeed({
  category,
  posts,
  companies,
  todayUtc,
  nowMs,
}: {
  category: ArticleCategory;
  posts: ArticleCard[];
  companies: { slug: string; name: string }[];
  todayUtc: string;
  /** Render time, passed from the server so the range filter hydrates identically. */
  nowMs: number;
}) {
  const [filters, setFilters] = useState<Filters>(DEFAULTS);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  // False until the query string has been read, so the URL mirror below
  // never overwrites it with the defaults.
  const [ready, setReady] = useState(false);

  const topicChips = TOPIC_CHIPS[category];

  // Topics that actually have articles, with counts, so empty chips can be
  // dimmed rather than offering a dead end.
  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) {
      if (p.subcategory) counts.set(p.subcategory, (counts.get(p.subcategory) ?? 0) + 1);
    }
    return counts;
  }, [posts]);

  // Adopt filters from the query string once mounted.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Filters = { ...DEFAULTS };
    const topic = params.get("topic");
    if (topic && topicChips.some((c) => c.value === topic)) next.topic = topic;
    const impact = params.get("impact");
    if (impact && IMPACT_CHIPS.some((c) => c.value === impact)) next.impact = impact;
    const company = params.get("company");
    if (company && companies.some((c) => c.slug === company)) next.company = company;
    const range = params.get("range");
    if (range && RANGE_CHIPS.some((c) => c.value === range)) next.range = range;
    next.q = params.get("q") ?? "";
    setFilters(next);
    setReady(true);
  }, [topicChips, companies]);

  // Mirror filters back into the URL without adding history entries.
  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    (Object.keys(DEFAULTS) as (keyof Filters)[]).forEach((key) => {
      const value = filters[key].trim();
      if (value && value !== DEFAULTS[key]) params.set(key, value);
      else params.delete(key);
    });
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
  }, [filters, ready]);

  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  const hasActiveFilters = (Object.keys(DEFAULTS) as (keyof Filters)[]).some(
    (k) => filters[k].trim() !== DEFAULTS[k],
  );

  const visible = useMemo(() => {
    const needle = filters.q.trim().toLowerCase();
    const cutoff = filters.range === "all" ? 0 : nowMs - Number(filters.range) * DAY_MS;
    return posts.filter((p) => {
      if (filters.topic !== "all" && p.subcategory !== filters.topic) return false;
      if (filters.impact === "major" && p.impact !== "critical" && p.impact !== "major") return false;
      if (filters.impact === "critical" && p.impact !== "critical") return false;
      if (filters.company !== "all") {
        const all = [p.company, ...(p.secondary_companies ?? [])].filter(Boolean) as string[];
        if (!all.some((c) => slugify(c) === filters.company)) return false;
      }
      if (cutoff && new Date(p.published_at).getTime() < cutoff) return false;
      if (needle) {
        const haystack = `${p.title} ${p.description ?? ""} ${p.company ?? ""} ${
          p.source_publisher ?? ""
        }`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [posts, filters, nowMs]);

  // A filter change invalidates whatever was scrolled into view under the
  // old filters, so start the reveal over from the first batch.
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [filters]);

  const shown = visible.slice(0, visibleCount);
  const hasMore = visibleCount < visible.length;

  // Infinite scroll: reveal another batch of the already-fetched, already-
  // filtered list as the sentinel nears the viewport.
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((v) => v + BATCH_SIZE);
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore]);

  const groups = useMemo(() => groupByDay(shown), [shown]);

  return (
    <>
      <div className="tw-card rounded-lg border tw-border p-4 mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="relative flex-1">
            <span className="sr-only">Search {category}</span>
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
              placeholder={category === "news" ? "Filter headlines…" : "Filter papers…"}
              className="tw-input w-full font-mono text-sm"
              style={{ paddingLeft: "2.25rem" }}
            />
          </label>

          {companies.length > 0 && (
            <label className="flex items-center gap-2 text-xs font-mono tw-muted">
              <span className="sr-only sm:not-sr-only">Company</span>
              <select
                className="tw-input font-mono text-xs w-full sm:w-52"
                value={filters.company}
                onChange={(e) => set("company", e.target.value)}
              >
                <option value="all">All companies</option>
                {companies.map((co) => (
                  <option key={co.slug} value={co.slug}>
                    {co.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <FilterRow label="Topic">
          {[{ value: "all", label: "All topics" }, ...topicChips].map((chip) => {
            const count = chip.value === "all" ? posts.length : topicCounts.get(chip.value) ?? 0;
            return (
              <button
                key={chip.value}
                type="button"
                className={`tw-filter-chip gap-1.5${filters.topic === chip.value ? " active" : ""}${
                  count === 0 ? " opacity-40" : ""
                }`}
                onClick={() => set("topic", chip.value)}
                aria-pressed={filters.topic === chip.value}
              >
                {chip.label}
                <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </FilterRow>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <FilterRow label="Impact">
            {IMPACT_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`tw-filter-chip${filters.impact === chip.value ? " active" : ""}`}
                onClick={() => set("impact", chip.value)}
                aria-pressed={filters.impact === chip.value}
              >
                {chip.label}
              </button>
            ))}
          </FilterRow>

          <FilterRow label="When">
            {RANGE_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`tw-filter-chip${filters.range === chip.value ? " active" : ""}`}
                onClick={() => set("range", chip.value)}
                aria-pressed={filters.range === chip.value}
              >
                {chip.label}
              </button>
            ))}
          </FilterRow>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t tw-border">
          <p className="text-xs font-mono tw-muted" aria-live="polite">
            {visible.length.toLocaleString("en-US")} of {posts.length.toLocaleString("en-US")}{" "}
            {category === "news" ? "articles" : "papers"}
          </p>
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

      {groups.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No articles match these filters.</p>
        </div>
      ) : (
        groups.map((group) => (
          <div className="mb-8" key={group.date}>
            <h2
              className="text-xs font-mono uppercase tracking-widest tw-muted mb-3 flex items-center gap-3"
              data-day-group={group.date}
            >
              <DayLabel
                date={group.date}
                initialLabel={group.date === todayUtc ? "Today" : group.date}
              />
              <span className="flex-1 h-px tw-border" style={{ background: "var(--border)" }} />
            </h2>
            <div className="space-y-3">
              {group.items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ))
      )}

      {hasMore ? (
        <div ref={sentinelRef} className="h-1" aria-hidden="true" />
      ) : (
        visible.length > 0 && (
          <p className="text-center text-xs font-mono tw-muted py-4">
            {visible.length} {category === "news" ? "article" : "paper"}
            {visible.length !== 1 && "s"} — you&apos;ve reached the end
          </p>
        )
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
