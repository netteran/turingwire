import type { Metadata } from "next";
import { BenchmarkBoard, type Benchmark } from "@/components/BenchmarkBoard";
import { ShareButtons } from "@/components/ShareButtons";
import { getBenchmarks } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Benchmark Leaderboard",
  description:
    "State-of-the-art scores across key AI benchmarks: MMLU, HumanEval, MATH, GSM8K, GPQA, and SWE-bench. Updated weekly from Papers With Code.",
  alternates: { canonical: "/benchmarks/" },
};

interface BenchmarksData {
  updated_at?: string;
  note?: string;
  benchmarks?: Benchmark[];
}

export default function BenchmarksPage() {
  const data = getBenchmarks<BenchmarksData>();
  const benchmarks = data.benchmarks ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold tw-heading font-mono">
              AI Benchmark Leaderboard
            </h1>
            <p className="tw-muted text-sm mt-1">
              State-of-the-art results across key evaluation benchmarks.
            </p>
          </div>
          <div className="flex items-start gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs tw-muted font-mono">Updated {data.updated_at}</p>
              <a
                href="https://paperswithcode.com/sota"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tw-accent hover:underline"
              >
                Full leaderboards on Papers With Code ↗
              </a>
            </div>
            <ShareButtons
              url={absoluteUrl("/benchmarks/")}
              title="AI Benchmark Leaderboard"
              summary="State-of-the-art results across key evaluation benchmarks."
              variant="popover"
              align="right"
            />
          </div>
        </div>

        <div className="tw-card rounded-lg border tw-border px-4 py-3 text-xs tw-muted leading-relaxed">
          Results reflect published evaluations and may use different prompting
          strategies or few-shot settings — direct comparison across rows should be
          made cautiously. Scores auto-update weekly via the{" "}
          <a
            href="https://paperswithcode.com/api/v1/"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-accent hover:underline"
          >
            Papers With Code API
          </a>
          .
        </div>
      </div>

      {benchmarks.length === 0 ? (
        <p className="tw-muted text-sm font-mono">No benchmark data available.</p>
      ) : (
        <BenchmarkBoard benchmarks={benchmarks} />
      )}
    </div>
  );
}
