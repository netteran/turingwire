-- ---------------------------------------------------------------
-- Model pricing data: tracked models and their price history.
--
-- Replaces the hand-maintained _data/models.yml, which had drifted
-- (e.g. Claude Haiku 4.5 listed at $0.80/$4 instead of $1/$5). Which
-- models are tracked is curated in _data/model_catalog.yml; prices,
-- context windows and capabilities come from LiteLLM's public model price
-- list (MIT licence), which records first-party API list prices.
-- scripts/fetch_model_prices.py refreshes `ai_models` each ingest run and
-- adds a `model_price_history` row whenever a price changes.
--
-- The seed below was derived from that price list's git history, sampled
-- weekly since April 2024: each history row is the first weekly snapshot
-- in which a model appeared or its price changed. Changes in the list can
-- include its own corrections, so dates are "first observed", not
-- announcement dates.
-- ---------------------------------------------------------------

create table public.ai_models (
  slug               text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name               text not null,
  provider           text not null,
  company            text,
  litellm_key        text not null,
  input_price        numeric(12,6),  -- USD per 1M input tokens
  output_price       numeric(12,6),  -- USD per 1M output tokens
  cached_input_price numeric(12,6),  -- USD per 1M cached input tokens
  context_tokens     integer,
  max_output_tokens  integer,
  supports_vision    boolean,
  supports_tools     boolean,
  supports_reasoning boolean,
  retired            boolean not null default false,
  first_listed       date,
  updated_at         timestamptz not null default now()
);

create table public.model_price_history (
  id           bigint generated always as identity primary key,
  model_slug   text not null references public.ai_models(slug) on delete cascade,
  observed_on  date not null,
  input_price  numeric(12,6),
  output_price numeric(12,6),
  source       text not null default 'litellm',
  unique (model_slug, observed_on)
);

create index model_price_history_observed_idx on public.model_price_history (observed_on);

alter table public.ai_models enable row level security;
alter table public.model_price_history enable row level security;

create policy "public read ai models" on public.ai_models
  for select to anon, authenticated using (true);
create policy "public read model price history" on public.model_price_history
  for select to anon, authenticated using (true);

create trigger ai_models_set_updated_at before update on public.ai_models
  for each row execute function public.set_updated_at();

-- ── Seed: current data ──────────────────────────────────────────
insert into public.ai_models
  (slug, name, provider, company, litellm_key, input_price, output_price, cached_input_price,
   context_tokens, max_output_tokens, supports_vision, supports_tools, supports_reasoning, first_listed)
values
  ('claude-opus-5-5', 'Claude Opus 5.5', 'Anthropic', 'Anthropic', 'claude-opus-5-5', 4.0, 20.0, 0.2, 1000000, 128000, true, true, true, '2026-09-27'),
  ('claude-opus-5', 'Claude Opus 5', 'Anthropic', 'Anthropic', 'claude-opus-5', 5.0, 25.0, 0.5, 1000000, 128000, true, true, true, '2026-07-25'),
  ('claude-sonnet-5-5', 'Claude Sonnet 5.5', 'Anthropic', 'Anthropic', 'claude-sonnet-5-5', 2.0, 10.0, 0.2, 1000000, 128000, true, true, true, '2026-10-01'),
  ('claude-sonnet-5', 'Claude Sonnet 5', 'Anthropic', 'Anthropic', 'claude-sonnet-5', 2.0, 10.0, 0.2, 1000000, 128000, true, true, true, '2026-07-02'),
  ('claude-fable-5-1', 'Claude Fable 5.1', 'Anthropic', 'Anthropic', 'claude-fable-5-1', 10.0, 50.0, 0.25, 1000000, 128000, true, true, true, '2026-09-06'),
  ('claude-mythos-5-1', 'Claude Mythos 5.1', 'Anthropic', 'Anthropic', 'claude-mythos-5-1', 10.0, 50.0, 0.25, 1000000, 128000, true, true, true, '2026-09-06'),
  ('claude-haiku-4-5', 'Claude Haiku 4.5', 'Anthropic', 'Anthropic', 'claude-haiku-4-5', 1.0, 5.0, 0.1, 200000, 64000, true, true, true, '2025-10-18'),
  ('gpt-6-1-sol', 'GPT-6.1 Sol', 'OpenAI', 'OpenAI', 'gpt-6.1-sol', 2.0, 10.0, 0.1, 922000, 128000, true, true, true, '2026-10-01'),
  ('gpt-6-astra', 'GPT-6 Astra', 'OpenAI', 'OpenAI', 'gpt-6-astra', 10.0, 50.0, 1.0, 922000, 128000, true, true, true, '2026-09-06'),
  ('gpt-6-sol', 'GPT-6 Sol', 'OpenAI', 'OpenAI', 'gpt-6-sol', 2.0, 10.0, 0.2, 922000, 128000, true, true, true, '2026-09-27'),
  ('gpt-6-luna', 'GPT-6 Luna', 'OpenAI', 'OpenAI', 'gpt-6-luna', 0.1, 0.5, 0.01, 922000, 128000, true, true, true, '2026-09-27'),
  ('gpt-5-6', 'GPT-5.6', 'OpenAI', 'OpenAI', 'gpt-5.6', 4.0, 20.0, 0.4, 922000, 128000, true, true, true, '2026-07-11'),
  ('gpt-5-5', 'GPT-5.5', 'OpenAI', 'OpenAI', 'gpt-5.5', 5.0, 30.0, 0.5, 1050000, 128000, true, true, true, '2026-04-25'),
  ('gpt-5-4-mini', 'GPT-5.4 mini', 'OpenAI', 'OpenAI', 'gpt-5.4-mini', 0.75, 4.5, 0.075, 272000, 128000, true, true, true, '2026-03-22'),
  ('gpt-5', 'GPT-5', 'OpenAI', 'OpenAI', 'gpt-5', 1.25, 10.0, 0.125, 272000, 128000, true, true, true, '2025-08-10'),
  ('gpt-5-mini', 'GPT-5 mini', 'OpenAI', 'OpenAI', 'gpt-5-mini', 0.25, 2.0, 0.025, 272000, 128000, true, true, true, '2025-08-10'),
  ('gpt-4-1', 'GPT-4.1', 'OpenAI', 'OpenAI', 'gpt-4.1', 2.0, 8.0, 0.5, 1047576, 32768, true, true, null, '2025-04-20'),
  ('gpt-4o', 'GPT-4o', 'OpenAI', 'OpenAI', 'gpt-4o', 2.5, 10.0, 1.25, 128000, 16384, true, true, null, '2024-05-16'),
  ('gpt-4o-mini', 'GPT-4o mini', 'OpenAI', 'OpenAI', 'gpt-4o-mini', 0.15, 0.6, 0.075, 128000, 16384, true, true, null, '2024-07-20'),
  ('o3', 'o3', 'OpenAI', 'OpenAI', 'o3', 2.0, 8.0, 0.5, 200000, 100000, true, true, true, '2025-04-20'),
  ('o4-mini', 'o4-mini', 'OpenAI', 'OpenAI', 'o4-mini', 1.1, 4.4, 0.275, 200000, 100000, true, true, true, '2025-04-20'),
  ('gemini-3-8-flash', 'Gemini 3.8 Flash', 'Google', 'Google DeepMind', 'gemini/gemini-3.8-flash', 0.75, 3.75, 0.075, 1048576, 65536, true, true, true, '2026-09-06'),
  ('gemini-3-5-flash', 'Gemini 3.5 Flash', 'Google', 'Google DeepMind', 'gemini/gemini-3.5-flash', 1.5, 9.0, 0.15, 1048576, 65536, true, true, true, '2026-05-23'),
  ('gemini-3-5-flash-lite', 'Gemini 3.5 Flash-Lite', 'Google', 'Google DeepMind', 'gemini/gemini-3.5-flash-lite', 0.3, 2.5, 0.03, 1048576, 65536, true, true, true, '2026-07-25'),
  ('gemini-2-5-pro', 'Gemini 2.5 Pro', 'Google', 'Google DeepMind', 'gemini/gemini-2.5-pro', 1.25, 10.0, 0.125, 1048576, 65536, true, true, true, '2025-06-20'),
  ('gemini-2-5-flash', 'Gemini 2.5 Flash', 'Google', 'Google DeepMind', 'gemini/gemini-2.5-flash', 0.3, 2.5, 0.03, 1048576, 65536, true, true, true, '2025-06-20'),
  ('gemini-2-5-flash-lite', 'Gemini 2.5 Flash-Lite', 'Google', 'Google DeepMind', 'gemini/gemini-2.5-flash-lite', 0.1, 0.4, 0.01, 1048576, 65536, true, true, true, '2025-07-27'),
  ('grok-4-7', 'Grok 4.7', 'xAI', 'xAI', 'xai/grok-4.7', 2.0, 6.0, 0.5, 500000, 500000, true, true, true, '2026-09-27'),
  ('grok-4-3', 'Grok 4.3', 'xAI', 'xAI', 'xai/grok-4.3', 1.25, 2.5, 0.2, 1000000, 1000000, true, true, true, '2026-05-08'),
  ('grok-code-fast-1', 'Grok Code Fast 1', 'xAI', 'xAI', 'xai/grok-code-fast-1', 1.0, 2.0, 0.2, 256000, 256000, true, true, true, '2025-08-30'),
  ('deepseek-v4-pro', 'DeepSeek V4 Pro', 'DeepSeek', 'DeepSeek', 'deepseek/deepseek-v4-pro', 1.32, 3.96, 0.044, 1000000, 393216, false, true, true, '2026-06-20'),
  ('deepseek-v4-flash', 'DeepSeek V4 Flash', 'DeepSeek', 'DeepSeek', 'deepseek/deepseek-v4-flash', 0.3, 1.2, 0.006, 1000000, 393216, true, true, true, '2026-06-20'),
  ('deepseek-chat', 'DeepSeek Chat (deepseek-chat)', 'DeepSeek', 'DeepSeek', 'deepseek/deepseek-chat', 0.28, 0.42, 0.028, 131072, 8192, null, true, null, '2025-01-04'),
  ('mistral-large-3', 'Mistral Large 3', 'Mistral', 'Mistral', 'mistral/mistral-large-3', 0.5, 1.5, 0.05, 262144, 262144, true, true, null, '2025-12-07'),
  ('mistral-medium-3-5', 'Mistral Medium 3.5', 'Mistral', 'Mistral', 'mistral/mistral-medium-3-5', 1.5, 7.5, 0.15, 262144, 262144, true, true, true, '2026-06-20'),
  ('mistral-small-2603', 'Mistral Small (2603)', 'Mistral', 'Mistral', 'mistral/mistral-small-2603', 0.15, 0.6, 0.015, 262144, 262144, true, true, true, '2026-08-16'),
  ('codestral-2508', 'Codestral (2508)', 'Mistral', 'Mistral', 'mistral/codestral-2508', 0.3, 0.9, 0.03, 128000, 128000, null, true, null, '2025-12-14'),
  ('kimi-k3', 'Kimi K3', 'Moonshot AI', 'Moonshot AI', 'moonshot/kimi-k3', 3.0, 15.0, 0.3, 1048576, 1048576, true, true, true, '2026-08-23'),
  ('kimi-k2-6', 'Kimi K2.6', 'Moonshot AI', 'Moonshot AI', 'moonshot/kimi-k2.6', 0.95, 4.0, 0.16, 262144, 262144, true, true, true, '2026-04-25'),
  ('minimax-m3', 'MiniMax M3', 'MiniMax', 'MiniMax', 'minimax/MiniMax-M3', 0.3, 1.2, 0.06, 1000000, 128000, true, true, true, '2026-06-06'),
  ('glm-5-3', 'GLM-5.3', 'Z.ai', 'Z.ai', 'zai/glm-5.3', 1.4, 4.4, 0.26, 1000000, 128000, null, true, true, '2026-08-30'),
  ('qwen3-8-max', 'Qwen3.8 Max', 'Alibaba Cloud', 'Alibaba', 'dashscope/qwen3.8-max', 2.0, 6.0, 0.25, 991808, 131072, true, true, true, '2026-08-16'),
  ('qwen3-8-flash', 'Qwen3.8 Flash', 'Alibaba Cloud', 'Alibaba', 'dashscope/qwen3.8-flash', 0.15, 0.47, 0.016, 991808, 131072, true, true, true, '2026-09-20'),
  ('nova-premier', 'Amazon Nova Premier', 'Amazon', 'Amazon', 'amazon-nova/nova-premier-v1', 2.5, 12.5, null, 1000000, 10000, true, true, null, '2025-12-07'),
  ('nova-pro', 'Amazon Nova Pro', 'Amazon', 'Amazon', 'amazon-nova/nova-pro-v1', 0.8, 3.2, null, 300000, 10000, true, true, null, '2025-12-07'),
  ('command-a', 'Command A', 'Cohere', 'Cohere', 'command-a-03-2025', 2.5, 10.0, null, 256000, 8000, null, true, null, '2025-04-26');

-- ── Seed: price history ─────────────────────────────────────────
insert into public.model_price_history (model_slug, observed_on, input_price, output_price) values
  ('claude-opus-5-5', '2026-09-27', 4.0, 20.0),
  ('claude-opus-5', '2026-07-25', 5.0, 25.0),
  ('claude-sonnet-5-5', '2026-10-01', 2.0, 10.0),
  ('claude-sonnet-5', '2026-07-02', 2.0, 10.0),
  ('claude-fable-5-1', '2026-09-06', 10.0, 50.0),
  ('claude-mythos-5-1', '2026-09-06', 10.0, 50.0),
  ('claude-haiku-4-5', '2025-10-18', 1.0, 5.0),
  ('gpt-6-1-sol', '2026-10-01', 2.0, 10.0),
  ('gpt-6-astra', '2026-09-06', 10.0, 50.0),
  ('gpt-6-sol', '2026-09-27', 2.0, 10.0),
  ('gpt-6-luna', '2026-09-27', 0.1, 0.5),
  ('gpt-5-6', '2026-07-11', 5.0, 30.0),
  ('gpt-5-6', '2026-08-23', 4.0, 20.0),
  ('gpt-5-5', '2026-04-25', 5.0, 30.0),
  ('gpt-5-4-mini', '2026-03-22', 0.75, 4.5),
  ('gpt-5', '2025-08-10', 1.25, 10.0),
  ('gpt-5-mini', '2025-08-10', 0.25, 2.0),
  ('gpt-4-1', '2025-04-20', 2.0, 8.0),
  ('gpt-4o', '2024-05-16', 5.0, 15.0),
  ('gpt-4o', '2024-11-15', 2.5, 10.0),
  ('gpt-4o-mini', '2024-07-20', 0.15, 0.6),
  ('o3', '2025-04-20', 10.0, 40.0),
  ('o3', '2025-06-14', 2.0, 8.0),
  ('o4-mini', '2025-04-20', 1.1, 4.4),
  ('gemini-3-8-flash', '2026-09-06', 0.75, 3.75),
  ('gemini-3-5-flash', '2026-05-23', 1.5, 9.0),
  ('gemini-3-5-flash-lite', '2026-07-25', 0.3, 2.5),
  ('gemini-2-5-pro', '2025-06-20', 1.25, 10.0),
  ('gemini-2-5-flash', '2025-06-20', 0.3, 2.5),
  ('gemini-2-5-flash-lite', '2025-07-27', 0.1, 0.4),
  ('grok-4-7', '2026-09-27', 2.0, 6.0),
  ('grok-4-3', '2026-05-08', 1.25, 2.5),
  ('grok-code-fast-1', '2025-08-30', 0.2, 1.5),
  ('grok-code-fast-1', '2026-08-16', 1.0, 2.0),
  ('deepseek-v4-pro', '2026-06-20', 0.435, 0.87),
  ('deepseek-v4-pro', '2026-08-23', 1.32, 3.96),
  ('deepseek-v4-flash', '2026-06-20', 0.14, 0.28),
  ('deepseek-v4-flash', '2026-08-23', 0.44, 1.32),
  ('deepseek-v4-flash', '2026-09-13', 0.3, 1.2),
  ('deepseek-chat', '2025-01-04', 0.14, 0.28),
  ('deepseek-chat', '2025-02-08', 0.27, 1.1),
  ('deepseek-chat', '2026-01-17', 0.28, 0.42),
  ('mistral-large-3', '2025-12-07', 0.5, 1.5),
  ('mistral-medium-3-5', '2026-06-20', 1.5, 7.5),
  ('mistral-small-2603', '2026-08-16', 0.15, 0.6),
  ('codestral-2508', '2025-12-14', 0.3, 0.9),
  ('kimi-k3', '2026-08-23', 3.0, 15.0),
  ('kimi-k2-6', '2026-04-25', 0.95, 4.0),
  ('minimax-m3', '2026-06-06', 0.6, 2.4),
  ('minimax-m3', '2026-06-12', 0.3, 1.2),
  ('glm-5-3', '2026-08-30', 1.4, 4.4),
  ('qwen3-8-max', '2026-08-16', 2.0, 6.0),
  ('qwen3-8-flash', '2026-09-20', 0.15, 0.47),
  ('nova-premier', '2025-12-07', 2.5, 12.5),
  ('nova-pro', '2025-12-07', 0.8, 3.2),
  ('command-a', '2025-04-26', 2.5, 10.0);
