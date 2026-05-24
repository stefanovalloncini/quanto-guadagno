import type { SalaryBreakdown } from "@/domain/calc";
import type { AdjustedEntry } from "./useSalaryHistory.ts";
import type { ProjectionYear } from "./projection.ts";
import type { SalaryEntrySettings } from "./salaryHistory.ts";

export const CHART = {
  W: 800,
  H: 360,
  PAD_LEFT: 60,
  PAD_RIGHT: 24,
  PAD_TOP: 28,
  PAD_BOTTOM: 44,
} as const;

export const PLOT_W = CHART.W - CHART.PAD_LEFT - CHART.PAD_RIGHT;
export const PLOT_H = CHART.H - CHART.PAD_TOP - CHART.PAD_BOTTOM;
export const BASELINE = CHART.PAD_TOP + PLOT_H;

export interface ChartScales {
  readonly minYear: number;
  readonly maxYear: number;
  readonly maxValue: number;
  readonly years: ReadonlyArray<number>;
  readonly ticks: ReadonlyArray<number>;
  readonly xForYear: (year: number) => number;
  readonly yForValue: (value: number) => number;
}

export interface ChartPoint {
  readonly x: number;
  readonly y: number;
  readonly year: number;
  readonly grossAnnual: number;
  readonly netAnnual: number | null;
  readonly net: SalaryBreakdown | null;
  readonly settings: SalaryEntrySettings | null;
  readonly note?: string | undefined;
  readonly isProjected: boolean;
  readonly isMigrated: boolean;
}

export interface ChartGeometry {
  readonly scales: ChartScales;
  readonly timeline: ReadonlyArray<ChartPoint>;
  readonly nominalPoints: ReadonlyArray<ChartPoint>;
  readonly netPoints: ReadonlyArray<ChartPoint>;
  readonly projectionPoints: ReadonlyArray<ChartPoint>;
  readonly bandUpper: ReadonlyArray<{ readonly x: number; readonly y: number }>;
  readonly bandLower: ReadonlyArray<{ readonly x: number; readonly y: number }>;
}

function computeYearRange(years: ReadonlyArray<number>): { min: number; max: number } {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const y of years) {
    if (y < min) min = y;
    if (y > max) max = y;
  }
  return { min, max };
}

function computeMaxValue(values: ReadonlyArray<number>): number {
  let max = 0;
  for (const v of values) {
    if (v > max) max = v;
  }
  return Math.ceil((max * 1.1) / 1000) * 1000;
}

function tickValues(maxValue: number): ReadonlyArray<number> {
  const step = Math.max(1000, Math.round(maxValue / 4 / 1000) * 1000);
  const out: number[] = [];
  for (let v = 0; v <= maxValue; v += step) out.push(v);
  return out;
}

export function computeGeometry(
  rows: ReadonlyArray<AdjustedEntry>,
  projection: ReadonlyArray<ProjectionYear>,
  projHigh: ReadonlyArray<ProjectionYear>,
  projLow: ReadonlyArray<ProjectionYear>,
): ChartGeometry | null {
  const years: number[] = [];
  const values: number[] = [];
  for (const r of rows) {
    years.push(r.entry.year);
    values.push(r.entry.grossAnnual);
    if (r.net !== null) values.push(r.net.netAnnual);
  }
  for (const p of projection) {
    years.push(p.year);
    values.push(p.grossAnnual);
    if (p.net !== null) values.push(p.net.netAnnual);
  }
  for (const p of projHigh) {
    if (p.net !== null) values.push(p.net.netAnnual);
  }
  if (years.length === 0 || values.length === 0) return null;

  const { min: minYear, max: maxYear } = computeYearRange(years);
  const maxValue = computeMaxValue(values);
  const span = Math.max(1, maxYear - minYear);

  const xForYear = (y: number) => CHART.PAD_LEFT + ((y - minYear) / span) * PLOT_W;
  const yForValue = (v: number) => CHART.PAD_TOP + PLOT_H - (v / maxValue) * PLOT_H;

  const scales: ChartScales = {
    minYear,
    maxYear,
    maxValue,
    years: [...new Set(years)].sort((a, b) => a - b),
    ticks: tickValues(maxValue),
    xForYear,
    yForValue,
  };

  const sortedRows = [...rows].sort((a, b) => a.entry.year - b.entry.year);

  const historyPoints: ChartPoint[] = sortedRows.map((r) => ({
    x: xForYear(r.entry.year),
    y: yForValue(r.entry.grossAnnual),
    year: r.entry.year,
    grossAnnual: r.entry.grossAnnual,
    netAnnual: r.net ? r.net.netAnnual : null,
    net: r.net,
    settings: r.entry.settings,
    note: r.entry.note,
    isProjected: false,
    isMigrated: r.entry.isMigrated === true,
  }));

  const projectionPoints: ChartPoint[] = projection.map((p) => ({
    x: xForYear(p.year),
    y: yForValue(p.net !== null ? p.net.netAnnual : p.grossAnnual),
    year: p.year,
    grossAnnual: p.grossAnnual,
    netAnnual: p.net ? p.net.netAnnual : null,
    net: p.net,
    settings: null,
    isProjected: true,
    isMigrated: false,
  }));

  const nominalPoints = historyPoints;
  const netPoints = historyPoints.filter((p) => p.netAnnual !== null);

  const bandUpper = projHigh.map((p) => ({
    x: xForYear(p.year),
    y: yForValue(p.net !== null ? p.net.netAnnual : p.grossAnnual),
  }));
  const bandLower = projLow.map((p) => ({
    x: xForYear(p.year),
    y: yForValue(p.net !== null ? p.net.netAnnual : p.grossAnnual),
  }));

  return {
    scales,
    timeline: [...historyPoints, ...projectionPoints],
    nominalPoints,
    netPoints,
    projectionPoints,
    bandUpper,
    bandLower,
  };
}
