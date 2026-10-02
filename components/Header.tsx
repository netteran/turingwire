"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Site header: navigation, theme toggle, mobile nav and the search shortcut.
 *
 * All four are React state rather than DOM handlers — they touch markup React
 * owns, so mutating it directly would fight the render tree.
 */

const NAV_LINKS = [
  { href: "/news/", label: "AI News", match: ["/news"] },
  { href: "/research/", label: "AI Research", match: ["/research"] },
  { href: "/companies/", label: "Companies", match: ["/companies"] },
  { href: "/stories/", label: "Stories", match: ["/stor"] },
  { href: "/models/", label: "Models", match: ["/models"] },
  { href: "/benchmarks/", label: "Benchmarks", match: ["/benchmarks"] },
  { href: "/aistocks/", label: "AI Stocks", match: ["/aistocks"] },
] as const;

/** Admin sections: a dropdown on desktop, a group in the mobile menu. */
const ADMIN_LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/sources", label: "Sources" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/articles/new", label: "New article" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/prompts", label: "Prompts" },
  { href: "/admin/settings", label: "Settings" },
] as const;

export function Header() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAdmin, setIsAdmin] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  // Checked client-side (rather than in the server layout) so this stays a
  // plain client-only concern — reading cookies in the root layout would
  // force every statically-generated page in the site into dynamic
  // rendering just to show a button only admins ever see.
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    async function checkAdmin(userId: string | undefined) {
      if (!userId) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();
      setIsAdmin(!!data);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdmin(session?.user?.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdmin(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const isActive = (fragments: readonly string[]) =>
    fragments.some((f) => pathname.startsWith(f));

  // The most specific admin link matching the path ("New article" beats
  // "Articles" on /admin/articles/new).
  const adminPath = pathname.replace(/\/$/, "");
  const activeAdmin = ADMIN_LINKS.filter((l) =>
    l.href === "/admin"
      ? adminPath === "/admin"
      : adminPath === l.href || adminPath.startsWith(`${l.href}/`),
  ).sort((a, b) => b.href.length - a.href.length)[0]?.href;
  const inAdmin = adminPath === "/admin" || adminPath.startsWith("/admin/");

  // Adopt whatever the no-flash script already applied to <html>.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" focuses search, unless the caret is already in a field.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close the drawer and the admin dropdown on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setAdminOpen(false);
  }, [pathname]);

  // Close the admin dropdown on an outside click or Escape.
  useEffect(() => {
    if (!adminOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!adminRef.current?.contains(e.target as Node)) setAdminOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAdminOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [adminOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("tw-theme", next);
    } catch {
      /* private mode: theme just won't persist */
    }
  };

  return (
    <header
      id="site-header"
      className={`tw-header sticky top-0 z-50 border-b tw-border-header${
        scrolled ? " scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/turingwirelogo.png"
            alt="Turing Wire"
            className="w-8 h-8 object-contain"
          />
          <span className="font-mono text-sm font-semibold tw-heading tracking-tight group-hover:tw-accent transition-colors">
            Turing <span style={{ color: "var(--accent)" }}>Wire</span>
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 text-sm font-medium"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`tw-nav-link${
                isActive(link.match) ? " tw-nav-active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative tw-search-wrapper hidden sm:block">
            <form action="/search/" method="get" role="search">
              <input
                ref={searchRef}
                id="header-search"
                type="search"
                name="q"
                placeholder="Search…"
                aria-label="Search"
                className="tw-search-input font-mono text-sm"
                autoComplete="off"
              />
              <kbd className="tw-search-kbd hidden sm:flex" aria-hidden="true">
                /
              </kbd>
            </form>
          </div>

          {isAdmin && (
            <div ref={adminRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setAdminOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={adminOpen}
                aria-controls="admin-menu"
                className={`tw-admin-trigger${inAdmin ? " active" : ""}`}
              >
                Admin
                <svg
                  className={`w-3 h-3 transition-transform${adminOpen ? " rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {adminOpen && (
                <div id="admin-menu" role="menu" className="tw-admin-menu">
                  {ADMIN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      aria-current={activeAdmin === link.href ? "page" : undefined}
                      className={`tw-admin-menu-item${activeAdmin === link.href ? " active" : ""}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="tw-admin-menu-sep" role="separator" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="tw-admin-menu-item disabled:opacity-50"
                  >
                    {signingOut ? "Signing out…" : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="tw-icon-btn flex opacity-40 hover:opacity-80 transition-opacity"
          >
            <svg
              className={`w-3.5 h-3.5${theme === "dark" ? "" : " hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
            <svg
              className={`w-3.5 h-3.5${theme === "dark" ? " hidden" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="tw-icon-btn flex md:hidden"
          >
            <svg
              className={`w-5 h-5${mobileOpen ? " hidden" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`w-5 h-5${mobileOpen ? "" : " hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden tw-mobile-nav border-t tw-border${
          mobileOpen ? "" : " hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm font-medium">
          <form action="/search/" method="get" className="mb-2">
            <input
              type="search"
              name="q"
              placeholder="Search…"
              aria-label="Search"
              // Inline so it beats .tw-search-input's fixed header width.
              style={{ width: "100%" }}
              className="tw-search-input font-mono text-sm"
            />
          </form>

          {/* Admins get two columns: site sections left, admin right. */}
          <div className={isAdmin ? "grid grid-cols-2 gap-3" : ""}>
            <nav className="flex flex-col gap-1 min-w-0" aria-label="Site sections">
              {isAdmin && <MenuHeading>Sections</MenuHeading>}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`tw-nav-link py-2${
                    isActive(link.match) ? " tw-nav-active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {isAdmin && (
              <nav
                className="flex flex-col gap-1 min-w-0 pl-3 border-l tw-border"
                aria-label="Admin sections"
              >
                <MenuHeading>Admin</MenuHeading>
                {ADMIN_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={activeAdmin === link.href ? "page" : undefined}
                    className={`tw-nav-link py-2${
                      activeAdmin === link.href ? " tw-nav-active" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="tw-nav-link py-2 text-left disabled:opacity-50"
                >
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 pt-1 pb-0.5 text-xs font-mono uppercase tracking-widest tw-muted">
      {children}
    </span>
  );
}
