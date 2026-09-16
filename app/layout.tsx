import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import "./styles/main.css";
import "./styles/pages.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.title} — ${site.tagline}`,
    template: `%s — ${site.title}`,
  },
  description: site.description,
  icons: {
    icon: site.logo,
    apple: site.logo,
  },
  openGraph: {
    type: "website",
    siteName: site.title,
    title: site.title,
    description: site.description,
    url: site.url,
    images: [{ url: site.logo, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.logo],
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: site.title },
        { url: "/feed-major.xml", title: `${site.title} — Major+ only` },
      ],
    },
  },
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

/** Applied before paint so the theme never flashes. */
const THEME_INIT = `(function(){try{var s=localStorage.getItem('tw-theme');var p=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',p);}catch(e){}})();`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "@id": `${site.url}/#organization`,
  name: site.organization.name,
  legalName: site.organization.legalName,
  url: site.url,
  logo: { "@type": "ImageObject", url: absoluteUrl(site.logo) },
  foundingDate: site.organization.foundingDate,
  description: site.description,
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "AI Research",
    "Large Language Models",
    "AI Industry News",
  ],
  publishingPrinciples: `${site.url}/about/`,
  correctionsPolicy: `${site.url}/about/#editorial-standards`,
  diversityPolicy: `${site.url}/about/`,
  ownershipFundingInfo: `${site.url}/about/#ownership`,
  ethicsPolicy: `${site.url}/about/`,
  ...(site.organization.sameAs.length > 0
    ? { sameAs: site.organization.sameAs }
    : {}),
};

const editorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/about/editor/#editor`,
  name: site.editor.name,
  jobTitle: site.editor.role,
  description: site.editor.bio,
  url: absoluteUrl(site.editor.url),
  worksFor: { "@id": `${site.url}/#organization` },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "AI Research",
    "Large Language Models",
    "AI Industry News",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        <link
          rel="alternate"
          type="application/ld+json"
          href={absoluteUrl("/knowledge-graph.json")}
          title="Turing Wire Knowledge Graph"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={absoluteUrl("/llms.txt")}
          title="LLM citation policy"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(editorSchema) }}
        />
      </head>
      <body className="tw-body min-h-screen flex flex-col">
        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <ScrollToTop />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.googleAnalyticsId}');`}
        </Script>
      </body>
    </html>
  );
}
