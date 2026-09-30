import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { ArticleRow } from "@/components/admin/ArticleRow";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 40;

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string; origin?: string }>;
}) {
  const { q = "", status = "published", page = "1", origin = "all" } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const from = (pageNum - 1) * PAGE_SIZE;

  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select("id,title,slug,category,status,impact,company,published_at,origin", { count: "exact" })
    .order("published_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (status !== "all") query = query.eq("status", status);
  if (q.trim()) query = query.ilike("title", `%${q.trim()}%`);
  if (origin === "editor") query = query.in("origin", ["editor", "editor_ai"]);
  if (origin === "pipeline") query = query.eq("origin", "pipeline");

  const qs = (p: number) =>
    `/admin/articles?q=${encodeURIComponent(q)}&status=${status}&origin=${origin}&page=${p}`;

  const { data, count, error } = await query;

  return (
    <>
      <div className="flex justify-end mb-3">
        <Link href="/admin/articles/new" className="tw-btn-primary font-mono text-sm px-4 py-2">
          + New article
        </Link>
      </div>
      <form className="flex flex-wrap gap-2 mb-4" action="/admin/articles">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search titles…"
          className="tw-input font-mono text-sm flex-1 min-w-48"
        />
        <select name="status" defaultValue={status} className="tw-input font-mono text-sm">
          <option value="published">published</option>
          <option value="archived">archived</option>
          <option value="draft">draft</option>
          <option value="all">all</option>
        </select>
        <select name="origin" defaultValue={origin} className="tw-input font-mono text-sm">
          <option value="all">any byline</option>
          <option value="editor">editor articles</option>
          <option value="pipeline">desk (pipeline)</option>
        </select>
        <button type="submit" className="tw-filter-chip text-xs">Filter</button>
      </form>

      {error ? (
        <p className="text-xs font-mono" style={{ color: "#ef4444" }}>
          {error.message}
          {error.message.includes("origin") &&
            " — apply migration 0017_article_origin_and_custom_articles.sql."}
        </p>
      ) : (
        <>
          <p className="text-xs font-mono tw-muted mb-3">
            {(count ?? 0).toLocaleString()} article{count === 1 ? "" : "s"}
          </p>

          <div className="tw-card rounded-xl border tw-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="border-b tw-border"
                    style={{ background: "color-mix(in srgb, var(--border) 30%, transparent)" }}
                  >
                    {["Title", "Section", "Company", "Published", "Status", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left px-3 py-2 text-xs font-mono uppercase tracking-widest tw-muted font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data ?? []).map((a) => (
                    <ArticleRow key={a.id} article={a as never} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between mt-4 text-xs font-mono">
            {pageNum > 1 ? (
              <Link
                href={qs(pageNum - 1)}
                className="tw-filter-chip"
              >
                ← Previous
              </Link>
            ) : <span />}
            {from + PAGE_SIZE < (count ?? 0) && (
              <Link
                href={qs(pageNum + 1)}
                className="tw-filter-chip"
              >
                Next →
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
}
