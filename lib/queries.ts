import { getSupabase } from "./supabase";
import {
  CARD_COLUMNS,
  type Article,
  type ArticleCard,
  type ArticleCategory,
  type ArticleImpact,
  type Company,
  type Story,
} from "./types";

/**
 * Data access for the site.
 *
 * Every helper here replaces a Liquid expression that used to iterate
 * `site.posts` in memory at build time. RLS restricts all of them to
 * status = 'published', so body-less archived rows never surface.
 */

const cards = () => getSupabase().from("articles").select(CARD_COLUMNS);

/** Newest articles across every section. */
export async function getRecentArticles(limit = 120): Promise<ArticleCard[]> {
  const { data, error } = await cards()
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as ArticleCard[];
}

/** Newest articles in one section, with an offset for pagination. */
export async function getArticlesByCategory(
  category: ArticleCategory,
  { limit = 20, offset = 0 }: { limit?: number; offset?: number } = {},
): Promise<ArticleCard[]> {
  const { data, error } = await cards()
    .eq("category", category)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data ?? []) as unknown as ArticleCard[];
}

export async function countArticlesByCategory(
  category: ArticleCategory,
): Promise<number> {
  const { count, error } = await getSupabase()
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("category", category);
  if (error) throw error;
  return count ?? 0;
}

export async function countAllArticles(): Promise<number> {
  const { count, error } = await getSupabase()
    .from("articles")
    .select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

/** Articles carrying a secondary tag, e.g. 'stocks' for /aistocks/. */
export async function getArticlesByTag(
  tag: string,
  limit = 60,
): Promise<ArticleCard[]> {
  const { data, error } = await cards()
    .contains("tags", [tag])
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as ArticleCard[];
}

/** Articles at or above an impact level — backs the major+ feed and the homepage rail. */
export async function getArticlesByImpact(
  impacts: ArticleImpact[],
  limit = 50,
): Promise<ArticleCard[]> {
  const { data, error } = await cards()
    .in("impact", impacts)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as ArticleCard[];
}

/** One article by its canonical /<category>/<slug>/ address. */
export async function getArticle(
  category: ArticleCategory,
  slug: string,
): Promise<Article | null> {
  const { data, error } = await getSupabase()
    .from("articles")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Article) ?? null;
}

/**
 * Resolve an old Jekyll permalink to its new address.
 * Looks past RLS-invisible rows deliberately: an archived article still
 * redirects, it just renders as a stub rather than 404ing a live inbound link.
 */
export async function resolveLegacyPath(
  legacyPath: string,
): Promise<{ category: ArticleCategory; slug: string } | null> {
  const { data, error } = await getSupabase()
    .from("articles")
    .select("category,slug")
    .eq("legacy_path", legacyPath)
    .maybeSingle();
  if (error) throw error;
  return (data as { category: ArticleCategory; slug: string }) ?? null;
}

/**
 * Related articles for a post page: same company first, falling back to the
 * same subcategory — mirroring the old post.html logic.
 */
export async function getRelatedArticles(
  article: Pick<Article, "id" | "company" | "subcategory">,
  limit = 4,
): Promise<ArticleCard[]> {
  if (article.company) {
    const { data, error } = await cards()
      .eq("company", article.company)
      .neq("id", article.id)
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    if (data && data.length > 0) return data as unknown as ArticleCard[];
  }

  const { data, error } = await cards()
    .eq("subcategory", article.subcategory)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as ArticleCard[];
}

/** Every article mentioning a company, as primary subject or secondary mention. */
export async function getArticlesForCompany(
  name: string,
  limit = 100,
): Promise<{ primary: ArticleCard[]; secondary: ArticleCard[] }> {
  const [primaryRes, secondaryRes] = await Promise.all([
    cards().eq("company", name).order("published_at", { ascending: false }).limit(limit),
    cards()
      .contains("secondary_companies", [name])
      .order("published_at", { ascending: false })
      .limit(limit),
  ]);
  if (primaryRes.error) throw primaryRes.error;
  if (secondaryRes.error) throw secondaryRes.error;
  return {
    primary: (primaryRes.data ?? []) as unknown as ArticleCard[],
    secondary: (secondaryRes.data ?? []) as unknown as ArticleCard[],
  };
}

export interface CompanyCount {
  name: string;
  slug: string;
  description: string | null;
  /** Articles where this company is the primary subject. */
  primary_count: number;
  /** Articles where it appears only in secondary_companies. */
  mention_count: number;
  article_count: number;
  latest_published_at: string | null;
}

/** Companies with coverage counts, busiest first. */
export async function getCompaniesWithCounts(): Promise<CompanyCount[]> {
  const { data, error } = await getSupabase()
    .from("company_article_counts")
    .select("*")
    .gt("article_count", 0)
    .order("primary_count", { ascending: false })
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CompanyCount[];
}

export async function getCompany(slug: string): Promise<Company | null> {
  const { data, error } = await getSupabase()
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Company) ?? null;
}

/** Primary-coverage count for one company, to gate indexing of thin profiles. */
export async function getCompanyPrimaryCount(slug: string): Promise<number> {
  const { data, error } = await getSupabase()
    .from("company_article_counts")
    .select("primary_count")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as { primary_count: number } | null)?.primary_count ?? 0;
}

export async function getStories(): Promise<Story[]> {
  const { data, error } = await getSupabase()
    .from("stories")
    .select("*")
    .order("last_updated", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Story[];
}

export async function getStory(slug: string): Promise<Story | null> {
  const { data, error } = await getSupabase()
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Story) ?? null;
}

/** Full-text search backing /search/. */
export async function searchArticles(
  query: string,
  { limit = 50, category }: { limit?: number; category?: ArticleCategory } = {},
): Promise<Article[]> {
  if (!query.trim()) return [];
  const { data, error } = await getSupabase().rpc("search_articles", {
    search_query: query,
    result_limit: limit,
    filter_category: category ?? null,
  });
  if (error) throw error;
  return (data ?? []) as Article[];
}

/** Every published article address, for the sitemap. */
export async function getAllArticleAddresses(): Promise<
  { category: ArticleCategory; slug: string; published_at: string; quality: "high" | null; summary_word_count: number; source_truncated: boolean }[]
> {
  const pageSize = 1000;
  const all: {
    category: ArticleCategory;
    slug: string;
    published_at: string;
    quality: "high" | null;
    summary_word_count: number;
    source_truncated: boolean;
  }[] = [];

  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await getSupabase()
      .from("articles")
      .select("category,slug,published_at,quality,summary_word_count,source_truncated")
      .order("published_at", { ascending: false })
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...(data as typeof all));
    if (data.length < pageSize) break;
  }
  return all;
}

/**
 * Every legacy Jekyll permalink that now 301s to a current article, for the
 * temporary redirect sitemap (see app/sitemap-legacy.xml). Paginated because
 * there are ~5,200 of them — well past Supabase's 1,000-row default cap.
 */
export async function getAllLegacyPaths(): Promise<string[]> {
  const pageSize = 1000;
  const all: string[] = [];

  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await getSupabase()
      .from("articles")
      .select("legacy_path")
      .not("legacy_path", "is", null)
      .order("legacy_path", { ascending: true })
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...(data as { legacy_path: string }[]).map((r) => r.legacy_path));
    if (data.length < pageSize) break;
  }
  return all;
}

/**
 * Chronological neighbours, replacing Jekyll's page.previous / page.next.
 * "previous" is the older article, matching Jekyll's ordering.
 */
export async function getAdjacentArticles(article: Pick<Article, "published_at">): Promise<{
  previous: Pick<Article, "title" | "slug" | "category"> | null;
  next: Pick<Article, "title" | "slug" | "category"> | null;
}> {
  const [prevRes, nextRes] = await Promise.all([
    getSupabase()
      .from("articles")
      .select("title,slug,category")
      .lt("published_at", article.published_at)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    getSupabase()
      .from("articles")
      .select("title,slug,category")
      .gt("published_at", article.published_at)
      .order("published_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return {
    previous: (prevRes.data as Pick<Article, "title" | "slug" | "category">) ?? null,
    next: (nextRes.data as Pick<Article, "title" | "slug" | "category">) ?? null,
  };
}

/** First story that covers a company, for the post page's in-depth rail. */
export async function getStoryForCompany(company: string): Promise<Story | null> {
  const { data, error } = await getSupabase()
    .from("stories")
    .select("*")
    .contains("companies", [company])
    .order("last_updated", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as Story) ?? null;
}

/** Distinct subcategories present in a section, for the filter chips. */
export async function getSubcategories(category?: ArticleCategory): Promise<string[]> {
  let q = getSupabase().from("articles").select("subcategory");
  if (category) q = q.eq("category", category);
  const { data, error } = await q.limit(2000);
  if (error) throw error;
  const set = new Set((data ?? []).map((r) => (r as { subcategory: string }).subcategory));
  return [...set].sort();
}
