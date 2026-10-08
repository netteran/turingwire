import type { Metadata } from "next";
import Link from "@/components/Link";

import { PriceChart } from "@/components/PriceChart";
import { ChangesTable, METHODOLOGY, weekSummary } from "@/components/PriceIndexWeek";
import { formatDate } from "@/lib/format";
import { computePriceIndex, eventfulWeeks, getAllModels, getPriceHistory } from "@/lib/models";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "TW Model Price Index: How AI API Prices Are Moving",
  description:
    "A weekly index of AI model API list prices across OpenAI, Anthropic, Google, xAI, DeepSeek, Mistral and more, with every price cut, increase and new model listed by week.",
  alternates: { canonical: "/models/price-index/" },
};

export default async function PriceIndexPage() {
  const [models, history] = await Promise.all([getAllModels(), getPriceHistory()]);
  const weeks = computePriceIndex(models, history);
  const latest = weeks[weeks.length - 1];
  const events = eventfulWeeks(weeks).reverse();
  const at = (n: number) => weeks[Math.max(0, weeks.length - 1 - n)];
  const delta = (n: number) => (latest ? ((latest.index - at(n).index) / at(n).index) * 100 : 0);
  const lastEvent = events[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "TW Model Price Index",
    description: METHODOLOGY,
    url: absoluteUrl("/models/price-index/"),
    creator: { "@id": `${site.url}/#organization` },
    temporalCoverage: weeks.length ? `${weeks[0].start}/..` : undefined,
    isBasedOn: "https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/models/" className="hover:tw-accent transition-colors">Models</Link>
        <span className="mx-2">/</span>
        <span>Price index</span>
      </nav>

      <h1 className="text-3xl font-semibold tw-heading">TW Model Price Index</h1>
      <p className="mt-3 tw-muted leading-relaxed max-w-3xl mb-6">
        How the list price of AI model APIs is moving, week by week, across every model on our{" "}
        <Link href="/models/" className="tw-accent hover:underline">pricing page</Link>.
        {lastEvent && <> {weekSummary(lastEvent)}</>}
      </p>

      {latest && (
        <>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 mb-6">
            {[
              ["Index", latest.index.toFixed(1)],
              ["4 weeks", `${delta(4) >= 0 ? "+" : ""}${delta(4).toFixed(1)}%`],
              ["12 months", `${delta(52) >= 0 ? "+" : ""}${delta(52).toFixed(1)}%`],
              ["Models priced", String(latest.priced)],
            ].map(([k, v]) => (
              <div key={k} className="tw-card rounded-lg border tw-border p-4">
                <p className="text-xs font-mono tw-muted uppercase tracking-widest">{k}</p>
                <p className="text-2xl font-semibold tw-heading font-mono mt-1">{v}</p>
              </div>
            ))}
          </div>

          <section className="tw-card border tw-border rounded-lg p-4 mb-8">
            <PriceChart
              yLabel="TW Model Price Index"
              step={false}
              zeroBased={false}
              end={latest.start}
              kind="index"
              series={[{ label: "Index", points: weeks.map((w) => ({ date: w.start, value: w.index })) }]}
            />
          </section>
        </>
      )}

      {lastEvent && <ChangesTable title={`Latest changes · week of ${formatDate(lastEvent.start)}`} rows={[...lastEvent.changes, ...lastEvent.listings]} />}

      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">Weekly reports</h2>
        <div className="tw-card border tw-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
                <th className="px-4 py-2">Week of</th>
                <th className="px-4 py-2 text-right">Index</th>
                <th className="px-4 py-2 text-right">Change</th>
                <th className="px-4 py-2 text-right">Price changes</th>
                <th className="px-4 py-2 text-right">New models</th>
              </tr>
            </thead>
            <tbody>
              {events.map((w) => (
                <tr key={w.key} className="border-b tw-border last:border-0 font-mono">
                  <td className="px-4 py-2">
                    <Link href={`/models/price-index/${w.key}/`} className="tw-accent hover:underline">{formatDate(w.start)}</Link>
                  </td>
                  <td className="px-4 py-2 text-right">{w.index.toFixed(1)}</td>
                  <td className="px-4 py-2 text-right tw-muted">{w.change >= 0 ? "+" : ""}{w.change.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right">{w.changes.length}</td>
                  <td className="px-4 py-2 text-right">{w.listings.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t tw-border pt-4">
        <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-2">Methodology</h2>
        <p className="text-sm tw-muted leading-relaxed max-w-3xl">{METHODOLOGY}</p>
      </section>
    </div>
  );
}
