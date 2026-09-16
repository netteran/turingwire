"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  ["/admin", "Overview"],
  ["/admin/sources", "Sources"],
  ["/admin/articles", "Articles"],
  ["/admin/settings", "Settings"],
] as const;

export function AdminNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Admin sections">
      {TABS.map(([href, label]) => {
        const active =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`tw-filter-chip${active ? " active" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
