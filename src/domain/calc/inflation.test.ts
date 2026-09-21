import { describe, it, expect } from "vitest";
import {
  adjustValueAcrossYears,
  cumulativeInflation,
  frozenSalaryRealValue,
  raiseNeededToKeepPace,
} from "./inflation.ts";

describe("adjustValueAcrossYears", () => {
  it("returns the nominal value unchanged when the two years coincide", () => {
    const result = adjustValueAcrossYears(30_000, 2024, 2024);
    expect(result?.nominal).toBe(30_000);
    expect(result?.adjusted).toBe(30_000);
    expect(result?.factor).toBe(1);
  });

  it("inflates a 2020 wage forward to 2026", () => {
    const result = adjustValueAcrossYears(30_000, 2020, 2026);
    expect(result).not.toBeNull();
    // FOI 2020 = 103.0, FOI 2026 = 125.2 → factor ~ 1.2155
    if (result === null) return;
    expect(result.factor).toBeGreaterThan(1.2);
    expect(result.factor).toBeLessThan(1.23);
    expect(result.adjusted).toBeGreaterThan(36_000);
    expect(result.adjusted).toBeLessThan(37_000);
  });

  it("deflates a 2026 wage back to 2020", () => {
    const result = adjustValueAcrossYears(30_000, 2026, 2020);
    expect(result).not.toBeNull();
    if (result === null) return;
    expect(result.factor).toBeLessThan(1);
    expect(result.adjusted).toBeLessThan(30_000);
  });

  it("returns null when the from-year is missing", () => {
    expect(adjustValueAcrossYears(30_000, 1999, 2026)).toBeNull();
  });

  it("returns null when the to-year is missing", () => {
    expect(adjustValueAcrossYears(30_000, 2020, 2030)).toBeNull();
  });
});

describe("cumulativeInflation", () => {
  it("returns 0 when years coincide", () => {
    expect(cumulativeInflation(2024, 2024)).toBe(0);
  });

  it("returns a positive number when inflation occurred", () => {
    const rate = cumulativeInflation(2020, 2024);
    expect(rate).not.toBeNull();
    if (rate === null) return;
    expect(rate).toBeGreaterThan(0.15);
  });

  it("returns null for missing years", () => {
    expect(cumulativeInflation(1990, 2026)).toBeNull();
  });
});

// FOI, base 2015 = 100: 2020 = 103,0  2021 = 105,0  2022 = 113,8
//                       2023 = 120,3  2024 = 121,5  2025 = 123,3  2026 = 125,2
describe("raiseNeededToKeepPace", () => {
  it("asks for the raise that restores the 2020 purchasing power in 2026", () => {
    // 125,2 / 103,0 = 1,2155339805825243
    const result = raiseNeededToKeepPace(30_000, 2020, 2026);
    expect(result).not.toBeNull();
    if (result === null) return;
    expect(result.grossNeeded).toBeCloseTo(36_466.02, 2);
    expect(result.raiseAmount).toBeCloseTo(6_466.02, 2);
    expect(result.raisePercent).toBeCloseTo(0.2155339806, 8);
  });

  it("works over a shorter span", () => {
    // 125,2 / 113,8 = 1,1001757469244289
    const result = raiseNeededToKeepPace(25_000, 2022, 2026);
    expect(result?.grossNeeded).toBeCloseTo(27_504.39, 2);
    expect(result?.raiseAmount).toBeCloseTo(2_504.39, 2);
    expect(result?.raisePercent).toBeCloseTo(0.1001757469, 8);
  });

  it("asks for nothing when the two years coincide", () => {
    const result = raiseNeededToKeepPace(30_000, 2026, 2026);
    expect(result?.grossNeeded).toBe(30_000);
    expect(result?.raiseAmount).toBe(0);
    expect(result?.raisePercent).toBe(0);
  });

  it("returns null when a year is outside the series", () => {
    expect(raiseNeededToKeepPace(30_000, 1999, 2026)).toBeNull();
    expect(raiseNeededToKeepPace(30_000, 2020, 2031)).toBeNull();
  });
});

describe("frozenSalaryRealValue", () => {
  it("walks the FOI series year by year from the starting year", () => {
    const result = frozenSalaryRealValue(30_000, 2021, 5);
    expect(result).not.toBeNull();
    if (result === null) return;

    expect(result.years.map((y) => y.year)).toEqual([2021, 2022, 2023, 2024, 2025, 2026]);
    expect(result.years[0]?.realValue).toBe(30_000);
    expect(result.years[0]?.loss).toBe(0);
    expect(result.years[1]?.realValue).toBeCloseTo(27_680.14, 2);
    expect(result.years[1]?.loss).toBeCloseTo(2_319.86, 2);
    expect(result.years[2]?.realValue).toBeCloseTo(26_184.54, 2);
    expect(result.years[3]?.realValue).toBeCloseTo(25_925.93, 2);
    expect(result.years[4]?.realValue).toBeCloseTo(25_547.45, 2);
    expect(result.years[5]?.realValue).toBeCloseTo(25_159.74, 2);
    expect(result.years[5]?.lossRate).toBeCloseTo(0.161341853, 8);
  });

  it("stops at the last year the series covers instead of extrapolating", () => {
    const result = frozenSalaryRealValue(40_000, 2023, 5);
    expect(result).not.toBeNull();
    if (result === null) return;

    expect(result.years.map((y) => y.year)).toEqual([2023, 2024, 2025, 2026]);
    expect(result.lastYear).toBe(2026);
    expect(result.truncated).toBe(true);
    expect(result.years[1]?.realValue).toBeCloseTo(39_604.94, 2);
    expect(result.years[2]?.realValue).toBeCloseTo(39_026.76, 2);
    expect(result.years[3]?.realValue).toBeCloseTo(38_434.5, 2);
  });

  it("is not truncated when the horizon lands on the last covered year", () => {
    const result = frozenSalaryRealValue(30_000, 2021, 5);
    expect(result?.truncated).toBe(false);
    expect(result?.lastYear).toBe(2026);
  });

  it("returns null when the starting year is outside the series", () => {
    expect(frozenSalaryRealValue(30_000, 1999, 5)).toBeNull();
  });

  it("returns the starting year alone for a zero-year horizon", () => {
    const result = frozenSalaryRealValue(30_000, 2021, 0);
    expect(result?.years).toHaveLength(1);
    expect(result?.truncated).toBe(false);
  });
});
