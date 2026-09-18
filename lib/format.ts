import { slugify } from "./slugify";
import type { ArticleCard } from "./types";

/** "Sep 15, 2026" — matches Jekyll's `date: "%b %-d, %Y"`. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** ISO-8601, matching Jekyll's `date_to_xmlschema`. */
export function xmlSchemaDate(iso: string): string {
  return new Date(iso).toISOString();
}

/** RFC-822, matching Jekyll's `date_to_rfc822` for RSS feeds. */
export function rfc822Date(iso: string): string {
  return new Date(iso).toUTCString();
}

/** Strip markdown to plain prose, for excerpts and feed descriptions. */
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Jekyll's `truncatewords` filter. */
export function truncateWords(text: string, count: number, suffix = "…"): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= count) return words.join(" ");
  return words.slice(0, count).join(" ") + suffix;
}

/** Excerpt for a card: first ~30 words of the body. */
export function excerpt(body: string | null, words = 30): string {
  if (!body) return "";
  return truncateWords(stripMarkdown(body), words);
}

/** Group articles by their UTC calendar day, preserving order. */
export function groupByDay(posts: ArticleCard[]): { date: string; items: ArticleCard[] }[] {
  const groups: { date: string; items: ArticleCard[] }[] = [];
  for (const post of posts) {
    const date = post.published_at.slice(0, 10);
    const last = groups[groups.length - 1];
    if (last && last.date === date) last.items.push(post);
    else groups.push({ date, items: [post] });
  }
  return groups;
}

export { slugify };
