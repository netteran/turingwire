import Link from "next/link";
import { NewArticleForm } from "@/components/admin/NewArticleForm";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

// Digesting runs classification plus two model calls (extract → write);
// long sources on slower models can take a minute or more.
export const maxDuration = 300;

export default function NewArticlePage() {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          href="/admin/articles"
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          ← Back to articles
        </Link>
      </div>
      <h2 className="text-lg font-semibold tw-heading mb-1">New article</h2>
      <p className="text-sm tw-muted mb-6 max-w-2xl">
        Publish your own text, or digest a source through the same prompts as the ingest
        pipeline and edit the result. Either way the article is classified automatically
        (subcategory, impact, companies) and bylined to {site.editor.name}; pipeline
        articles are credited to the desk.
      </p>
      <NewArticleForm editorName={site.editor.name} />
    </>
  );
}
