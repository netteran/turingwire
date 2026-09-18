import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ShareButtons } from "@/components/ShareButtons";
import { getStory } from "@/lib/queries";
import { formatDate, slugify } from "@/lib/format";
import { site, absoluteUrl } from "@/lib/site";
import type { StoryClaim } from "@/lib/types";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Not found", robots: { index: false, follow: false } };

  return {
    title: story.title,
    description: story.lead ?? story.title,
    alternates: { canonical: `/story/${story.slug}/` },
    openGraph: { type: "article", title: story.title, description: story.lead ?? story.title },
  };
}

function ClaimPill({ claim }: { claim: StoryClaim }) {
  if (claim.status === "corroborated") {
    return (
      <span className="tw-claim-pill tw-claim-corroborated">
        ✓ Corroborated · {claim.supporting?.length ?? 0} sources
      </span>
    );
  }
  if (claim.status === "disputed") {
    return <span className="tw-claim-pill tw-claim-disputed">⚠ Disputed</span>;
  }
  if (claim.status === "single_source") {
    return <span className="tw-claim-pill tw-claim-single">◐ Single source</span>;
  }
  return <span className="tw-claim-pill tw-claim-unknown">· Unverified</span>;
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  const sources = story.sources ?? [];
  const claims = story.claims ?? [];
  const companies = story.companies ?? [];
  const disputedCount = claims.filter((c) => c.status === "disputed").length;
  const url = absoluteUrl(`/story/${story.slug}/`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.lead ?? story.title,
    datePublished: story.first_seen
      ? new Date(story.first_seen).toISOString()
      : undefined,
    dateModified: story.last_updated
      ? new Date(story.last_updated).toISOString()
      : undefined,
    publisher: { "@type": "Organization", name: site.title, url: site.url },
    author: {
      "@type": "Person",
      "@id": `${site.url}/about/#editorial-team`,
      name: "Turing Wire Editorial Team",
      url: `${site.url}/about/`,
    },
    mainEntityOfPage: url,
    about: companies.map((co) => ({ "@type": "Organization", name: co })),
    citation: sources.map((src) => ({
      "@type": "CreativeWork",
      name: src.title || src.url,
      url: src.url,
      publisher: { "@type": "Organization", name: src.publisher },
      ...(src.date ? { datePublished: new Date(src.date).toISOString() } : {}),
    })),
  };

  const SourceChips = ({
    indices,
    variant,
  }: {
    indices: number[];
    variant: "support" | "contradict";
  }) => (
    <div className="flex flex-wrap gap-1.5">
      {indices.map((i) => (
        <a
          key={`${variant}-${i}`}
          href={`#source-${i + 1}`}
          className={`tw-source-chip tw-source-chip--${variant}`}
        >
          [{i + 1}] {sources[i]?.publisher ?? "source"}
        </a>
      ))}
    </div>
  );

  return (
    <article className="max-w-4xl mx-auto px-4 pt-[25px] pb-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav
        className="text-xs font-mono tw-muted mb-6 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:tw-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/stories/" className="hover:tw-accent transition-colors">
          Stories
        </Link>
        <span>/</span>
        <span className="truncate max-w-xs">{story.title}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded"
          style={{
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            color: "var(--accent)",
          }}
        >
          Multi-source analysis
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest tw-muted border tw-border rounded px-2 py-1">
          {story.scope === "theme" ? "Cross-company trend" : "Company thread"}
        </span>
        <span className="font-mono text-xs tw-muted">{sources.length} sources</span>
      </div>

      <div className="flex items-start justify-between gap-4 mb-3">
        <h1 className="text-3xl font-semibold tw-heading leading-snug min-w-0 mb-0">
          {story.title}
        </h1>
        <div className="flex-shrink-0 mt-1">
          <ShareButtons
            url={url}
            title={story.title}
            summary={story.lead}
            variant="popover"
            align="right"
          />
        </div>
      </div>

      {story.lead && (
        <p className="text-lg tw-muted leading-relaxed mb-6">{story.lead}</p>
      )}

      <div className="tw-card border tw-border rounded-lg px-5 py-4 mb-8">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 text-xs font-mono">
          <div>
            <dt className="tw-muted mb-0.5">First seen</dt>
            <dd className="tw-heading font-medium">
              {story.first_seen ? formatDate(story.first_seen) : "—"}
            </dd>
          </div>
          <div>
            <dt className="tw-muted mb-0.5">Last updated</dt>
            <dd className="tw-heading font-medium">
              {story.last_updated ? formatDate(story.last_updated) : "—"}
            </dd>
          </div>
          <div>
            <dt className="tw-muted mb-0.5">Sources</dt>
            <dd className="tw-heading font-medium">{sources.length}</dd>
          </div>
          <div>
            <dt className="tw-muted mb-0.5">Disputed claims</dt>
            <dd className="tw-heading font-medium">{disputedCount}</dd>
          </div>
        </dl>

        {companies.length > 0 && (
          <div className="mt-3 pt-3 border-t tw-border flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono tw-muted mr-1">Entities:</span>
            {companies.map((co) => (
              <Link
                key={co}
                href={`/companies/${slugify(co)}/`}
                className="inline-block font-mono text-xs tw-muted border tw-border rounded px-2 py-0.5 hover:tw-accent hover:border-cyan-600 transition-colors"
              >
                {co}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <section className="lg:col-span-2">
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-4">
            Key findings
          </h2>
          <ol className="space-y-4 list-none pl-0">
            {claims.map((claim, index) => (
              <li
                key={index}
                className="tw-card border tw-border rounded-lg p-4"
                id={`claim-${index + 1}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs tw-muted flex-shrink-0 mt-0.5">
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="tw-heading text-[15px] leading-relaxed">
                      {claim.text}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <ClaimPill claim={claim} />
                    </div>

                    {claim.supporting?.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[11px] font-mono uppercase tracking-wide tw-muted mb-1.5">
                          Supporting
                        </p>
                        <SourceChips indices={claim.supporting} variant="support" />
                      </div>
                    )}

                    {claim.contradicting?.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[11px] font-mono uppercase tracking-wide tw-muted mb-1.5">
                          Contradicts
                        </p>
                        <SourceChips
                          indices={claim.contradicting}
                          variant="contradict"
                        />
                      </div>
                    )}

                    {claim.note && (
                      <p className="mt-3 text-xs tw-muted italic leading-relaxed">
                        {claim.note}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside>
          <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-4">
            Sources ({sources.length})
          </h2>
          <ol className="space-y-3 list-none pl-0">
            {sources.map((src, index) => (
              <li
                key={index}
                id={`source-${index + 1}`}
                className="tw-card border tw-border rounded-lg p-3"
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs tw-muted flex-shrink-0">
                    [{index + 1}]
                  </span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block tw-heading font-medium text-sm hover:tw-accent transition-colors leading-snug"
                    >
                      {src.title || src.url}
                    </a>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] font-mono tw-muted">
                      <span>{src.publisher}</span>
                      {src.date && (
                        <>
                          <span>·</span>
                          <span>
                            {new Date(src.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              timeZone: "UTC",
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <details className="tw-card border tw-border rounded-lg p-4 mt-6">
        <summary className="cursor-pointer text-xs font-mono uppercase tracking-widest tw-muted">
          About this story
        </summary>
        <div className="mt-3 text-sm tw-muted leading-relaxed space-y-2">
          <p>
            {story.scope === "theme"
              ? "This story tracks a cross-company trend or signal, not a single company's news cycle — it clusters by the pattern itself, regardless of which lab is involved."
              : "This story tracks one company's developing thread across multiple sources."}{" "}
            Each key finding is cross-referenced against the listed sources and
            labelled by how many independent outlets corroborate or contest it.
            Disputed findings are surfaced explicitly rather than resolved
            editorially.
          </p>
          <p>
            All source articles are linked directly.{" "}
            <Link href="/about/" className="hover:tw-accent transition-colors">
              About our editorial standards →
            </Link>
          </p>
        </div>
      </details>
    </article>
  );
}
