import type { Metadata } from "next";
import { PublicationsFeed } from "@/components/PublicationsFeed";
import { getArticlesByCategory, getCompaniesWithCounts } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "All Publications",
  description:
    "Every Turing Wire article — AI news and research — filterable by section, category, impact, and company.",
  alternates: { canonical: "/publications/" },
};

// Generous, bounded window rather than true pagination: comfortably deeper
// than any single filter combination needs, without an unbounded query.
const FETCH_LIMIT = 150;

export default async function PublicationsPage() {
  const [news, research, companies] = await Promise.all([
    getArticlesByCategory("news", { limit: FETCH_LIMIT }),
    getArticlesByCategory("research", { limit: FETCH_LIMIT }),
    getCompaniesWithCounts(),
  ]);

  const posts = [...news, ...research]
    .filter((p) => p.title?.trim())
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  const companyOptions = companies
    .filter((c) => c.primary_count > 0)
    .map((c) => ({ slug: c.slug, name: c.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const todayUtc = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tw-heading">All Publications</h1>
        <p className="text-sm tw-muted mt-1 font-mono">
          Every article — news and research — in one filterable feed
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No articles indexed yet.</p>
        </div>
      ) : (
        <PublicationsFeed posts={posts} companies={companyOptions} todayUtc={todayUtc} />
      )}
    </div>
  );
}
