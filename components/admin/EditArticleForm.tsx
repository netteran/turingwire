"use client";

import { useState, useTransition } from "react";
import { updateArticle } from "@/app/admin/actions";
import type { Article, ArticleCategory, ArticleImpact, ArticleStatus } from "@/lib/types";

export function EditArticleForm({ article }: { article: Article }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={(formData: FormData) =>
        startTransition(async () => {
          setError(null);
          setSaved(false);
          try {
            await updateArticle(article.id, article.slug, {
              title: String(formData.get("title") ?? "").trim(),
              description: String(formData.get("description") ?? "").trim() || null,
              body: String(formData.get("body") ?? ""),
              category: String(formData.get("category")) as ArticleCategory,
              subcategory: String(formData.get("subcategory") ?? "").trim() || "other",
              company: String(formData.get("company") ?? "").trim() || null,
              impact: String(formData.get("impact")) as ArticleImpact,
              status: String(formData.get("status")) as ArticleStatus,
              tags: String(formData.get("tags") ?? "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            });
            setSaved(true);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Save failed");
          }
        })
      }
      className="tw-card border tw-border rounded-lg p-4 grid gap-3 max-w-3xl"
    >
      <p className="text-xs font-mono tw-muted">
        {article.category}/{article.slug} · published {article.published_at.slice(0, 10)}
      </p>

      <label className="text-xs font-mono tw-muted">
        Title
        <input
          name="title"
          defaultValue={article.title}
          required
          className="tw-input w-full font-mono text-sm mt-1"
        />
      </label>

      <label className="text-xs font-mono tw-muted">
        Description
        <textarea
          name="description"
          defaultValue={article.description ?? ""}
          rows={2}
          className="tw-input w-full text-sm mt-1"
        />
      </label>

      <label className="text-xs font-mono tw-muted">
        Body (Markdown)
        <textarea
          name="body"
          defaultValue={article.body ?? ""}
          rows={18}
          className="tw-input w-full text-sm mt-1 font-mono"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-mono tw-muted">
          Section
          <select
            name="category"
            defaultValue={article.category}
            className="tw-input w-full font-mono text-sm mt-1"
          >
            <option value="news">news</option>
            <option value="research">research</option>
          </select>
        </label>

        <label className="text-xs font-mono tw-muted">
          Subcategory
          <input
            name="subcategory"
            defaultValue={article.subcategory}
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted">
          Company
          <input
            name="company"
            defaultValue={article.company ?? ""}
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>

        <label className="text-xs font-mono tw-muted">
          Impact
          <select
            name="impact"
            defaultValue={article.impact}
            className="tw-input w-full font-mono text-sm mt-1"
          >
            <option value="critical">critical</option>
            <option value="major">major</option>
            <option value="notable">notable</option>
            <option value="minor">minor</option>
          </select>
        </label>

        <label className="text-xs font-mono tw-muted">
          Status
          <select
            name="status"
            defaultValue={article.status}
            className="tw-input w-full font-mono text-sm mt-1"
          >
            <option value="published">published</option>
            <option value="archived">archived</option>
            <option value="draft">draft</option>
          </select>
        </label>

        <label className="text-xs font-mono tw-muted">
          Tags (comma separated)
          <input
            name="tags"
            defaultValue={article.tags.join(", ")}
            className="tw-input w-full font-mono text-sm mt-1"
          />
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="tw-btn-primary font-mono text-sm px-4 py-2 disabled:opacity-50"
        >
          {pending ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
        </button>
        {error && (
          <span className="text-xs font-mono" style={{ color: "#ef4444" }}>
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
