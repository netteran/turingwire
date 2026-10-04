import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { PriceChart } from "@/components/PriceChart";
import { formatDate } from "@/lib/format";
import {
  WORKLOADS,
  blended,
  comparisonSlug,
  findComparison,
  formatTokens,
  formatUsd,
  getAllModels,
  getComparisons,
  getPriceHistory,
  historyFor,
  workloadCost,
  type AiModel,
} from "@/lib/models";
import { site, absoluteUrl } from "@/lib/site";
import { slugify } from "@/lib/slugify";

// Refreshed daily by this timer; deliberately not revalidated on every ingest
// run, which would cost ISR writes for little gain (app/api/revalidate).
export const revalidate = 86400;

type Props = { params: Promise<{ pair: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const found = findComparison(await getAllModels(), pair);
  if (!found || found.reversed) return { title: "Not found", robots: { index: false, follow: false } };
  const { a, b } = found;
  const title = `${a.name} vs ${b.name}: API Pricing & Specs Compared`;
  const description = `${a.name} costs ${formatUsd(a.input_price)}/${formatUsd(a.output_price)} per million input/output tokens; ${b.name} costs ${formatUsd(b.input_price)}/${formatUsd(b.output_price)}. Side-by-side context windows, capabilities, workload costs and price history.`;
  return {
    title,
    description,
    alternates: { canonical: `/models/compare/${comparisonSlug(a.slug, b.slug)}/` },
    openGraph: { type: "website", title, description, siteName: site.title, url: absoluteUrl(`/models/compare/${comparisonSlug(a.slug, b.slug)}/`) },
  };
}

/** "3.2× cheaper" / "about the same" for a pair of prices. */
function ratioPhrase(cheapName: string, x: number, y: number, what: string): string {
  if (x === y) return `Both cost the same for ${what}.`;
  const [lo, hi] = x < y ? [x, y] : [y, x];
  const r = hi / lo;
  if (r < 1.1) return `They cost about the same for ${what}.`;
  return `${cheapName} is ${r >= 10 ? Math.round(r) : r.toFixed(1)}× cheaper for ${what}.`;
}

const yesNo = (v: boolean | null) => (v === null ? "—" : v ? "Yes" : "No");

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const [models, history] = await Promise.all([getAllModels(), getPriceHistory()]);
  const found = findComparison(models, pair);
  if (!found) notFound();
  if (found.reversed) permanentRedirect(`/models/compare/${comparisonSlug(found.a.slug, found.b.slug)}/`);
  const { a, b } = found;

  const ba = blended(a);
  const bb = blended(b);
  const cheaper = ba !== null && bb !== null ? (ba <= bb ? a : b) : null;
  const rows: { label: string; fa: (m: AiModel) => string }[] = [
    { label: "Provider", fa: (m) => m.provider },
    { label: "Input / 1M tokens", fa: (m) => formatUsd(m.input_price) },
    { label: "Output / 1M tokens", fa: (m) => formatUsd(m.output_price) },
    { label: "Cached input / 1M", fa: (m) => formatUsd(m.cached_input_price) },
    { label: "Blended (3:1)", fa: (m) => formatUsd(blended(m)) },
    { label: "Context window", fa: (m) => formatTokens(m.context_tokens) },
    { label: "Max output", fa: (m) => formatTokens(m.max_output_tokens) },
    { label: "Vision", fa: (m) => yesNo(m.supports_vision) },
    { label: "Tool use", fa: (m) => yesNo(m.supports_tools) },
    { label: "Reasoning", fa: (m) => yesNo(m.supports_reasoning) },
    { label: "Listed since", fa: (m) => (m.first_listed ? formatDate(m.first_listed) : "—") },
  ];

  const blendedSeries = (m: AiModel) =>
    historyFor(history, m.slug)
      .map((p) => ({ date: p.observed_on, value: blended(p) }))
      .filter((p): p is { date: string; value: number } => p.value !== null);
  const sa = blendedSeries(a);
  const sb = blendedSeries(b);

  const others = getComparisons(models).filter(
    ([x, y]) => [x.slug, y.slug].some((s) => s === a.slug || s === b.slug) && !(x.slug === a.slug && y.slug === b.slug),
  );
  const url = absoluteUrl(`/models/compare/${comparisonSlug(a.slug, b.slug)}/`);
  const today = new Date().toISOString().slice(0, 10);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Models", item: absoluteUrl("/models/") },
      { "@type": "ListItem", position: 3, name: "Compare", item: absoluteUrl("/models/compare/") },
      { "@type": "ListItem", position: 4, name: `${a.name} vs ${b.name}`, item: url },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/models/" className="hover:tw-accent transition-colors">Models</Link>
        <span className="mx-2">/</span>
        <Link href="/models/compare/" className="hover:tw-accent transition-colors">Compare</Link>
        <span className="mx-2">/</span>
        <span>{a.name} vs {b.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">
          {a.name} vs {b.name}
        </h1>
        <p className="mt-3 tw-muted leading-relaxed max-w-3xl">
          {a.name} ({a.provider}) costs {formatUsd(a.input_price)} per million input tokens and{" "}
          {formatUsd(a.output_price)} per million output tokens; {b.name} ({b.provider}) costs{" "}
          {formatUsd(b.input_price)} and {formatUsd(b.output_price)}.{" "}
          {cheaper && ba !== null && bb !== null && ratioPhrase(cheaper.name, ba, bb, "a typical 3:1 input-to-output mix")}{" "}
          {a.context_tokens && b.context_tokens && a.context_tokens !== b.context_tokens
            ? `${a.context_tokens > b.context_tokens ? a.name : b.name} has the larger context window (${formatTokens(Math.max(a.context_tokens, b.context_tokens))} vs ${formatTokens(Math.min(a.context_tokens, b.context_tokens))} tokens).`
            : a.context_tokens
              ? `Both accept up to ${formatTokens(a.context_tokens)} tokens of context.`
              : ""}
        </p>
      </header>

      <section className="tw-card border tw-border rounded-lg overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
              <th className="px-4 py-2" />
              {[a, b].map((m) => (
                <th key={m.slug} className="px-4 py-2 text-right">
                  <Link href={`/models/${m.slug}/`} className="tw-heading hover:tw-accent text-sm font-semibold">
                    {m.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b tw-border last:border-0">
                <td className="px-4 py-2 text-xs font-mono tw-muted">{r.label}</td>
                <td className="px-4 py-2 text-right font-mono tw-heading">{r.fa(a)}</td>
                <td className="px-4 py-2 text-right font-mono tw-heading">{r.fa(b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Cost per 1,000 requests</h2>
        <div className="tw-card border tw-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
                <th className="px-4 py-2">Workload</th>
                <th className="px-4 py-2 text-right">{a.name}</th>
                <th className="px-4 py-2 text-right">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {WORKLOADS.map((w) => {
                const ca = workloadCost(a, w);
                const cb = workloadCost(b, w);
                return (
                  <tr key={w.key} className="border-b tw-border last:border-0">
                    <td className="px-4 py-2">
                      <span className="tw-heading">{w.label}</span>
                      <span className="block text-xs tw-muted">{w.detail}</span>
                    </td>
                    <td className={`px-4 py-2 text-right font-mono ${ca !== null && cb !== null && ca <= cb ? "tw-heading font-semibold" : "tw-muted"}`}>{formatUsd(ca)}</td>
                    <td className={`px-4 py-2 text-right font-mono ${ca !== null && cb !== null && cb <= ca ? "tw-heading font-semibold" : "tw-muted"}`}>{formatUsd(cb)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {sa.length > 0 && sb.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Blended price history</h2>
          <div className="tw-card border tw-border rounded-lg p-4">
            <PriceChart
              yLabel="Blended price per 1M tokens"
              end={today}
              series={[
                { label: a.name, points: sa },
                { label: b.name, points: sb },
              ]}
            />
            <p className="text-xs tw-muted mt-2">
              Blended = (3 × input + output) ÷ 4, per million tokens. Each line starts when the model first
              appeared in the price list.
            </p>
          </div>
        </section>
      )}

      <section className="mb-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">The companies</h2>
          <ul className="space-y-1.5 text-sm">
            {[a, b].map((m) =>
              m.company ? (
                <li key={m.slug}>
                  <Link href={`/companies/${slugify(m.company)}/`} className="tw-accent hover:underline">
                    {m.provider} news
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>
        {others.length > 0 && (
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Related comparisons</h2>
            <ul className="space-y-1.5 text-sm">
              {others.slice(0, 6).map(([x, y]) => (
                <li key={comparisonSlug(x.slug, y.slug)}>
                  <Link href={`/models/compare/${comparisonSlug(x.slug, y.slug)}/`} className="tw-accent hover:underline">
                    {x.name} vs {y.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <p className="text-xs tw-muted leading-relaxed border-t tw-border pt-4">
        List prices for each provider&apos;s own API (USD), taken daily from LiteLLM&apos;s public model price list.
        Batch, caching and committed-use discounts aren&apos;t reflected. Price alone says nothing about output
        quality; check benchmarks and your own evaluations before switching.
      </p>
    </div>
  );
}
