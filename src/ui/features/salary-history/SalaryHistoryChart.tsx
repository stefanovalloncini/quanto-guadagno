import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { AdjustedEntry } from "./useSalaryHistory.ts";

interface SalaryHistoryChartProps {
  readonly rows: ReadonlyArray<AdjustedEntry>;
  readonly targetYear: number;
}

const W = 800;
const H = 320;
const PAD_LEFT = 56;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 36;
const PLOT_W = W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = H - PAD_TOP - PAD_BOTTOM;

const EUR = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface Series {
  readonly id: "nominal" | "adjusted";
  readonly points: ReadonlyArray<{
    readonly x: number;
    readonly y: number;
    readonly value: number;
    readonly year: number;
  }>;
}

interface Scales {
  readonly years: ReadonlyArray<number>;
  readonly maxValue: number;
  readonly xForYear: (y: number) => number;
  readonly yForValue: (v: number) => number;
}

function computeScales(rows: ReadonlyArray<AdjustedEntry>): Scales | null {
  if (rows.length === 0) return null;
  const years = rows.map((r) => r.entry.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const span = Math.max(1, maxYear - minYear);
  const values: number[] = [];
  for (const row of rows) {
    values.push(row.entry.grossAnnual);
    if (row.adjusted !== null) values.push(row.adjusted.adjusted);
  }
  const rawMax = Math.max(...values);
  const maxValue = Math.ceil((rawMax * 1.1) / 1000) * 1000;
  return {
    years: [...new Set(years)].sort((a, b) => a - b),
    maxValue,
    xForYear: (y) => PAD_LEFT + ((y - minYear) / span) * PLOT_W,
    yForValue: (v) => PAD_TOP + PLOT_H - (v / maxValue) * PLOT_H,
  };
}

function buildSeries(rows: ReadonlyArray<AdjustedEntry>, scales: Scales): ReadonlyArray<Series> {
  const sorted = [...rows].sort((a, b) => a.entry.year - b.entry.year);
  const nominal: Series = {
    id: "nominal",
    points: sorted.map((r) => ({
      x: scales.xForYear(r.entry.year),
      y: scales.yForValue(r.entry.grossAnnual),
      value: r.entry.grossAnnual,
      year: r.entry.year,
    })),
  };
  const adjustedPoints = sorted
    .filter((r) => r.adjusted !== null)
    .map((r) => {
      const value = r.adjusted?.adjusted ?? 0;
      return {
        x: scales.xForYear(r.entry.year),
        y: scales.yForValue(value),
        value,
        year: r.entry.year,
      };
    });
  return [nominal, { id: "adjusted", points: adjustedPoints }];
}

function polyline(points: ReadonlyArray<{ x: number; y: number }>): string {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function SalaryHistoryChart({ rows, targetYear }: SalaryHistoryChartProps) {
  const intl = useIntl();
  const scales = useMemo(() => computeScales(rows), [rows]);
  const series = useMemo(() => (scales ? buildSeries(rows, scales) : []), [rows, scales]);

  if (scales === null) {
    return (
      <p className="qg-history-chart__empty">
        <FormattedMessage id="history.chart.empty" />
      </p>
    );
  }

  const ticks: number[] = [];
  const step = Math.max(1000, Math.round(scales.maxValue / 4 / 1000) * 1000);
  for (let v = 0; v <= scales.maxValue; v += step) ticks.push(v);

  const nominal = series[0];
  const adjusted = series[1];
  if (!nominal || !adjusted) return null;

  return (
    <figure className="qg-history-chart">
      <svg
        className="qg-history-chart__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={intl.formatMessage({ id: "history.chart.aria" }, { year: targetYear })}
      >
        <g className="qg-history-chart__grid">
          {ticks.map((v) => {
            const y = scales.yForValue(v);
            return (
              <g key={v}>
                <line x1={PAD_LEFT} x2={W - PAD_RIGHT} y1={y} y2={y} />
                <text x={PAD_LEFT - 8} y={y} textAnchor="end" dominantBaseline="middle">
                  {EUR.format(v)}
                </text>
              </g>
            );
          })}
        </g>

        <g className="qg-history-chart__axis">
          {scales.years.map((y) => (
            <text key={y} x={scales.xForYear(y)} y={H - PAD_BOTTOM + 18} textAnchor="middle">
              {y}
            </text>
          ))}
        </g>

        <polyline
          className="qg-history-chart__line qg-history-chart__line--nominal"
          fill="none"
          points={polyline(nominal.points)}
        />
        <polyline
          className="qg-history-chart__line qg-history-chart__line--adjusted"
          fill="none"
          points={polyline(adjusted.points)}
        />

        {nominal.points.map((p) => (
          <circle
            key={`n-${p.year}`}
            className="qg-history-chart__dot qg-history-chart__dot--nominal"
            cx={p.x}
            cy={p.y}
            r={3.5}
          >
            <title>
              {p.year} — {EUR.format(p.value)}
            </title>
          </circle>
        ))}
        {adjusted.points.map((p) => (
          <circle
            key={`a-${p.year}`}
            className="qg-history-chart__dot qg-history-chart__dot--adjusted"
            cx={p.x}
            cy={p.y}
            r={3.5}
          >
            <title>
              {p.year} → {targetYear}: {EUR.format(p.value)}
            </title>
          </circle>
        ))}
      </svg>

      <figcaption className="qg-history-chart__legend">
        <span className="qg-history-chart__swatch qg-history-chart__swatch--nominal" />
        <span>
          <FormattedMessage id="history.chart.legend.nominal" />
        </span>
        <span className="qg-history-chart__swatch qg-history-chart__swatch--adjusted" />
        <span>
          <FormattedMessage id="history.chart.legend.adjusted" values={{ year: targetYear }} />
        </span>
      </figcaption>
    </figure>
  );
}
