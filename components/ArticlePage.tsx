import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";

import { ImpactBadge } from "./ImpactBadge";
import { ShareButtons } from "./ShareButtons";
import {
  getAdjacentArticles,
  getArticle,
  getRelatedArticles,
  getStoryForCompany,
} from "@/lib/queries";
import { articleUrl, type ArticleCategory } from "@/lib/types";
import { formatDate, slugify } from "@/lib/format";
import { site, absoluteUrl } from "@/lib/site";

const SECTION_LABEL: Record<ArticleCategory, string> = {
  news: "News",
  research: "Research",
};

/** Ported from _layouts/post.html. */
export async function ArticlePage({
  category,
  slug,
}: {
  category: ArticleCategory;
  slug: string;
}) {
  const article = await getArticle(category, slug);
  if (!article) notFound();

  const [related, story, adjacent] = await Promise.all([
    getRelatedArticles(article),
    article.company ? getStoryForCompany(article.company) : Promise.resolve(null),
    getAdjacentArticles(article),
  ]);

  const canonical = absoluteUrl(articleUrl(article));
  const bodyHtml = marked.parse(article.body ?? "", { async: false }) as string;
  const publishedTime = new Date(article.published_at);

  const isStocks = article.tags.includes("stocks");
  const sectionHref = isStocks ? "/aistocks/" : `/${article.category}/`;
  const sectionLabel = isStocks ? "AIStocks" : SECTION_LABEL[article.category];

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: publishedTime.toISOString(),
    dateModified: publishedTime.toISOString(),
    image: [absoluteUrl(site.logo)],
    publisher: {
      "@type": "Organization",
      name: site.title,
      url: site.url,
      logo: { "@type": "ImageObject", url: absoluteUrl(site.logo) },
    },
    author: {
      "@type": "Person",
      "@id": `${site.url}/about/editor/#editor`,
      name: site.editor.name,
      url: absoluteUrl(site.editor.url),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    about: [
      ...(article.company
        ? [
            {
              "@type": "Organization",
              name: article.company,
              url: `${site.url}/companies/${slugify(article.company)}/`,
            },
          ]
        : []),
      ...article.secondary_companies.map((co) => ({
        "@type": "Organization",
        name: co,
        url: `${site.url}/companies/${slugify(co)}/`,
      })),
    ],
    citation: {
      "@type": "CreativeWork",
      name: article.source_publisher,
      url: article.source_url,
    },
    isBasedOn: article.source_url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionLabel,
        item: `${site.url}${sectionHref}`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 pt-[25px] pb-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        className="text-xs font-mono tw-muted mb-6 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:tw-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={sectionHref} className="hover:tw-accent transition-colors">
          {sectionLabel}
        </Link>
        <span>/</span>
        <span className="truncate max-w-xs">{article.title}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <ImpactBadge impact={article.impact} />
        {article.subcategory && (
          <span className="font-mono text-xs tw-muted border tw-border rounded px-2 py-0.5">
            {article.subcategory.replace(/_/g, " ")}
          </span>
        )}
        {article.company && (
          <Link
            href={`/companies/${slugify(article.company)}/`}
            className="font-mono text-xs tw-muted hover:tw-accent transition-colors"
          >
            {article.company}
          </Link>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tw-heading leading-snug min-w-0 mb-0">
          {article.title}
        </h1>
        <div className="flex-shrink-0 mt-1">
          <ShareButtons
            url={canonical}
            title={article.title}
            summary={article.description}
            variant="popover"
            align="right"
          />
        </div>
      </div>

      {article.category === "research" && (
        <>
          {article.arxiv_id && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a
                href={`https://arxiv.org/abs/${article.arxiv_id}`}
                className="tw-arxiv-badge-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                arXiv:{article.arxiv_id}
              </a>
              <a
                href={`https://paperswithcode.com/paper/${article.arxiv_id}`}
                className="tw-pwc-badge-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Papers with Code →
              </a>
            </div>
          )}
          {article.authors.length > 0 && (
            <p className="text-xs font-mono tw-muted mb-4">
              {article.authors.join(", ")}
            </p>
          )}
        </>
      )}

      <div className="tw-card border tw-border rounded-lg px-5 py-4 mb-8">
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-xs font-mono">
          <div>
            <dt className="tw-muted mb-0.5">Published</dt>
            <dd className="tw-heading font-medium">
              {formatDate(article.published_at)}
              <span className="tw-muted font-normal">
                {" "}
                —{" "}
                {publishedTime.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}{" "}
                UTC
              </span>
            </dd>
          </div>
          {article.arxiv_id && article.category !== "research" && (
            <div>
              <dt className="tw-muted mb-0.5">arXiv</dt>
              <dd>
                <a
                  href={`https://arxiv.org/abs/${article.arxiv_id}`}
                  className="text-cyan-600 hover:text-cyan-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.arxiv_id}
                </a>
              </dd>
            </div>
          )}
        </dl>

        {article.secondary_companies.length > 0 && (
          <div className="mt-3 pt-3 border-t tw-border flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono tw-muted mr-1">
              Also in this story:
            </span>
            {article.secondary_companies.map((co) => (
              <Link
                key={co}
                href={`/companies/${slugify(co)}/`}
                className="inline-block font-mono text-xs tw-muted border tw-border rounded px-2 py-0.5 hover:tw-accent hover:border-cyan-600 transition-colors"
              >
                {co}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div
        className="tw-prose prose-article"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <div className="mt-10 pt-6 border-t tw-border flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/turingwirelogo.png"
          alt="Turing Wire"
          width={36}
          height={36}
          className="w-9 h-9 rounded-md flex-shrink-0 object-contain"
          loading="lazy"
          decoding="async"
        />
        <p className="text-xs font-mono tw-muted leading-relaxed">
          By{" "}
          <Link
            href={site.editor.url}
            className="tw-heading font-medium hover:tw-accent transition-colors"
          >
            {site.editor.name}
          </Link>{" "}
          · {formatDate(article.published_at)} ·{" "}
          <Link href="/about/" className="hover:tw-accent transition-colors">
            Editorial standards →
          </Link>
        </p>
      </div>

      <p className="mt-3 text-xs font-mono tw-muted leading-relaxed">
        Summarised from the primary source with AI assistance under human
        editorial oversight. Turing Wire is not a primary source — read the
        original for the authoritative account.
      </p>

      {article.source_url && (
        <p className="mt-3 text-xs font-mono tw-muted">
          Source:{" "}
          <a
            href={article.source_url}
            className="hover:tw-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.source_publisher || article.source_url}
          </a>
        </p>
      )}

      {related.length > 0 && (
        <aside className="mt-10 pt-6 border-t tw-border">
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            {article.company ? `More on ${article.company}` : "Related coverage"}
          </h2>
          <ul className="space-y-2">
            {related.map((rel) => (
              <li key={rel.id} className="flex items-baseline gap-2 text-sm">
                <Link
                  href={articleUrl(rel)}
                  className="tw-accent hover:underline leading-snug flex-1"
                >
                  {rel.title}
                </Link>
                <span className="text-xs font-mono tw-muted flex-shrink-0">
                  {new Date(rel.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {story && (
        <aside className="mt-10 pt-6 border-t tw-border">
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-3">
            In-depth story
          </h2>
          <Link href={`/story/${story.slug}/`} className="block group">
            <p className="text-sm font-semibold tw-heading leading-snug group-hover:text-cyan-600 transition-colors">
              {story.title}
            </p>
            {story.lead && (
              <p className="mt-1 text-xs tw-muted leading-relaxed line-clamp-2">
                {story.lead}
              </p>
            )}
            <span className="mt-2 inline-block text-xs font-mono text-cyan-600 group-hover:text-cyan-500">
              Multi-source coverage →
            </span>
          </Link>
        </aside>
      )}

      <nav
        className="mt-6 flex justify-between items-center gap-4 text-sm"
        aria-label="Post navigation"
      >
        {adjacent.previous ? (
          <Link
            href={articleUrl(adjacent.previous)}
            className="flex items-center gap-2 tw-muted hover:tw-accent transition-colors min-w-0"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="truncate">{adjacent.previous.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {adjacent.next && (
          <Link
            href={articleUrl(adjacent.next)}
            className="flex items-center gap-2 tw-muted hover:tw-accent transition-colors min-w-0 text-right"
          >
            <span className="truncate">{adjacent.next.title}</span>
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </nav>
    </article>
  );
}
