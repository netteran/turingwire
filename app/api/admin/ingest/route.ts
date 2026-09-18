import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/supabase-server";

/**
 * Dispatches the Ingest workflow.
 *
 * Runs server-side so GITHUB_DISPATCH_TOKEN never reaches the browser, and
 * re-checks admin status here rather than trusting the middleware redirect —
 * this is an API route, so it can be called directly.
 *
 * An optional {sourceId} JSON body restricts the run to that one
 * ingest_sources row (the per-source "run" button in Admin / Sources); the
 * body is read defensively since the plain "run everything" button sends no
 * body at all.
 */

const WORKFLOW = "ingest.yml";

/** GitHub's status codes map to distinct, fixable causes. */
function explain(status: number, repo: string): string {
  switch (status) {
    case 401:
      return "GitHub rejected the token (401). It is expired or malformed — regenerate GITHUB_DISPATCH_TOKEN and update it in Vercel.";
    case 403:
      return (
        "GitHub refused the dispatch (403) — the token is valid but lacks permission. Check, in order: " +
        "(1) a fine-grained PAT needs Repository permissions → Actions → Read and write; " +
        `(2) it must list ${repo} under Repository access; ` +
        "(3) a classic PAT instead needs the 'workflow' scope; " +
        "(4) if the repo is under an org with SSO, the token must be authorised for it."
      );
    case 404:
      return (
        `GitHub could not find the workflow (404). Either ${WORKFLOW} is not on the default branch, ` +
        `or the token cannot see ${repo} at all — a fine-grained PAT that omits the repository reports 404 rather than 403.`
      );
    case 422:
      return (
        "GitHub rejected the inputs (422). The copy of ingest.yml on the default branch does not accept " +
        "the inputs sent here — most likely it predates the 'trigger' input."
      );
    default:
      return `GitHub returned ${status}.`;
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 });
  }

  const token = process.env.GITHUB_DISPATCH_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY ?? "netteran/turingwire";

  if (!token) {
    return NextResponse.json(
      {
        error:
          "GITHUB_DISPATCH_TOKEN is not set. Add a fine-grained PAT with Actions: Read and write " +
          "for this repository to the Vercel project's environment variables.",
      },
      { status: 500 },
    );
  }

  const body: unknown = await request.json().catch(() => ({}));
  const sourceId =
    typeof body === "object" && body !== null && "sourceId" in body
      ? Number((body as { sourceId: unknown }).sourceId)
      : undefined;

  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/${WORKFLOW}/dispatches`,
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
        inputs: {
          dry_run: false,
          trigger: "admin",
          ...(Number.isFinite(sourceId) ? { source_id: String(sourceId) } : {}),
        },
      }),
    },
  );

  if (res.status !== 204) {
    // GitHub puts the specific reason in the body; without it a 403 is
    // indistinguishable from any other permission problem.
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.message ?? "";
    } catch {
      detail = (await res.text().catch(() => "")).slice(0, 300);
    }

    return NextResponse.json(
      { error: explain(res.status, repo), detail: detail.slice(0, 300) || undefined },
      { status: 502 },
    );
  }

  // 204 means accepted, not finished — the run appears in ingest_runs once the
  // workflow reaches its first step.
  return NextResponse.json({ ok: true, message: "Ingest queued" });
}
