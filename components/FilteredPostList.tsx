"use client";

import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import type { ArticleCard } from "@/lib/types";

/**
 * Impact + subcategory filtering for the section listings.
 *
 * Jekyll shipped every card and toggled `style.display` from main.js; here the
 * filtering is React state, so the DOM stays consistent with the render tree.
 */

type Chip = { value: string; label: string };

const IMPACT_CHIPS: Chip[] = [
  { value: "all", label: "All impact" },
  { value: "major+", label: "Major+" },
  { value: "critical", label: "Critical only" },
];

export function FilteredPostList({
  posts,
  subcategoryChips = [],
}: {
  posts: ArticleCard[];
  subcategoryChips?: Chip[];
}) {
  const [impact, setImpact] = useState("all");
  const [subcategory, setSubcategory] = useState("all");

  const visible = useMemo(
    () =>
      posts.filter((p) => {
        const impactOk =
          impact === "all" ||
          (impact === "major+" && (p.impact === "critical" || p.impact === "major")) ||
          (impact === "critical" && p.impact === "critical");
        const subOk = subcategory === "all" || p.subcategory === subcategory;
        return impactOk && subOk;
      }),
    [posts, impact, subcategory],
  );

  return (
    <>
      {subcategoryChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {[{ value: "all", label: "All" }, ...subcategoryChips].map((chip) => (
            <button
              key={chip.value}
              className={`tw-filter-chip${subcategory === chip.value ? " active" : ""}`}
              onClick={() => setSubcategory(chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {IMPACT_CHIPS.map((chip) => (
          <button
            key={chip.value}
            className={`tw-filter-chip text-xs${impact === chip.value ? " active" : ""}`}
            onClick={() => setImpact(chip.value)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">
            No articles match these filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3" id="post-list">
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
