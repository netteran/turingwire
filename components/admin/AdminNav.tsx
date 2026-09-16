"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TABS = [
  ["/admin", "Overview"],
  ["/admin/sources", "Sources"],
  ["/admin/articles", "Articles"],
  ["/admin/settings", "Settings"],
] as const;

export function AdminNav() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const current = TABS.find(([href]) => isActive(href))?.[1] ?? "Admin";

  // Close the dropdown on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="tw-admin-nav border-b tw-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="hidden md:flex items-center gap-1 h-8"
          aria-label="Admin sections"
        >
          {TABS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`tw-admin-nav-link${isActive(href) ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex items-center justify-between h-8">
          <span className="text-xs font-mono uppercase tracking-widest tw-muted">
            {current}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close admin menu" : "Open admin menu"}
            aria-expanded={open}
            aria-controls="admin-mobile-nav"
            className="tw-icon-btn"
          >
            <svg
              className={`w-5 h-5${open ? " hidden" : ""}`}
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
              className={`w-5 h-5${open ? "" : " hidden"}`}
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
        id="admin-mobile-nav"
        className={`md:hidden border-t tw-border${open ? "" : " hidden"}`}
      >
        <nav className="max-w-7xl mx-auto px-4 py-1.5 flex flex-col gap-1 text-sm font-mono">
          {TABS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`py-1.5${isActive(href) ? " tw-nav-active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
