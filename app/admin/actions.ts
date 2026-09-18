"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/supabase-server";
import type { ArticleCategory, ArticleImpact, ArticleStatus } from "@/lib/types";

/**
 * Mutations for the admin pages.
 *
 * Each re-checks isAdmin() rather than relying on the middleware redirect:
 * server actions are callable directly by anyone who can reach the site, so
 * the check has to live here as well as in RLS.
 */

async function guard() {
  if (!(await isAdmin())) throw new Error("Not authorised");
  return createClient();
}

export async function setSourceActive(id: number, active: boolean) {
  const supabase = await guard();
  const { error } = await supabase.from("ingest_sources").update({ active }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/sources");
  revalidatePath("/admin");
}

export async function updateSource(id: number, patch: Record<string, unknown>) {
  const supabase = await guard();
  const { error } = await supabase.from("ingest_sources").update(patch).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/sources");
  revalidatePath(`/admin/sources/${id}`);
}

export async function addSource(formData: FormData) {
  const supabase = await guard();

  const priority = Number(formData.get("priority") ?? 2);
  const { error } = await supabase.from("ingest_sources").insert({
    name: String(formData.get("name") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
    kind: String(formData.get("kind") ?? "news"),
    type: String(formData.get("type") ?? "rss"),
    priority: Number.isFinite(priority) ? Math.min(Math.max(priority, 1), 3) : 2,
    company: String(formData.get("company") ?? "").trim() || null,
    active: true,
  });
  if (error) throw error;
  revalidatePath("/admin/sources");
}

export async function updateSetting(key: string, value: string) {
  const supabase = await guard();
  const { error } = await supabase.from("settings").update({ value }).eq("key", key);
  if (error) throw error;
  revalidatePath("/admin/settings");
  revalidatePath("/admin/prompts");
}

/**
 * Unpublish hides an article from the site without deleting it. It becomes
 * `archived`, which the public RLS policy excludes, so it disappears from
 * listings, feeds and the sitemap on the next revalidation.
 */
export async function setArticleStatus(id: number, status: "published" | "archived") {
  const supabase = await guard();
  const { error } = await supabase.from("articles").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/articles");
  revalidatePath("/");
}

export interface ArticleEdit {
  title: string;
  description: string | null;
  body: string | null;
  category: ArticleCategory;
  subcategory: string;
  company: string | null;
  impact: ArticleImpact;
  status: ArticleStatus;
  tags: string[];
}

/**
 * Full content edit, as opposed to setArticleStatus's publish/unpublish
 * toggle. `slug` isn't part of the patch (it's URL identity and legacy
 * redirect bookkeeping, so it stays immutable here) but is needed to
 * revalidate the live page.
 */
export async function updateArticle(id: number, slug: string, patch: ArticleEdit) {
  const supabase = await guard();
  const { error } = await supabase.from("articles").update(patch).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath(`/${patch.category}/${slug}/`);
  revalidatePath("/");
}
