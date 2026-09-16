import Link from "next/link";
import { site } from "@/lib/site";

const SECTIONS = [
  ["/news/", "News"],
  ["/research/", "Research"],
  ["/aistocks/", "AIStocks"],
  ["/companies/", "Companies"],
  ["/models/", "Models"],
  ["/benchmarks/", "Benchmarks"],
  ["/calendar/", "Calendar"],
] as const;

const SITE_LINKS = [
  ["/about/", "About"],
  ["/about/editor/", "Editor"],
  ["/contact/", "Contact"],
  ["/disclaimer/", "Disclaimer"],
  ["/privacy/", "Privacy"],
  ["/terms/", "Terms"],
  ["/alan-turing/", "Alan Turing"],
] as const;

const FEEDS = [
  ["/feed.xml", "All posts", "var(--accent)"],
  ["/feed-major.xml", "Major+ only", "var(--accent)"],
  ["/news/feed.xml", "News RSS", null],
  ["/research/feed.xml", "Research RSS", null],
] as const;

export function Footer() {
  return (
    <footer className="tw-footer border-t tw-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/turingwirelogo.png"
                alt="Turing Wire"
                className="w-6 h-6 object-contain"
              />
              <p className="font-mono font-semibold tw-heading">
                Turing <span style={{ color: "var(--accent)" }}>Wire</span>
              </p>
            </div>
            <p className="tw-muted text-xs leading-relaxed">{site.tagline}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest tw-muted mb-3">
              Sections
            </p>
            <ul className="space-y-2">
              {SECTIONS.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="tw-muted hover:tw-accent transition-colors text-xs"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest tw-muted mb-3">
              Syndication
            </p>
            <ul className="space-y-2">
              {FEEDS.map(([href, label, accent], i) => (
                <li key={href}>
                  <a
                    href={href}
                    className="tw-muted hover:tw-accent transition-colors text-xs font-mono flex items-center gap-1.5"
                  >
                    <span
                      className={`w-2 h-2 rounded-sm flex-shrink-0 ${
                        accent ? "" : i === 2 ? "bg-blue-500" : "bg-purple-500"
                      }`}
                      style={accent ? { background: accent } : undefined}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest tw-muted mb-3">
              Site
            </p>
            <ul className="space-y-2">
              {SITE_LINKS.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="tw-muted hover:tw-accent transition-colors text-xs"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t tw-border pt-6 space-y-2">
          <p className="text-xs tw-muted">
            Turing Wire is an independent AI industry publication. Original
            sources are linked in every article.
          </p>
          <p className="text-xs tw-muted">
            © {new Date().getUTCFullYear()} Turing Wire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
