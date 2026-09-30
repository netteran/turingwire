import {
  getAllArticleAddresses,
  getArticlesByCategory,
  getCompaniesWithCounts,
  getRecentArticles,
  getStories,
} from "./queries";
import { articleModifiedAt } from "./articleMetadata";
import { shouldNoindex } from "./seo";
import { site } from "./site";
import type { ArticleCategory } from "./types";

/**
 * Sitemaps, split by page type behind a sitemap index at /sitemap.xml.
 *
 * One sitemap per type lets Search Console's Page Indexing report show the
 * indexed ratio of each (hubs vs articles vs companies vs stories), which is
 * the main measure of whether the SEO recovery is working.
 *
 * `lastmod` is only emitted where it is real. It used to be "now" on every
 * request for static pages, which teaches Google to ignore it site-wide.
 */

export const SITEMAP_TYPES = ["pages", "news", "research", "stories", "companies"] as const;
export type SitemapType = (typeof SITEMAP_TYPES)[number];

export type SitemapEntry = { path: string; lastModified?: string | null };

/** Indexable editorial and data pages. Noindexed pages (/search/,
 * /methodology/, …) are deliberately absent: a sitemap must not list them. */
const STATIC_PATHS = [
  "/aistocks/",
  "/models/",
  "/benchmarks/",
  "/stories/",
  "/publications/",
  "/about/",
  "/about/editor/",
  "/contact/",
  "/disclaimer/",
  "/privacy/",
  "/terms/",
  "/alan-turing/",
];

async function latestPublished(category?: ArticleCategory): Promise<string | null> {
  const rows = category
    ? await getArticlesByCategory(category, { limit: 1 })
    : await getRecentArticles(1);
  return rows[0]?.published_at ?? null;
}

async function pageEntries(): Promise<SitemapEntry[]> {
  const [home, news, research] = await Promise.all([
    latestPublished(),
    latestPublished("news"),
    latestPublished("research"),
  ]);
  return [
    { path: "/", lastModified: home },
    { path: "/news/", lastModified: news },
    { path: "/research/", lastModified: research },
    ...STATIC_PATHS.map((path) => ({ path })),
  ];
}

async function articleEntries(category: ArticleCategory): Promise<SitemapEntry[]> {
  const articles = await getAllArticleAddresses(category);
  // Same gate as the page's robots meta: thin summaries stay out.
  return articles
    .filter((a) => !shouldNoindex(a))
    .map((a) => ({
      path: `/${a.category}/${a.slug}/`,
      lastModified: articleModifiedAt(a),
    }));
}

async function companyEntries(): Promise<SitemapEntry[]> {
  const companies = await getCompaniesWithCounts();
  // Same gate as robotsForCompany(): no primary coverage means noindex.
  return companies
    .filter((c) => c.primary_count > 0)
    .map((c) => ({
      path: `/companies/${c.slug}/`,
      lastModified: c.latest_published_at,
    }));
}

async function storyEntries(): Promise<SitemapEntry[]> {
  const stories = await getStories();
  return stories.map((s) => ({
    path: `/story/${s.slug}/`,
    lastModified: s.last_updated,
  }));
}

export function sitemapEntries(type: SitemapType): Promise<SitemapEntry[]> {
  switch (type) {
    case "pages":
      return pageEntries();
    case "news":
      return articleEntries("news");
    case "research":
      return articleEntries("research");
    case "stories":
      return storyEntries();
    case "companies":
      return companyEntries();
  }
}

export function sitemapUrl(type: SitemapType): string {
  return `${site.url}/sitemap-${type}.xml`;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });
}

function isoDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
};

export function urlsetResponse(entries: SitemapEntry[]): Response {
  const urls = entries
    .map((e) => {
      const lastmod = isoDate(e.lastModified);
      return `<url><loc>${escapeXml(`${site.url}${e.path}`)}</loc>${
        lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
      }</url>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: XML_HEADERS },
  );
}

export function sitemapIndexResponse(): Response {
  const items = SITEMAP_TYPES.map(
    (type) => `<sitemap><loc>${escapeXml(sitemapUrl(type))}</loc></sitemap>`,
  ).join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`,
    { headers: XML_HEADERS },
  );
}
