# Turing Wire — Indexing Recovery & SERP Visibility Plan

*Internal strategy document (not routed). Based on the Search Console "Page indexing" export for
turingwire.com dated 2026-09-29 (data through 2026-09-21), read against the code in this repo.*

---

## 1. What the report says

| Metric (2026-07-01 → 2026-09-21) | Value |
|---|---|
| **Indexed pages** | **1**, flat for the whole period (almost certainly just the homepage) |
| Not indexed | 2,269 (latest) — it has swung between 255, ~5,450 and 2,269 |
| Impressions | **97 in 83 days**, 0 on 44 of those days |

Why pages aren't indexed (latest snapshot):

| Reason | Source | Pages | Share |
|---|---|---|---|
| Discovered – currently not indexed | Google systems | 2,014 | 88.8% |
| Crawled – currently not indexed | Google systems | 247 | 10.9% |
| Excluded by `noindex` | Website | 5 | 0.2% |
| Not found (404) | Website | 2 | 0.1% |
| Page with redirect | Website | 1 | <0.1% |

What the jumps in the chart mean:
- **5,434 / 5,494** (07-11 → 07-24, 08-22 → 09-14): the ~5,200 old Jekyll `/post/YYYY/MM/DD/…`
  permalinks sitting in "known" URLs.
- **2,269** (from 09-15): the Next.js migration. The URL set turned into the current
  `/news/…`, `/research/…`, `/companies/…` and `/story/…` addresses.

## 2. Diagnosis

### 2.1 Headline: Google has decided the site isn't worth indexing. The site isn't blocking Google.

Only 8 of 2,269 excluded URLs are "Website" issues. Those are the `noindex` gate, two 404s and one
redirect, and all are expected. **The other 2,261 are Google's own choice.** So the problem is not
robots.txt, canonicals or rendering. It is **site-level trust and quality**:

- **"Discovered – currently not indexed" (2,014)** means Google knows the URL but hasn't spent a
  crawl on it. That is a *crawl-demand* verdict, typically from:
  1. a young domain with almost no external links or brand signals (`organization.sameAs` is empty);
  2. a large, fast-growing URL set of templated, similar pages. Examples are ~2,000 company pages
     that are mostly article-card lists, and thousands of AI summaries;
  3. URLs Google only learns about from the sitemap, with weak internal links (see 2.3).
- **"Crawled – currently not indexed" (247)** means Google fetched the page and turned it down.
  These are summaries of other publishers' articles. Google already has the original, so the copy
  adds nothing to the index.

Put together, this matches how Google treats **scaled, derivative content on a new domain**: the site
as a whole is rated low-value, and every new URL starts from that rating. The earlier audit
(`docs/seo-eeat-audit.md`) called this the "existential risk". The data now confirms it.

### 2.2 Things in the codebase that make it worse

| # | Finding | Where | Effect |
|---|---|---|---|
| 1 | **The sitemap submits thousands of low-value URLs.** It includes every company with `primary_count > 0` (~2,000 near-template pages) and every article passing a 300-word gate. | `app/sitemap.ts` | Tells Google "these are my important pages", and most are thin. Spreads a small crawl budget thin and pulls the site's quality rating down. |
| 2 | **`sitemap-legacy.xml` lists ~5,200 URLs that only redirect.** | `app/sitemap-legacy.xml/route.ts`, `public/robots.txt` | These URLs were **never indexed** (Indexed = 1 all along), so the 301s pass on no ranking value. Every crawl spent on them is a crawl not spent on a real page. |
| 3 | **Deep pages are effectively orphaned.** `/news/` and `/research/` 301 to `/publications/?section=…`. `/publications/` renders only 30 cards in HTML and adds the rest client-side with an IntersectionObserver, while shipping the *whole corpus* in the RSC payload. The homepage shows 3 days of items. | `next.config.ts`, `components/PublicationsFeed.tsx`, `app/page.tsx` | Googlebot finds most articles only through the sitemap and the prev/next chain. Sitemap-only URLs get the lowest crawl priority, which is exactly the "Discovered" bucket. |
| 4 | **Breadcrumbs link to a redirect.** The article breadcrumb points to `/news/` or `/research/`, which 301 to a query-string URL whose canonical is `/publications/`. | `components/ArticlePage.tsx` | Every article's main "parent" link goes through a redirect and lands on a non-hub page. |
| 5 | **No real images.** OG and `NewsArticle.image` use the logo on every page. | `lib/articleMetadata.ts`, `ArticlePage.tsx` | Rules the site out of Discover and Top Stories (both need a large image of at least 1200px) and makes links shared on social less attractive. |
| 6 | **`dateModified` always equals `datePublished`. Static sitemap `lastmod` is "now" on every request.** | `ArticlePage.tsx`, `app/sitemap.ts` | Google learns to ignore the site's `lastmod`, so it can't be used to signal real updates. |
| 7 | **Weak company-page titles and descriptions.** The title is just `"{Company} — Turing Wire"`, and the description is boilerplate when `description` is null. | `app/companies/[slug]/page.tsx` | These pages don't match what people search for ("{company} news", "{company} funding", "{company} models"). |
| 8 | **The homepage H1 is the tagline** in `text-xs` mono. | `app/page.tsx` | The page's topic signal is weak. |
| 9 | **Author signals are inconsistent and unverifiable.** Articles credit the pen-name persona "Callan Zhang". Stories credit a `Person` named "Turing Wire Editorial Team". Each post claims "human editorial oversight". | `ArticlePage.tsx`, `app/story/[slug]/page.tsx`, `lib/site.ts` | Quality raters treat unverifiable authors as low trust. A persona on thousands of AI summaries adds to the scaled-content pattern rather than offsetting it. |

### 2.3 What's already fine (keep it)

Canonicals, the `noindex` gate for thin articles, `NewsMediaOrganization` / `NewsArticle` /
`BreadcrumbList` schema, `/search/` set to noindex, robots.txt, RSS feeds, and `llms.txt`.
**Changing more technical SEO on its own won't fix this.** The fix is to cut down what you ask
Google to index and to build real authority.

### 2.4 Phase 0 findings (2026-09-30)

These findings **replace parts of 2.1–2.2**: the problem is mainly a host conflict plus crawl demand
close to zero, not Google rejecting the current pages.

- **No manual action.** It's a Domain property, and only `https://turingwire.com/` is indexed.
- **The apex and `www` hosts contradict each other (critical).** A redirect check shows
  `https://turingwire.com` → **308** → 200 and `https://www.turingwire.com` → 200 directly. So `www`
  is the primary domain in Vercel. But every canonical, every sitemap URL and the robots
  `Sitemap:` line use `https://turingwire.com` (`lib/site.ts`). Each canonical points at a URL that
  redirects to `www`, which then declares the apex as canonical. Google receives contradictory
  signals on every page. `http://turingwire.com` takes two hops (308 → 308).
- **Almost no crawling, and none of it discovery.** Crawl stats show about 800 requests in 90 days,
  with many zero days in Aug–Sep. **Refresh is 99.5% and discovery 0.5%.** 55% came from "other
  agent type" (inspection and testing tools), not Googlebot. Host status shows no problems and
  response times are about 40–100 ms, so this is not a server problem. Google simply doesn't want
  more of the site. Last crawl dates on the inspected pages are all 30 Apr – 8 May, so Google has
  **never crawled the Next.js pages**.
- **The sitemap isn't the problem, but the legacy sitemap is inflating "Discovered".**
  - `sitemap.xml` shows *Success, 149 pages*, last read 16 Sep. It is small, so the "~2,000
    companies" worry in 2.2 #1 doesn't apply to the current sitemap.
  - `sitemap-legacy.xml` shows *Success, 1,897 pages*. That accounts for most of the **2,014
    "Discovered – not indexed"** URLs: redirect-only `/post/…` addresses, which now chain
    apex → `www` → page.
  - "Temporary processing error" in URL Inspection is stale per-URL data from April.
- **The Jekyll site pointed its canonicals at the sources.** The legacy research post declared
  `rel=canonical` → `https://arxiv.org/abs/…`. That was a site-wide "we are a copy" signal during the
  domain's first crawl, and it likely explains why crawl demand collapsed in May. The current code
  declares its own URL as canonical.

**Revised Phase 1 order:**
1. **Make one host primary.** In Vercel → Domains, set `turingwire.com` as the production domain
   and `www.turingwire.com` → 308 to `turingwire.com`. This needs no code change, and it matches the
   canonicals, sitemaps and GSC history.
2. Remove `sitemap-legacy.xml` and its robots.txt line.
3. Resubmit `sitemap.xml`, then request indexing for `/` and the hub pages.
4. Then continue with internal linking, OG images, titles and Phase 2 content.

## 3. Strategy in one sentence

**Stop asking Google to index ~2,300 derivative pages. Ask it to index ~150–400 pages it can't get
anywhere else, and build links to those pages.** Once those get indexed and earn clicks, the site's
quality rating improves and more URLs follow.

The pages to lead with are the ones that are unique to Turing Wire: **model pricing, benchmarks, AI
Stocks and the TW AI Index, multi-source Stories**, and company pages that carry real data.

## 4. Action plan

### Phase 0 — Confirm the diagnosis in Search Console (day 1–2, no code)

1. **Security & Manual actions** → confirm there is *no* manual action (for example "scaled content
   abuse" or "thin content"). If there is one, it becomes the top priority and needs a
   reconsideration request after Phase 1.
2. **URL Inspection → Test live URL** on `/`, `/models/`, `/benchmarks/`, `/aistocks/`, `/stories/`,
   one story, and 3 articles. Check that the rendered HTML has the content, look at **"Google-selected
   canonical"** (if Google picks the source publisher, that confirms 2.1), and check the crawl date.
3. From each "not indexed" reason, **export the example URLs**. This zip has only the totals. Check
   what share of the 2,014 "Discovered" URLs are `/companies/` pages and what share are articles.
4. **Settings → Crawl stats**: check the share of crawl requests that end in 301/308 (legacy URLs)
   versus 200, and check host status.
5. Set up **Bing Webmaster Tools** (import from GSC). Bing's index feeds ChatGPT search and Copilot,
   and it is usually more open to new sites.

### Phase 1 — Reduce and restructure what Google sees (week 1–2, code)

Ordered by impact. Every item is a small change in this repo.

1. **Trim the sitemap to pages worth indexing** (`app/sitemap.ts`, `lib/seo.ts`)
   - Articles: index only `quality = high` **and** ≥ 500 words **and**
     (`impact` in major/critical **or** linked to a Story). Everything else gets `noindex, follow`
     and stays out of the sitemap. Readers still get it on the homepage and RSS.
   - Companies: index only when `primary_count ≥ 5` **and** the page has original profile or data
     content (see Phase 2). Expect around 50–150 pages, not ~2,000.
   - Target: **a sitemap under ~500 URLs.**
2. **Remove `sitemap-legacy.xml`** and its line in robots.txt. Keep the `/post/…` 301 handler, which
   costs nothing and catches any stray inbound links.
3. **Split the sitemap by type** (`generateSitemaps` / a sitemap index: `hubs`, `stories`,
   `companies`, `articles`). GSC then shows how many pages of each type are indexed, which is the
   main measure of progress.
4. **Give articles real internal-link paths**
   - Bring back **server-rendered `/news/` and `/research/` hubs** with plain paginated links
     (`/news/page/2/`) instead of 301s to a query string. Add **topic hubs** per subcategory
     (`/news/model-releases/`, `/research/reasoning/`, …) with a short intro paragraph each.
   - Point breadcrumbs at those hubs.
   - `/publications/`: render a server-side paginated list and stop sending the full corpus in the
     RSC payload (it is multi-MB and hurts LCP and INP).
5. **Per-article OG images** with `next/og` (`opengraph-image.tsx` on article, story and company
   routes: 1200×630 with title, company and impact). Use it in `NewsArticle.image`.
6. **Honest dates.** Set `dateModified` from `updated_at`. Use real `lastmod` values for static pages
   (file mtime or data refresh time), and never `new Date()` per request.
7. **Titles and headings.**
   - Homepage H1: "AI News, Model Pricing & Research — Turing Wire".
   - Company pages: `"{Company}: AI News, Models & Funding"` plus a data-based description.
   - Hub pages: add 150–300 words of intro and an FAQ (`FAQPage`) to `/models/`, `/benchmarks/` and
     `/aistocks/`. Their copy is currently mostly the interactive table.
8. **Consistent authors.** One author entity across articles and stories. Either attach a real,
   verifiable person (LinkedIn/X profile in `sameAs`), or credit "Turing Wire" as an
   `Organization`, with the AI-assistance disclosure kept. Don't label a team as a `Person`.
9. After deploying, **request indexing by hand for about 10 core URLs** only (the hubs and the best
   stories), and resubmit the split sitemaps. Don't request indexing in bulk.

### Phase 2 — Build pages only Turing Wire has (week 2–8)

This phase is what "drastically improve" depends on. These pages target high-intent queries that
aggregated news can't win, and they are what other sites link to.

1. **One page per model**, e.g. `/models/<model-slug>/`, built from `_data/models.yml` +
   `benchmarks.yml`. Include price per 1M input/output tokens, **price history** (you already
   refresh this data, so store snapshots), context window, release date, benchmark scores, and
   related news and stories. Target queries: "`<model>` API pricing", "`<model>` context window",
   "`<model>` benchmark".
2. **Comparison pages** for pairs people actually search (e.g. `claude-vs-gpt`, `gemini-vs-claude`).
   Build them only where both models have full data. Start with 20–40 hand-picked pairs, not every
   combination.
3. **A regular data story**, e.g. a weekly "AI Model Price Index / What changed this week". Each one
   is an original, citable page that updates reliably and gives other sites a reason to link.
4. **Company pages built from data**: add the company's models and prices, benchmark positions, stock
   (if listed), funding events from the article corpus, and story links. That makes each page a
   unique entity profile. Index only companies with enough data.
5. **Stories as the main editorial unit**: fewer, deeper multi-source analyses with corroboration.
   Link them prominently from the homepage and hubs, and link each article in a cluster up to its
   story.
6. **Lower the volume of news summaries.** Keep producing them for the feed, but they stay mostly
   noindexed (Phase 1.1). Don't count them as the SEO engine. Research summaries of arXiv papers
   compete with arXiv, Hugging Face Papers and alphaXiv, so keep those noindexed except flagship
   write-ups.

### Phase 3 — Authority and distribution (starting now, ongoing)

"Discovered – not indexed" is partly a **link and popularity** problem, and on-site work alone can't
fix that.

1. **Entity setup**: create real X, LinkedIn, Bluesky, GitHub and Hugging Face profiles for Turing
   Wire and add them to `site.organization.sameAs`.
2. **Publish the datasets**, e.g. model pricing history and benchmark table, on GitHub and Hugging
   Face Datasets under CC-BY, with a request to credit and link turingwire.com. Offer embeddable
   charts that link back.
3. **Seed original data, not summaries**, on HN, r/LocalLLaMA, r/MachineLearning and relevant
   newsletters. For example: "API prices fell X% this quarter" with the chart.
4. **Google News / Publisher Center** submission once the named-author and ownership pages are
   settled.
5. **IndexNow** (Bing, Yandex) ping when a story, hub or data page is published.

### Don't

- Don't add more URL types or generate pages in bulk until the index ratio is above ~50%.
- Don't bulk-request indexing, buy links, or rotate content just to change `lastmod`.
- Don't keep `sitemap-legacy.xml` around "just in case". Those URLs have no ranking value to protect.

## 5. KPIs and realistic timeline

Google needs months to re-assess a site's quality rating. Expect movement in stages, not all at once.

| By | Indexed | Impressions/day | Signal to watch |
|---|---|---|---|
| Week 2 | Hubs + top stories (~10–20) | 5–20 | URL Inspection shows "Indexed" for `/models/`, `/benchmarks/`, `/aistocks/` |
| Week 6 | 50–150 | 50–150 | "Discovered" count falling; hubs sitemap at 80% or more indexed |
| Week 12 | 200–400 (≥ 60% of sitemap) | 300–1,000 | First model/pricing queries in the top 20; referring domains > 20 |
| Month 6 | Most of sitemap | 1,000+ | Clicks from long-tail model, company and comparison queries |

Leading indicators to check weekly: indexed ratio **per split sitemap**, Crawl stats (share of 200
responses, requests per day), referring domains (GSC → Links), and Bing index count.

## 6. Suggested first code change (for a PR)

1. Remove `sitemap-legacy.xml` and its robots.txt line.
2. Split and trim the sitemap (stricter article gate; company gate `primary_count ≥ 5`).
3. Add server-rendered `/news/` and `/research/` hubs with pagination, and fix the breadcrumbs.
4. Add per-article `opengraph-image`, and set real `dateModified` and `lastmod`.
5. Fix the homepage H1 and company-page titles.

This change is low-risk and fully reversible. It targets the two causes behind 99% of the
"not indexed" count: crawl priority and the quality of what the sitemap submits.
