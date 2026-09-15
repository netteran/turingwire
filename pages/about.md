---
layout: page
title: "About"
description: "What Turing Wire is, who it's for, and how to get the most out of it."
permalink: /about/
---

Turing Wire is an independent AI industry publication covering the AI ecosystem — tracking labs, hardware, papers, and markets in near-realtime. We cover every major lab release, funding round, research breakthrough, and policy development so you spend less time hunting and more time building.

## Who it's for

**The AI-aware practitioner.** If you're an engineer, ML researcher, or technical PM working in or adjacent to AI, Turing Wire is built for your daily rhythm. You follow lab releases because they change what you can build. You scan arXiv selectively but can't read 30 abstracts a day. You care about whether TSMC's yield issues will affect GPU availability in Q3. You want signal, not volume.

The feeds and tools serve distinct needs:

- **News** — What shipped, who got funded, what policy is coming. Organised by impact (Critical → Minor) so you can triage at a glance. Subscribe to the [Major+ RSS feed](/feed-major.xml) to get only the stuff worth stopping for.
- **Research** — Paper summaries structured for practitioners: problem, method, results, and *why it matters for what you're building*. Covers arXiv, Nature Machine Intelligence, JMLR, and major conference proceedings. Each summary links directly to the original and, where available, to the arXiv abstract.
- **AIStocks** — Semiconductor supply, hyperscaler capex, and enterprise AI deployment health — framed as ecosystem signals, not trading tips. When NVDA earnings disappoint or TSMC cuts guidance, it tells you something about where the compute supply chain is heading.
- **Stories** — In-depth coverage of developing events. When a topic evolves across multiple articles over days, a Story brings all the threads together: each key finding is cross-referenced against independent sources, with links to every supporting or contradicting article. Contested findings are surfaced explicitly.
- **Missions** — Persistent tracking goals you define yourself. Specify companies, keywords, and a minimum impact level; Missions surfaces only items new since you last checked. Results can be exported as JSON or bookmarked as a pinnable URL. Missions also supports browser notifications for critical matches.

## Intelligence

The **Intelligence** section — [Stories](/stories/) and [Missions](/missions/) — is where Turing Wire goes deeper on individual topics.

**Stories** exist because AI coverage is rarely a single event. A model launch becomes a week-long story as benchmarks are contested, safety evaluations are released, and competitors respond. Rather than leaving you to manually connect ten articles, a Story does it: it clusters related sources, cross-references key findings, and presents the result with full source links. Disagreements between sources are surfaced explicitly — you see what's settled and what's still contested.

**Missions** exist because most practitioners care deeply about a narrow slice of the field. A Mission lets you express that directly: "Show me everything about Anthropic enterprise deals above Major impact" or "Track inference cost across any lab, keyword: tokens per second." The Mission reruns on every visit, remembers what you've already seen, and notifies you when something new matches. You can run multiple Missions in parallel, export their results, or share a Mission URL with a colleague.

## What it isn't

Turing Wire is not a primary source. Every article links directly to the original publication. For important decisions — technical, financial, or otherwise — read the original.

It is also not financial advice. See the [disclaimer](/disclaimer/).

## How to use it

**Daily briefing:** The homepage shows the last three days grouped by date. The impact rating and subcategory let you decide in two seconds whether to click through.

**Follow an evolving event:** Check [Stories](/stories/) when a topic is developing across multiple sources. Each story card shows source count and whether findings are contested.

**Set up a Mission:** Go to [Missions](/missions/), name your goal, add companies or keywords, pick a minimum impact level, and save. Come back anytime — or enable browser notifications — to see what's new since your last visit.

**Track a company:** Every article is tagged by company. Use the [Companies directory](/companies/) or the tags in any article to see everything from a given lab or vendor.

**Stay current via RSS:** Multiple feeds are available — [all posts](/feed.xml), [Major+ only](/feed-major.xml), [News only](/news/feed.xml), and [Research only](/research/feed.xml). The Major+ feed is the lowest-noise option for a busy inbox.

**Search:** Full-text search across all articles is available at [/search/](/search/) or via the `/` shortcut anywhere on the site.

## Who maintains it

Turing Wire is edited by **{{ site.editor.name }}** ({{ site.editor.role | downcase }}), the pen name of the founder — a practitioner working in the AI field. See the [editor page](/about/editor/) for more. If you spot an error, want to suggest a source, or have any other question, use the [contact form](/contact/).

### Ownership & funding {#ownership}

Turing Wire is an independent, self-funded personal project. It is **not owned by, affiliated with, or sponsored by** any AI lab, hardware vendor, or investor that appears in its coverage. Where revenue exists, it comes from clearly-labelled sponsorships and advertising (see [contact](/contact/)) — and sponsorship never influences which stories are covered, their impact ratings, or how they are summarised.

## Editorial standards

Every article on Turing Wire is written from a primary source and follows consistent editorial standards.

**Sources.** Turing Wire monitors arXiv (cs.AI, cs.LG, cs.CL, stat.ML), Nature Machine Intelligence, JMLR, NeurIPS/ICML/ICLR proceedings, TechCrunch, VentureBeat, The Information, Reuters Technology, MIT Technology Review, IEEE Spectrum, and approximately 30 additional specialised AI publications. All monitored sources are listed on the [Sources page](/sources/).

**Coverage scope.** Each article is categorised by topic (news or research), subject area (e.g. model release, funding, regulation, inference optimisation), and significance level (Critical → Minor). Coverage is focused on developments with practical implications for the AI field.

**Article format.** News articles follow a consistent editorial structure: lead (what happened, who, why now), body (key facts, numbers, competitive context), and a forward-looking close. Research articles follow: Problem, Method, Results, Limitations, Why it matters. Each article cites its primary source directly within the body using standard journalistic attribution.

**AI assistance.** Summaries are produced with AI assistance under human editorial oversight. An automated pipeline drafts each summary directly from its primary source; the editor sets the source list, categorisation, and impact criteria, and is responsible for the published result. Summaries never introduce claims or statistics absent from the source, and Turing Wire is not a primary source — every article links to the original so you can verify and read in full.

**Source integrity.** Articles do not invent claims or statistics not present in the source material. Where a source is a preprint, this is stated explicitly. Every article links to its primary source.

**Corrections.** If an article contains an error, contact us via the [contact form](/contact/). Corrections are applied promptly and the publication date is updated to reflect the revision.

## Frequently asked questions

**Is Turing Wire a primary news source?**
No. Turing Wire publishes editorial summaries of publicly available articles and research, and every item links to its original source. For important technical or financial decisions, read the original.

**Are the summaries written by AI?**
Summaries are produced with AI assistance under human editorial oversight. The editor sets the standards, sources, and impact criteria and is responsible for what is published. See [Editorial standards](#editorial-standards) above.

**Is anything on the AIStocks dashboard investment advice?**
No. Market data is shown as ecosystem signal, not trading guidance, and may be delayed up to 15 minutes. See the [disclaimer](/disclaimer/).

**How do I follow Turing Wire?**
Use the [Major+ RSS feed](/feed-major.xml) for the lowest-noise option, or any of the [other feeds](/feed.xml). You can also set up a [Mission](/missions/) to track a specific company or topic.

**How often is it updated?**
Continuously. News and research are added throughout the day; market data refreshes every 15 minutes during market hours.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Turing Wire a primary news source?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Turing Wire publishes editorial summaries of publicly available articles and research, and every item links to its original source. For important technical or financial decisions, read the original." }
    },
    {
      "@type": "Question",
      "name": "Are the summaries written by AI?",
      "acceptedAnswer": { "@type": "Answer", "text": "Summaries are produced with AI assistance under human editorial oversight. The editor sets the standards, sources, and impact criteria and is responsible for what is published." }
    },
    {
      "@type": "Question",
      "name": "Is anything on the AIStocks dashboard investment advice?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Market data is shown as ecosystem signal, not trading guidance, and may be delayed up to 15 minutes. See the disclaimer." }
    },
    {
      "@type": "Question",
      "name": "How do I follow Turing Wire?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Major+ RSS feed for the lowest-noise option, or any of the other feeds. You can also set up a Mission to track a specific company or topic." }
    },
    {
      "@type": "Question",
      "name": "How often is it updated?",
      "acceptedAnswer": { "@type": "Answer", "text": "Continuously. News and research are added throughout the day; market data refreshes every 15 minutes during market hours." }
    }
  ]
}
</script>
