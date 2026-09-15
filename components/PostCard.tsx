import Link from "next/link";
import { ImpactBadge } from "./ImpactBadge";
import { articleUrl, type ArticleCard } from "@/lib/types";
import { excerpt, formatDate, slugify, xmlSchemaDate } from "@/lib/format";

/**
 * Ported from _includes/post_card.html.
 *
 * `data-impact` / `data-subcategory` stay on the article element because the
 * client-side filter chips on the listing pages key off them.
 */
export function PostCard({
  post,
  compact = false,
}: {
  post: ArticleCard;
  compact?: boolean;
}) {
  if (!post.title?.trim()) return null;

  const isStocks = post.tags.includes("stocks");
  // Jekyll rendered `p.excerpt` (the body's opening prose). Fall back to the
  // LLM-written meta description only when there's no body to excerpt.
  const summary = excerpt(post.excerpt, 30) || post.description?.trim();

  return (
    <article
      data-impact={post.impact}
      data-subcategory={post.subcategory}
      className="tw-card rounded-lg p-5 border tw-border hover:border-cyan-600/50 transition-all group"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <ImpactBadge impact={post.impact} />

            <span className="font-mono text-xs tw-muted">{post.category}</span>

            {post.company && (
              <Link
                href={`/companies/${slugify(post.company)}/`}
                className="font-mono text-xs text-cyan-600 hover:text-cyan-500 transition-colors"
              >
                {post.company}
              </Link>
            )}

            {isStocks && (
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                stocks
              </span>
            )}
          </div>

          <h2
            className={`${
              compact ? "text-sm" : "text-base"
            } font-semibold tw-heading leading-snug mb-2 group-hover:text-cyan-600 transition-colors`}
          >
            <Link href={articleUrl(post)}>{post.title}</Link>
          </h2>

          {!compact && summary && (
            <p className="text-sm tw-muted leading-relaxed line-clamp-2 mb-3">
              {summary}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tw-muted">
            <time dateTime={xmlSchemaDate(post.published_at)}>
              {formatDate(post.published_at)}
            </time>

            {post.arxiv_id && (
              <>
                <a
                  href={`https://arxiv.org/abs/${post.arxiv_id}`}
                  className="tw-arxiv-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv
                </a>
                <a
                  href={`https://paperswithcode.com/paper/${post.arxiv_id}`}
                  className="tw-pwc-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  code
                </a>
              </>
            )}

            {post.authors.length > 0 && (
              <span className="opacity-50">
                {post.authors[0]}
                {post.authors.length > 1 && ` +${post.authors.length - 1}`}
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 tw-muted group-hover:text-cyan-600 transition-colors hidden sm:block">
          <svg
            className="w-4 h-4 mt-1"
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
        </div>
      </div>
    </article>
  );
}
