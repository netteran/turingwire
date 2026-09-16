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
