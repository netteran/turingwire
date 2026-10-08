import { ImageResponse } from "next/og";

import { getArticle, getStory } from "@/lib/queries";
import { formatDate } from "@/lib/format";

/**
 * 1200×630 share card for an article or story, used as og:image,
 * twitter:image and the JSON-LD `image`.
 *
 * Every page used to share the square logo, which rules the site out of
 * Discover and Top Stories (both want a ≥1200px-wide image) and makes
 * social shares look identical. See lib/ogImage.ts for the URL scheme.
 */

const IMPACT_COLOR: Record<string, string> = {
  critical: "#ef4444",
  major: "#f59e0b",
  notable: "#06b6d4",
  minor: "#64748b",
};

type Card = {
  kicker: string;
  title: string;
  meta: string;
  impact?: string;
};

async function loadCard(kind: string, slug: string): Promise<Card | null> {
  if (kind === "news" || kind === "research") {
    const article = await getArticle(kind, slug);
    if (!article) return null;
    return {
      kicker: [kind === "news" ? "AI News" : "AI Research", article.company]
        .filter(Boolean)
        .join(" · "),
      title: article.title,
      meta: [formatDate(article.published_at), article.source_publisher]
        .filter(Boolean)
        .join(" · "),
      impact: article.impact,
    };
  }
  if (kind === "story") {
    const story = await getStory(slug);
    if (!story) return null;
    return {
      kicker: "Multi-source analysis",
      title: story.title,
      meta: `${(story.sources ?? []).length} sources${
        story.last_updated ? ` · Updated ${formatDate(story.last_updated)}` : ""
      }`,
    };
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;
  const card = await loadCard(kind, slug);
  if (!card) return new Response("Not found", { status: 404 });

  const title = card.title.length > 140 ? `${card.title.slice(0, 137)}…` : card.title;
  const titleSize = title.length > 90 ? 52 : title.length > 55 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0b1220",
          color: "#e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {card.impact && (
            <div
              style={{
                display: "flex",
                padding: "6px 16px",
                borderRadius: 8,
                fontSize: 22,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#0b1220",
                background: IMPACT_COLOR[card.impact] ?? "#06b6d4",
              }}
            >
              {card.impact}
            </div>
          )}
          <div style={{ display: "flex", fontSize: 28, color: "#06b6d4" }}>
            {card.kicker}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            lineHeight: 1.15,
            color: "#f8fafc",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #1e293b",
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", color: "#94a3b8" }}>{card.meta}</div>
          <div style={{ display: "flex", fontSize: 32 }}>
            <span style={{ color: "#f8fafc" }}>Turing</span>
            <span style={{ color: "#06b6d4", marginLeft: 8 }}>Wire</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        // A card only changes if the title is edited; a week at the CDN
        // keeps crawlers re-fetching it from regenerating it daily.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    },
  );
}
