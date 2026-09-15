import type { Metadata } from "next";
import Link from "next/link";

import { PostCard } from "@/components/PostCard";
import { searchArticles } from "@/lib/queries";
import type { ArticleCard, ArticleCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Turing Wire's AI news and research coverage.",
  alternates: { canonical: "/search/" },
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", category } = await searchParams;
  const query = q.trim();
  const filter: ArticleCategory | undefined =
    category === "news" || category === "research" ? category : undefined;

  const results = query ? await searchArticles(query, { limit: 50, category: filter }) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tw-heading">Search</h1>
        <p className="text-sm tw-muted mt-1 font-mono">
          Full-text across every published article
        </p>
      </header>

      <form action="/search/" method="get" className="mb-6" role="search">
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="tw-input flex-1 min-w-0 font-mono text-sm"
            autoFocus
          />
          <button type="submit" className="tw-btn-primary font-mono text-sm px-4">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { value: "", label: "Everything" },
            { value: "news", label: "News" },
            { value: "research", label: "Research" },
          ].map((opt) => (
            <Link
              key={opt.value || "all"}
              href={`/search/?q=${encodeURIComponent(query)}${opt.value ? `&category=${opt.value}` : ""}`}
              className={`tw-filter-chip text-xs${
                (filter ?? "") === opt.value ? " active" : ""
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </form>

      {!query ? (
        <p className="tw-muted text-sm font-mono">
          Enter a search term to begin.
        </p>
      ) : results.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">
            No results for &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs font-mono tw-muted mb-4">
            {results.length} result{results.length !== 1 && "s"} for &ldquo;{query}&rdquo;
          </p>
          <div className="space-y-3">
            {results.map((post) => (
              <PostCard key={post.id} post={post as unknown as ArticleCard} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
