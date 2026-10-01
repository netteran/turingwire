import type { Metadata } from "next";
import Link from "next/link";

import { CompanyDirectory } from "@/components/CompanyDirectory";
import { getCompaniesWithCounts } from "@/lib/queries";
import { site, absoluteUrl } from "@/lib/site";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

const TITLE = "AI Companies";
const DESCRIPTION =
  "Every AI lab, startup and vendor Turing Wire covers, with article counts and latest activity. Search, sort and filter to find a company's news, models and research.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/companies/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/companies/"),
    siteName: site.title,
  },
};

export default async function CompaniesPage() {
  const companies = await getCompaniesWithCounts();
  const url = absoluteUrl("/companies/");

  // Only companies with primary coverage are indexable (robotsForCompany),
  // so only those are listed in the structured data.
  const indexable = companies.filter((c) => c.primary_count > 0);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${site.url}/#website` },
      publisher: { "@id": `${site.url}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: indexable.length,
        itemListElement: indexable.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/companies/${c.slug}/`),
          name: c.name,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: TITLE, item: url },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="text-xs font-mono tw-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:tw-accent transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{TITLE}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">{TITLE}</h1>
        <p className="mt-3 tw-muted leading-relaxed max-w-3xl">
          Every lab, startup and vendor in our coverage. Each article is tagged with the company it
          is about and the companies it mentions, so a company page collects everything we have
          published on it, newest first.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono">
          <Link href="/news/" className="tw-filter-chip">
            AI News →
          </Link>
          <Link href="/research/" className="tw-filter-chip">
            AI Research Papers →
          </Link>
        </div>
      </header>

      {companies.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No companies indexed yet.</p>
        </div>
      ) : (
        <CompanyDirectory companies={companies} nowMs={Date.now()} />
      )}
    </div>
  );
}
