export type ArticleCategory = "news" | "research";
export type ArticleImpact = "critical" | "major" | "notable" | "minor";
export type ArticleStatus = "published" | "archived" | "draft";

export interface Article {
  id: number;
  slug: string;
  category: ArticleCategory;
  tags: string[];
  status: ArticleStatus;

  title: string;
  description: string | null;
  body: string | null;
  /** First 400 chars of body, generated in Postgres. */
  excerpt: string | null;
  published_at: string;

  subcategory: string;
  impact: ArticleImpact;
  company: string | null;
  secondary_companies: string[];
  classification_confidence: number | null;

  source_publisher: string;
  source_url: string;
  source_truncated: boolean;

  arxiv_id: string | null;
  authors: string[];

  summary_word_count: number;
  quality: "high" | null;

  legacy_slug: string | null;
  legacy_path: string | null;
}

/** Columns needed to render a card; keeps list queries off the body column. */
export type ArticleCard = Pick<
  Article,
  | "id"
  | "slug"
  | "category"
  | "tags"
  | "title"
  | "description"
  | "excerpt"
  | "published_at"
  | "subcategory"
  | "impact"
  | "company"
  | "secondary_companies"
  | "source_publisher"
  | "source_url"
  | "arxiv_id"
  | "authors"
  | "summary_word_count"
  | "quality"
>;

export const CARD_COLUMNS =
  "id,slug,category,tags,title,description,excerpt,published_at,subcategory,impact,company,secondary_companies,source_publisher,source_url,arxiv_id,authors,summary_word_count,quality";

export interface Company {
  id: number;
  slug: string;
  name: string;
  description: string | null;
}

export interface StorySource {
  title: string;
  url: string;
  publisher: string;
  date: string;
  bias?: string;
}

export interface StoryClaim {
  text: string;
  status: "corroborated" | "disputed" | "single_source" | string;
  confidence: number;
  supporting: number[];
  contradicting: number[];
  note?: string;
}

export interface Story {
  id: number;
  slug: string;
  title: string;
  lead: string | null;
  trust_score: number | null;
  companies: string[];
  sources: StorySource[];
  claims: StoryClaim[];
  first_seen: string | null;
  last_updated: string | null;
}

/** Canonical article URL: /news/<slug>/ or /research/<slug>/ */
export const articleUrl = (a: Pick<Article, "category" | "slug">): string =>
  `/${a.category}/${a.slug}/`;

export const companyUrl = (slug: string): string => `/companies/${slug}/`;

export const storyUrl = (slug: string): string => `/story/${slug}/`;
