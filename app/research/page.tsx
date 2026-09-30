import type { Metadata } from "next";
import { SectionHub, sectionHubMetadata } from "@/components/SectionHub";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export function generateMetadata(): Promise<Metadata> {
  return sectionHubMetadata("research", 1);
}

export default function Page() {
  return <SectionHub category="research" page={1} />;
}
