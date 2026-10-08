import type { Metadata } from "next";
import Link from "@/components/Link";
import { blended, comparisonSlug, formatUsd, getAllModels, getComparisons } from "@/lib/models";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Model Comparisons: Head-to-Head API Pricing",
  description:
    "Side-by-side API pricing, context windows and capabilities for the AI models people weigh against each other: Claude vs GPT, Gemini vs Claude, DeepSeek vs Kimi and more.",
  alternates: { canonical: "/models/compare/" },
};

export default async function CompareIndexPage() {
  const models = await getAllModels();
  const pairs = getComparisons(models);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/models/" className="hover:tw-accent transition-colors">Models</Link>
        <span className="mx-2">/</span>
        <span>Compare</span>
      </nav>
      <h1 className="text-3xl font-semibold tw-heading">AI model comparisons</h1>
      <p className="mt-3 tw-muted leading-relaxed max-w-3xl mb-8">
        Head-to-head pages for models that compete for the same work: flagship against flagship across
        providers, budget models for high-volume jobs, and each provider&apos;s step up or down. Every page shows
        list prices, context windows, capabilities, what common workloads cost, and both models&apos; price history.
      </p>
      <div className="tw-card border tw-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
              <th className="px-4 py-2">Comparison</th>
              <th className="px-4 py-2 text-right">Blended price (per 1M)</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(([a, b]) => (
              <tr key={comparisonSlug(a.slug, b.slug)} className="border-b tw-border last:border-0">
                <td className="px-4 py-2">
                  <Link href={`/models/compare/${comparisonSlug(a.slug, b.slug)}/`} className="tw-accent hover:underline">
                    {a.name} vs {b.name}
                  </Link>
                </td>
                <td className="px-4 py-2 text-right font-mono tw-muted">
                  {formatUsd(blended(a))} vs {formatUsd(blended(b))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
