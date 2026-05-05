import { describe, expect, it } from "vitest";
import { calculateRealValue } from "@/domain/calc";
import { ITALIAN_INFLATION_FOI } from "@/domain/data";

describe("calculateRealValue", () => {
  it("same year produces no change", () => {
    const r = calculateRealValue(
      { amount: 1000, fromYear: 2024, toYear: 2024 },
      ITALIAN_INFLATION_FOI,
    );
    expect(r.realAmount).toBe(1000);
    expect(r.cumulativeInflation).toBe(0);
  });

  it("forward in time reduces real value when inflation is positive", () => {
    const r = calculateRealValue(
      { amount: 20_000, fromYear: 2020, toYear: 2024 },
      ITALIAN_INFLATION_FOI,
    );
    expect(r.realAmount).toBeLessThan(20_000);
    expect(r.cumulativeInflation).toBeGreaterThan(0);
  });

  it("backward in time increases nominal-to-real for positive inflation", () => {
    const r = calculateRealValue(
      { amount: 20_000, fromYear: 2024, toYear: 2020 },
      ITALIAN_INFLATION_FOI,
    );
    expect(r.realAmount).toBeGreaterThan(20_000);
  });

  it("zero inflation between years preserves value", () => {
    const r = calculateRealValue(
      { amount: 5_000, fromYear: 2014, toYear: 2016 },
      [
        { year: 2014, rate: 0 },
        { year: 2015, rate: 0 },
        { year: 2016, rate: 0 },
      ],
    );
    expect(r.realAmount).toBe(5_000);
    expect(r.cumulativeInflation).toBe(0);
  });
});
