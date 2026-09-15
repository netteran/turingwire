import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { getContentPage, getContentPages } from "@/lib/content";

/**
 * Renders the static editorial pages from content/*.md, using the permalink
 * each one declared under Jekyll. Explicit routes (/news/, /research/, …) are
 * more specific and take precedence over this catch-all.
 */

type Props = { params: Promise<{ page: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getContentPages().map((p) => ({ page: p.segments }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const doc = getContentPage(page);
  if (!doc) return { title: "Not found", robots: { index: false, follow: false } };

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: doc.permalink },
    ...(doc.sitemap ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function ContentPage({ params }: Props) {
  const { page } = await params;
  const doc = getContentPage(page);
  if (!doc) notFound();

  if (doc.redirectTo) permanentRedirect(doc.redirectTo);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-[25px] pb-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">{doc.title}</h1>
        {doc.description && <p className="mt-2 tw-muted">{doc.description}</p>}
      </header>
      <div
        className="tw-prose prose-page"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </div>
  );
}
