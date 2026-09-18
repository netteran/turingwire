"use client";

import { useEffect, useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import { DayLabel } from "./DayLabel";
import { PartnerSpotlight } from "./PartnerSpotlight";
import type { ArticleCard } from "@/lib/types";

/**
 * Homepage filter bar + day-grouped feed.
 *
 * Replaces the old dedicated /news/ and /research/ listing pages: picking a
 * section here surfaces the same subcategory chips those pages used to show.
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

/** Group articles by their UTC calendar day, preserving order. */
function groupByDay(posts: ArticleCard[]): { date: string; items: ArticleCard[] }[] {
  const groups: { date: string; items: ArticleCard[] }[] = [];
  for (const post of posts) {
    const date = post.published_at.slice(0, 10);
    const last = groups[groups.length - 1];
    if (last && last.date === date) last.items.push(post);
    else groups.push({ date, items: [post] });
  }
  return groups;
}

export function HomeFeed({
  posts,
  todayUtc,
}: {
  posts: ArticleCard[];
  todayUtc: string;
}) {
  const [section, setSection] = useState<Section>("all");
  const [impact, setImpact] = useState("all");
  const [subcategory, setSubcategory] = useState("all");

  // The old /news/ and /research/ pages now 301 to /?section=<value>. Reading
  // that here (rather than via useSearchParams, which would force this feed
  // behind a Suspense fallback during static rendering) keeps the homepage
  // statically served while still honoring the deep link once mounted.
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
        return sectionOk && impactOk && subOk;
      }),
    [posts, section, impact, subcategory],
  );

  // The default mixed view stays short, matching the old homepage. Picking a
  // specific section is a deliberate request for the depth the dedicated
  // /news/ and /research/ pages used to give, so the day-cap lifts.
  const groups = useMemo(() => {
    const byDay = groupByDay(visible);
    return section === "all" ? byDay.slice(0, 3) : byDay;
  }, [visible, section]);

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

      <div className="flex flex-wrap gap-2 mb-6">
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

      {groups.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No articles match these filters.</p>
        </div>
      ) : (
        groups.map((group, groupIndex) => (
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
              {group.items.map((post, postIndex) => (
                <div key={post.id}>
                  <PostCard post={post} />
                  {groupIndex === 0 && postIndex === 0 && (
                    <div className="block lg:hidden mt-3">
                      <PartnerSpotlight />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
