import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, isAdmin } from "@/lib/supabase-server";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Admin reads live data on every request; caching it would be wrong.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // The login page renders inside this layout too, so it must not require auth.
  if (!user) return <>{children}</>;

  if (!(await isAdmin())) {
    redirect("/admin/login?error=not-admin");
  }

  return (
    <>
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
        <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-2xl font-semibold tw-heading font-mono">Admin</h1>
          <p className="text-xs font-mono tw-muted">{user.email}</p>
        </header>
        {children}
        <p className="mt-10 pt-6 border-t tw-border text-xs font-mono tw-muted">
          <Link href="/" className="hover:tw-accent transition-colors">
            ← Back to site
          </Link>
        </p>
      </div>
    </>
  );
}
