import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { ArticleRow } from "@/components/admin/ArticleRow";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 40;

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const { q = "", status = "published", page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const from = (pageNum - 1) * PAGE_SIZE;

  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select("id,title,slug,category,status,impact,company,published_at", { count: "exact" })
    .order("published_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (status !== "all") query = query.eq("status", status);
  if (q.trim()) query = query.ilike("title", `%${q.trim()}%`);

  const { data, count, error } = await query;

  return (
    <>
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
          <option value="all">all</option>
        </select>
        <button type="submit" className="tw-filter-chip text-xs">Filter</button>
      </form>

      {error ? (
        <p className="text-xs font-mono" style={{ color: "#ef4444" }}>{error.message}</p>
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
                href={`/admin/articles?q=${encodeURIComponent(q)}&status=${status}&page=${pageNum - 1}`}
                className="tw-filter-chip"
              >
                ← Previous
              </Link>
            ) : <span />}
            {from + PAGE_SIZE < (count ?? 0) && (
              <Link
                href={`/admin/articles?q=${encodeURIComponent(q)}&status=${status}&page=${pageNum + 1}`}
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
