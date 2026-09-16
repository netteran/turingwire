"use client";

import { useEffect, useState } from "react";

/**
 * Relabels a day heading to "Today" / "Yesterday" in the *visitor's* timezone.
 *
 * The server renders the UTC date so crawlers and no-JS clients still get a
 * sensible label; this corrects it on mount, matching the inline script the
 * Jekyll homepage used to ship.
 */
export function DayLabel({ date, initialLabel }: { date: string; initialLabel: string }) {
  const [label, setLabel] = useState(initialLabel);
  const [showDate, setShowDate] = useState(initialLabel !== date);

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date === fmt(now)) {
      setLabel("Today");
      setShowDate(false);
    } else if (date === fmt(yesterday)) {
      setLabel("Yesterday");
      setShowDate(true);
    } else {
      setLabel(date);
      setShowDate(false);
    }
  }, [date]);

  return (
    <>
      <span className="day-label">{label}</span>
      {showDate && <span className="opacity-50 day-date">{date}</span>}
    </>
  );
}
