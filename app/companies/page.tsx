import type { Metadata } from "next";
import Link from "next/link";
import { getCompaniesWithCounts } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Companies",
  description: "AI industry coverage by company — browse all tracked organizations.",
  alternates: { canonical: "/companies/" },
};

export default async function CompaniesPage() {
  const companies = await getCompaniesWithCounts();
  const withCoverage = companies
    .filter((c) => c.primary_count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tw-heading">Companies</h1>
        <p className="text-sm tw-muted mt-1 font-mono">
          Browse coverage by organization
        </p>
      </header>

      {withCoverage.length === 0 ? (
        <p className="tw-muted text-sm font-mono">No articles indexed yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {withCoverage.map((co) => (
            <Link
              key={co.slug}
              href={`/companies/${co.slug}/`}
              className="tw-card rounded border tw-border p-3 hover:border-cyan-600 transition-all group"
            >
              <p className="font-medium tw-heading text-sm group-hover:text-cyan-600 transition-colors">
                {co.name}
              </p>
              <p className="text-xs font-mono tw-muted mt-0.5">
                {co.primary_count} article{co.primary_count !== 1 && "s"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
