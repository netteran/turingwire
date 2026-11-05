import type { Metadata } from "next";
import { SectionHub, parsePageParam, sectionHubMetadata } from "@/components/SectionHub";

// Refreshed daily by this timer; deliberately not revalidated on every ingest
// run, which would cost ISR writes for little gain (app/api/revalidate).
export const revalidate = 86400;

// Generate and cache paths on first visit, including content added after a deploy.
export async function generateStaticParams(): Promise<{ num: string }[]> {
  return [];
}

type Props = { params: Promise<{ num: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  return sectionHubMetadata("news", parsePageParam("news", num));
}

export default async function Page({ params }: Props) {
  const { num } = await params;
  return <SectionHub category="news" page={parsePageParam("news", num)} />;
}
