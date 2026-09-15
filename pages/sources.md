---
layout: page
title: "Sources"
description: "All news and research sources indexed by Turing Wire."
permalink: /sources/
---

All sources are fetched via their public RSS/Atom feeds or official APIs. No scraping of paywalled content.

## News sources

### Tier 1 — AI Labs

| Source | Company |
|--------|---------|
| OpenAI Blog | OpenAI |
| Anthropic News | Anthropic |
| Google DeepMind Blog | Google DeepMind |
| Google AI Blog | Google |
| Meta AI Blog | Meta |
| Mistral AI Blog | Mistral |
| Perplexity Blog | Perplexity |
| Databricks Blog | Databricks |
| Hugging Face Blog | Hugging Face |
| Cohere Blog | Cohere |
| Stability AI News | Stability AI |
| Runway Blog | Runway |
| ElevenLabs Blog | ElevenLabs |
| Cognition Labs Blog | Cognition |
| Suno Blog | Suno |
| Alibaba Qwen Blog | Alibaba |

### Tier 1 — Hardware vendors

| Source | Company |
|--------|---------|
| NVIDIA Blog | NVIDIA |
| AMD Newsroom | AMD |
| Intel Newsroom | Intel |
| TSMC News | TSMC |

### Tier 2 — Publications

| Source | Notes |
|--------|-------|
| TechCrunch AI | |
| The Verge AI | |
| Ars Technica Technology Lab | |
| MIT Technology Review | |
| Semafor Tech | |
| Stratechery (free posts) | |
| The Information (headlines) | Abstract/headline only — paywalled |

### Tier 3 — Aggregators

| Source | Notes |
|--------|-------|
| Hacker News (AI filtered) | Score ≥ 100 · AI/ML keywords · full linked article fetched |

---

## Research sources

| Source | Type | Notes |
|--------|------|-------|
| arXiv cs.AI | API | Last 24h, cap 30/day |
| arXiv cs.LG | API | Last 24h, cap 30/day |
| arXiv cs.CL | API | Last 24h, cap 30/day |
| arXiv cs.CV | API | Last 24h, cap 20/day |
| arXiv cs.NE | API | Last 24h, cap 10/day |
| Nature Machine Intelligence | RSS | Abstract only — paywalled |
| JMLR | RSS | |
| Science (AI section) | RSS | Abstract only — paywalled |
| Papers with Code (trending) | RSS | |
| NeurIPS Proceedings | RSS | Active in December |
| ICML Proceedings | RSS | Active in July–August |
| ICLR OpenReview | RSS | Active in May–June |

---

## AIStocks ticker universe

{% for ticker in site.data.tickers.tickers %}
- **{{ ticker.symbol }}** — {{ ticker.name }} ({{ ticker.sector | replace: '_', ' ' }})
{% endfor %}

Index base date: `{{ site.data.ai_index_history.base_date | default: site.ai_index_base_date }}`.

---

## Requesting additions

To suggest a new source, [use the contact form](/contact/?ref=sources) with the RSS/Atom URL and a brief rationale. Sources must:

- Have a public RSS or Atom feed, or a documented public API.
- Publish primarily about AI (labs, hardware, research, policy, or markets).
- Not prohibit automated access in their Terms of Service.
- Not be a paywalled source without at least abstract/headline access.
