import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { articleMetadata } from "@/lib/articleMetadata";

/**
 * Articles are rendered on demand and cached; new rows go live without a deploy.
 * A published article rarely changes, and admin edits revalidate it directly
 * (app/admin/actions.ts), so there is no timer: a page stays cached until the
 * next deploy. A daily timer re-rendered every article crawlers touched each
 * day — thousands of ISR writes just to refresh the related/adjacent links.
 */
export const revalidate = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("research", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ArticlePage category="research" slug={slug} />;
}
