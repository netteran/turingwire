import type { Metadata } from "next";
import { SectionHub, parsePageParam, sectionHubMetadata } from "@/components/SectionHub";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

type Props = { params: Promise<{ num: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  return sectionHubMetadata("research", parsePageParam("research", num));
}

export default async function Page({ params }: Props) {
  const { num } = await params;
  return <SectionHub category="research" page={parsePageParam("research", num)} />;
}
