import { describe, it, expect } from "vitest";
import { adjustValueAcrossYears, cumulativeInflation } from "./inflation.ts";

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
