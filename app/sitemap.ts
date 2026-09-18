import type { MetadataRoute } from "next";

import { getAllArticleAddresses, getCompaniesWithCounts, getStories } from "@/lib/queries";
import { shouldNoindex } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

/** Static routes that were Jekyll pages. */
const STATIC_PATHS = [
  "/",
  "/aistocks/",
  "/companies/",
  "/stories/",
  "/models/",
  "/benchmarks/",
  "/search/",
  "/about/",
  "/about/editor/",
  "/contact/",
  "/methodology/",
  "/disclaimer/",
  "/privacy/",
  "/terms/",
  "/alan-turing/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, companies, stories] = await Promise.all([
    getAllArticleAddresses(),
    getCompaniesWithCounts(),
    getStories(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "hourly" : "daily",
    priority: path === "/" ? 1 : 0.7,
  }));

  // Jekyll set <meta name="sitemap" content="false"> on noindexed posts; the
  // same gate keeps thin summaries out of the sitemap here.
  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((a) => !shouldNoindex(a))
    .map((a) => ({
      url: `${site.url}/${a.category}/${a.slug}/`,
      lastModified: new Date(a.published_at),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const companyEntries: MetadataRoute.Sitemap = companies
    .filter((c) => c.primary_count > 0)
    .map((c) => ({
      url: `${site.url}/companies/${c.slug}/`,
      lastModified: c.latest_published_at ? new Date(c.latest_published_at) : now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  const storyEntries: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${site.url}/story/${s.slug}/`,
    lastModified: s.last_updated ? new Date(s.last_updated) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...companyEntries, ...storyEntries];
}
