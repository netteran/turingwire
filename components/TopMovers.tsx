import Link from "next/link";
import type { StocksSnapshot } from "@/lib/data";
import { truncateWords } from "@/lib/format";

/** Top movers sidebar card. */
export function TopMovers({ snapshot }: { snapshot: StocksSnapshot }) {
  const quotes = Object.values(snapshot.quotes ?? {}).slice(0, 6);
  if (quotes.length === 0) return null;

  return (
    <div className="tw-card rounded-lg border tw-border p-5">
      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-4">
        Top movers
      </h2>

      {quotes.map((q) => (
        <div className="tw-ticker-row" key={q.symbol}>
          <span className="font-semibold tw-heading">{q.symbol}</span>
          <span className="tw-muted text-xs truncate mx-2 flex-1">
            {truncateWords(q.name ?? "", 3, "")}
          </span>
          <span className={q.change_pct >= 0 ? "tw-change-pos" : "tw-change-neg"}>
            {q.change_pct >= 0 && "+"}
            {q.change_pct}%
          </span>
        </div>
      ))}

      <Link
        href="/aistocks/"
        className="block mt-3 text-xs font-mono text-cyan-600 hover:text-cyan-500 transition-colors"
      >
        Full dashboard →
      </Link>
    </div>
  );
}
