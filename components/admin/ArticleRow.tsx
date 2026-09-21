"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { setArticleStatus } from "@/app/admin/actions";

interface Row {
  id: number;
  title: string;
  slug: string;
  category: "news" | "research";
  status: "published" | "archived" | "draft";
  company: string | null;
  published_at: string;
}

export function ArticleRow({ article }: { article: Row }) {
  const [status, setStatus] = useState(article.status);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const toggle = () => {
    const next = status === "published" ? "archived" : "published";
    startTransition(async () => {
      setError(null);
      try {
        await setArticleStatus(article.id, next);
        setStatus(next);
      } catch (e) {
        // Re-publishing a body-less archived row trips the
        // published_requires_body constraint, which is the intended guard.
        setError(e instanceof Error ? e.message : "Update failed");
      }
    });
  };

  return (
    <tr className={`border-b tw-border last:border-0 ${pending ? "opacity-60" : ""}`}>
      <td className="px-3 py-2 min-w-0">
        <a
          href={`/${article.category}/${article.slug}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="tw-heading text-sm hover:tw-accent line-clamp-1"
        >
          {article.title}
        </a>
        {error && (
          <div className="text-xs font-mono mt-1" style={{ color: "#ef4444" }}>
            {error}
          </div>
        )}
      </td>
      <td className="px-3 py-2 font-mono text-xs tw-muted">{article.category}</td>
      <td className="px-3 py-2 font-mono text-xs tw-muted">{article.company ?? "—"}</td>
      <td className="px-3 py-2 font-mono text-xs tw-muted whitespace-nowrap">
        {article.published_at.slice(0, 10)}
      </td>
      <td className="px-3 py-2">
        <span
          className="font-mono text-xs"
          style={{ color: status === "published" ? "#16a34a" : "var(--fg-muted)" }}
        >
          {status}
        </span>
      </td>
      <td className="px-3 py-2 text-right whitespace-nowrap">
        <Link
          href={`/admin/articles/${article.id}`}
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          edit
        </Link>
        <span className="mx-2 tw-muted">·</span>
        <button
          onClick={toggle}
          disabled={pending}
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          {status === "published" ? "archive" : "publish"}
        </button>
      </td>
    </tr>
  );
}
