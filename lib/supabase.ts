import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client used by server components and route handlers.
 *
 * Uses the publishable (anon) key, so every query is filtered by the
 * "public read published" RLS policies — an unpublished or body-less archived
 * article can never leak into a rendered page. The ingest pipeline writes with
 * the service-role key, which lives only in GitHub Actions secrets.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).",
  );
}

export const supabase: SupabaseClient = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
