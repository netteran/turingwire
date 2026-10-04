import { excerpt, slugify } from "./format";
import type { ArticleCard } from "./types";

/**
 * The section feed's data, split so page 1 of /news/ and /research/ stays
 * small.
 *
 * The hub page used to embed every card in the section (~3,000 each) so the
 * filters could run client-side. That made each page several MB, and since
 * Vercel bills ISR writes per 8 KB, re-rendering the two hubs on every ingest
 * run used up most of the plan's monthly ISR writes and origin transfer on
 * its own. Now the page carries the first batch plus the filter facets, and
 * the full list comes from /api/feed/<category>/ (CDN-cached, no ISR) the
 * first time a reader filters or scrolls past it.
 */

/** Cards server-rendered on page 1; the rest load on demand. */
export const FEED_INITIAL = 30;

export interface FeedFacets {
  total: number;
  /** Articles per subcategory, for the topic chip counts. */
  topicCounts: Record<string, number>;
  /** Every company tagged in the section (primary or secondary), A–Z. */
  companies: { slug: string; name: string }[];
}

export function feedFacets(posts: ArticleCard[]): FeedFacets {
  const topicCounts: Record<string, number> = {};
  const bySlug = new Map<string, string>();
  for (const p of posts) {
    if (p.subcategory) topicCounts[p.subcategory] = (topicCounts[p.subcategory] ?? 0) + 1;
    for (const name of [p.company, ...(p.secondary_companies ?? [])]) {
      const trimmed = name?.trim();
      if (!trimmed) continue;
      const slug = slugify(trimmed);
      if (slug && !bySlug.has(slug)) bySlug.set(slug, trimmed);
    }
  }
  const companies = [...bySlug]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return { total: posts.length, topicCounts, companies };
}

/**
 * A card trimmed to what PostCard and the filters read: the excerpt is cut to
 * the 30 words the card shows, the description is folded into it, and the
 * author list keeps only the first name (the rest become empty strings so the
 * card's "+N" count still holds).
 */
export function toFeedCard(p: ArticleCard): ArticleCard {
  // Built field by field, so nothing else rides along if CARD_COLUMNS grows.
  return {
    id: p.id,
    slug: p.slug,
    category: p.category,
    tags: p.tags ?? [],
    title: p.title,
    description: null,
    excerpt: excerpt(p.excerpt, 30) || p.description?.trim() || null,
    published_at: p.published_at,
    subcategory: p.subcategory,
    impact: p.impact,
    company: p.company,
    secondary_companies: p.secondary_companies ?? [],
    source_publisher: p.source_publisher,
    source_url: "",
    arxiv_id: p.arxiv_id,
    authors: p.authors?.length ? [p.authors[0], ...Array<string>(p.authors.length - 1).fill("")] : [],
    summary_word_count: 0,
    quality: null,
  };
}
