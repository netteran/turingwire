import Link from "next/link";
import type { AiIndexHistory } from "@/lib/data";

/** TW AI Index sidebar card. The sparkline is drawn client-side by stocks.js. */
export function AiIndexCard({ history }: { history: AiIndexHistory }) {
  const latest = history.latest;

  return (
    <div className="tw-card rounded-lg border tw-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-mono uppercase tracking-widest tw-muted">
          TW AI Index
        </h2>
        <Link
          href="/aistocks/"
          className="text-xs font-mono text-cyan-600 hover:text-cyan-500 transition-colors"
        >
          Dashboard →
        </Link>
      </div>

      {latest && (
        <>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-semibold tw-heading font-mono">
              {latest.value}
            </span>
            <span
              className={`text-sm font-mono ${
                latest.change_pct >= 0 ? "tw-change-pos" : "tw-change-neg"
              }`}
            >
              {latest.change_pct >= 0 && "+"}
              {latest.change_pct}%
            </span>
          </div>
          <p className="text-xs font-mono tw-muted mb-4">
            Base 100 · {history.base_date}
          </p>
        </>
      )}

      <div id="tw-sparkline-chart" className="tw-sparkline-chart" />
    </div>
  );
}
