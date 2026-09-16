import type { Metadata } from "next";
import { ConferenceCalendar, type Conference } from "@/components/ConferenceCalendar";
import { getConferences } from "@/lib/data";

export const metadata: Metadata = {
  title: "ML Conference Calendar",
  description:
    "Key dates for major machine learning conferences: NeurIPS, ICML, ICLR, CVPR, ACL, EMNLP and more. Submission deadlines, notifications, and conference dates.",
  alternates: { canonical: "/calendar/" },
};

interface ConferencesData {
  updated_at?: string;
  conferences?: Conference[];
}

const LEGEND = [
  ["submissions", "Submissions open", "Deadline upcoming"],
  ["notification", "Notifications", "Review complete"],
  ["upcoming", "Upcoming", "Accepted, not yet held"],
  ["ongoing", "Ongoing", "Conference in progress"],
  ["completed", "Completed", ""],
] as const;

export default function CalendarPage() {
  const data = getConferences<ConferencesData>();
  const conferences = data.conferences ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold tw-heading font-mono">
              ML Conference Calendar
            </h1>
            <p className="tw-muted text-sm mt-1">
              Submission deadlines, notification dates, and conference schedules.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs tw-muted">
          {LEGEND.map(([key, label, hint]) => (
            <div className="flex items-center gap-1.5" key={key}>
              <span className={`tw-conf-badge tw-conf-${key}`}>{label}</span>
              {hint}
            </div>
          ))}
        </div>
      </div>

      {conferences.length === 0 ? (
        <p className="tw-muted text-sm font-mono">No conference data available.</p>
      ) : (
        <ConferenceCalendar conferences={conferences} />
      )}
    </div>
  );
}
