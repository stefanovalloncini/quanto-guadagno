import { describe, it, expect } from "vitest";
import {
  calculateRegionalTax,
  getEffectiveRegionalRate,
  getRegionalMarginalRate,
  calculateLocalTaxes,
} from "@/domain/calc/regionalTaxCalculations.ts";
import { REGIONS } from "@/domain/data/regions.ts";

describe("calculateRegionalTax", () => {
  it("applies Lombardia progressive brackets for 30k income", () => {
    // Brackets: 0–15k at 1.23%, 15k–28k at 1.58%, 28k–50k at 1.72%
    // 15000 * 0.0123 = 184.50
    // 13000 * 0.0158 = 205.40
    // 2000 * 0.0172 = 34.40
    // Total = 424.30
    const tax = calculateRegionalTax(30_000, REGIONS.lombardia);
    expect(tax).toBeCloseTo(424.3, 1);
  });

  it("returns 0 for Valle d'Aosta below exemption threshold (15k)", () => {
    const tax = calculateRegionalTax(14_999, REGIONS["valle-daosta"]);
    expect(tax).toBe(0);
  });

  it("applies Lazio bracket for 20k income", () => {
    // 0–15k at 1.73%, 15k+ at 3.33%
    // 15000 * 0.0173 = 259.50
    // 5000 * 0.0333 = 166.50
    // Total = 426.00
    const tax = calculateRegionalTax(20_000, REGIONS.lazio);
    expect(tax).toBeCloseTo(426, 0);
  });

  it("returns 0 for zero income", () => {
    expect(calculateRegionalTax(0, REGIONS.lombardia)).toBe(0);
  });
});

describe("Bolzano detrazione of 430,50 euro", () => {
  // Brackets 1,23% to 50.000, 1,73% above. The detrazione comes off the tax,
  // so the surcharge is zero until the brackets produce more than 430,50,
  // which happens at exactly 430,50 / 0,0123 = 35.000 euro.
  const vectors: ReadonlyArray<readonly [number, number]> = [
    [20_000, 0],
    [28_000, 0],
    [35_000, 0],
    [60_000, 357.5],
    [90_000, 876.5],
    [95_000, 1393.5],
  ];

  for (const [income, expected] of vectors) {
    it(`charges ${expected} euro on a taxable income of ${income}`, () => {
      expect(calculateRegionalTax(income, REGIONS.bolzano)).toBeCloseTo(expected, 2);
    });
  }

  it("drops the detrazione one euro past the ceiling", () => {
    const atCeiling = calculateRegionalTax(90_000, REGIONS.bolzano);
    const pastCeiling = calculateRegionalTax(90_001, REGIONS.bolzano);
    expect(pastCeiling - atCeiling).toBeCloseTo(430.5 + 0.0173, 2);
  });

  it("reports no marginal rate while the detrazione still covers the tax", () => {
    expect(getRegionalMarginalRate(30_000, REGIONS.bolzano)).toBe(0);
    expect(getRegionalMarginalRate(40_000, REGIONS.bolzano)).toBeCloseTo(0.0123, 4);
    expect(getRegionalMarginalRate(60_000, REGIONS.bolzano)).toBeCloseTo(0.0173, 4);
  });
});

describe("Trento keeps its base deduction", () => {
  it("charges nothing at the threshold and the full brackets one euro above", () => {
    expect(calculateRegionalTax(30_000, REGIONS.trento)).toBe(0);
    expect(calculateRegionalTax(30_001, REGIONS.trento)).toBeCloseTo(369.01, 2);
  });
});

describe("getEffectiveRegionalRate", () => {
  it("returns 0 for zero income", () => {
    expect(getEffectiveRegionalRate(0, REGIONS.lombardia)).toBe(0);
  });

  it("returns a rate between 0 and max bracket rate for typical income", () => {
    const rate = getEffectiveRegionalRate(30_000, REGIONS.lombardia);
    expect(rate).toBeGreaterThan(0);
    expect(rate).toBeLessThan(0.0173);
  });
});

describe("calculateLocalTaxes", () => {
  it("combines regional and municipal taxes correctly", () => {
    const result = calculateLocalTaxes(30_000, "lombardia", 0.008);
    expect(result.regionalTax).toBeCloseTo(424.3, 1);
    expect(result.municipalTax).toBeCloseTo(240, 1);
    expect(result.regionalTaxRate).toBeGreaterThan(0);
  });
});
