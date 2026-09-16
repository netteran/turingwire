import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-10">
      <h1 className="text-2xl font-semibold tw-heading font-mono mb-1">Admin</h1>
      <p className="text-sm tw-muted mb-6">Sign in to manage ingest and content.</p>

      {error === "not-admin" && (
        <div
          className="tw-card border tw-border rounded-lg p-4 mb-4 text-sm"
          style={{ borderColor: "color-mix(in srgb, #ef4444 40%, transparent)" }}
        >
          <p className="tw-heading font-medium mb-1">Not an admin account</p>
          <p className="tw-muted text-xs leading-relaxed">
            That sign-in worked, but the account has no row in{" "}
            <code className="font-mono">admin_users</code>, so it has no access.
          </p>
        </div>
      )}

      <LoginForm next={next ?? "/admin"} />
    </div>
  );
}
