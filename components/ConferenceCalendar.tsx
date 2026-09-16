"use client";

import { useEffect, useMemo, useState } from "react";
import { ShareButtons } from "./ShareButtons";
import { site } from "@/lib/site";

/** Ported from pages/calendar.html. */

export interface Conference {
  id: string;
  name: string;
  full_name: string;
  year: number;
  track: string[];
  location: string;
  website?: string;
  submission_deadline?: string;
  notification_date?: string;
  conference_start?: string;
  conference_end?: string;
  acceptance_rate?: string;
  notes?: string;
}

type Status =
  | "submissions"
  | "notification"
  | "upcoming"
  | "ongoing"
  | "completed";

const STATUS_LABELS: Record<Status, string> = {
  submissions: "Submissions open",
  notification: "Under review",
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  completed: "Completed",
};

const parseDate = (s?: string): Date | null => {
  if (!s) return null;
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

function getStatus(conf: Conference, today: Date): Status {
  const sub = parseDate(conf.submission_deadline);
  const notif = parseDate(conf.notification_date);
  const start = parseDate(conf.conference_start);
  const end = parseDate(conf.conference_end);

  if (end && today > end) return "completed";
  if (start && end && today >= start && today <= end) return "ongoing";
  if (notif && start && today >= notif && today < start) return "upcoming";
  if (sub && today <= sub) return "submissions";
  if (sub && notif && today > sub && today < notif) return "notification";
  if (start && today < start) return "upcoming";
  return "completed";
}

const formatDate = (s?: string) => {
  const d = parseDate(s);
  return d
    ? d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";
};

const YEARS = ["all", "2026", "2025"];
const TRACKS = [
  ["all", "All"],
  ["ml", "ML"],
  ["nlp", "NLP"],
  ["cv", "Computer Vision"],
  ["robotics", "Robotics / RL"],
  ["llm", "LLM-focused"],
] as const;
const STATUS_FILTERS = [
  ["all", "All"],
  ["submissions", "Submissions open"],
  ["upcoming", "Upcoming"],
  ["completed", "Completed"],
] as const;

export function ConferenceCalendar({ conferences }: { conferences: Conference[] }) {
  const [year, setYear] = useState("all");
  const [track, setTrack] = useState("all");
  const [status, setStatus] = useState("all");

  // Status depends on "today", which differs between server and client. The
  // original computed it in a script after load; deferring to an effect keeps
  // that behaviour and avoids a hydration mismatch.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setToday(d);
  }, []);

  const statuses = useMemo(() => {
    if (!today) return {} as Record<string, Status>;
    return Object.fromEntries(
      conferences.map((c) => [c.id, getStatus(c, today)]),
    ) as Record<string, Status>;
  }, [conferences, today]);

  const visible = useMemo(
    () =>
      conferences.filter((c) => {
        const yearOk = year === "all" || String(c.year) === year;
        const trackOk = track === "all" || (c.track ?? []).includes(track);
        const statusOk =
          status === "all" || !today || statuses[c.id] === status;
        return yearOk && trackOk && statusOk;
      }),
    [conferences, year, track, status, statuses, today],
  );

  const chipRow = (
    label: string,
    options: readonly (readonly [string, string])[] | string[],
    value: string,
    onChange: (v: string) => void,
  ) => (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs tw-muted font-mono uppercase tracking-widest mr-1">
        {label}
      </span>
      {(options as readonly (readonly [string, string] | string)[]).map((opt) => {
        const [v, l] = Array.isArray(opt) ? opt : [opt, opt === "all" ? "All" : opt];
        return (
          <button
            key={v}
            className={`tw-filter-chip${value === v ? " active" : ""}`}
            onClick={() => onChange(v)}
          >
            {l}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="mb-6 space-y-3">
        {chipRow("Year", YEARS, year, setYear)}
        {chipRow("Track", TRACKS, track, setTrack)}
        {chipRow("Status", STATUS_FILTERS, status, setStatus)}
      </div>

      <span className="text-xs tw-muted font-mono block mb-4">
        {visible.length} conference{visible.length !== 1 && "s"}
      </span>

      {visible.length === 0 ? (
        <div className="text-center py-16 tw-muted">
          <p className="text-lg font-mono">
            No conferences match the selected filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((conf) => {
            const s = statuses[conf.id];
            return (
              <div
                key={conf.id}
                id={`conf-${conf.id}`}
                className="tw-card rounded-xl border tw-border"
              >
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-base font-bold tw-heading font-mono">
                          {conf.name}
                        </h2>
                        {s && (
                          <span className={`tw-conf-badge tw-conf-${s}`}>
                            {STATUS_LABELS[s]}
                          </span>
                        )}
                      </div>
                      <p className="text-xs tw-muted">{conf.full_name}</p>
                    </div>

                    <div className="flex items-start gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-sm tw-heading font-semibold">
                          {conf.location}
                        </div>
                        {conf.acceptance_rate && (
                          <div className="text-xs tw-muted font-mono">
                            Accept rate: {conf.acceptance_rate}
                          </div>
                        )}
                        {conf.website && (
                          <a
                            href={conf.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs tw-accent hover:underline font-mono"
                          >
                            website ↗
                          </a>
                        )}
                      </div>
                      <ShareButtons
                        url={`${site.url}/calendar/#conf-${conf.id}`}
                        title={`${conf.name} — ${conf.full_name}`}
                        summary={conf.notes}
                        variant="popover"
                        align="right"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(conf.track ?? []).map((t) => (
                      <span key={t} className="tw-track-badge">
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      ["Submission deadline", conf.submission_deadline],
                      ["Notification", conf.notification_date],
                      ["Conference starts", conf.conference_start],
                      ["Conference ends", conf.conference_end],
                    ].map(([label, value]) => (
                      <div className="tw-date-block" key={label}>
                        <div className="tw-date-label">{label}</div>
                        <div className="tw-date-value">{formatDate(value)}</div>
                      </div>
                    ))}
                  </div>

                  {conf.notes && (
                    <p className="text-xs tw-muted mt-3 leading-relaxed">
                      {conf.notes}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
