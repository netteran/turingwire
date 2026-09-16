import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description:
    "This page could not be found. It may have been moved, deleted, or never existed.",
  robots: { index: false, follow: true },
};

/** Ported from the Jekyll 404.html; its styles moved into app/styles/pages.css. */
export default function NotFound() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "content/html/404-body.html"),
    "utf8",
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/assets/js/page-404.js" strategy="afterInteractive" />
    </>
  );
}
