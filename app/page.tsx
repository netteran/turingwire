import type { Metadata } from "next";
import Link from "next/link";

import { PostCard } from "@/components/PostCard";
import { BreakingStrip } from "@/components/BreakingStrip";
import { DayLabel } from "@/components/DayLabel";
import { PartnerSpotlight } from "@/components/PartnerSpotlight";
import { AiIndexCard } from "@/components/AiIndexCard";
import { TopMovers } from "@/components/TopMovers";

import {
  getRecentArticles,
  getArticlesByCategory,
  getCompaniesWithCounts,
} from "@/lib/queries";
import { getAiIndexHistory, getStocksSnapshot } from "@/lib/data";
import { articleUrl, type ArticleCard } from "@/lib/types";
import { site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Turing Wire — AI News, Research & Market Intelligence",
  description:
    "The essential daily briefing for AI engineers and researchers. Breaking AI news, arXiv paper summaries, company intelligence, and ecosystem market data — updated continuously.",
  alternates: { canonical: "/" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.title,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/search/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** Group articles by their UTC calendar day, preserving order. */
function groupByDay(posts: ArticleCard[]): { date: string; items: ArticleCard[] }[] {
  const groups: { date: string; items: ArticleCard[] }[] = [];
  for (const post of posts) {
    const date = post.published_at.slice(0, 10);
    const last = groups[groups.length - 1];
    if (last && last.date === date) last.items.push(post);
    else groups.push({ date, items: [post] });
  }
  return groups;
}

export default async function HomePage() {
  const [recent, researchSpotlight, companies] = await Promise.all([
    getRecentArticles(120),
    getArticlesByCategory("research", { limit: 1 }),
    getCompaniesWithCounts(),
  ]);

  const indexHistory = getAiIndexHistory();
  const stocks = getStocksSnapshot();

  const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;
  const breaking = recent.find(
    (p) => p.impact === "critical" && new Date(p.published_at).getTime() >= sixHoursAgo,
  );

  const spotlight = researchSpotlight[0];
  const groups = groupByDay(recent.filter((p) => p.title?.trim())).slice(0, 3);
  const todayUtc = new Date().toISOString().slice(0, 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {breaking && <BreakingStrip post={breaking} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-xs font-mono tw-muted">
                AI news &amp; research for practitioners
              </h1>
            </div>

            {recent.length === 0 ? (
              <div className="tw-card rounded-lg border tw-border p-8 text-center">
                <p className="tw-muted text-sm font-mono">No articles indexed yet.</p>
                <p className="tw-muted text-xs mt-2">
                  New articles are added regularly — check back soon.
                </p>
              </div>
            ) : (
              groups.map((group, groupIndex) => (
                <div className="mb-8" key={group.date}>
                  <h2
                    className="text-xs font-mono uppercase tracking-widest tw-muted mb-3 flex items-center gap-3"
                    data-day-group={group.date}
                  >
                    <DayLabel
                      date={group.date}
                      initialLabel={group.date === todayUtc ? "Today" : group.date}
                    />
                    <span
                      className="flex-1 h-px tw-border"
                      style={{ background: "var(--border)" }}
                    />
                  </h2>
                  <div className="space-y-3">
                    {group.items.map((post, postIndex) => (
                      <div key={post.id}>
                        <PostCard post={post} />
                        {groupIndex === 0 && postIndex === 0 && (
                          <div className="block lg:hidden mt-3">
                            <PartnerSpotlight />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="mt-4 flex flex-wrap gap-4 text-sm font-mono">
              <Link href="/news/" className="tw-filter-chip">
                All news →
              </Link>
              <Link href="/research/" className="tw-filter-chip">
                All research →
              </Link>
            </div>
          </div>

          <aside className="mt-10 lg:mt-0 space-y-6">
            <div className="tw-card rounded-lg border tw-border p-5">
              <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-2">
                About
              </h2>
              <p className="text-xs tw-muted leading-relaxed">
                Turing Wire has ambition to be AI practitioners&apos; go-to platform
                to trace all the leading AI sources in one place, convenient and
                edited to get to the very gist of what&apos;s happening in the AI and
                technology world.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/about/"
                  className="text-xs font-mono text-cyan-600 hover:text-cyan-500 transition-colors"
                >
                  Learn more →
                </Link>
                <Link
                  href="/alan-turing/#turing-wire"
                  className="text-xs font-mono tw-muted hover:text-cyan-600 transition-colors"
                >
                  Why the name? →
                </Link>
                <a
                  href="/feed-major.xml"
                  className="text-xs font-mono tw-muted hover:text-cyan-600 transition-colors"
                >
                  Major+ RSS →
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <PartnerSpotlight />
            </div>

            {spotlight && (
              <div className="tw-card rounded-lg border tw-border p-5">
                <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">
                  Research spotlight
                </h2>
                <Link href={articleUrl(spotlight)} className="block group">
                  <p className="text-sm font-semibold tw-heading leading-snug mb-2 group-hover:text-cyan-600 transition-colors line-clamp-3">
                    {spotlight.title}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono tw-muted">
                  {spotlight.subcategory && (
                    <span className="border tw-border rounded px-2 py-0.5">
                      {spotlight.subcategory.replace(/_/g, " ")}
                    </span>
                  )}
                  {spotlight.arxiv_id && (
                    <a
                      href={`https://arxiv.org/abs/${spotlight.arxiv_id}`}
                      className="tw-arxiv-badge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      arXiv
                    </a>
                  )}
                </div>
                <Link
                  href="/research/"
                  className="block mt-3 text-xs font-mono text-cyan-600 hover:text-cyan-500 transition-colors"
                >
                  All research →
                </Link>
              </div>
            )}

            <div className="tw-card rounded-lg border tw-border p-5">
              <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-4">
                Companies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {companies.slice(0, 20).map((co) => (
                  <Link
                    key={co.slug}
                    href={`/companies/${co.slug}/`}
                    className="font-mono text-xs tw-muted border tw-border rounded px-2 py-0.5 hover:text-cyan-600 hover:border-cyan-600 transition-colors"
                  >
                    {co.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/companies/"
                className="block mt-3 text-xs font-mono tw-muted hover:text-cyan-600 transition-colors"
              >
                All companies →
              </Link>
            </div>

            <AiIndexCard history={indexHistory} />
            <TopMovers snapshot={stocks} />
          </aside>
        </div>
      </div>
    </>
  );
}
