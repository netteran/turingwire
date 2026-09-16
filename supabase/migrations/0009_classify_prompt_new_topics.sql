-- ---------------------------------------------------------------
-- Extend the classifier's news taxonomy with five subcategories that the
-- existing buckets under-served or actively mis-scored:
--
--   safety_leadership_exits — a safety/alignment departure from a frontier
--     lab was falling into hiring_org_changes, whose own calibration says
--     "personnel changes below VP" are minor. A safety researcher leaving
--     while citing risk or pace concerns is a governance signal, not
--     routine reorg noise.
--   model_welfare_ethics — the model-welfare/sentience debate has no home;
--     it was getting folded into safety_alignment alongside unrelated
--     technical alignment work.
--   power_infrastructure — split out from infrastructure_compute so
--     grid/energy stories aren't diluted by (or mistaken for generic
--     off-topic energy news and skipped).
--   agi_timelines — AGI/superintelligence timeline predictions had no
--     distinct bucket and were landing in the catch-all opinion_essay.
--   content_ecosystem — the AI-slop / "dead internet" debate, same gap.
--
-- Also strengthens IMPACT CALIBRATION with explicit examples for these plus
-- the AI-bubble/valuation debate (which stays cross-cutting across the
-- existing stocks subcategories + dual ["news","stocks"] routing rather
-- than getting its own subcategory — it's already served structurally, it
-- just needed to be scored correctly), and clarifies that AI-driven power
-- demand must not be skipped as generic energy news.
--
-- This prompt was seeded once by 0005 with `on conflict (key) do nothing`,
-- so editing scripts/prompts.py alone does not change what a live ingest
-- run actually sends — the settings row below is what's read at runtime.
-- Keep this in sync with CLASSIFY_USER in scripts/prompts.py.
-- ---------------------------------------------------------------

update public.settings
set value = $pq$Classify the following article. Return ONLY a JSON object with these exact fields:

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
Category hint: {category_hint}$pq$
where key = 'prompt.classify.user';
