import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { CompanyProfileRow } from "@/components/admin/CompanyProfileRow";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;

/**
 * Company profiles, busiest first: the description and website shown at the
 * top of each /companies/<slug>/ page.
 */
export default async function AdminCompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; missing?: string }>;
}) {
  const { q = "", page = "1", missing = "" } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const from = (pageNum - 1) * PAGE_SIZE;
  const supabase = await createClient();

  // Coverage counts come from the view; profile fields from the table.
  let countsQuery = supabase
    .from("company_article_counts")
    .select("slug,name,primary_count,mention_count,description", { count: "exact" })
    .gt("article_count", 0)
    .order("primary_count", { ascending: false })
    .order("name", { ascending: true })
    .range(from, from + PAGE_SIZE - 1);
  if (q.trim()) countsQuery = countsQuery.ilike("name", `%${q.trim()}%`);
  if (missing === "1") countsQuery = countsQuery.is("description", null);

  const { data: counts, count, error } = await countsQuery;
  const slugs = (counts ?? []).map((c) => c.slug as string);
  const { data: profiles, error: profileError } = slugs.length
    ? await supabase.from("companies").select("slug,description,website").in("slug", slugs)
    : { data: [], error: null };
  const bySlug = new Map((profiles ?? []).map((p) => [p.slug as string, p]));

  const qs = (p: number) =>
    `/admin/companies?q=${encodeURIComponent(q)}&missing=${missing}&page=${p}`;
  const err = error ?? profileError;

  return (
    <>
      <p className="text-sm tw-muted mb-4 max-w-2xl">
        The short description and official website shown at the top of each company
        page. Keep descriptions to one or two factual sentences: what the company does
        and where it is based.
      </p>

      <form className="flex flex-wrap gap-2 mb-4" action="/admin/companies">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search companies…"
          className="tw-input font-mono text-sm flex-1 min-w-48"
        />
        <label className="tw-input font-mono text-sm flex items-center gap-2">
          <input type="checkbox" name="missing" value="1" defaultChecked={missing === "1"} />
          missing description
        </label>
        <button type="submit" className="tw-filter-chip text-xs">Filter</button>
      </form>

      {err ? (
        <p className="text-xs font-mono" style={{ color: "#ef4444" }}>
          {err.message}
          {err.message.includes("website") && " — apply migration 0018_company_profiles.sql."}
        </p>
      ) : (
        <>
          <p className="text-xs font-mono tw-muted mb-3">
            {(count ?? 0).toLocaleString()} companies with coverage
          </p>
          <div className="space-y-3">
            {(counts ?? []).map((c) => {
              const p = bySlug.get(c.slug as string);
              return (
                <CompanyProfileRow
                  key={c.slug as string}
                  slug={c.slug as string}
                  name={c.name as string}
                  primaryCount={c.primary_count as number}
                  mentionCount={c.mention_count as number}
                  description={(p?.description as string | null) ?? ""}
                  website={(p?.website as string | null) ?? ""}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs font-mono">
            {pageNum > 1 ? (
              <Link href={qs(pageNum - 1)} className="tw-filter-chip">← Previous</Link>
            ) : (
              <span />
            )}
            {from + PAGE_SIZE < (count ?? 0) && (
              <Link href={qs(pageNum + 1)} className="tw-filter-chip">Next →</Link>
            )}
          </div>
        </>
      )}
    </>
  );
}
