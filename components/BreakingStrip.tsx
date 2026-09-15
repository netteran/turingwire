"use client";

import Link from "next/link";
import { useState } from "react";
import { articleUrl, type ArticleCard } from "@/lib/types";

/** Dismissible breaking banner, shown for a critical article under 6h old. */
export function BreakingStrip({ post }: { post: ArticleCard }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div id="breaking-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-shrink-0 font-semibold tracking-widest text-red-200 uppercase">
            Breaking
          </span>
          <span className="hidden sm:block text-red-200">·</span>
          <Link href={articleUrl(post)} className="truncate">
            {post.title}
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-70 hover:opacity-100"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
