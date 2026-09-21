import { createClient } from "./supabase-server";
import type { Article } from "./types";

/**
 * Admin data access. Every query runs through the caller's session, so RLS
 * (`is_admin()`) is the authorisation boundary — a signed-in non-admin gets
 * empty results rather than data.
 */

export interface IngestSource {
  id: number;
  name: string;
  url: string;
  kind: "news" | "research";
  type: string;
  active: boolean;
  priority: number;
  category_hint: string | null;
  company: string | null;
  requires_full_text_fetch: boolean;
  active_months: number[];
  last_run_at: string | null;
  last_status: "ok" | "error" | "skipped" | "not_modified" | null;
  last_error: string | null;
  last_item_count: number | null;
}

export interface IngestRun {
  id: number;
  started_at: string;
  finished_at: string | null;
  status: "running" | "success" | "failed";
  trigger: "schedule" | "manual" | "admin";
  github_run_url: string | null;
  stats: Record<string, number>;
  error: string | null;
}

export interface Setting {
  key: string;
  value: string | null;
  description: string | null;
}

export async function getSourceById(id: number): Promise<IngestSource | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ingest_sources")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as IngestSource | null;
}

export async function getSources(): Promise<IngestSource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ingest_sources")
    .select("*")
    .order("kind")
    .order("priority")
    .order("name");
  if (error) throw error;
  return (data ?? []) as IngestSource[];
}

export async function getRuns(limit = 25): Promise<IngestRun[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ingest_runs")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as IngestRun[];
}

export async function getSettings(): Promise<Setting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("settings").select("*").order("key");
  if (error) throw error;
  return (data ?? []) as Setting[];
}

/**
 * Fetches an article by id for editing, regardless of status. The public
 * lib/queries.ts getArticle() runs on the anon client and can never see
 * drafts, so those need this session-scoped read instead (covered by the
 * "admins read all articles" RLS policy).
 */
export async function getArticleById(id: number): Promise<Article | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Article | null;
}

export interface AdminStats {
  published: number;
  archived: number;
  companies: number;
  activeSources: number;
  failingSources: number;
  latestArticleAt: string | null;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();

  const [published, archived, companies, sources, latest] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "archived"),
    supabase.from("companies").select("id", { count: "exact", head: true }),
    supabase.from("ingest_sources").select("active,last_status"),
    supabase
      .from("articles")
      .select("published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const rows = (sources.data ?? []) as { active: boolean; last_status: string | null }[];

  return {
    published: published.count ?? 0,
    archived: archived.count ?? 0,
    companies: companies.count ?? 0,
    activeSources: rows.filter((s) => s.active).length,
    failingSources: rows.filter((s) => s.active && s.last_status === "error").length,
    latestArticleAt: (latest.data as { published_at: string } | null)?.published_at ?? null,
  };
}
