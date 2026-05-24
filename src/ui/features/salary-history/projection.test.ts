import { describe, it, expect } from "vitest";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { FOI_INDEX, FOI_LATEST_YEAR } from "@/domain/data";
import { defaultGrowthRate, projectSalary } from "./projection.ts";
import { DEFAULT_ENTRY_SETTINGS, type SalaryEntry } from "./salaryHistory.ts";

const BASE: SalaryEntry = {
  id: "x",
  year: 2026,
  grossAnnual: 30_000,
  createdAt: "2026-06-01T00:00:00Z",
  settings: DEFAULT_ENTRY_SETTINGS,
};

describe("defaultGrowthRate", () => {
  it("averages the last three FOI yoy rates", () => {
    const recent = FOI_INDEX.slice(-3);
    const expected = recent.reduce((acc, p) => acc + p.yoyRate, 0) / recent.length;
    expect(defaultGrowthRate()).toBeCloseTo(expected, 6);
  });
});

describe("projectSalary", () => {
  it("returns one row per year up to the horizon", () => {
    const rows = projectSalary({ baseEntry: BASE, horizonYears: 5, growthRate: 0.02 });
    expect(rows).toHaveLength(5);
    expect(rows.map((r) => r.year)).toEqual([2027, 2028, 2029, 2030, 2031]);
  });

  it("compounds gross by the growth rate each year", () => {
    const rows = projectSalary({ baseEntry: BASE, horizonYears: 3, growthRate: 0.05 });
    expect(rows[0]?.grossAnnual).toBe(Math.round(30_000 * 1.05));
    expect(rows[1]?.grossAnnual).toBe(Math.round(30_000 * 1.05 ** 2));
    expect(rows[2]?.grossAnnual).toBe(Math.round(30_000 * 1.05 ** 3));
  });

  it("computes net using the latest supported tax rules", () => {
    const rows = projectSalary({ baseEntry: BASE, horizonYears: 1, growthRate: 0 });
    const direct = calculateSalaryBreakdown({
      grossAnnual: 30_000,
      taxYear: FOI_LATEST_YEAR,
      regionCode: DEFAULT_ENTRY_SETTINGS.regionCode,
      municipalTaxRate: DEFAULT_ENTRY_SETTINGS.municipalTaxRate,
      contractType: DEFAULT_ENTRY_SETTINGS.contractType,
      paymentFrequency: DEFAULT_ENTRY_SETTINGS.paymentFrequency,
    });
    expect(rows[0]?.net?.netAnnual).toBe(direct.netAnnual);
  });

  it("returns an empty array when horizonYears is 0", () => {
    expect(projectSalary({ baseEntry: BASE, horizonYears: 0, growthRate: 0.02 })).toEqual([]);
  });

  it("supports negative growth", () => {
    const rows = projectSalary({ baseEntry: BASE, horizonYears: 2, growthRate: -0.05 });
    expect(rows[0]?.grossAnnual).toBe(Math.round(30_000 * 0.95));
    expect(rows[1]?.grossAnnual).toBe(Math.round(30_000 * 0.95 ** 2));
  });
});
