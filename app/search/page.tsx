import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { PostCard } from "@/components/PostCard";
import { formatDate, profileOf } from "@/lib/format";
import { searchArticles, searchCompanies, type CompanyCount } from "@/lib/queries";
import type { ArticleCard } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Turing Wire's AI news, research and company coverage.",
  alternates: { canonical: "/search/" },
  robots: { index: false, follow: true },
};

type Scope = "companies" | "news" | "research";

const SCOPES: { value: Scope; label: string }[] = [
  { value: "companies", label: "Companies" },
  { value: "news", label: "News" },
  { value: "research", label: "Research" },
];

/** Per-type cap; a full result list shows "50+" when it's hit. */
const LIMIT = 50;
/** How many of each type the "Everything" view previews before "View all". */
const PREVIEW: Record<Scope, number> = { companies: 6, news: 5, research: 5 };

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

function searchHref(query: string, scope?: Scope): string {
  return `/search/?q=${encodeURIComponent(query)}${scope ? `&category=${scope}` : ""}`;
}

function countLabel(n: number): string {
  return n >= LIMIT ? `${LIMIT}+` : String(n);
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", category } = await searchParams;
  const query = q.trim();
  const scope = SCOPES.find((s) => s.value === category)?.value;

  // All three are fetched whatever the active chip, so every chip can show
  // its count and the reader can see where the matches are before switching.
  const [companies, news, research] = query
    ? await Promise.all([
        searchCompanies(query, LIMIT),
        searchArticles(query, { limit: LIMIT, category: "news" }),
        searchArticles(query, { limit: LIMIT, category: "research" }),
      ])
    : [[], [], []];

  const counts: Record<Scope, number> = {
    companies: companies.length,
    news: news.length,
    research: research.length,
  };
  const total = counts.companies + counts.news + counts.research;

  const sections: Record<Scope, ReactNode> = {
    companies: <CompanyResults companies={companies} limit={scope ? undefined : PREVIEW.companies} />,
    news: <ArticleResults posts={news as unknown as ArticleCard[]} limit={scope ? undefined : PREVIEW.news} />,
    research: <ArticleResults posts={research as unknown as ArticleCard[]} limit={scope ? undefined : PREVIEW.research} />,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tw-heading">Search</h1>
        <p className="text-sm tw-muted mt-1 font-mono">
          Companies, news and research across every published article
        </p>
      </header>

      <form action="/search/" method="get" className="mb-6" role="search">
        {scope && <input type="hidden" name="category" value={scope} />}
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search companies, news and research…"
            aria-label="Search"
            className="tw-input flex-1 min-w-0 font-mono text-sm"
            autoFocus
          />
          <button type="submit" className="tw-btn-primary font-mono text-sm px-4">
            Search
          </button>
        </div>
        <nav className="flex flex-wrap gap-2 mt-3" aria-label="Result type">
          <Link
            href={searchHref(query)}
            className={`tw-filter-chip text-xs${!scope ? " active" : ""}`}
          >
            Everything{query && <span className="ml-1.5 opacity-70">{total}</span>}
          </Link>
          {SCOPES.map((s) => (
            <Link
              key={s.value}
              href={searchHref(query, s.value)}
              className={`tw-filter-chip text-xs${scope === s.value ? " active" : ""}`}
            >
              {s.label}
              {query && <span className="ml-1.5 opacity-70">{countLabel(counts[s.value])}</span>}
            </Link>
          ))}
        </nav>
      </form>

      {!query ? (
        <p className="tw-muted text-sm font-mono">Enter a search term to begin.</p>
      ) : (scope ? counts[scope] : total) === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">
            No {scope ? SCOPES.find((s) => s.value === scope)!.label.toLowerCase() : "results"} for
            {" "}&ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : scope ? (
        <ResultSection
          title={SCOPES.find((s) => s.value === scope)!.label}
          count={counts[scope]}
          query={query}
        >
          {sections[scope]}
        </ResultSection>
      ) : (
        <div className="space-y-10">
          {SCOPES.filter((s) => counts[s.value] > 0).map((s) => (
            <ResultSection
              key={s.value}
              title={s.label}
              count={counts[s.value]}
              query={query}
              viewAll={counts[s.value] > PREVIEW[s.value] ? searchHref(query, s.value) : undefined}
            >
              {sections[s.value]}
            </ResultSection>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultSection({
  title,
  count,
  query,
  viewAll,
  children,
}: {
  title: string;
  count: number;
  query: string;
  viewAll?: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={`${title} results`}>
      <div className="flex items-baseline justify-between gap-3 mb-3 pb-2 border-b tw-border">
        <h2 className="text-lg font-semibold tw-heading">
          {title}
          <span className="ml-2 font-mono text-xs tw-muted font-normal">
            {countLabel(count)} for &ldquo;{query}&rdquo;
          </span>
        </h2>
        {viewAll && (
          <Link href={viewAll} className="font-mono text-xs tw-accent hover:underline flex-shrink-0">
            View all {countLabel(count)} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function ArticleResults({ posts, limit }: { posts: ArticleCard[]; limit?: number }) {
  return (
    <div className="space-y-3">
      {posts.slice(0, limit).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function CompanyResults({ companies, limit }: { companies: CompanyCount[]; limit?: number }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {companies.slice(0, limit).map((c) => {
        const profile = profileOf(c.description);
        return (
          <li key={c.slug}>
            <Link
              href={`/companies/${c.slug}/`}
              className="tw-card group flex h-full flex-col rounded-lg border tw-border p-4 transition-colors hover:border-[var(--accent)]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold tw-heading group-hover:tw-accent transition-colors truncate">
                  {c.name}
                </h3>
                <span className="flex-shrink-0 font-mono text-xs tw-muted">
                  {c.article_count} article{c.article_count !== 1 && "s"}
                </span>
              </div>
              {profile && (
                <p className="mt-1.5 text-sm tw-muted leading-snug line-clamp-2">{profile}</p>
              )}
              {c.latest_published_at && (
                <p className="mt-auto pt-3 font-mono text-[11px] tw-muted">
                  Latest {formatDate(c.latest_published_at)}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
