import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound, permanentRedirect } from "next/navigation";

import { PostCard } from "./PostCard";
import { DevelopingStories } from "./DevelopingStories";
import { SectionFeed } from "./SectionFeed";
import {
  countArticlesByCategory,
  getAllArticlesByCategory,
  getArticlesByCategory,
} from "@/lib/queries";
import { FEED_INITIAL, feedFacets, toFeedCard } from "@/lib/feed";
import { site, absoluteUrl } from "@/lib/site";
import type { ArticleCategory } from "@/lib/types";

/**
 * Section index for /news/ and /research/.
 *
 * Page 1 is the filterable feed (topic, impact, company, date range, text).
 * It renders the first batch and loads the rest on demand (lib/feed.ts), so
 * on its own crawlers would only see that batch of links; the server-rendered archive pages
 * (/news/page/2/, /news/page/3/, …) linked below it give every article a
 * plain <a href> path.
 */

export const HUB_PAGE_SIZE = 30;

const HUBS: Record<
  ArticleCategory,
  { label: string; title: string; description: string; intro: string }
> = {
  news: {
    label: "AI News",
    title: "AI News",
    description:
      "AI industry news in one feed: model releases, product launches, funding rounds, policy, safety, and compute infrastructure. Each item is summarised from its primary source and linked back to it.",
    intro:
      "Model releases, product launches, funding rounds, regulation, safety and compute infrastructure from across the AI industry. Every item is summarised from its primary source, rated for impact, and linked to the company it covers and to the original report.",
  },
  research: {
    label: "AI Research",
    title: "AI Research Papers",
    description:
      "Summaries of new AI research papers: foundation models, reasoning, alignment and safety, interpretability, agents, multimodal, efficiency and training methods, with links to arXiv.",
    intro:
      "New AI research across foundation models, reasoning, alignment and safety, interpretability, agents and robotics, multimodal learning, efficiency and training methods. Each summary covers the problem, method, results and limitations, and links to the paper on arXiv.",
  },
};

function hubPath(category: ArticleCategory, page: number): string {
  return page <= 1 ? `/${category}/` : `/${category}/page/${page}/`;
}

/**
 * Parse a /page/<n>/ segment. Anything that isn't a plain integer ≥ 2 is a
 * 404, except /page/1/, which duplicates the hub itself and so 301s to it.
 */
export function parsePageParam(category: ArticleCategory, raw: string): number {
  if (!/^\d+$/.test(raw)) notFound();
  const page = Number(raw);
  if (page === 1) permanentRedirect(hubPath(category, 1));
  if (page < 1) notFound();
  return page;
}

export async function sectionHubMetadata(
  category: ArticleCategory,
  page: number,
): Promise<Metadata> {
  const hub = HUBS[category];
  const title = page > 1 ? `${hub.title} — Page ${page}` : hub.title;
  return {
    title,
    description: hub.description,
    alternates: { canonical: hubPath(category, page) },
    openGraph: {
      type: "website",
      title,
      description: hub.description,
      url: absoluteUrl(hubPath(category, page)),
      siteName: site.title,
    },
  };
}

export async function SectionHub({
  category,
  page,
}: {
  category: ArticleCategory;
  page: number;
}) {
  const hub = HUBS[category];
  // Page 1 reads the whole section for its filter facets but only embeds
  // the first batch; archive pages need their own slice and the total.
  const all =
    page === 1
      ? (await getAllArticlesByCategory(category)).filter((p) => p.title?.trim())
      : [];
  const [posts, total] =
    page === 1
      ? [all.slice(0, HUB_PAGE_SIZE), all.length]
      : await Promise.all([
          getArticlesByCategory(category, {
            limit: HUB_PAGE_SIZE,
            offset: (page - 1) * HUB_PAGE_SIZE,
          }),
          countArticlesByCategory(category),
        ]);

  const lastPage = Math.max(1, Math.ceil(total / HUB_PAGE_SIZE));
  if (page > lastPage) notFound();

  const url = absoluteUrl(hubPath(category, page));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: page > 1 ? `${hub.title} — Page ${page}` : hub.title,
      description: hub.description,
      isPartOf: { "@id": `${site.url}/#website` },
      publisher: { "@id": `${site.url}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: (page - 1) * HUB_PAGE_SIZE + i + 1,
          url: absoluteUrl(`/${post.category}/${post.slug}/`),
          name: post.title,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: hub.label,
          item: absoluteUrl(hubPath(category, 1)),
        },
        ...(page > 1
          ? [{ "@type": "ListItem", position: 3, name: `Page ${page}`, item: url }]
          : []),
      ],
    },
  ];

  const other: ArticleCategory = category === "news" ? "research" : "news";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        {page > 1 ? (
          <>
            <Link href={hubPath(category, 1)} className="hover:tw-accent transition-colors">
              {hub.label}
            </Link>
            <span className="mx-2">/</span>
            <span>Page {page}</span>
          </>
        ) : (
          <span>{hub.label}</span>
        )}
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">
          {hub.title}
          {page > 1 && <span className="tw-muted font-normal"> — Page {page}</span>}
        </h1>
        {page === 1 && (
          <p className="mt-3 tw-muted leading-relaxed max-w-3xl">{hub.intro}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono">
          <Link href={hubPath(other, 1)} className="tw-filter-chip">
            {HUBS[other].title} →
          </Link>
          <Link href="/stories/" className="tw-filter-chip">
            Multi-source stories →
          </Link>
          <Link href="/companies/" className="tw-filter-chip">
            Browse by company →
          </Link>
        </div>
      </header>

      {page === 1 && <DevelopingStories />}

      {posts.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No articles yet.</p>
        </div>
      ) : page === 1 ? (
        <SectionFeed
          category={category}
          initialPosts={all.slice(0, FEED_INITIAL).map(toFeedCard)}
          facets={feedFacets(all)}
          todayUtc={new Date().toISOString().slice(0, 10)}
          nowMs={Date.now()}
        />
      ) : (
        <>
          <p className="mb-4 text-xs font-mono tw-muted">
            Archive, newest first.{" "}
            <Link href={hubPath(category, 1)} className="tw-accent hover:underline">
              Filter by topic, impact and company →
            </Link>
          </p>
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}

      {lastPage > 1 && (
        <>
          {page === 1 && (
            <h2 className="mt-10 text-center text-xs font-mono uppercase tracking-widest tw-muted">
              Browse the archive by page
            </h2>
          )}
          <Pagination category={category} page={page} lastPage={lastPage} />
        </>
      )}
    </div>
  );
}

function Pagination({
  category,
  page,
  lastPage,
}: {
  category: ArticleCategory;
  page: number;
  lastPage: number;
}) {
  // Always link first, last and a window around the current page, so every
  // page is reachable within a couple of hops.
  const pages = new Set<number>([1, lastPage]);
  for (let p = page - 2; p <= page + 2; p++) {
    if (p >= 1 && p <= lastPage) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-mono"
      aria-label="Pagination"
    >
      {page > 1 && (
        <Link href={hubPath(category, page - 1)} rel="prev" className="tw-filter-chip">
          ← Newer
        </Link>
      )}
      {sorted.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - sorted[i - 1] > 1 && <span className="tw-muted">…</span>}
          {p === page ? (
            <span aria-current="page" className="tw-filter-chip tw-heading font-semibold">
              {p}
            </span>
          ) : (
            <Link href={hubPath(category, p)} className="tw-filter-chip">
              {p}
            </Link>
          )}
        </span>
      ))}
      {page < lastPage && (
        <Link href={hubPath(category, page + 1)} rel="next" className="tw-filter-chip">
          Older →
        </Link>
      )}
    </nav>
  );
}
