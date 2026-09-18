"use client";

import { useEffect, useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import { DayLabel } from "./DayLabel";
import { groupByDay, slugify } from "@/lib/format";
import type { ArticleCard } from "@/lib/types";

/**
 * Filter bar + day-grouped feed for /publications/.
 *
 * Replaces the old dedicated /news/, /research/ and /companies/ listing
 * pages: section + subcategory chips are what those news/research pages
 * used to show, and the company picker is what the companies index used to
 * offer, now as one more filter dimension instead of a separate browse page.
 */

type Chip = { value: string; label: string };
type Section = "all" | "news" | "research";

const SECTION_CHIPS: Chip[] = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "research", label: "Research" },
];

const IMPACT_CHIPS: Chip[] = [
  { value: "all", label: "All impact" },
  { value: "major+", label: "Major+" },
  { value: "critical", label: "Critical only" },
];

const NEWS_SUBCATEGORY_CHIPS: Chip[] = [
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
];

const RESEARCH_SUBCATEGORY_CHIPS: Chip[] = [
  { value: "foundation_models", label: "Foundation models" },
  { value: "reasoning", label: "Reasoning" },
  { value: "alignment_safety", label: "Alignment / Safety" },
  { value: "interpretability", label: "Interpretability" },
  { value: "agents_robotics", label: "Agents / Robotics" },
  { value: "multimodal", label: "Multimodal" },
  { value: "efficiency_inference", label: "Efficiency" },
  { value: "training_methods", label: "Training" },
];

export function PublicationsFeed({
  posts,
  companies,
  todayUtc,
}: {
  posts: ArticleCard[];
  companies: { slug: string; name: string }[];
  todayUtc: string;
}) {
  const [section, setSection] = useState<Section>("all");
  const [impact, setImpact] = useState("all");
  const [subcategory, setSubcategory] = useState("all");
  const [company, setCompany] = useState("all");

  // Old /news/ and /research/ links now 301 to /publications/?section=...,
  // so pick that up here once mounted, the same way the homepage used to.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("section");
    if (s === "news" || s === "research") setSection(s);
  }, []);

  function changeSection(next: Section) {
    setSection(next);
    setSubcategory("all");
  }

  const subcategoryChips =
    section === "news"
      ? NEWS_SUBCATEGORY_CHIPS
      : section === "research"
        ? RESEARCH_SUBCATEGORY_CHIPS
        : [];

  const visible = useMemo(
    () =>
      posts.filter((p) => {
        const sectionOk = section === "all" || p.category === section;
        const impactOk =
          impact === "all" ||
          (impact === "major+" && (p.impact === "critical" || p.impact === "major")) ||
          (impact === "critical" && p.impact === "critical");
        const subOk = subcategory === "all" || p.subcategory === subcategory;
        const companyOk = company === "all" || (!!p.company && slugify(p.company) === company);
        return sectionOk && impactOk && subOk && companyOk;
      }),
    [posts, section, impact, subcategory, company],
  );

  // Unlike the homepage's default view, this page's whole point is full
  // history — no day-cap here regardless of which filters are active.
  const groups = useMemo(() => groupByDay(visible), [visible]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        {SECTION_CHIPS.map((chip) => (
          <button
            key={chip.value}
            type="button"
            className={`tw-filter-chip${section === chip.value ? " active" : ""}`}
            onClick={() => changeSection(chip.value as Section)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {subcategoryChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {[{ value: "all", label: "All categories" }, ...subcategoryChips].map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`tw-filter-chip text-xs${subcategory === chip.value ? " active" : ""}`}
              onClick={() => setSubcategory(chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {IMPACT_CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`tw-filter-chip text-xs${impact === chip.value ? " active" : ""}`}
              onClick={() => setImpact(chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {companies.length > 0 && (
          <label className="flex items-center gap-2 text-xs font-mono tw-muted">
            Company
            <select
              className="tw-input font-mono text-xs py-1"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
              <span
                className="flex-1 h-px tw-border"
                style={{ background: "var(--border)" }}
              />
            </h2>
            <div className="space-y-3">
              {group.items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
