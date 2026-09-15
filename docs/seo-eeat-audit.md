# Turing Wire — SEO, E-E-A-T & Visibility Audit

*Internal strategy document. Not part of the published site (excluded from the Jekyll build).*

## 1. What Turing Wire is

An independent AI-industry publication on Jekyll + GitHub Pages. It aggregates and summarises
other publishers' AI news and research (~4,500 posts on a 90-day rolling window) and adds original
data layers: the **TW AI Index**, an **AI Stocks** dashboard, **model-pricing** and **benchmark**
comparisons, ~2,000 **company** pages, multi-source **Stories**, and user-defined **Missions**.

The defensible value is the *structured/original* layer, not the news summaries. The summaries are
the largest URL set and the weakest SEO surface.

## 2. Content

| Surface | SEO outlook |
|---|---|
| News/research summaries (derivative) | Weak — competes with primary publishers; reputation risk at scale |
| `/aistocks/`, `/models/`, `/benchmarks/` | Strong — unique, evergreen, high-intent |
| `/companies/*` (~2,000) | Latent — currently thin (article lists); needs original profiles |
| `/stories/*` | Strong — original multi-source synthesis; promote heavily |

## 3. YMYL assessment

The AI Stocks dashboard, TW AI Index, and model-pricing pages are financial / YMYL-adjacent.

- **In place:** a solid `/disclaimer/` (not investment advice, ≤15-min Finnhub delay, past-performance
  caveat); inline disclaimers + "Updated" timestamps already on `/aistocks/`, `/models/`,
  `/benchmarks/`.
- **Fixed in this pass:** explicit "Not investment advice" + Finnhub provenance surfaced inline on
  `/aistocks/`; disclaimer wording aligned with the editorial-standards page.
- **Remaining:** consider a short methodology anchor for how the TW AI Index is computed.

## 4. E-E-A-T assessment (the central risk)

**Before:** fully anonymous. `author: "Turing Wire"`, bylines "editorial staff", JSON-LD author a
generic "Editorial Team", no Organization schema, no `sameAs`, no masthead/ownership, and a direct
contradiction between the disclaimer ("automated… does not independently verify") and the bylines.
Under Google's scaled-content-abuse / site-reputation policies, ~4,500 anonymous AI summaries of
third-party content is the biggest existential ranking risk.

**Changed in this pass:**
- Named editor persona (`site.editor`, pen name — owner to rename) with a dedicated
  `/about/editor/` page; used in bylines and article `author` schema.
- `NewsMediaOrganization` schema sitewide (logo, foundingDate, publishing/corrections/ownership
  policy links, optional `sameAs`).
- Honest **AI-assisted + human-oversight** disclosure on every post and reconciled across
  `/about/` and `/disclaimer/`.
- Ownership & funding + FAQ sections on `/about/`.

**Still owner-dependent:** choose the real pen name (`_config.yml` → `editor.name`), add verified
`organization.same_as` profile URLs, and (optionally) attach a real identity for maximum trust.

## 5. SEO assessment

**Strong already:** per-type JSON-LD (NewsArticle, BreadcrumbList, Dataset), `jekyll-sitemap`,
4 RSS feeds, canonicals, OG/Twitter, `noindex` on <300-word/truncated posts, font preconnect,
semantic HTML/ARIA, `llms.txt` + `knowledge-graph.json` (good GEO posture), AI-crawler allowlist.

**Added in this pass:** `NewsMediaOrganization` + named-author `Person` schema, homepage
`WebSite` + `SearchAction` (sitelinks search box), `FAQPage` on `/about/`, Google Search Console
verification hook (`site.google_site_verification`), optional company-profile rendering, optional
newsletter capture.

**Still open (follow-ups):**
- Replace Tailwind **CDN runtime** (`default.html`) with a prebuilt CSS file — removes a
  render-blocking script (CWV/LCP). Needs a build step (Tailwind CLI committed output or GH Action).
- Populate original `profile:` front matter on the top company pages (template support shipped).
- Add intro copy + `FAQPage` to `/models/`, `/benchmarks/`, `/companies/` hub pages.
- `rel=prev/next` on `/page/:num/` pagination.

## 6. Path to a few hundred users/day (balanced mix)

1. **Trust first** — repaired E-E-A-T so Google trusts the domain (this pass). Submit/verify in
   Search Console.
2. **Build rankable assets** — differentiated evergreen pages (models, benchmarks, enriched
   company profiles, Stories) target high-intent queries the summaries can't win.
3. **Distribution** — RSS already strong; newsletter capture added; seed major items to
   communities (HN/Reddit/X); keep `llms.txt`/knowledge-graph current for AI-citation traffic.

**Leading indicators (4–8 weeks):** Search Console impressions/clicks on hub & company pages,
indexed-page ratio, and returning-visitor rate (GA4). The summary pages are not the growth engine
and should not be optimised for ranking.

## 7. Changes shipped in this pass

- `_config.yml`: `editor`, `organization`, `google_site_verification`, `newsletter`; `docs/`
  excluded; logo path fixed.
- `_layouts/default.html`: GSC meta; named-author article schema; `NewsMediaOrganization`; named
  editor `Person`; homepage `WebSite`+`SearchAction`.
- `_layouts/post.html`: named byline + AI-assistance disclosure.
- `_layouts/company.html`: optional `profile` intro block.
- `pages/about.md`: editor + ownership/funding + AI-assistance + FAQ (+ FAQPage schema).
- `pages/disclaimer.md`: aligned AI-assistance wording.
- `pages/aistocks.html`: explicit "Not investment advice" + Finnhub provenance.
- `pages/editor.md`: new `/about/editor/` page.
- `_includes/footer.html`: editor link + config-gated newsletter block.
