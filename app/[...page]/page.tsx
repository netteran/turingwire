import type { Metadata } from "next";
import Script from "next/script";
import { notFound, permanentRedirect } from "next/navigation";

import { ShareButtons } from "@/components/ShareButtons";
import { getContentPage, getContentPages, SHARE_SLOT } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/**
 * Renders the static editorial pages, using the permalink each one declared
 * under Jekyll. Explicit routes (/news/, /research/, …) are more specific and
 * take precedence over this catch-all.
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

  // Prose pages get the old _layouts/page.html chrome.
  if (!doc.raw) {
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

  // HTML pages carry their own layout. Where the original had a share include,
  // split around the placeholder so the React component renders in its place.
  const [before, after] = doc.hasShareSlot
    ? doc.html.split(SHARE_SLOT)
    : [doc.html, null];

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: before }} />
      {after !== null && (
        <>
          <ShareButtons
            url={absoluteUrl(doc.permalink)}
            title={doc.title}
            summary={doc.description}
            variant="popover"
            align="right"
          />
          <div dangerouslySetInnerHTML={{ __html: after }} />
        </>
      )}
      {doc.script && <Script src={doc.script} strategy="afterInteractive" />}
    </>
  );
}
