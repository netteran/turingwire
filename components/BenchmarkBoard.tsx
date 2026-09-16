"use client";

import { useState } from "react";

/** Ported from pages/benchmarks.html — tab switching is React state now. */

export interface BenchmarkResult {
  rank?: number;
  model: string;
  provider: string;
  score: number;
  date?: string;
  paper_url?: string;
}

export interface Benchmark {
  id: string;
  name: string;
  full_name: string;
  description: string;
  metric: string;
  unit: string;
  higher_is_better: boolean;
  category: string;
  pwc_url?: string;
  results?: BenchmarkResult[];
}

const providerClass = (p: string) =>
  `tw-provider-badge tw-provider-${p.toLowerCase().replace(/ /g, "-")}`;

const RANK_CLASS = ["tw-rank-gold", "tw-rank-silver", "tw-rank-bronze"];

function Rank({ index, prefix = "" }: { index: number; prefix?: string }) {
  const cls = RANK_CLASS[index];
  if (cls) {
    return (
      <span className={`${cls} font-mono font-bold text-sm`}>
        {prefix}
        {index + 1}
      </span>
    );
  }
  return (
    <span className="tw-muted font-mono text-sm">
      {prefix}
      {index + 1}
    </span>
  );
}

/** Score bars are clamped so an out-of-range value can't overflow the track. */
const barWidth = (score: number) => `${Math.max(0, Math.min(score, 100))}%`;

export function BenchmarkBoard({ benchmarks }: { benchmarks: Benchmark[] }) {
  const [active, setActive] = useState(benchmarks[0]?.id ?? "");
  const bench = benchmarks.find((b) => b.id === active) ?? benchmarks[0];
  if (!bench) return null;

  const sorted = [...(bench.results ?? [])].sort((a, b) => b.score - a.score);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {benchmarks.map((b) => (
          <button
            key={b.id}
            className={`tw-filter-chip${b.id === active ? " active" : ""}`}
            title={b.full_name}
            onClick={() => setActive(b.id)}
          >
            {b.name}
            <span className="ml-1.5 text-xs opacity-60 font-normal">{b.category}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="tw-card rounded-xl border tw-border p-5 mb-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold tw-heading font-mono">
                {bench.full_name}
              </h2>
              <p className="text-sm tw-muted mt-1 leading-relaxed">
                {bench.description}
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-1">
              <span className="tw-filter-chip" style={{ cursor: "default" }}>
                {bench.category}
              </span>
              {bench.pwc_url && (
                <a
                  href={bench.pwc_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tw-accent hover:underline font-mono"
                >
                  Full leaderboard ↗
                </a>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs">
            <div>
              <span className="tw-muted">Metric:</span>{" "}
              <span className="font-mono tw-heading font-semibold">
                {bench.metric} ({bench.unit})
              </span>
            </div>
            <div>
              <span className="tw-muted">Higher is better:</span>{" "}
              <span className="font-mono tw-heading font-semibold">
                {bench.higher_is_better ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <div className="tw-card rounded-xl border tw-border overflow-hidden hidden sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b tw-border"
                style={{ background: "color-mix(in srgb, var(--border) 30%, transparent)" }}
              >
                <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold w-12">
                  Rank
                </th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold">
                  Model
                </th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold">
                  Provider
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold"
                  style={{ minWidth: "180px" }}
                >
                  Score
                </th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold">
                  Date
                </th>
                <th className="text-center px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold">
                  Paper
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((result, index) => (
                <tr
                  key={`${result.model}-${index}`}
                  className="border-b tw-border last:border-0 hover:tw-card transition-colors"
                >
                  <td className="px-4 py-3 text-center">
                    <Rank index={index} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold tw-heading">{result.model}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={providerClass(result.provider)}>
                      {result.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 tw-score-bar-bg rounded-full h-2"
                        style={{ minWidth: "100px" }}
                      >
                        <div
                          className="tw-score-bar-fill rounded-full h-2 transition-all"
                          style={{ width: barWidth(result.score) }}
                        />
                      </div>
                      <span className="font-mono font-bold tw-heading text-sm w-14 text-right">
                        {result.score}
                        {bench.unit}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tw-muted text-xs">
                    {result.date}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {result.paper_url ? (
                      <a
                        href={result.paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-arxiv-badge"
                      >
                        paper
                      </a>
                    ) : (
                      <span className="tw-muted text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden space-y-3">
          {sorted.map((result, index) => (
            <div
              key={`${result.model}-${index}`}
              className="tw-card rounded-xl border tw-border p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Rank index={index} prefix="#" />
                    <span className="font-semibold tw-heading">{result.model}</span>
                  </div>
                  <div className="mt-1">
                    <span className={providerClass(result.provider)}>
                      {result.provider}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono font-bold tw-heading text-xl">
                    {result.score}
                    <span className="text-sm tw-muted">{bench.unit}</span>
                  </div>
                  <div className="text-xs tw-muted font-mono">{result.date}</div>
                </div>
              </div>
              <div className="tw-score-bar-bg rounded-full h-2">
                <div
                  className="tw-score-bar-fill rounded-full h-2"
                  style={{ width: barWidth(result.score) }}
                />
              </div>
              {result.paper_url && (
                <div className="mt-2">
                  <a
                    href={result.paper_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-arxiv-badge"
                  >
                    paper
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
