"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/supabase-server";
import type { ArticleCategory, ArticleImpact, ArticleStatus } from "@/lib/types";
import { annotateText, digestSource, type Draft, type SourceInput } from "@/lib/editorial/pipeline";
import { cleanSlug } from "@/lib/editorial/slug";
import { IMPACT_LEVELS } from "@/lib/editorial/taxonomy";
import { slugify } from "@/lib/slugify";
import { site } from "@/lib/site";

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
 * Toggles an article between `published` and `archived`. Both statuses are
 * publicly readable (see the "public read non-draft articles" RLS policy) —
 * archiving is a label, not a takedown. `draft` is the only status that
 * hides an article from the site.
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

// ── Custom articles (/admin/articles/new) ──────────────────────────

export interface CustomSourceInput {
  mode: "as_written" | "digest";
  category: ArticleCategory;
  title: string;
  text: string;
  description?: string;
  sourceUrl?: string;
  sourcePublisher?: string;
  arxivId?: string;
  /** Comma-separated. */
  authors?: string;
}

function toSourceInput(input: CustomSourceInput): SourceInput & { description?: string } {
  return {
    category: input.category,
    title: input.title.trim(),
    text: input.text.trim(),
    description: input.description?.trim(),
    sourceUrl: input.sourceUrl?.trim() || undefined,
    sourcePublisher: input.sourcePublisher?.trim() || undefined,
    arxivId: input.arxivId?.trim() || undefined,
    authors: (input.authors ?? "")
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean),
  };
}

/**
 * Step 1: annotate the editor's own text, or digest a source through the
 * pipeline prompts. Returns an editable draft; nothing is saved yet.
 */
export async function generateCustomDraft(input: CustomSourceInput): Promise<Draft> {
  const supabase = await guard();
  if (!input.title.trim() || !input.text.trim()) {
    throw new Error("A title and text are required.");
  }
  if (input.category !== "news" && input.category !== "research") {
    throw new Error("Choose news or research.");
  }

  const source = toSourceInput(input);
  const draft =
    input.mode === "digest"
      ? await digestSource(supabase, source)
      : await annotateText(supabase, source);

  // The pipeline de-duplicates on source_url; here it's only a heads-up,
  // since an edited piece on an already-summarised source can be intended.
  if (source.sourceUrl) {
    const { data } = await supabase
      .from("articles")
      .select("category,slug")
      .eq("source_url", source.sourceUrl)
      .limit(1)
      .maybeSingle();
    if (data) {
      draft.warnings.push(
        `This source is already covered at /${data.category}/${data.slug}/ — consider editing that article instead.`,
      );
    }
  }
  return draft;
}

export interface CustomArticlePayload {
  mode: "as_written" | "digest";
  category: ArticleCategory;
  title: string;
  description: string;
  body: string;
  subcategory: string;
  impact: ArticleImpact;
  company: string | null;
  secondaryCompanies: string[];
  tags: string[];
  confidence: number | null;
  status: "published" | "draft";
  sourceUrl?: string;
  sourcePublisher?: string;
  arxivId?: string;
  authors?: string;
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  category: ArticleCategory,
  base: string,
): Promise<string> {
  for (let n = 1; n < 50; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const { data, error } = await supabase
      .from("articles")
      .select("id")
      .eq("category", category)
      .eq("slug", candidate)
      .limit(1);
    if (error) throw error;
    if (!data || data.length === 0) return candidate;
  }
  throw new Error("Could not find a free slug for this title.");
}

/**
 * Step 2: store the reviewed draft. Bylined to the editor (origin
 * `editor` / `editor_ai`, migration 0017) and marked quality "high",
 * since a person has reviewed it; the 300-word indexing gate in
 * lib/seo.ts still applies.
 */
export async function createCustomArticle(
  payload: CustomArticlePayload,
): Promise<{ id: number; path: string }> {
  const supabase = await guard();

  const title = payload.title.trim();
  const body = payload.body.trim();
  if (!title || !body) throw new Error("Title and body are required.");
  if (payload.category !== "news" && payload.category !== "research") {
    throw new Error("Choose news or research.");
  }
  if (!IMPACT_LEVELS.includes(payload.impact)) throw new Error("Invalid impact level.");

  const slug = await uniqueSlug(supabase, payload.category, cleanSlug(title));
  const company = payload.company?.trim() || null;
  const secondary = [...new Set(payload.secondaryCompanies.map((c) => c.trim()).filter(Boolean))].filter(
    (c) => c !== company,
  );
  const sourceUrl = payload.sourceUrl?.trim() ?? "";

  const { data, error } = await supabase
    .from("articles")
    .insert({
      slug,
      category: payload.category,
      tags: [...new Set(payload.tags.map((t) => t.trim()).filter(Boolean))],
      status: payload.status,
      title,
      description: payload.description.trim() || null,
      body,
      published_at: new Date().toISOString(),
      subcategory: payload.subcategory.trim() || "other",
      impact: payload.impact,
      company,
      secondary_companies: secondary,
      classification_confidence:
        payload.confidence === null ? null : Math.round(payload.confidence * 100) / 100,
      // Original reporting has no outside source; the page then omits the
      // "Source:" line and citation schema.
      source_publisher: payload.sourcePublisher?.trim() || (sourceUrl ? "Unknown" : site.title),
      source_url: sourceUrl,
      source_truncated: false,
      arxiv_id: payload.arxivId?.trim() || null,
      authors: (payload.authors ?? "")
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      summary_word_count: body.split(/\s+/).filter(Boolean).length,
      quality: "high",
      origin: payload.mode === "digest" ? "editor_ai" : "editor",
    })
    .select("id")
    .single();
  if (error) {
    throw new Error(
      error.message.includes("origin")
        ? "The database is missing the `origin` column — apply migration 0017_article_origin_and_custom_articles.sql first."
        : error.message,
    );
  }

  // Company pages need a `companies` row; the pipeline would only add it on
  // its next run. ON CONFLICT DO NOTHING, so existing rows are untouched.
  const names = [company, ...secondary].filter((c): c is string => Boolean(c));
  if (names.length) {
    await supabase
      .from("companies")
      .upsert(
        names.map((name) => ({ name, slug: slugify(name) })),
        { onConflict: "slug", ignoreDuplicates: true },
      );
  }

  const path = `/${payload.category}/${slug}/`;
  for (const p of [
    "/",
    `/${payload.category}/`,
    path,
    "/sitemap.xml",
    `/sitemap-${payload.category}.xml`,
    "/sitemap-pages.xml",
    "/feed.xml",
    `/${payload.category}/feed.xml`,
    "/feed-major.xml",
    "/admin/articles",
  ]) {
    revalidatePath(p);
  }
  if (company) revalidatePath(`/companies/${slugify(company)}/`);

  return { id: (data as { id: number }).id, path };
}
