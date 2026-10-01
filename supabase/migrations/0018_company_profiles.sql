-- ---------------------------------------------------------------
-- Company profiles: a short description and the official website,
-- shown as a header on /companies/<slug>/.
--
-- Every company row so far carried the same generated sentence
-- ("Turing Wire coverage of X: AI news, research summaries, and
-- analysis."), which made ~2,000 pages share one boilerplate meta
-- description and gave readers nothing. That text is cleared; the page
-- falls back to a coverage-based description when none is set.
--
-- The companies the classifier names canonically get a curated profile
-- below. Descriptions stick to stable facts (what the company does,
-- where it's based); edit or extend them in Admin → Companies.
-- ---------------------------------------------------------------

alter table public.companies add column website text
  check (website is null or website ~ '^https?://');

update public.companies
set description = null
where description like 'Turing Wire coverage of %';

-- Admins edit description/website from /admin/companies.
create policy "admins update companies"
  on public.companies for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Curated profiles, matched by slug (rows that don't exist are skipped).
update public.companies c
set description = v.description,
    website     = v.website
from (values
  ('openai', 'AI research and deployment company behind the GPT models, ChatGPT, Sora and the OpenAI API. Founded in 2015 and based in San Francisco.', 'https://openai.com'),
  ('anthropic', 'AI safety and research company that builds the Claude family of large language models. Founded in 2021 and based in San Francisco.', 'https://www.anthropic.com'),
  ('google-deepmind', 'Google''s AI research lab, formed in 2023 by merging DeepMind and Google Brain. It develops the Gemini models and research systems such as AlphaFold.', 'https://deepmind.google'),
  ('google', 'Alphabet''s core business, spanning Search, Android, Chrome, YouTube and Google Cloud, with AI built across its products including the Gemini assistant.', 'https://about.google'),
  ('microsoft', 'Software and cloud company behind Windows, Office, Azure and the Copilot assistants, and a major investor in and cloud partner to OpenAI.', 'https://www.microsoft.com'),
  ('meta', 'Parent company of Facebook, Instagram and WhatsApp. It develops the open-weight Llama models and the Meta AI assistant.', 'https://about.meta.com'),
  ('nvidia', 'Chipmaker whose GPUs and CUDA software platform are the most widely used hardware for training and running AI models in data centers.', 'https://www.nvidia.com'),
  ('amd', 'Semiconductor company making CPUs and the Instinct line of data-center GPUs for AI workloads.', 'https://www.amd.com'),
  ('intel', 'Semiconductor company making x86 processors and Gaudi AI accelerators, and building a contract chip-manufacturing (foundry) business.', 'https://www.intel.com'),
  ('tsmc', 'Taiwan Semiconductor Manufacturing Company, the world''s largest contract chipmaker, which manufactures most leading-edge AI chips.', 'https://www.tsmc.com'),
  ('apple', 'Maker of the iPhone, Mac and Apple silicon chips. Its AI features ship under the Apple Intelligence brand.', 'https://www.apple.com'),
  ('amazon', 'E-commerce and cloud company. Through AWS it offers AI infrastructure, its own Trainium and Inferentia chips, and the Bedrock model platform.', 'https://www.aboutamazon.com'),
  ('mistral', 'Paris-based AI company, founded in 2023, that releases open-weight and commercial large language models.', 'https://mistral.ai'),
  ('hugging-face', 'Platform and community hub for sharing open machine-learning models, datasets and demos, and maintainer of the Transformers library.', 'https://huggingface.co'),
  ('cohere', 'Toronto-founded company that builds large language models and retrieval tools for enterprise use.', 'https://cohere.com'),
  ('stability-ai', 'London-based company behind the Stable Diffusion family of open image-generation models.', 'https://stability.ai'),
  ('runway', 'New York-based company that builds generative video models and creative tools.', 'https://runwayml.com'),
  ('elevenlabs', 'AI voice company offering text-to-speech, voice cloning and dubbing models.', 'https://elevenlabs.io'),
  ('perplexity', 'AI-powered answer engine that responds to questions with cited web sources.', 'https://www.perplexity.ai'),
  ('databricks', 'Data and AI platform company known for the lakehouse architecture and its roots in Apache Spark.', 'https://www.databricks.com'),
  ('cognition', 'AI company behind Devin, an autonomous software-engineering agent.', 'https://cognition.ai'),
  ('suno', 'AI music company whose models generate complete songs, including vocals, from text prompts.', 'https://suno.com'),
  ('alibaba', 'Chinese e-commerce and cloud group that develops the Qwen family of large language models through Alibaba Cloud.', 'https://www.alibabagroup.com'),
  ('palantir', 'Data-analytics software company serving governments and enterprises, including its AIP platform for deploying language models.', 'https://www.palantir.com'),
  ('snowflake', 'Cloud data platform company that offers AI and LLM features through Snowflake Cortex.', 'https://www.snowflake.com'),
  ('salesforce', 'CRM software company building AI agents for business through its Agentforce platform.', 'https://www.salesforce.com'),
  ('servicenow', 'Enterprise workflow-automation software company that embeds generative AI across its Now Platform.', 'https://www.servicenow.com'),
  ('oracle', 'Database and enterprise software company whose Oracle Cloud Infrastructure supplies large-scale AI compute.', 'https://www.oracle.com'),
  ('ibm', 'Enterprise technology company offering the watsonx AI platform and Granite models alongside consulting and hybrid cloud.', 'https://www.ibm.com'),
  ('uipath', 'Enterprise automation software company focused on robotic process automation and AI agents.', 'https://www.uipath.com'),
  ('xai', 'AI company founded by Elon Musk in 2023 that develops the Grok models.', 'https://x.ai'),
  ('deepseek', 'Hangzhou-based AI lab that releases open-weight large language models, including its V-series and R-series reasoning models.', 'https://www.deepseek.com'),
  ('cerebras', 'Chip company that builds wafer-scale AI processors and offers fast model inference as a cloud service.', 'https://www.cerebras.ai'),
  ('scale-ai', 'Data company that provides training data, data labelling and model-evaluation services for AI developers.', 'https://scale.com'),
  ('character-ai', 'Consumer app for chatting with AI characters.', 'https://character.ai'),
  ('asml', 'Dutch maker of lithography systems and the only supplier of the EUV machines used to make leading-edge chips.', 'https://www.asml.com'),
  ('applied-materials', 'Supplier of the equipment and services used to manufacture semiconductors and displays.', 'https://www.appliedmaterials.com'),
  ('lam-research', 'Maker of wafer-fabrication equipment, especially etch and deposition tools, for chip manufacturing.', 'https://www.lamresearch.com'),
  ('micron', 'Memory chipmaker producing DRAM, NAND and the high-bandwidth memory (HBM) used in AI accelerators.', 'https://www.micron.com'),
  ('arm', 'UK chip-design company whose processor architecture is licensed for most smartphones and a growing share of data-center CPUs.', 'https://www.arm.com'),
  ('broadcom', 'Semiconductor and infrastructure-software company that designs custom AI accelerators and networking chips for hyperscalers.', 'https://www.broadcom.com'),
  ('super-micro', 'Server maker building GPU-dense systems and rack-scale infrastructure for AI data centers.', 'https://www.supermicro.com'),
  ('baidu', 'Chinese search company that develops the ERNIE large language models and the Apollo autonomous-driving platform.', 'https://www.baidu.com')
) as v(slug, description, website)
where c.slug = v.slug;
