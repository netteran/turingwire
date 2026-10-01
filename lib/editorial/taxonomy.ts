import type { ArticleCategory, ArticleImpact } from "@/lib/types";

/**
 * Subcategories the classifier may assign (prompt.classify.user). Used by
 * the Admin article form; safe to import from client components.
 */
export const SUBCATEGORIES: Record<ArticleCategory, string[]> = {
  news: [
    "product_launch",
    "model_release",
    "partnership",
    "regulation_policy",
    "safety_alignment",
    "safety_leadership_exits",
    "model_welfare_ethics",
    "infrastructure_compute",
    "power_infrastructure",
    "agi_timelines",
    "content_ecosystem",
    "hiring_org_changes",
    "opinion_essay",
    "funding_round",
    "other",
  ],
  research: [
    "foundation_models",
    "alignment_safety",
    "interpretability",
    "reasoning",
    "multimodal",
    "agents_robotics",
    "training_methods",
    "evaluation_benchmarks",
    "theory",
    "efficiency_inference",
    "other",
  ],
};

export const IMPACT_LEVELS: ArticleImpact[] = ["critical", "major", "notable", "minor"];
