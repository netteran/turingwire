import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/admin";
import { EditArticleForm } from "@/components/admin/EditArticleForm";
import { articleUrl } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = Number(id);
  const article = Number.isFinite(articleId) ? await getArticleById(articleId) : null;
  if (!article) notFound();

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          href="/admin/articles"
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          ← Back to articles
        </Link>
        <a
          href={articleUrl(article)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          View live ↗
        </a>
      </div>
      <EditArticleForm article={article} />
    </>
  );
}
