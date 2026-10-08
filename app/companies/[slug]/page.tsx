import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { getArticlesForCompany, getCompany, getCompanyPrimaryCount } from "@/lib/queries";
import { profileOf } from "@/lib/format";
import { robotsForCompany } from "@/lib/seo";
import { getBenchmarks } from "@/lib/data";
import { blended, formatTokens, formatUsd, getAllModels } from "@/lib/models";
import type { Benchmark } from "@/components/BenchmarkBoard";
import { site, absoluteUrl } from "@/lib/site";

// Refreshed daily by this timer; deliberately not revalidated on every ingest
// run, which would cost ISR writes for little gain (app/api/revalidate).
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) return { title: "Not found", robots: { index: false, follow: false } };

  const primaryCount = await getCompanyPrimaryCount(slug);
  const title = `${company.name}: AI News, Models & Research`;
  const profile = profileOf(company.description);
  const coverage = `The latest ${company.name} AI news: model releases, product launches, funding, research and policy — ${primaryCount} ${
      primaryCount === 1 ? "article" : "articles"
    } summarised from primary sources, newest first.`;
  // A full profile is the snippet on its own (unique per company); a short
  // one gets the coverage line added. Snippets show ~155 characters.
  const description = !profile ? coverage : profile.length >= 110 ? profile : `${profile} ${coverage}`;

  return {
    title,
    description,
    alternates: { canonical: `/companies/${company.slug}/` },
    robots: robotsForCompany({ primaryCount }),
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(`/companies/${company.slug}/`),
      siteName: site.title,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();

  const [{ primary, secondary }, allModels, benchData] = await Promise.all([
    getArticlesForCompany(company.name),
    getAllModels().catch(() => []),
    getBenchmarks<{ benchmarks?: Benchmark[] }>().catch(() => ({ benchmarks: [] })),
  ]);
  const models = allModels
    .filter((m) => m.company === company.name && !m.retired && m.input_price !== null)
    .sort((a, b) => (blended(b) ?? 0) - (blended(a) ?? 0));
  // Benchmark tables label Google DeepMind's models "Google".
  const benchProvider = company.name === "Google DeepMind" ? "Google" : company.name;
  const benchmarks = (benchData.benchmarks ?? [])
    .map((bm) => {
      const ranked = [...(bm.results ?? [])].sort((x, y) =>
        bm.higher_is_better === false ? x.score - y.score : y.score - x.score,
      );
      const i = ranked.findIndex((r) => r.provider === benchProvider);
      return i < 0 ? null : { bm, best: ranked[i], position: i + 1, of: ranked.length };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  const url = absoluteUrl(`/companies/${company.slug}/`);
  const profile = profileOf(company.description);
  const website = company.website ?? null;

  // The page is a collection *about* the company; the Organization's own
  // `url` would be its website, not this page, so it isn't set here.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: `${company.name}: AI News, Models & Research`,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    about: {
      "@type": "Organization",
      name: company.name,
      identifier: company.slug,
      ...(profile ? { description: profile } : {}),
      // The company's own site identifies which organisation this is.
      ...(website ? { url: website, sameAs: [website] } : {}),
      subjectOf: {
        "@type": "Dataset",
        name: "Turing Wire Knowledge Graph",
        url: `${site.url}/knowledge-graph.json`,
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-[25px] pb-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <header className="mb-10">
        <nav className="text-xs font-mono tw-muted mb-4">
          <Link href="/" className="hover:tw-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news/" className="hover:tw-accent transition-colors">
            AI News
          </Link>
          <span className="mx-2">/</span>
          <span>{company.name}</span>
        </nav>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tw-heading">
              {company.name} <span className="tw-muted font-normal">AI news</span>
            </h1>
            {profile && (
              <p className="mt-3 tw-muted leading-relaxed max-w-3xl">{profile}</p>
            )}
            <p className="mt-3 text-sm tw-muted font-mono flex flex-wrap items-center gap-x-3 gap-y-1">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener"
                  className="text-cyan-600 hover:text-cyan-500 transition-colors"
                >
                  {hostOf(website)} ↗
                </a>
              )}
              <span>
                {primary.length} primary articles · {secondary.length} secondary mentions
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <ShareButtons
              url={url}
              title={company.name}
              summary={profile ?? site.description}
              variant="popover"
              align="right"
            />
          </div>
        </div>
      </header>

      {models.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            Models &amp; API prices
          </h2>
          <div className="tw-card border tw-border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2 text-right">Input / 1M</th>
                  <th className="px-4 py-2 text-right">Output / 1M</th>
                  <th className="px-4 py-2 text-right">Context</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m) => (
                  <tr key={m.slug} className="border-b tw-border last:border-0">
                    <td className="px-4 py-2">
                      <Link href={`/models/${m.slug}/`} className="tw-accent hover:underline">{m.name}</Link>
                    </td>
                    <td className="px-4 py-2 text-right font-mono">{formatUsd(m.input_price)}</td>
                    <td className="px-4 py-2 text-right font-mono">{formatUsd(m.output_price)}</td>
                    <td className="px-4 py-2 text-right font-mono tw-muted">{formatTokens(m.context_tokens)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs tw-muted mt-2">
            List prices per million tokens for {company.name}&apos;s own API, updated daily.{" "}
            <Link href="/models/" className="tw-accent hover:underline">Compare all models →</Link>
          </p>
        </section>
      )}

      {benchmarks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            Published benchmark results
          </h2>
          <ul className="tw-card border tw-border rounded-lg divide-y tw-border text-sm">
            {benchmarks.map(({ bm, best, position, of }) => (
              <li key={bm.id} className="px-4 py-2 flex flex-wrap items-baseline justify-between gap-2">
                <span>
                  <span className="tw-heading font-medium">{bm.name}</span>
                  <span className="tw-muted"> · best listed: {best.model}</span>
                </span>
                <span className="font-mono text-xs tw-muted">
                  {best.score}
                  {bm.unit ?? ""} · #{position} of {of} listed
                  {best.date ? ` · ${best.date}` : ""}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs tw-muted mt-2">
            Position among the results listed on our{" "}
            <Link href="/benchmarks/" className="tw-accent hover:underline">benchmark leaderboard</Link>, with
            the date each result was published.
          </p>
        </section>
      )}

      {primary.length > 0 && (
        <section>
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            Primary coverage
          </h2>
          <div className="space-y-4">
            {primary.slice(0, 50).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {secondary.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            Also mentioned
          </h2>
          <div className="space-y-4">
            {secondary.slice(0, 20).map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </section>
      )}

      {primary.length === 0 && secondary.length === 0 && (
        <p className="tw-muted text-sm">
          No articles indexed for this company yet.
        </p>
      )}
    </div>
  );
}
