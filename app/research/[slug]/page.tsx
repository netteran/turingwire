import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { articleMetadata } from "@/lib/articleMetadata";

/**
 * Articles are rendered on demand and cached; new rows go live without a deploy.
 * A published article rarely changes, and admin edits revalidate it directly,
 * so the timer only refreshes the related/adjacent links — daily is plenty.
 */
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("research", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ArticlePage category="research" slug={slug} />;
}
