/**
 * Site-wide configuration.
 *
 * Ported from Jekyll's _config.yml, which no longer drives the build. Values
 * that were editorial rather than structural (editor identity, organization
 * schema, the quality gate) keep their original semantics.
 */
export const site = {
  title: "Turing Wire",
  tagline: "AI news, research, and markets for practitioners.",
  description:
    "The essential daily briefing for AI engineers, researchers, and builders — in-depth news coverage, research analysis, and ecosystem market data.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://turingwire.com",
  logo: "/assets/img/turingwirelogo.png",
  googleAnalyticsId: "G-8MBL2SZCZX",
  googleSiteVerification: "",

  /** Posts per page on paginated listings (Jekyll: paginate: 20). */
  perPage: 20,

  /**
   * Only index posts the improved pipeline marked `quality: high`.
   * Withdraws the thin AI-summary backlog from search indexes.
   */
  requireQualityFlag: true,

  editor: {
    name: "Callan Zhang",
    role: "Founder & Editor",
    url: "/about/editor/",
    bio:
      "Callan Zhang is the pen name of the founder and editor of Turing Wire, an AI practitioner who builds and maintains the publication.",
  },

  organization: {
    name: "Turing Wire",
    legalName: "Turing Wire",
    foundingDate: "2026",
    sameAs: [] as string[],
  },

  aiIndexBaseDate: "2026-01-02",
  aiIndexName: "TW AI Index",
} as const;

export const absoluteUrl = (path: string): string =>
  new URL(path, site.url).toString();
