import type { Metadata } from "next";

import { getArticle } from "./queries";
import { robotsFor } from "./seo";
import { site, absoluteUrl } from "./site";
import { excerpt } from "./format";
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
      images: [{ url: site.logo, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [site.logo],
    },
  };
}
