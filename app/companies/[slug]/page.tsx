import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/ShareButtons";
import { getArticlesForCompany, getCompany, getCompanyPrimaryCount } from "@/lib/queries";
import { robotsForCompany } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) return { title: "Not found", robots: { index: false, follow: false } };

  const primaryCount = await getCompanyPrimaryCount(slug);

  return {
    title: company.name,
    description:
      company.description ??
      `Turing Wire coverage of ${company.name}: AI news, research summaries, and analysis.`,
    alternates: { canonical: `/companies/${company.slug}/` },
    robots: robotsForCompany({ primaryCount }),
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();

  const { primary, secondary } = await getArticlesForCompany(company.name);
  const url = absoluteUrl(`/companies/${company.slug}/`);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url,
    identifier: company.slug,
    subjectOf: {
      "@type": "Dataset",
      name: "Turing Wire Knowledge Graph",
      url: `${site.url}/knowledge-graph.json`,
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
          <Link href="/publications/" className="hover:tw-accent transition-colors">
            Publications
          </Link>
          <span className="mx-2">/</span>
          <span>{company.name}</span>
        </nav>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tw-heading">{company.name}</h1>
            <p className="mt-2 text-sm tw-muted font-mono">
              {primary.length} primary articles · {secondary.length} secondary
              mentions
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <ShareButtons
              url={url}
              title={company.name}
              summary={site.description}
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
