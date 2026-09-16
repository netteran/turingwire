import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { articleMetadata } from "@/lib/articleMetadata";

/** Articles are rendered on demand and cached; new rows go live without a deploy. */
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("news", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ArticlePage category="news" slug={slug} />;
}
