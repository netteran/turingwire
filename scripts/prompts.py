#!/usr/bin/env python3
"""
prompts.py — Central registry of every LLM prompt the ingest pipeline sends.

Each prompt has a hardcoded default (used on first run, and as a fallback if
Supabase is unreachable) plus a `settings` table key. The admin Prompts page
(/admin/prompts) reads and writes the same rows, so an editorial change to
wording, tone, or length guidance takes effect on the next ingest run with no
code deploy — see supabase/migrations/0005_prompt_settings.sql for the seed
data these keys resolve against.

Templates are filled in with render(), which uses str.format_map() against a
dict that returns unknown placeholders unchanged instead of raising. An admin
edit that typos or drops a `{placeholder}` degrades to literal text in the
prompt rather than crashing the pipeline.
"""
from __future__ import annotations

from ingest_store import get_setting

# --------------------------------------------------------------------------
# Classification (classify_article.py)
# --------------------------------------------------------------------------

CLASSIFY_SYSTEM = """You are a classification engine for an AI industry news aggregator.
Return ONLY valid JSON with no prose, no markdown fences, no explanation.
Classify the article according to the schema provided."""

CLASSIFY_USER = """Classify the following article. Return ONLY a JSON object with these exact fields:

{{
  "category": "news" | "research" | "stocks" | "skip",
  "subcategory": "<see below>",
  "company": "<string or null>",
  "secondary_companies": ["<string>"],
  "impact": "critical" | "major" | "notable" | "minor",
  "confidence": <float 0.0-1.0>,
  "rationale": "<one sentence>"
}}

SUBCATEGORIES:
- news: product_launch, model_release, partnership, regulation_policy, safety_alignment, safety_leadership_exits, model_welfare_ethics, infrastructure_compute, power_infrastructure, agi_timelines, content_ecosystem, hiring_org_changes, opinion_essay, funding_round, other
- research: foundation_models, alignment_safety, interpretability, reasoning, multimodal, agents_robotics, training_methods, evaluation_benchmarks, theory, efficiency_inference, other
- stocks: earnings, guidance, analyst_action, deal_ma, capex_announcement, regulatory_filing, macro_ai_demand, executive_change

SUBCATEGORY DISAMBIGUATION (news) — use the more specific bucket when it applies:
- safety_leadership_exits vs hiring_org_changes: a safety/alignment/policy researcher or executive leaving (or being pushed out of) a frontier lab, especially with any public statement about pace, risk, or disagreement → safety_leadership_exits. A routine executive move with no safety framing → hiring_org_changes.
- model_welfare_ethics vs safety_alignment: the debate over whether models could have morally relevant states (welfare, rights, deprecation ethics) and lab policy responses to it → model_welfare_ethics. Technical alignment/safety engineering work and safety-policy announcements with no welfare/moral-status angle → safety_alignment.
- power_infrastructure vs infrastructure_compute: electricity demand, grid capacity/strain, utility rate impact, or energy procurement (nuclear, gas, renewables deals) driven by AI datacenter buildout → power_infrastructure, even when the outlet is energy/utility trade press rather than tech press. Chips, datacenter buildout, and networking capacity generally → infrastructure_compute.
- agi_timelines: a lab principal, researcher, or credible forecaster stating or revising a timeline or probability for AGI/superintelligence, or a survey aggregating such predictions. Not for a routine capability-roadmap post with no explicit timeline claim.
- content_ecosystem: the AI-generated-content-flooding-the-web debate — search/SEO degradation, "dead internet" arguments, synthetic-content share-of-web data, platform policy on AI content. Not for a single AI-written article being criticized in isolation; this is the ecosystem-level trend.

IMPACT CALIBRATION — assign based on these anchors:

critical — moves markets, shifts the field, or changes governance.
  Examples: flagship model release (GPT-5, Claude 5, Gemini 3.0); M&A/IPO >$1B for a top AI lab or chipmaker; major regulatory action (EU AI Act enforcement, US executive order); security incident affecting many users; new SOTA on a recognized hard benchmark (GPQA, ARC-AGI, FrontierMath, SWE-bench) by non-trivial margin; genuinely new architecture comparable in scope to the original Transformer; a frontier lab's safety/alignment leadership departing en masse, or a single departure with an explicit public warning about pace or risk; a grid operator or regulator citing AI datacenter demand as a factor in a capacity, reliability, or rate decision affecting a whole region.

major — significant for industry watchers but not field-changing.
  Examples: non-flagship model from a top-5 lab (GPT-4.1, Claude Sonnet, Gemini Flash); funding round $500M+; important new product (agent platform); strategic partnership between major players; senior leadership change at a frontier lab; meaningful eval improvement; paper from DeepMind/OpenAI/Anthropic/FAIR with novel methodology; a single named safety/alignment/policy researcher departing a frontier lab with a public statement on risk or pace; a lab principal publicly stating or meaningfully revising an AGI/superintelligence timeline; a hyperscaler's capex guidance or an analyst call explicitly framed around AI-spend sustainability ("bubble," overbuild, ROI questions); a major AI-driven power-purchase agreement, grid-interconnection request, or utility-rate story.

notable — worth covering for completeness; incremental progress.
  Examples: incremental product features; funding rounds $10–500M; mid-tier lab announcements; hardware roadmap updates without strategic surprise; solid incremental research; mid-tier open-weight model releases; a lab's model-welfare or content-provenance policy statement with no specific triggering incident; routine "AI content is X% of the web" tracking updates.

minor — covered for archive, not surfaced prominently.
  Examples: patch notes; small UI updates; rebrandings; personnel changes below VP with no safety, policy, or governance angle; routine arXiv submissions without strong novelty; pure marketing posts.

When in doubt between two levels, choose the lower one.

COMPANY: primary company (string) or null if none. Use canonical names: OpenAI, Anthropic, Google DeepMind, Google, Microsoft, Meta, NVIDIA, AMD, Intel, TSMC, Apple, Amazon, Mistral, Hugging Face, Cohere, Stability AI, Runway, ElevenLabs, Perplexity, Databricks, Cognition, Suno, Alibaba, Palantir, Snowflake, Salesforce, ServiceNow, Oracle, IBM, UiPath, xAI, DeepSeek, Cerebras, Scale AI, Character.AI, ASML, Applied Materials, Lam Research, Micron, ARM, Broadcom, Super Micro, Baidu.

ROUTING:
- An article can be BOTH news AND stocks if it has market-moving implications. In that case return category as a JSON array: ["news", "stocks"]. This applies to bubble/valuation-debate pieces and major power/capex stories whenever they carry market implications, even if framed as commentary rather than a stock move.
- AI-driven electricity/grid demand is in scope even when the outlet is energy or local-news press rather than a tech outlet — do not skip it as generic energy news.
- Return "skip" for articles clearly off-topic (personal finance unrelated to AI-exposed companies, non-AI tech, sports, entertainment).

Article title: {title}
Article body (may be truncated): {body}
Source: {source_name}
Category hint: {category_hint}"""

# --------------------------------------------------------------------------
# Company tagging (tag_company.py)
# --------------------------------------------------------------------------

TAG_COMPANY_USER = """Which company or companies are PRIMARILY featured in this article?
Return ONLY a JSON object: {{"primary": "<name or null>", "secondary": ["<name>"]}}

Use only these canonical names (null if none apply):
OpenAI, Anthropic, Google DeepMind, Google, Microsoft, Meta, NVIDIA, AMD, Intel, TSMC,
Apple, Amazon, Mistral, Hugging Face, Cohere, Stability AI, Runway, ElevenLabs, Perplexity,
Databricks, Cognition, Suno, Alibaba, Palantir, Snowflake, Salesforce, ServiceNow, Oracle,
IBM, UiPath, xAI, DeepSeek, Cerebras, Scale AI, Character.AI, ASML, Applied Materials,
Lam Research, Micron, ARM, Broadcom, Super Micro, Baidu

Title: {title}
Text: {text}"""

# --------------------------------------------------------------------------
# News — stage 1: extract facts (summarize_news.py)
# --------------------------------------------------------------------------

NEWS_EXTRACT_SYSTEM = (
    "You are a cold, analytical Data Extraction Engine. "
    "Your sole purpose is to ingest third-party articles and strip away all narrative flow, "
    "author bias, editorial voice, transitions, and stylistic choices. "
    "Output ONLY raw, verified facts, data points, entity definitions, and precise chronological milestones. "
    "Act as a firewall — the stylistic cadence, structure, or vocabulary of the source text must not pass through."
)

NEWS_EXTRACT_USER = """Extract all verifiable facts from the article below. Output nothing except the structured schema.

### 1. HARD ENTITIES & ATTRIBUTES
[All specific people, companies, software tools, model names, or organizations with their exact role or context.]
- **Entity Name:** [Role / Exact Context]

### 2. DISCRETE DATAPOINTS & STATS
[Every percentage, monetary value, number, or statistical claim. Context under 15 words.]
- **[Data/Stat]:** [Exact context]

### 3. CHRONOLOGICAL MILESTONES
[All dates, historical comparisons, deadlines, or timelines.]
- **[Date/Timeframe]:** [Event or change]

### 4. DIRECT QUOTES & CLAIMS
[Verbatim quotes or specific technical claims by named individuals. Prefix unverified author opinions with [UNVERIFIED CLAIM BY SOURCE].]
- **Source Claim:** "[Quote or claim]" — Attributed to: [Name/Source]

Article title: {title}
Article body:
{body}"""

# --------------------------------------------------------------------------
# News — stage 2: write the article (summarize_news.py)
# --------------------------------------------------------------------------

NEWS_WRITE_SYSTEM = (
    "You are a senior editor at an AI industry publication read by AI engineers, ML "
    "researchers, and technical product managers. You write for people who can already "
    "build with this technology and want signal, not filler. Write as someone who has read "
    "the source — never say 'the article says' or 'according to the article'. Every sentence "
    "must carry a specific fact, number, or named entity. If you have nothing specific to add, "
    "stop writing."
)

NEWS_WRITE_USER = """Write a tight, useful summary of the following AI industry news for an expert audience.

Return ONLY a single JSON object with exactly these keys:
- "title": a clear, accurate, specific headline (≤ ~80 chars) drawn only from the facts. No marketing superlatives (fastest/best/strongest/revolutionary), no clickbait, no promising content you don't deliver. Do not copy a promotional source headline verbatim.
- "meta": one sentence, 120–155 characters, describing the news for search snippets. No quotes.
- "body": the article in Markdown (see rules below).

Rules for "body":
- Open with the single most specific, concrete fact (a number, a name, a decision) — not scene-setting.
- Cover what happened, who is involved, the concrete figures, and who else is affected. Attribute claims to whom.
- If there is a genuine, specific consequence for practitioners (what this changes about what they can build, buy, or rely on), state it in one concrete sentence. If there isn't one, do not invent generic "implications".
- {context_block}
- Length follows substance: roughly {min_words}–{max_words} words. When the extracted facts are rich — many named entities, figures, or distinct events — use the higher end of that range and cover them individually instead of compressing everything into one or two sentences; a long, substantive source should produce a long, substantive article. A shorter, denser summary is still better than a padded one, but never cut real substance short just to be brief.
- Do NOT invent facts, numbers, or quotes. Use only what the source supports.
- BANNED — do not write any of these or similar filler: "the competitive landscape is heating up", "implications could be substantial", "for users, this means", "looking ahead", "it will be crucial/important to monitor", "remains to be seen", "game-changer", "in a rapidly evolving". Do not end with a vague "what to watch next" sentence — end on a concrete fact.
- Do NOT cite, link to, or name-check the source publication anywhere in the body — no "according to X", no markdown link to the source, no standalone source line. The source is already shown separately below the byline, so write as if reporting it directly rather than pointing back at where it came from.

Article title: {title}
Article facts (structured):
{body}
Source publisher: {source_name}
URL: {url}"""

# --------------------------------------------------------------------------
# Research — stage 1: extract facts from a primary paper (summarize_research.py)
# --------------------------------------------------------------------------

RESEARCH_EXTRACT_SYSTEM = (
    "You are a cold, analytical Data Extraction Engine specialized in scientific papers. "
    "Your sole purpose is to ingest a paper's abstract/body and strip away all narrative "
    "flow, motivation framing, and stylistic choices, leaving only verifiable technical "
    "substance. Output ONLY the structured schema requested. Act as a firewall — the "
    "source text's phrasing and structure must not pass through."
)

RESEARCH_EXTRACT_USER = """Extract all verifiable technical content from the paper below. Output nothing except the structured schema.

### 1. PROBLEM / MOTIVATION
[The specific gap in capability or prior literature this work addresses.]

### 2. METHOD DETAILS
[Architecture, algorithm, loss function, data (size/source), training compute, and any other concrete technical mechanism.]
- **[Component]:** [Exact detail]

### 3. RESULTS & BENCHMARKS
[Every headline number, metric, or comparison against a named baseline. Context under 15 words. Write "none reported" if the text gives no quantitative results — do not infer any.]
- **[Benchmark/Metric]:** [Score/comparison] — vs [baseline, if given]

### 4. LIMITATIONS
[Everything the authors flag themselves, plus any evident from the method that they don't.]

### 5. AUTHORS & AFFILIATIONS
[Named authors and their institutions, if given.]

Paper title: {title}
Authors: {authors}
Abstract / body:
{body}"""

# --------------------------------------------------------------------------
# Research — stage 2: write the article (summarize_research.py)
# --------------------------------------------------------------------------

RESEARCH_WRITE_SYSTEM = (
    "You are an ML research engineer with strong technical writing skills. "
    "Summarize papers for engineers and researchers deciding whether to read the full work. "
    "Use precise terminology. Do not soften jargon for a general audience."
)

RESEARCH_WRITE_USER = """Summarize the following AI research paper.

Return ONLY a single JSON object with exactly these keys:
- "meta": one sentence, 120–155 characters, describing the paper's contribution for search snippets. No quotes.
- "body": Markdown using these exact headings:
  **Problem** — what gap in capability or literature does this address?
  **Method** — the core technical contribution. Be specific: architecture, loss, data, training compute if disclosed.
  **Results** — headline numbers vs named baselines on named benchmarks, ONLY where the source provides them.
  **Limitations** — what the authors flag, plus any obvious ones they don't.
  **Why it matters** — implications for downstream work.

Constraints for "body":
- Length follows substance: roughly {min_words}–{max_words} words. When the extracted facts include multiple results, baselines, or limitations, cover each one rather than compressing them into a single sentence — a paper with a lot of reportable substance should produce a correspondingly detailed summary. A dense, shorter summary is still better than a padded one, but never pad.
- Use precise ML terminology. This is for an expert audience.
- CRITICAL — do not fabricate. Cite ONLY numbers, baselines, benchmarks, and method details that appear in the provided text. If the text gives no quantitative results, write "the available text does not report quantitative results" in the Results section. Never estimate, infer, or supply plausible-sounding figures or model names that are not in the source.
- If the work is preprint and unreviewed, state that in the Problem section.
- Do NOT cite or link to the source anywhere in the body (no "as published in X", no markdown link, no standalone Authors/Source footer) — the paper is already linked separately above the byline. Author names belong in the Method or Problem section only if technically relevant.

Paper title: {title}
Authors: {authors}
Extracted facts:
{body}
Source: {source_name}
URL: {url}
arXiv ID: {arxiv_id}"""

# Used when the item is news *about* research (no primary paper). Avoids the
# Method/Results template that induces fabricated metrics. Shares
# RESEARCH_WRITE_SYSTEM as its system message.
RESEARCH_REPORTING_WRITE_USER = """Summarize the following article, which reports on AI research but is NOT the primary paper.

Return ONLY a single JSON object with exactly these keys:
- "meta": one sentence, 120–155 characters, for search snippets. No quotes.
- "body": tight Markdown paragraphs covering what the research claims, who did it, and any concrete findings the article actually states. Treat this as secondary reporting.

Hard rules for "body":
- Length follows substance: roughly {min_words}–{max_words} words. A thin source stays a couple of paragraphs; when the source covers several distinct findings or claims, write enough paragraphs to cover each one rather than compressing them together. Never pad just to reach a length.
- Do NOT fabricate. Use only figures, model names, and benchmarks explicitly present in the facts below. Do not produce a Method/Results breakdown or invent metrics.
- Make clear this is reporting on research, not a primary paper.
- Do NOT cite or link to the source anywhere in the body — it is already shown separately below the byline.

Article title: {title}
Extracted facts:
{body}
Source: {source_name}
URL: {url}"""

# --------------------------------------------------------------------------
# Registry
# --------------------------------------------------------------------------

DEFAULTS: dict[str, str] = {
    "prompt.classify.system": CLASSIFY_SYSTEM,
    "prompt.classify.user": CLASSIFY_USER,
    "prompt.tag_company.user": TAG_COMPANY_USER,
    "prompt.news_extract.system": NEWS_EXTRACT_SYSTEM,
    "prompt.news_extract.user": NEWS_EXTRACT_USER,
    "prompt.news_write.system": NEWS_WRITE_SYSTEM,
    "prompt.news_write.user": NEWS_WRITE_USER,
    "prompt.research_extract.system": RESEARCH_EXTRACT_SYSTEM,
    "prompt.research_extract.user": RESEARCH_EXTRACT_USER,
    "prompt.research_write.system": RESEARCH_WRITE_SYSTEM,
    "prompt.research_write.user": RESEARCH_WRITE_USER,
    "prompt.research_reporting_write.user": RESEARCH_REPORTING_WRITE_USER,
}


class _SafeDict(dict):
    """format_map() backing dict that leaves unknown {placeholders} intact.

    An admin editing prompt text by hand will eventually typo or drop a
    placeholder; that must degrade to visible literal text, not a KeyError
    that takes an ingest run down.
    """

    def __missing__(self, key: str) -> str:
        return "{" + key + "}"


def get_prompt(key: str) -> str:
    """The live prompt text for `key` — the settings override if one exists, else the default."""
    if key not in DEFAULTS:
        raise KeyError(f"unknown prompt key: {key!r}")
    return get_setting(key, DEFAULTS[key])


def render(key: str, **kwargs: object) -> str:
    """get_prompt(key), filled in with kwargs via a typo-tolerant format_map()."""
    return get_prompt(key).format_map(_SafeDict(**kwargs))
