"use client";

import { useMemo, useState } from "react";
import type { StockQuote } from "@/lib/data";

export interface Ticker {
  symbol: string;
  name: string;
  sector?: string;
}

type SortKey = "symbol" | "name" | "sector" | "price" | "change" | "change_pct" | "high" | "low";
type SortDir = "asc" | "desc";

const COLUMNS: {
  key: SortKey;
  label: string;
  align?: "right";
  hiddenOnMobile?: boolean;
}[] = [
  { key: "symbol", label: "Symbol" },
  { key: "name", label: "Name" },
  { key: "sector", label: "Sector" },
  { key: "price", label: "Price", align: "right" },
  { key: "change", label: "Change", align: "right" },
  { key: "change_pct", label: "%", align: "right" },
  { key: "high", label: "High", align: "right", hiddenOnMobile: true },
  { key: "low", label: "Low", align: "right", hiddenOnMobile: true },
];

function toNumber(v: unknown): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

// Missing values always sink to the bottom, in either sort direction —
// only the tickers that actually have a quote get reordered by it.
function compareNumeric(a: number | undefined, b: number | undefined, dir: 1 | -1) {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return (a - b) * dir;
}

function compareString(a: string, b: string, dir: 1 | -1) {
  return a.localeCompare(b) * dir;
}

export function StocksTable({
  tickers,
  quotes,
}: {
  tickers: Ticker[];
  quotes: Record<string, StockQuote>;
}) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const rows = useMemo(() => {
    const withQuotes = tickers.map((ticker) => ({ ticker, q: quotes[ticker.symbol] }));
    if (!sortKey) return withQuotes;

    const dir: 1 | -1 = sortDir === "asc" ? 1 : -1;
    return [...withQuotes].sort((a, b) => {
      switch (sortKey) {
        case "symbol":
          return compareString(a.ticker.symbol, b.ticker.symbol, dir);
        case "name":
          return compareString(a.ticker.name, b.ticker.name, dir);
        case "sector":
          return compareString(a.ticker.sector ?? "", b.ticker.sector ?? "", dir);
        case "price":
          return compareNumeric(toNumber(a.q?.price), toNumber(b.q?.price), dir);
        case "change":
          return compareNumeric(toNumber(a.q?.change), toNumber(b.q?.change), dir);
        case "change_pct":
          return compareNumeric(toNumber(a.q?.change_pct), toNumber(b.q?.change_pct), dir);
        case "high":
          return compareNumeric(toNumber(a.q?.high), toNumber(b.q?.high), dir);
        case "low":
          return compareNumeric(toNumber(a.q?.low), toNumber(b.q?.low), dir);
        default:
          return 0;
      }
    });
  }, [tickers, quotes, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
          {COLUMNS.map((col) => {
            const active = sortKey === col.key;
            return (
              <th
                key={col.key}
                className={`pb-2 font-medium ${col.align === "right" ? "text-right" : ""}${
                  col.hiddenOnMobile ? " hidden sm:table-cell" : ""
                }`}
                aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
              >
                <button
                  type="button"
                  onClick={() => toggleSort(col.key)}
                  className={`tw-sort-btn${col.align === "right" ? " tw-sort-btn-right" : ""}${
                    active ? " active" : ""
                  }`}
                >
                  {col.label}
                  <span className="tw-sort-arrow" aria-hidden="true">
                    {active ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </span>
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ ticker, q }) => (
          <tr
            key={ticker.symbol}
            className="border-b tw-border hover:bg-cyan-500/5 transition-colors"
          >
            <td className="py-2 font-semibold tw-heading">{ticker.symbol}</td>
            <td className="py-2 tw-muted text-xs truncate max-w-32">{ticker.name}</td>
            <td className="py-2 tw-muted text-xs">{ticker.sector?.replace(/_/g, " ")}</td>
            {q ? (
              <>
                <td className="py-2 text-right tw-heading">${q.price}</td>
                <td
                  className={`py-2 text-right ${
                    Number(q.change) >= 0 ? "tw-change-pos" : "tw-change-neg"
                  }`}
                >
                  {Number(q.change) >= 0 && "+"}
                  {String(q.change)}
                </td>
                <td
                  className={`py-2 text-right ${
                    q.change_pct >= 0 ? "tw-change-pos" : "tw-change-neg"
                  }`}
                >
                  {q.change_pct >= 0 && "+"}
                  {q.change_pct}%
                </td>
                <td className="py-2 text-right tw-muted hidden sm:table-cell">
                  ${String(q.high)}
                </td>
                <td className="py-2 text-right tw-muted hidden sm:table-cell">
                  ${String(q.low)}
                </td>
              </>
            ) : (
              <td className="py-2 text-right tw-muted" colSpan={5}>
                —
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
