import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client used by server components and route handlers.
 *
 * Uses the publishable (anon) key, so every query is filtered by the
 * "public read published" RLS policies — an unpublished or body-less archived
 * article can never leak into a rendered page. The ingest pipeline writes with
 * the service-role key, which lives only in GitHub Actions secrets.
 *
 * The client is created lazily. Building it at module scope meant a missing
 * env var threw during Next's "collecting page data" pass, which reports as an
 * opaque route failure rather than pointing at the configuration.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in the Vercel project's Environment " +
        "Variables (Settings → Environment Variables), or in .env.local for " +
        "local development. See .env.example.",
    );
  }

  client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
