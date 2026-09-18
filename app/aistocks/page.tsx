import type { Metadata } from "next";
import Link from "next/link";

import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { StocksBootstrap } from "@/components/StocksBootstrap";
import { StocksScripts } from "@/components/StocksScripts";
import { StocksTable, type Ticker } from "@/components/StocksTable";
import { getArticlesByTag } from "@/lib/queries";
import { getAiIndexHistory, getStocksSnapshot, getTickers } from "@/lib/data";
import { absoluteUrl, site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "AI Stocks",
  description:
    "AI and semiconductor stock market dashboard — TW AI Index, heatmap, and company news.",
  alternates: { canonical: "/aistocks/" },
};

interface TickersData {
  tickers?: Ticker[];
}

const RANGES = ["1D", "1W", "1M", "3M", "YTD", "1Y", "all"];

export default async function AiStocksPage() {
  const snapshot = getStocksSnapshot();
  const indexHistory = getAiIndexHistory();
  const tickers = getTickers<TickersData>().tickers ?? [];
  const posts = await getArticlesByTag("stocks", 20);

  const latest = indexHistory.latest;
  const quotes = snapshot.quotes ?? {};

  const updatedAt = snapshot.updated_at
    ? new Date(snapshot.updated_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      })
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <StocksBootstrap snapshot={snapshot} indexHistory={indexHistory} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold tw-heading">AI Stocks</h1>
          <p className="text-sm tw-muted mt-1 font-mono">
            {updatedAt ? `Updated ${updatedAt} UTC` : "Updating…"} · refreshed every 4
            hours on weekdays
          </p>
          <div className="mt-2">
            <ShareButtons
              url={absoluteUrl("/aistocks/")}
              title="AI Stocks"
              summary="AI and semiconductor stock market dashboard — TW AI Index, heatmap, and company news."
              variant="popover"
              align="left"
            />
          </div>
        </div>

        {latest && (
          <div className="tw-card rounded-lg border tw-border px-5 py-3 text-right">
            <p className="text-xs font-mono tw-muted">TW AI Index</p>
            <p className="text-3xl font-semibold tw-heading font-mono">{latest.value}</p>
            <p
              className={`text-sm font-mono ${
                latest.change_pct >= 0 ? "tw-change-pos" : "tw-change-neg"
              }`}
            >
              {latest.change_pct >= 0 ? "▲" : "▼"} {Math.abs(latest.change_pct)}%
              {"n_tickers" in latest && (
                <>
                  &nbsp;·&nbsp; {(latest as { n_tickers?: number }).n_tickers} tickers
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="tw-card rounded-lg border tw-border p-4 mb-8">
        <p className="text-xs font-mono tw-muted leading-relaxed">
          <span className="tw-heading font-semibold">
            Reading this as a practitioner:
          </span>{" "}
          Semiconductors (NVDA, AMD, TSM) track compute availability and cost.
          Hyperscalers (MSFT, GOOGL, AMZN, META) reflect cloud AI infrastructure
          investment. Enterprise AI (PLTR, ORCL, CRM) signals deployment adoption
          pace. These are ecosystem health indicators — not trading recommendations.
          <span className="block mt-2 tw-heading font-semibold">
            Not investment advice.
          </span>
          Market data is sourced from Finnhub and may be delayed up to 15 minutes;
          verify current prices with a licensed provider before any decision.
          <Link
            href="/disclaimer/"
            className="text-cyan-600 hover:text-cyan-500 transition-colors ml-1"
          >
            Disclaimer →
          </Link>
        </p>
      </div>

      <section className="tw-card rounded-lg border tw-border p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-sm font-mono font-semibold tw-heading">TW AI Index</h2>
          <div className="flex flex-wrap items-center gap-1.5">
            {RANGES.map((r) => (
              <button
                key={r}
                className={`tw-filter-chip text-xs${r === "3M" ? " active" : ""}`}
                data-range={r}
              >
                {r}
              </button>
            ))}
            <button
              type="button"
              id="tw-refresh-btn"
              className="tw-icon-btn flex"
              aria-label="Refresh chart data"
              title="Refresh"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
          </div>
        </div>
        <div id="tw-index-chart" className="tw-index-chart" />
        <p className="text-xs font-mono tw-muted mt-2">
          Equal-weighted index of {tickers.length} AI-related equities. Base = 100 on{" "}
          {indexHistory.base_date ?? site.aiIndexBaseDate}.
        </p>
      </section>

      <section className="tw-card rounded-lg border tw-border p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono font-semibold tw-heading">Market heatmap</h2>
          <span className="text-xs font-mono tw-muted">
            Tile size by price · color by daily change
          </span>
        </div>
        <div id="tw-heatmap" className="tw-heatmap" />
      </section>

      <section className="tw-card rounded-lg border tw-border p-5 mb-6 overflow-x-auto">
        <StocksTable tickers={tickers} quotes={quotes} />
      </section>

      <section>
        <h2 className="text-sm font-mono font-semibold tw-heading mb-4">
          Market-relevant news
        </h2>
        {posts.length === 0 ? (
          <p className="tw-muted text-sm font-mono">
            No market-relevant articles indexed yet.
          </p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <div className="mt-10 tw-card rounded-lg border tw-border p-4">
        <p className="text-xs tw-muted font-mono leading-relaxed">
          <strong className="tw-heading">Not investment advice.</strong> Data may be
          delayed up to 15 minutes. Turing Wire is not a registered investment
          advisor. Verify all data with primary sources before making investment
          decisions. Stock prices sourced from Finnhub.
        </p>
      </div>

      <StocksScripts />
    </div>
  );
}
