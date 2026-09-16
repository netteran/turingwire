import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/supabase-server";

/**
 * Dispatches the Ingest workflow.
 *
 * Runs server-side so GITHUB_DISPATCH_TOKEN never reaches the browser, and
 * re-checks admin status here rather than trusting the middleware redirect —
 * this is an API route, so it can be called directly.
 */
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 });
  }

  const token = process.env.GITHUB_DISPATCH_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY ?? "netteran/turingwire";

  if (!token) {
    return NextResponse.json(
      {
        error:
          "GITHUB_DISPATCH_TOKEN is not set. Add a fine-grained PAT with Actions: write " +
          "for this repository to the Vercel project's environment variables.",
      },
      { status: 500 },
    );
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/ingest.yml/dispatches`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: "main",
        inputs: { dry_run: false, trigger: "admin" },
      }),
    },
  );

  if (res.status !== 204) {
    const detail = await res.text();
    return NextResponse.json(
      { error: `GitHub returned ${res.status}`, detail: detail.slice(0, 500) },
      { status: 502 },
    );
  }

  // 204 means accepted, not finished — the run appears in ingest_runs once the
  // workflow reaches its first step.
  return NextResponse.json({ ok: true, message: "Ingest queued" });
}
