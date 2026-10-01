import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { getArticlesForCompany, getCompany, getCompanyPrimaryCount } from "@/lib/queries";
import { robotsForCompany } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

/** The pipeline used to store this placeholder for every company (cleared by migration 0018). */
function profileOf(description: string | null): string | null {
  const d = description?.trim();
  return d && !d.startsWith("Turing Wire coverage of ") ? d : null;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) return { title: "Not found", robots: { index: false, follow: false } };

  const primaryCount = await getCompanyPrimaryCount(slug);
  const title = `${company.name}: AI News, Models & Research`;
  const profile = profileOf(company.description);
  const coverage = `The latest ${company.name} AI news: model releases, product launches, funding, research and policy — ${primaryCount} ${
      primaryCount === 1 ? "article" : "articles"
    } summarised from primary sources, newest first.`;
  // A full profile is the snippet on its own (unique per company); a short
  // one gets the coverage line added. Snippets show ~155 characters.
  const description = !profile ? coverage : profile.length >= 110 ? profile : `${profile} ${coverage}`;

  return {
    title,
    description,
    alternates: { canonical: `/companies/${company.slug}/` },
    robots: robotsForCompany({ primaryCount }),
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(`/companies/${company.slug}/`),
      siteName: site.title,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();

  const { primary, secondary } = await getArticlesForCompany(company.name);
  const url = absoluteUrl(`/companies/${company.slug}/`);
  const profile = profileOf(company.description);
  const website = company.website ?? null;

  // The page is a collection *about* the company; the Organization's own
  // `url` would be its website, not this page, so it isn't set here.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: `${company.name}: AI News, Models & Research`,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    about: {
      "@type": "Organization",
      name: company.name,
      identifier: company.slug,
      ...(profile ? { description: profile } : {}),
      // The company's own site identifies which organisation this is.
      ...(website ? { url: website, sameAs: [website] } : {}),
      subjectOf: {
        "@type": "Dataset",
        name: "Turing Wire Knowledge Graph",
        url: `${site.url}/knowledge-graph.json`,
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-[25px] pb-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <header className="mb-10">
        <nav className="text-xs font-mono tw-muted mb-4">
          <Link href="/" className="hover:tw-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news/" className="hover:tw-accent transition-colors">
            AI News
          </Link>
          <span className="mx-2">/</span>
          <span>{company.name}</span>
        </nav>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tw-heading">
              {company.name} <span className="tw-muted font-normal">AI news</span>
            </h1>
            {profile && (
              <p className="mt-3 tw-muted leading-relaxed max-w-3xl">{profile}</p>
            )}
            <p className="mt-3 text-sm tw-muted font-mono flex flex-wrap items-center gap-x-3 gap-y-1">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener"
                  className="text-cyan-600 hover:text-cyan-500 transition-colors"
                >
                  {hostOf(website)} ↗
                </a>
              )}
              <span>
                {primary.length} primary articles · {secondary.length} secondary mentions
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <ShareButtons
              url={url}
              title={company.name}
              summary={profile ?? site.description}
              variant="popover"
              align="right"
            />
          </div>
        </div>
      </header>

      {primary.length > 0 && (
        <section>
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            Primary coverage
          </h2>
          <div className="space-y-4">
            {primary.slice(0, 50).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {secondary.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xs font-mono tw-muted uppercase tracking-widest mb-4">
            Also mentioned
          </h2>
          <div className="space-y-4">
            {secondary.slice(0, 20).map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </section>
      )}

      {primary.length === 0 && secondary.length === 0 && (
        <p className="tw-muted text-sm">
          No articles indexed for this company yet.
        </p>
      )}
    </div>
  );
}
