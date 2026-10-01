"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import {
  createCustomArticle,
  generateCustomDraft,
  type CustomSourceInput,
} from "@/app/admin/actions";
import type { Draft } from "@/lib/editorial/pipeline";
import { IMPACT_LEVELS, SUBCATEGORIES } from "@/lib/editorial/taxonomy";
import {
  INDEXABLE_MIN_WORDS,
  INDEXABLE_MIN_WORDS_SIGNIFICANT_NEWS,
  meetsLengthGate,
} from "@/lib/seo";
import type { ArticleCategory, ArticleImpact } from "@/lib/types";

type Mode = CustomSourceInput["mode"];

const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;
const splitList = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

const ERROR_STYLE = { color: "#ef4444" };
const WARN_STYLE = { color: "#d97706" };

/**
 * Two steps: (1) source → draft via generateCustomDraft, which classifies
 * the text and, in digest mode, rewrites it with the pipeline prompts;
 * (2) review and edit every field, then createCustomArticle.
 */
export function NewArticleForm({ editorName }: { editorName: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Step 1 — source
  const [mode, setMode] = useState<Mode>("digest");
  const [category, setCategory] = useState<ArticleCategory>("news");
  const [source, setSource] = useState({
    title: "",
    text: "",
    description: "",
    sourceUrl: "",
    sourcePublisher: "",
    arxivId: "",
    authors: "",
  });

  // Step 2 — draft
  const [draft, setDraft] = useState<Draft | null>(null);
  const [edit, setEdit] = useState({
    title: "",
    description: "",
    body: "",
    subcategory: "other",
    impact: "notable" as ArticleImpact,
    company: "",
    secondary: "",
    tags: "",
    status: "published" as "published" | "draft",
  });
  const [created, setCreated] = useState<{ id: number; path: string } | null>(null);

  const setSrc = (k: keyof typeof source) => (e: { target: { value: string } }) =>
    setSource((s) => ({ ...s, [k]: e.target.value }));
  const setEd = (k: keyof typeof edit) => (e: { target: { value: string } }) =>
    setEdit((s) => ({ ...s, [k]: e.target.value }));

  const generate = () =>
    startTransition(async () => {
      setError(null);
      try {
        const d = await generateCustomDraft({ mode, category, ...source });
        setDraft(d);
        setEdit({
          title: d.title,
          description: d.description,
          body: d.body,
          subcategory: d.subcategory,
          impact: d.impact,
          company: d.company ?? "",
          secondary: d.secondaryCompanies.join(", "),
          tags: d.tags.join(", "),
          status: "published",
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not generate the draft");
      }
    });

  const publish = () =>
    startTransition(async () => {
      if (!draft) return;
      setError(null);
      try {
        const res = await createCustomArticle({
          mode,
          category,
          title: edit.title,
          description: edit.description,
          body: edit.body,
          subcategory: edit.subcategory,
          impact: edit.impact,
          company: edit.company.trim() || null,
          secondaryCompanies: splitList(edit.secondary),
          tags: splitList(edit.tags),
          confidence: draft.confidence,
          status: edit.status,
          sourceUrl: source.sourceUrl,
          sourcePublisher: source.sourcePublisher,
          arxivId: source.arxivId,
          authors: source.authors,
        });
        setCreated(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not save the article");
      }
    });

  if (created) {
    return (
      <div className="tw-card border tw-border rounded-lg p-5 max-w-3xl">
        <p className="tw-heading font-semibold mb-2">
          {edit.status === "published" ? "Published ✓" : "Saved as draft ✓"}
        </p>
        <div className="flex flex-wrap gap-3 text-xs font-mono">
          {edit.status === "published" && (
            <a href={created.path} target="_blank" rel="noopener noreferrer" className="tw-filter-chip">
              View live ↗
            </a>
          )}
          <Link href={`/admin/articles/${created.id}`} className="tw-filter-chip">
            Edit article
          </Link>
          <button
            type="button"
            className="tw-filter-chip"
            onClick={() => {
              setCreated(null);
              setDraft(null);
              setSource({ title: "", text: "", description: "", sourceUrl: "", sourcePublisher: "", arxivId: "", authors: "" });
            }}
          >
            Write another
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: review ──────────────────────────────────────────────
  if (draft) {
    const words = wordCount(edit.body);
    const subcats = SUBCATEGORIES[category].includes(edit.subcategory)
      ? SUBCATEGORIES[category]
      : [edit.subcategory, ...SUBCATEGORIES[category]];

    return (
      <div className="grid gap-4 max-w-3xl">
        <div className="tw-card border tw-border rounded-lg p-4 text-xs font-mono tw-muted leading-relaxed">
          <p>
            <span className="tw-heading">Byline:</span> {editorName}
            {mode === "digest" && " · shown as \"Based on reporting by <publisher>, edited by " + editorName + "\""}
          </p>
          <p>
            <span className="tw-heading">Section:</span> {category} ·{" "}
            <span className="tw-heading">Model:</span> {draft.model}
            {draft.confidence !== null && (
              <>
                {" "}
                · <span className="tw-heading">Classifier confidence:</span>{" "}
                {draft.confidence.toFixed(2)}
              </>
            )}
          </p>
          {draft.rationale && (
            <p>
              <span className="tw-heading">Classifier rationale:</span> {draft.rationale}
            </p>
          )}
        </div>

        {draft.warnings.length > 0 && (
          <ul className="tw-card border tw-border rounded-lg p-4 text-xs font-mono space-y-1" style={WARN_STYLE}>
            {draft.warnings.map((w) => (
              <li key={w}>⚠ {w}</li>
            ))}
          </ul>
        )}

        <div className="tw-card border tw-border rounded-lg p-4 grid gap-3">
          <label className="text-xs font-mono tw-muted">
            Headline
            <input value={edit.title} onChange={setEd("title")} className="tw-input w-full font-mono text-sm mt-1" />
          </label>

          <label className="text-xs font-mono tw-muted">
            Meta description (search snippet, 120–155 characters) · {edit.description.length}
            <textarea
              value={edit.description}
              onChange={setEd("description")}
              rows={2}
              className="tw-input w-full text-sm mt-1"
            />
          </label>

          <label className="text-xs font-mono tw-muted">
            Body (Markdown) · {words} words
            {!meetsLengthGate({ category, impact: edit.impact, summary_word_count: words }) && (
              <span style={WARN_STYLE}>
                {" "}
                · too short to be indexed (needs {INDEXABLE_MIN_WORDS}+ words
                {category === "news" &&
                  `, or ${INDEXABLE_MIN_WORDS_SIGNIFICANT_NEWS}+ for major/critical news`}
                )
              </span>
            )}
            <textarea
              value={edit.body}
              onChange={setEd("body")}
              rows={20}
              className="tw-input w-full text-sm mt-1 font-mono"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-mono tw-muted">
              Subcategory
              <select value={edit.subcategory} onChange={setEd("subcategory")} className="tw-input w-full font-mono text-sm mt-1">
                {subcats.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-mono tw-muted">
              Impact
              <select value={edit.impact} onChange={setEd("impact")} className="tw-input w-full font-mono text-sm mt-1">
                {IMPACT_LEVELS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-mono tw-muted">
              Company
              <input value={edit.company} onChange={setEd("company")} className="tw-input w-full font-mono text-sm mt-1" />
            </label>

            <label className="text-xs font-mono tw-muted">
              Also mentioned (comma separated)
              <input value={edit.secondary} onChange={setEd("secondary")} className="tw-input w-full font-mono text-sm mt-1" />
            </label>

            <label className="text-xs font-mono tw-muted">
              Tags (comma separated; &quot;stocks&quot; also lists it on AI Stocks)
              <input value={edit.tags} onChange={setEd("tags")} className="tw-input w-full font-mono text-sm mt-1" />
            </label>

            <label className="text-xs font-mono tw-muted">
              Status
              <select value={edit.status} onChange={setEd("status")} className="tw-input w-full font-mono text-sm mt-1">
                <option value="published">publish now</option>
                <option value="draft">save as draft</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={publish}
            disabled={pending || !edit.title.trim() || !edit.body.trim()}
            className="tw-btn-primary font-mono text-sm px-4 py-2"
          >
            {pending ? "Saving…" : edit.status === "published" ? "Publish" : "Save draft"}
          </button>
          <button type="button" onClick={() => setDraft(null)} disabled={pending} className="tw-filter-chip text-xs">
            ← Back to source
          </button>
          {mode === "digest" && (
            <button type="button" onClick={generate} disabled={pending} className="tw-filter-chip text-xs">
              Regenerate
            </button>
          )}
          {error && (
            <span className="text-xs font-mono" style={ERROR_STYLE}>
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── Step 1: source ──────────────────────────────────────────────
  const digest = mode === "digest";
  return (
    <div className="grid gap-4 max-w-3xl">
      <div className="tw-card border tw-border rounded-lg p-4 grid gap-3 sm:grid-cols-2">
        <fieldset className="text-xs font-mono tw-muted">
          <legend className="mb-1">Section</legend>
          {(["news", "research"] as const).map((c) => (
            <label key={c} className="mr-4 inline-flex items-center gap-1.5">
              <input type="radio" name="category" checked={category === c} onChange={() => setCategory(c)} />
              {c === "news" ? "AI News" : "AI Research"}
            </label>
          ))}
        </fieldset>

        <fieldset className="text-xs font-mono tw-muted">
          <legend className="mb-1">How</legend>
          <label className="flex items-center gap-1.5">
            <input type="radio" name="mode" checked={digest} onChange={() => setMode("digest")} />
            Digest a source with the pipeline prompts
          </label>
          <label className="flex items-center gap-1.5">
            <input type="radio" name="mode" checked={!digest} onChange={() => setMode("as_written")} />
            Publish my text as written
          </label>
        </fieldset>
      </div>

      <div className="tw-card border tw-border rounded-lg p-4 grid gap-3">
        <label className="text-xs font-mono tw-muted">
          {digest ? "Source title" : "Headline"}
          <input value={source.title} onChange={setSrc("title")} className="tw-input w-full font-mono text-sm mt-1" />
        </label>

        <label className="text-xs font-mono tw-muted">
          {digest ? "Source text (paste the full article or paper text)" : "Article body (Markdown)"} ·{" "}
          {wordCount(source.text)} words
          <textarea
            value={source.text}
            onChange={setSrc("text")}
            rows={16}
            className="tw-input w-full text-sm mt-1 font-mono"
          />
        </label>

        {!digest && (
          <label className="text-xs font-mono tw-muted">
            Meta description (optional, 120–155 characters)
            <textarea
              value={source.description}
              onChange={setSrc("description")}
              rows={2}
              className="tw-input w-full text-sm mt-1"
            />
          </label>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-mono tw-muted">
            Source URL {digest ? "(recommended)" : "(optional)"}
            <input value={source.sourceUrl} onChange={setSrc("sourceUrl")} className="tw-input w-full font-mono text-sm mt-1" />
          </label>
          <label className="text-xs font-mono tw-muted">
            Source publisher {digest ? "(recommended)" : "(optional)"}
            <input
              value={source.sourcePublisher}
              onChange={setSrc("sourcePublisher")}
              className="tw-input w-full font-mono text-sm mt-1"
            />
          </label>
          {category === "research" && (
            <>
              <label className="text-xs font-mono tw-muted">
                arXiv ID (optional)
                <input value={source.arxivId} onChange={setSrc("arxivId")} className="tw-input w-full font-mono text-sm mt-1" />
              </label>
              <label className="text-xs font-mono tw-muted">
                Paper authors (comma separated, optional)
                <input value={source.authors} onChange={setSrc("authors")} className="tw-input w-full font-mono text-sm mt-1" />
              </label>
            </>
          )}
        </div>
        {!digest && (
          <p className="text-xs tw-muted">
            Leave the source empty for original reporting; the article then shows no
            &quot;Source&quot; line.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={generate}
          disabled={pending || !source.title.trim() || !source.text.trim()}
          className="tw-btn-primary font-mono text-sm px-4 py-2"
        >
          {pending ? (digest ? "Digesting… (up to a minute)" : "Classifying…") : digest ? "Generate draft" : "Classify & review"}
        </button>
        {error && (
          <span className="text-xs font-mono" style={ERROR_STYLE}>
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
