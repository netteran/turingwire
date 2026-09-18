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

const NAV_GROUPS = [
  {
    label: "Markets",
    match: ["/aistocks", "/companies"],
    items: [
      ["/aistocks/", "AI Stocks"],
      ["/companies/", "Companies"],
    ],
  },
  {
    label: "Technical",
    match: ["/models", "/benchmarks"],
    items: [
      ["/models/", "Models"],
      ["/benchmarks/", "Benchmarks"],
    ],
  },
] as const;

export function Header() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAdmin, setIsAdmin] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

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

  // Close the drawer on navigation.
  useEffect(() => setMobileOpen(false), [pathname]);

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
          {NAV_GROUPS.map((group) => (
            <div className="tw-nav-group" key={group.label}>
              <button
                type="button"
                className={`tw-nav-link tw-nav-trigger${
                  isActive(group.match) ? " tw-nav-active" : ""
                }`}
                aria-haspopup="true"
                aria-expanded="false"
              >
                {group.label}{" "}
                <span aria-hidden="true" className="tw-nav-caret">
                  ▾
                </span>
              </button>
              <div className="tw-nav-dropdown" role="menu">
                {group.items.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="tw-dropdown-item"
                    role="menuitem"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/stories/"
            className={`tw-nav-link${
              isActive(["/stor"]) ? " tw-nav-active" : ""
            }`}
          >
            Stories
          </Link>
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

          {isAdmin && !pathname.startsWith("/admin") && (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center h-7 px-2.5 rounded-md border tw-border text-xs font-mono tw-muted hover:tw-accent transition-colors"
            >
              Admin
            </Link>
          )}

          {isAdmin && (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="hidden sm:inline-flex items-center h-7 px-2.5 rounded-md border tw-border text-xs font-mono tw-muted hover:tw-accent transition-colors disabled:opacity-50"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
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
        <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1 text-sm font-medium">
          {NAV_GROUPS.map((group) => (
            <details
              className="tw-mobile-group"
              key={group.label}
              open={isActive(group.match)}
            >
              <summary className="tw-nav-link py-2">{group.label}</summary>
              {group.items.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={`py-2${
                    pathname.startsWith(href) ? " tw-nav-active" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </details>
          ))}

          <Link
            href="/stories/"
            className={`tw-nav-link py-2${
              isActive(["/stor"]) ? " tw-nav-active" : ""
            }`}
          >
            Stories
          </Link>

          <form action="/search/" method="get" className="mt-2">
            <input
              type="search"
              name="q"
              placeholder="Search…"
              className="tw-search-input w-full font-mono text-sm"
            />
          </form>

          {isAdmin && (
            <div className="mt-2 pt-2 border-t tw-border flex flex-col gap-1">
              {!pathname.startsWith("/admin") && (
                <Link href="/admin" className="tw-nav-link py-2">
                  Admin panel
                </Link>
              )}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="tw-nav-link py-2 text-left disabled:opacity-50"
              >
                {signingOut ? "Signing out…" : "Sign out"}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
