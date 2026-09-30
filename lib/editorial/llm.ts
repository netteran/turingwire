/**
 * Multi-provider LLM call for the Admin article tools — a TypeScript port of
 * scripts/llm.py so custom articles go through the same models as the
 * ingest pipeline.
 *
 * The provider is inferred from the model id's prefix, exactly as in the
 * pipeline: gemini-* → Google Gemini, claude-* → Anthropic, anything else →
 * OpenAI. Keys come from the web app's environment (Vercel → Settings →
 * Environment Variables): OPENAI_API_KEY, GEMINI_API_KEY, ANTHROPIC_API_KEY.
 * Only the key for the provider actually used is required. OPENAI_BASE_URL
 * optionally points OpenAI-model calls at a compatible gateway, as the
 * official SDKs allow.
 *
 * Server-only: never import this from a client component.
 */

export type Provider = "openai" | "gemini" | "claude";

const ENV_VAR: Record<Provider, string> = {
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY",
  claude: "ANTHROPIC_API_KEY",
};

/** Same ceiling as the pipeline (scripts/llm.py CLAUDE_MAX_TOKENS). */
const CLAUDE_MAX_TOKENS = 16000;
const TIMEOUT_MS = 120_000;
const ATTEMPTS = 3;

export function providerForModel(model: string): Provider {
  if (model.startsWith("gemini")) return "gemini";
  if (model.startsWith("claude")) return "claude";
  return "openai";
}

export function hasKeyFor(model: string): boolean {
  return Boolean(process.env[ENV_VAR[providerForModel(model)]]);
}

function apiKey(provider: Provider): string {
  const key = process.env[ENV_VAR[provider]];
  if (!key) {
    throw new Error(
      `${ENV_VAR[provider]} is not set in the site's environment. Add it in Vercel → Settings → Environment Variables (the ingest pipeline's copy lives in GitHub Actions secrets, which the site can't read).`,
    );
  }
  return key;
}

async function postJson(url: string, headers: Record<string, string>, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`LLM request failed (${res.status}): ${text.slice(0, 400)}`);
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return JSON.parse(text);
}

async function callOpenAI(
  model: string,
  system: string,
  user: string,
  temperature: number,
  jsonMode: boolean,
): Promise<string> {
  const data = await postJson(
    `${(process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "")}/chat/completions`,
    { Authorization: `Bearer ${apiKey("openai")}` },
    {
      model,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    },
  );
  return String(data?.choices?.[0]?.message?.content ?? "").trim();
}

async function callGemini(
  model: string,
  system: string,
  user: string,
  temperature: number,
  jsonMode: boolean,
): Promise<string> {
  const data = await postJson(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    { "x-goog-api-key": apiKey("gemini") },
    {
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: {
        temperature,
        ...(jsonMode ? { responseMimeType: "application/json" } : {}),
      },
    },
  );
  const parts: { text?: string }[] = data?.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p) => p.text ?? "").join("").trim();
}

async function callClaude(model: string, system: string, user: string): Promise<string> {
  // As in the pipeline, temperature isn't forwarded (models running
  // extended thinking reject it) and there is no JSON-mode flag: the
  // prompts already ask for JSON only and parseSummaryOutput() copes.
  const data = await postJson(
    "https://api.anthropic.com/v1/messages",
    { "x-api-key": apiKey("claude"), "anthropic-version": "2023-06-01" },
    {
      model,
      max_tokens: CLAUDE_MAX_TOKENS,
      system,
      messages: [{ role: "user", content: user }],
    },
  );
  const blocks: { type: string; text?: string }[] = data?.content ?? [];
  return blocks
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("")
    .trim();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** One system+user request, retried like the pipeline's tenacity decorator. */
export async function callLlm(
  model: string,
  system: string,
  user: string,
  { temperature, jsonMode = false }: { temperature: number; jsonMode?: boolean },
): Promise<string> {
  const provider = providerForModel(model);
  let lastError: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      if (provider === "gemini") return await callGemini(model, system, user, temperature, jsonMode);
      if (provider === "claude") return await callClaude(model, system, user);
      return await callOpenAI(model, system, user, temperature, jsonMode);
    } catch (e) {
      lastError = e;
      const status = (e as { status?: number }).status;
      // A missing key or a 4xx other than rate limiting won't fix itself.
      const retryable = status === undefined ? !String(e).includes("is not set") : status === 429 || status >= 500;
      if (!retryable || attempt === ATTEMPTS) break;
      await sleep(Math.min(2000 * 2 ** (attempt - 1), 10_000));
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
