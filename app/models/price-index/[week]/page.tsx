import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound } from "next/navigation";

import { ChangesTable, METHODOLOGY, weekSummary } from "@/components/PriceIndexWeek";
import { formatDate } from "@/lib/format";
import { computePriceIndex, eventfulWeeks, getAllModels, getPriceHistory } from "@/lib/models";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

type Props = { params: Promise<{ week: string }> };

async function load(key: string) {
  if (!/^\d{4}-w\d{2}$/.test(key)) return null;
  const [models, history] = await Promise.all([getAllModels(), getPriceHistory()]);
  const events = eventfulWeeks(computePriceIndex(models, history));
  const i = events.findIndex((w) => w.key === key);
  return i < 0 ? null : { week: events[i], prev: events[i - 1] ?? null, next: events[i + 1] ?? null };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { week } = await params;
  const data = await load(week);
  if (!data) return { title: "Not found", robots: { index: false, follow: false } };
  const title = `AI Model Prices, Week of ${formatDate(data.week.start)}`;
  const description = weekSummary(data.week);
  return {
    title,
    description,
    alternates: { canonical: `/models/price-index/${week}/` },
    openGraph: { type: "article", title, description, siteName: site.title, url: absoluteUrl(`/models/price-index/${week}/`) },
  };
}

export default async function PriceIndexWeekPage({ params }: Props) {
  const { week } = await params;
  const data = await load(week);
  if (!data) notFound();
  const { week: w, prev, next } = data;
  const title = `AI model prices, week of ${formatDate(w.start)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    datePublished: new Date(`${w.start}T00:00:00Z`).toISOString(),
    description: weekSummary(w),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/models/price-index/${w.key}/`),
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/models/price-index/" className="hover:tw-accent transition-colors">Price index</Link>
        <span className="mx-2">/</span>
        <span>{w.key.toUpperCase()}</span>
      </nav>

      <h1 className="text-3xl font-semibold tw-heading">{title}</h1>
      <p className="mt-3 tw-muted leading-relaxed mb-6">{weekSummary(w)}</p>

      <div className="grid gap-3 grid-cols-3 mb-8">
        {[
          ["Index", w.index.toFixed(1)],
          ["Week change", `${w.change >= 0 ? "+" : ""}${w.change.toFixed(1)}%`],
          ["Models priced", String(w.priced)],
        ].map(([k, v]) => (
          <div key={k} className="tw-card rounded-lg border tw-border p-4">
            <p className="text-xs font-mono tw-muted uppercase tracking-widest">{k}</p>
            <p className="text-xl font-semibold tw-heading font-mono mt-1">{v}</p>
          </div>
        ))}
      </div>

      <ChangesTable title="Price changes" rows={w.changes} />
      <ChangesTable title="Newly listed" rows={w.listings} />

      <nav className="flex justify-between gap-4 text-sm mt-8" aria-label="Weekly reports">
        {prev ? (
          <Link href={`/models/price-index/${prev.key}/`} className="tw-accent hover:underline">← Week of {formatDate(prev.start)}</Link>
        ) : <span />}
        {next && (
          <Link href={`/models/price-index/${next.key}/`} className="tw-accent hover:underline">Week of {formatDate(next.start)} →</Link>
        )}
      </nav>

      <p className="text-xs tw-muted leading-relaxed border-t tw-border pt-4 mt-8">{METHODOLOGY}</p>
    </article>
  );
}
