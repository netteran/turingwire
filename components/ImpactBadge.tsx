import type { ArticleImpact } from "@/lib/types";

/** Ported from _includes/impact_badge.html. 'minor' renders no badge. */
export function ImpactBadge({ impact }: { impact: ArticleImpact }) {
  if (impact === "critical") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold bg-red-500 text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Critical
      </span>
    );
  }
  if (impact === "major") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold tw-badge-major">
        Major
      </span>
    );
  }
  if (impact === "notable") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border tw-badge-notable">
        Notable
      </span>
    );
  }
  return null;
}
