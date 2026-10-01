import { site } from "./site";
import type { Article, ArticleCategory, ArticleImpact } from "./types";

/** Any article of this length passes the length check. */
export const INDEXABLE_MIN_WORDS = 300;

/**
 * Shorter news passes when it is significant. News summaries are short by
 * design (120–500-word targets), so the flat 300-word bar left 2 of ~1,000
 * quality-checked news articles indexable; indexing the major and critical
 * ones (~190) covers the stories people search for without re-admitting
 * minor filler.
 */
export const INDEXABLE_MIN_WORDS_SIGNIFICANT_NEWS = 150;

const SIGNIFICANT: ArticleImpact[] = ["major", "critical"];

/** The length part of the gate; also used to warn in the Admin article form. */
export function meetsLengthGate(article: {
  category: ArticleCategory;
  impact: ArticleImpact;
  summary_word_count: number;
}): boolean {
  if (article.summary_word_count >= INDEXABLE_MIN_WORDS) return true;
  return (
    article.category === "news" &&
    SIGNIFICANT.includes(article.impact) &&
    article.summary_word_count >= INDEXABLE_MIN_WORDS_SIGNIFICANT_NEWS
  );
}

type GateFields = Pick<
  Article,
  "source_truncated" | "summary_word_count" | "quality" | "category" | "impact"
>;

/**
 * Indexing gate. An article is withheld from search indexes (noindex, and
 * left out of the sitemaps) when it is a truncated-source summary, fails
 * meetsLengthGate(), or — while `requireQualityFlag` is on — was not marked
 * `quality: high`. This is what keeps the thin summary backlog out of
 * Google's index.
 */
export function shouldNoindex(article: GateFields): boolean {
  if (article.source_truncated) return true;
  if (site.requireQualityFlag && article.quality !== "high") return true;
  return !meetsLengthGate(article);
}

/** Metadata.robots value for an article, or undefined to inherit the default. */
export function robotsFor(article: GateFields) {
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
