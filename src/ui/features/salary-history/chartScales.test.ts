import { describe, it, expect } from "vitest";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { computeGeometry, CHART, PLOT_W, BASELINE } from "./chartScales.ts";
import { DEFAULT_ENTRY_SETTINGS, type SalaryEntry } from "./salaryHistory.ts";
import type { AdjustedEntry } from "./useSalaryHistory.ts";
import type { ProjectionYear } from "./projection.ts";

function entry(year: number, grossAnnual: number): SalaryEntry {
  return {
    id: `e-${year}`,
    year,
    grossAnnual,
    createdAt: "2026-01-01T00:00:00.000Z",
    settings: DEFAULT_ENTRY_SETTINGS,
  };
}

function row(year: number, grossAnnual: number, withNet = false): AdjustedEntry {
  const net = withNet
    ? calculateSalaryBreakdown({
        grossAnnual,
        taxYear: 2026,
        regionCode: "lombardia",
        municipalTaxRate: 0.008,
        contractType: "indeterminato",
      })
    : null;
  return { entry: entry(year, grossAnnual), adjusted: null, net };
}

describe("computeGeometry", () => {
  it("returns null when there is no data", () => {
    expect(computeGeometry([], [], [], [])).toBeNull();
  });

  it("maps the earliest year to the left edge and the latest to the right edge", () => {
    const g = computeGeometry([row(2020, 20_000), row(2024, 30_000)], [], [], []);
    expect(g?.scales.minYear).toBe(2020);
    expect(g?.scales.maxYear).toBe(2024);
    expect(g?.scales.xForYear(2020)).toBeCloseTo(CHART.PAD_LEFT, 5);
    expect(g?.scales.xForYear(2024)).toBeCloseTo(CHART.PAD_LEFT + PLOT_W, 5);
  });

  it("maps value 0 to the baseline and the max value to the top padding", () => {
    const g = computeGeometry([row(2024, 30_000)], [], [], []);
    expect(g?.scales.yForValue(0)).toBeCloseTo(BASELINE, 5);
    expect(g?.scales.yForValue(g?.scales.maxValue ?? 0)).toBeCloseTo(CHART.PAD_TOP, 5);
  });

  it("rounds the max value up to the next thousand with 10% headroom", () => {
    // 30.000 × 1.1 = 33.000 → already a round thousand.
    const g = computeGeometry([row(2024, 30_000)], [], [], []);
    expect(g?.scales.maxValue).toBe(33_000);
  });

  it("keeps a single-year history at the left edge without dividing by zero", () => {
    const g = computeGeometry([row(2024, 30_000)], [], [], []);
    expect(g?.scales.xForYear(2024)).toBeCloseTo(CHART.PAD_LEFT, 5);
  });

  it("appends projection points flagged as projected", () => {
    const projection: ProjectionYear[] = [{ year: 2025, grossAnnual: 31_000, net: null }];
    const g = computeGeometry([row(2024, 30_000)], projection, [], []);
    expect(g?.projectionPoints).toHaveLength(1);
    expect(g?.projectionPoints[0]?.isProjected).toBe(true);
    expect(g?.timeline).toHaveLength(2);
  });

  it("counts a net point only where a net breakdown exists", () => {
    const g = computeGeometry([row(2023, 25_000, true), row(2024, 30_000, false)], [], [], []);
    expect(g?.nominalPoints).toHaveLength(2);
    expect(g?.netPoints).toHaveLength(1);
  });

  it("builds band outlines from the high and low projections", () => {
    const high: ProjectionYear[] = [{ year: 2025, grossAnnual: 32_000, net: null }];
    const low: ProjectionYear[] = [{ year: 2025, grossAnnual: 30_000, net: null }];
    const g = computeGeometry([row(2024, 30_000)], [], high, low);
    expect(g?.bandUpper).toHaveLength(1);
    expect(g?.bandLower).toHaveLength(1);
  });

  it("places a projection point at its net value when a net breakdown is present", () => {
    const net2025 = calculateSalaryBreakdown({
      grossAnnual: 31_000,
      taxYear: 2026,
      regionCode: "lombardia",
      municipalTaxRate: 0.008,
      contractType: "indeterminato",
    });
    const projection: ProjectionYear[] = [{ year: 2025, grossAnnual: 31_000, net: net2025 }];
    const high: ProjectionYear[] = [{ year: 2025, grossAnnual: 33_000, net: net2025 }];
    const low: ProjectionYear[] = [{ year: 2025, grossAnnual: 29_000, net: net2025 }];
    const g = computeGeometry([row(2024, 30_000, true)], projection, high, low);
    expect(g?.projectionPoints[0]?.y).toBeCloseTo(g?.scales.yForValue(net2025.netAnnual) ?? -1, 5);
    expect(g?.bandUpper).toHaveLength(1);
    expect(g?.bandLower).toHaveLength(1);
  });
});
