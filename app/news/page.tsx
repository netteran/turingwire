import type { Metadata } from "next";
import { FilteredPostList } from "@/components/FilteredPostList";
import { getArticlesByCategory } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "News",
  description:
    "AI industry news — product launches, model releases, funding, policy, and more.",
  alternates: { canonical: "/news/" },
};

const SUBCATEGORY_CHIPS = [
  { value: "model_release", label: "Model releases" },
  { value: "product_launch", label: "Product launches" },
  { value: "funding_round", label: "Funding" },
  { value: "regulation_policy", label: "Policy" },
  { value: "safety_alignment", label: "Safety" },
  { value: "infrastructure_compute", label: "Infrastructure" },
  { value: "partnership", label: "Partnerships" },
];

export default async function NewsPage() {
  const posts = await getArticlesByCategory("news", { limit: 60 });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tw-heading">News</h1>
        <p className="text-sm tw-muted mt-1 font-mono">AI industry coverage</p>
      </header>

      {posts.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">
            No news articles indexed yet.
          </p>
        </div>
      ) : (
        <FilteredPostList posts={posts} subcategoryChips={SUBCATEGORY_CHIPS} />
      )}
    </div>
  );
}
