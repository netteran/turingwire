import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/PostCard";
import { PriceChart } from "@/components/PriceChart";
import { formatDate } from "@/lib/format";
import {
  PRICE_BANDS,
  WORKLOADS,
  blended,
  comparisonSlug,
  formatTokens,
  formatUsd,
  getAllModels,
  getComparisons,
  getModelCoverage,
  getPriceHistory,
  historyFor,
  pctChange,
  priceBand,
  workloadCost,
  type AiModel,
} from "@/lib/models";
import { site, absoluteUrl } from "@/lib/site";
import { slugify } from "@/lib/slugify";

// Refreshed daily by this timer; deliberately not revalidated on every ingest
// run, which would cost ISR writes for little gain (app/api/revalidate).
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const [models, history] = await Promise.all([getAllModels(), getPriceHistory()]);
  const model = models.find((m) => m.slug === slug);
  return model ? { model, models, history: historyFor(history, slug) } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) return { title: "Not found", robots: { index: false, follow: false } };
  const m = data.model;
  const title = `${m.name} API Pricing, Context Window & Price History`;
  const description =
    m.input_price !== null
      ? `${m.name} (${m.provider}) costs ${formatUsd(m.input_price)} per million input tokens and ${formatUsd(m.output_price)} per million output tokens, with a ${formatTokens(m.context_tokens)}-token context window. Price history and cost examples.`
      : `${m.name} (${m.provider}): API pricing, context window and price history.`;
  return {
    title,
    description,
    alternates: { canonical: `/models/${m.slug}/` },
    openGraph: { type: "website", title, description, url: absoluteUrl(`/models/${m.slug}/`), siteName: site.title },
  };
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-mono tw-muted">{label}</dt>
      <dd className="tw-heading font-medium font-mono mt-0.5">{children}</dd>
    </div>
  );
}

const yesNo = (v: boolean | null) => (v === null ? "—" : v ? "Yes" : "No");

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const { model: m, models, history } = data;

  const priced = models.filter((x) => !x.retired && blended(x) !== null);
  const ranked = [...priced].sort((a, b) => blended(a)! - blended(b)!);
  const rank = ranked.findIndex((x) => x.slug === m.slug) + 1;
  const band = priceBand(m);
  const coverage = await getModelCoverage(m);

  const comparisons = getComparisons(models).filter(([a, b]) => a.slug === m.slug || b.slug === m.slug);
  // Nearest alternatives by blended price, other providers first.
  const mb = blended(m);
  const nearby: AiModel[] =
    mb === null
      ? []
      : priced
          .filter((x) => x.slug !== m.slug)
          .sort(
            (a, b) =>
              Math.abs(Math.log(blended(a)! / mb)) - Math.abs(Math.log(blended(b)! / mb)) ||
              Number(a.provider === m.provider) - Number(b.provider === m.provider),
          )
          .slice(0, 4);

  const changes = history.map((p, i) => ({
    ...p,
    prev: i > 0 ? history[i - 1] : null,
  }));
  const today = new Date().toISOString().slice(0, 10);
  const url = absoluteUrl(`/models/${m.slug}/`);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: m.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cloud API",
      url,
      author: { "@type": "Organization", name: m.provider },
      ...(m.input_price !== null
        ? {
            offers: [
              {
                "@type": "Offer",
                priceCurrency: "USD",
                price: m.input_price,
                description: "Per 1M input tokens",
              },
              {
                "@type": "Offer",
                priceCurrency: "USD",
                price: m.output_price,
                description: "Per 1M output tokens",
              },
            ],
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Models", item: absoluteUrl("/models/") },
        { "@type": "ListItem", position: 3, name: m.name, item: url },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/models/" className="hover:tw-accent transition-colors">Models</Link>
        <span className="mx-2">/</span>
        <span>{m.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">
          {m.name} <span className="tw-muted font-normal">pricing</span>
        </h1>
        <p className="mt-3 tw-muted leading-relaxed max-w-3xl">
          {m.name} is an API model from{" "}
          {m.company ? (
            <Link href={`/companies/${slugify(m.company)}/`} className="tw-accent hover:underline">
              {m.provider}
            </Link>
          ) : (
            m.provider
          )}
          .{" "}
          {m.input_price !== null && (
            <>
              It costs {formatUsd(m.input_price)} per million input tokens and {formatUsd(m.output_price)} per
              million output tokens
              {m.context_tokens ? `, with a ${formatTokens(m.context_tokens)}-token context window` : ""}.{" "}
              {rank > 0 && band && (
                <>
                  At a blended {formatUsd(mb)} per million tokens it ranks #{rank} cheapest of {ranked.length}{" "}
                  tracked models ({PRICE_BANDS[band].label.toLowerCase()} band).
                </>
              )}
            </>
          )}
          {m.retired && " This model is no longer tracked; figures are its last recorded prices."}
        </p>
      </header>

      <section className="tw-card border tw-border rounded-lg p-5 mb-8">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
          <Spec label="Input / 1M tokens">{formatUsd(m.input_price)}</Spec>
          <Spec label="Output / 1M tokens">{formatUsd(m.output_price)}</Spec>
          <Spec label="Cached input / 1M">{formatUsd(m.cached_input_price)}</Spec>
          <Spec label="Blended (3:1)">{formatUsd(mb)}</Spec>
          <Spec label="Context window">{formatTokens(m.context_tokens)}</Spec>
          <Spec label="Max output">{formatTokens(m.max_output_tokens)}</Spec>
          <Spec label="Vision · Tools · Reasoning">
            {yesNo(m.supports_vision)} · {yesNo(m.supports_tools)} · {yesNo(m.supports_reasoning)}
          </Spec>
          <Spec label="Listed since">{m.first_listed ? formatDate(m.first_listed) : "—"}</Spec>
        </dl>
      </section>

      {m.input_price !== null && (
        <section className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">What it costs</h2>
          <div className="tw-card border tw-border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
                  <th className="px-4 py-2">Workload</th>
                  <th className="px-4 py-2 text-right">Per 1,000 requests</th>
                </tr>
              </thead>
              <tbody>
                {WORKLOADS.map((w) => (
                  <tr key={w.key} className="border-b tw-border last:border-0">
                    <td className="px-4 py-2">
                      <span className="tw-heading">{w.label}</span>
                      <span className="block text-xs tw-muted">{w.detail}</span>
                    </td>
                    <td className="px-4 py-2 text-right font-mono tw-heading">{formatUsd(workloadCost(m, w))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {history.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Price history</h2>
          <div className="tw-card border tw-border rounded-lg p-4">
            <PriceChart
              yLabel={`${m.name} price per 1M tokens`}
              end={today}
              series={[
                { label: "Input", points: history.filter((p) => p.input_price !== null).map((p) => ({ date: p.observed_on, value: p.input_price! })) },
                { label: "Output", points: history.filter((p) => p.output_price !== null).map((p) => ({ date: p.observed_on, value: p.output_price! })) },
              ]}
            />
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
                  <th className="py-2">First observed</th>
                  <th className="py-2 text-right">Input</th>
                  <th className="py-2 text-right">Output</th>
                  <th className="py-2 text-right">Change</th>
                </tr>
              </thead>
              <tbody>
                {[...changes].reverse().map((c) => {
                  const before = c.prev ? blended({ input_price: c.prev.input_price, output_price: c.prev.output_price }) : null;
                  const after = blended(c);
                  return (
                    <tr key={c.observed_on} className="border-b tw-border last:border-0 font-mono">
                      <td className="py-2">{formatDate(c.observed_on)}</td>
                      <td className="py-2 text-right">{formatUsd(c.input_price)}</td>
                      <td className="py-2 text-right">{formatUsd(c.output_price)}</td>
                      <td className="py-2 text-right tw-muted">
                        {before !== null && after !== null
                          ? `${pctChange(before, after) > 0 ? "+" : ""}${pctChange(before, after).toFixed(0)}% blended`
                          : "listed"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs tw-muted mt-3">
              Dates are the week a price first appeared in the public price list we track, not
              necessarily the provider&apos;s announcement date.
            </p>
          </div>
        </section>
      )}

      {(comparisons.length > 0 || nearby.length > 0) && (
        <section className="mb-10 grid gap-6 sm:grid-cols-2">
          {comparisons.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Compare</h2>
              <ul className="space-y-1.5 text-sm">
                {comparisons.map(([a, b]) => (
                  <li key={comparisonSlug(a.slug, b.slug)}>
                    <Link href={`/models/compare/${comparisonSlug(a.slug, b.slug)}/`} className="tw-accent hover:underline">
                      {a.name} vs {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {nearby.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Similarly priced</h2>
              <ul className="space-y-1.5 text-sm">
                {nearby.map((x) => (
                  <li key={x.slug} className="flex justify-between gap-3">
                    <Link href={`/models/${x.slug}/`} className="tw-accent hover:underline">
                      {x.name}
                    </Link>
                    <span className="font-mono text-xs tw-muted">{formatUsd(blended(x))} blended</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {coverage.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">{m.name} in the news</h2>
          <div className="space-y-3">
            {coverage.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </section>
      )}

      <p className="text-xs tw-muted leading-relaxed border-t tw-border pt-4">
        Prices are the provider&apos;s list prices for its own API (USD), taken daily from LiteLLM&apos;s public model
        price list. Discounts for batch processing, caching or committed use, and regional or cloud-marketplace
        pricing, aren&apos;t reflected. Check the provider before estimating production costs. See also the{" "}
        <Link href="/models/price-index/" className="tw-accent hover:underline">TW Model Price Index</Link>.
      </p>
    </div>
  );
}
