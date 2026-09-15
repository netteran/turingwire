import { site, absoluteUrl } from "./site";
import { excerpt, rfc822Date } from "./format";
import { articleUrl, type ArticleCard } from "./types";

/** Jekyll's `xml_escape`. */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface FeedOptions {
  title: string;
  description: string;
  link: string;
  selfPath: string;
  posts: ArticleCard[];
  /** Emit an <category> for the impact level, as feed-major.xml did. */
  includeImpact?: boolean;
}

export function buildRssFeed({
  title,
  description,
  link,
  selfPath,
  posts,
  includeImpact = false,
}: FeedOptions): string {
  const now = rfc822Date(new Date().toISOString());

  const items = posts
    .map((post) => {
      const url = absoluteUrl(articleUrl(post));
      const summary = post.description?.trim() || excerpt(post.excerpt, 45);
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <description>${xmlEscape(summary)}</description>
      <pubDate>${rfc822Date(post.published_at)}</pubDate>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
${post.company ? `      <category>${xmlEscape(post.company)}</category>\n` : ""}${
        includeImpact ? `      <category>${post.impact}</category>\n` : ""
      }    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(title)}</title>
    <description>${xmlEscape(description)}</description>
    <link>${xmlEscape(link)}</link>
    <atom:link href="${xmlEscape(absoluteUrl(selfPath))}" rel="self" type="application/rss+xml"/>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>
`;
}

export const FEED_HEADERS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
};

export const siteTitle = site.title;
