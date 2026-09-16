import { site } from "./site";
import type { Article } from "./types";

/**
 * Indexing gate, ported verbatim from _layouts/default.html.
 *
 * An article is withheld from search indexes when it is a truncated-source
 * summary, is under 300 words, or — while `requireQualityFlag` is on — was not
 * marked `quality: high` by the improved pipeline. This is what withdrew the
 * thin AI-summary backlog from Google's index, so it has to survive the move.
 */
export function shouldNoindex(
  article: Pick<Article, "source_truncated" | "summary_word_count" | "quality">,
): boolean {
  if (article.source_truncated) return true;
  if (article.summary_word_count < 300) return true;
  if (site.requireQualityFlag && article.quality !== "high") return true;
  return false;
}

/** Metadata.robots value for an article, or undefined to inherit the default. */
export function robotsFor(
  article: Pick<Article, "source_truncated" | "summary_word_count" | "quality">,
) {
  return shouldNoindex(article)
    ? { index: false, follow: true }
    : { index: true, follow: true };
}

/**
 * Same gate for company pages: with no article where this company is the
 * primary subject, the page is just a boilerplate header over "also
 * mentioned" cards (or nothing at all) — a near-duplicate template repeated
 * across every such slug. That pattern is exactly what got the thin-summary
 * backlog excluded above, so it gets the same treatment instead of sitting
 * in Search Console as "crawled/discovered — not indexed".
 */
export function shouldNoindexCompany(company: { primaryCount: number }): boolean {
  return company.primaryCount <= 0;
}

export function robotsForCompany(company: { primaryCount: number }) {
  return shouldNoindexCompany(company)
    ? { index: false, follow: true }
    : { index: true, follow: true };
}
