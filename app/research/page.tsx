import type { Metadata } from "next";
import { FilteredPostList } from "@/components/FilteredPostList";
import { getArticlesByCategory } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Research",
  description:
    "AI research paper summaries for practitioners — arXiv, Nature, JMLR, and conference proceedings. Problem, method, results, and why it matters for what you're building.",
  alternates: { canonical: "/research/" },
};

const SUBCATEGORY_CHIPS = [
  { value: "foundation_models", label: "Foundation models" },
  { value: "reasoning", label: "Reasoning" },
  { value: "alignment_safety", label: "Alignment / Safety" },
  { value: "interpretability", label: "Interpretability" },
  { value: "agents_robotics", label: "Agents / Robotics" },
  { value: "multimodal", label: "Multimodal" },
  { value: "efficiency_inference", label: "Efficiency" },
  { value: "training_methods", label: "Training" },
];

export default async function ResearchPage() {
  const posts = await getArticlesByCategory("research", { limit: 60 });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">Research</h1>
        <p className="text-sm tw-muted mt-1 font-mono">
          arXiv · Nature · JMLR · conference proceedings
        </p>
        <p className="text-sm tw-muted mt-2 max-w-2xl">
          Paper summaries structured for practitioners: problem, method, results,
          and why it matters. Each summary links to the original and arXiv where
          available.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">
            No research articles indexed yet.
          </p>
        </div>
      ) : (
        <FilteredPostList posts={posts} subcategoryChips={SUBCATEGORY_CHIPS} />
      )}
    </div>
  );
}
