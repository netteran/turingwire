"use client";

import { useMemo, useRef, useState } from "react";

/**
 * Line chart for model prices and the price index.
 *
 * One y-axis (all series share a unit), 2px lines, hairline grid, a legend
 * plus direct end labels for 2+ series, and a crosshair tooltip listing every
 * series at the hovered date. Step mode draws prices as steps, since a price
 * holds until it changes. Colors come from --viz-series-N (validated pair,
 * light and dark; see app/styles/pages.css). Values are always also listed in
 * a table on the page, so the tooltip never gates information.
 */

export interface ChartSeries {
  label: string;
  points: { date: string; value: number }[];
}

const W = 720;
const H = 260;
const M = { top: 16, right: 112, bottom: 28, left: 56 };

const t = (d: string) => Date.parse(`${d.slice(0, 10)}T00:00:00Z`);
const fmtDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * exp >= v) return m * exp;
  return 10 * exp;
}

export function PriceChart({
  series,
  step = true,
  end,
  kind = "usd",
  yLabel,
  zeroBased = true,
}: {
  series: ChartSeries[];
  step?: boolean;
  /** Last date on the x axis (YYYY-MM-DD); step lines extend to it. */
  end: string;
  /** Value format: dollars (prices) or a plain index number. */
  kind?: "usd" | "index";
  yLabel: string;
  zeroBased?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const format = (v: number) =>
    kind === "index" ? v.toFixed(0) : v === 0 ? "$0" : `$${v.toFixed(v < 1 ? 3 : 2)}`;
  const [hover, setHover] = useState<number | null>(null);

  const geo = useMemo(() => {
    const all = series.flatMap((s) => s.points);
    const x0 = Math.min(...all.map((p) => t(p.date)));
    const x1 = Math.max(t(end), x0 + 86_400_000);
    const vals = all.map((p) => p.value);
    // Round tick steps: snap both ends of the axis to a clean step size.
    const lo = zeroBased ? 0 : Math.min(...vals);
    const hi = Math.max(...vals) * 1.05;
    const stepSize = niceMax(Math.max(hi - lo, 1e-9) / 4);
    const yMin = zeroBased ? 0 : Math.floor(lo / stepSize) * stepSize;
    const yMax = Math.max(yMin + stepSize, Math.ceil(hi / stepSize) * stepSize);
    const sx = (ms: number) => M.left + ((ms - x0) / (x1 - x0)) * (W - M.left - M.right);
    const sy = (v: number) => H - M.bottom - ((v - yMin) / (yMax - yMin)) * (H - M.top - M.bottom);

    const paths = series.map((s) => {
      const pts = [...s.points].sort((a, b) => t(a.date) - t(b.date));
      let d = "";
      pts.forEach((p, i) => {
        const x = sx(t(p.date));
        const y = sy(p.value);
        if (i === 0) d += `M${x},${y}`;
        else if (step) d += `H${x}V${y}`;
        else d += `L${x},${y}`;
      });
      const last = pts[pts.length - 1];
      if (step && last) d += `H${sx(x1)}`;
      return { d, last, endY: last ? sy(last.value) : 0, pts };
    });

    // Space end labels at least 14px apart.
    const order = paths.map((p, i) => ({ i, y: p.endY })).sort((a, b) => a.y - b.y);
    const labelY = new Array<number>(paths.length);
    let prev = -Infinity;
    for (const o of order) {
      const y = Math.max(o.y, prev + 14);
      labelY[o.i] = y;
      prev = y;
    }

    const yTicks: number[] = [];
    for (let v = yMin; v <= yMax + stepSize / 2; v += stepSize) yTicks.push(+v.toFixed(6));
    const span = x1 - x0;
    const xTicks: number[] = [];
    const startD = new Date(x0);
    const monthStep = span > 540 * 86_400_000 ? 6 : span > 200 * 86_400_000 ? 3 : 1;
    const cur = new Date(Date.UTC(startD.getUTCFullYear(), startD.getUTCMonth() + 1, 1));
    while (cur.getTime() <= x1) {
      if (cur.getUTCMonth() % monthStep === 0) xTicks.push(cur.getTime());
      cur.setUTCMonth(cur.getUTCMonth() + 1);
    }
    return { x0, x1, sx, sy, paths, labelY, yTicks, xTicks };
  }, [series, step, end, zeroBased]);

  /** A series' value at a date: last point on or before it (step) / nearest (line). */
  const valueAt = (pts: { date: string; value: number }[], ms: number) => {
    let v: number | null = null;
    for (const p of pts) {
      if (t(p.date) <= ms) v = p.value;
      else break;
    }
    return v;
  };

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = ref.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const ms = geo.x0 + ((x - M.left) / (W - M.left - M.right)) * (geo.x1 - geo.x0);
    setHover(Math.min(Math.max(ms, geo.x0), geo.x1));
  };

  const multi = series.length > 1;
  const hoverX = hover === null ? null : geo.sx(hover);

  return (
    <figure className="tw-viz">
      {multi && (
        <figcaption className="tw-viz-legend">
          {series.map((s, i) => (
            <span key={s.label} className="tw-viz-legend-item">
              <span className={`tw-viz-key tw-viz-s${i + 1}`} aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </figcaption>
      )}
      <div className="tw-viz-frame">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${yLabel} chart`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {geo.yTicks.map((v) => (
            <g key={v}>
              <line className="tw-viz-grid" x1={M.left} x2={W - M.right} y1={geo.sy(v)} y2={geo.sy(v)} />
              <text className="tw-viz-tick" x={M.left - 8} y={geo.sy(v)} textAnchor="end" dominantBaseline="middle">
                {format(v)}
              </text>
            </g>
          ))}
          {geo.xTicks.map((ms) => (
            <text key={ms} className="tw-viz-tick" x={geo.sx(ms)} y={H - 8} textAnchor="middle">
              {new Date(ms).toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" })}
            </text>
          ))}
          {geo.paths.map((p, i) => (
            <path key={i} d={p.d} className={`tw-viz-line tw-viz-s${i + 1}`} fill="none" />
          ))}
          {/* End-point marker (8px, surface ring) so a just-listed model's
              short line is still visible. */}
          {geo.paths.map((p, i) =>
            p.last ? (
              <circle
                key={`m${i}`}
                className={`tw-viz-marker tw-viz-s${i + 1}`}
                cx={step ? geo.sx(geo.x1) : geo.sx(t(p.last.date))}
                cy={p.endY}
                r={4}
              />
            ) : null,
          )}
          {geo.paths.map((p, i) =>
            p.last ? (
              <text
                key={`l${i}`}
                className="tw-viz-endlabel"
                x={W - M.right + 6}
                y={geo.labelY[i]}
                dominantBaseline="middle"
              >
                {/* The legend names the series; the end label carries the value. */}
                {format(p.last.value)}
              </text>
            ) : null,
          )}
          {hoverX !== null && (
            <line className="tw-viz-crosshair" x1={hoverX} x2={hoverX} y1={M.top} y2={H - M.bottom} />
          )}
          {/* Transparent hit area: the pointer only needs to be over the plot. */}
          <rect x={M.left} y={M.top} width={W - M.left - M.right} height={H - M.top - M.bottom} fill="transparent" />
        </svg>
        {hover !== null && (
          <div
            className="tw-viz-tooltip"
            style={{ left: `${(hoverX! / W) * 100}%` }}
            role="status"
          >
            <div className="tw-viz-tooltip-date">{fmtDate(hover)}</div>
            {geo.paths.map((p, i) => {
              const v = valueAt(p.pts, hover);
              return (
                <div key={i} className="tw-viz-tooltip-row">
                  <span className={`tw-viz-key tw-viz-s${i + 1}`} aria-hidden="true" />
                  <strong>{v === null ? "—" : format(v)}</strong>
                  <span className="tw-muted">{series[i].label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </figure>
  );
}
