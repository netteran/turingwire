import type { Metadata } from "next";

import { getArticle } from "./queries";
import { robotsFor } from "./seo";
import { site, absoluteUrl } from "./site";
import { excerpt } from "./format";
import { OG_IMAGE_SIZE, ogImageUrl } from "./ogImage";
import { articleUrl, type ArticleCategory } from "./types";

/** Per-article <head>, ported from _layouts/default.html's post branch. */
export async function articleMetadata(
  category: ArticleCategory,
  slug: string,
): Promise<Metadata> {
  const article = await getArticle(category, slug);
  if (!article) return { title: "Not found", robots: { index: false, follow: false } };

  const description =
    article.description?.trim() || excerpt(article.body, 40) || site.description;
  const url = absoluteUrl(articleUrl(article));
  const image = ogImageUrl(article.category, article.slug);

  return {
    title: article.title,
    description,
    robots: robotsFor(article),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url,
      siteName: site.title,
      publishedTime: new Date(article.published_at).toISOString(),
      modifiedTime: new Date(articleModifiedAt(article)).toISOString(),
      images: [{ url: image, ...OG_IMAGE_SIZE, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [image],
    },
  };
}

/**
 * When the article last changed. `updated_at` is bumped by a trigger on any
 * row update (the pipeline only inserts; edits come from Admin), so it is a
 * real signal — unlike echoing `published_at`, which told Google nothing.
 */
export function articleModifiedAt(article: { published_at: string; updated_at?: string | null }): string {
  const published = new Date(article.published_at).getTime();
  const updated = article.updated_at ? new Date(article.updated_at).getTime() : NaN;
  return Number.isFinite(updated) && updated > published ? article.updated_at! : article.published_at;
}
