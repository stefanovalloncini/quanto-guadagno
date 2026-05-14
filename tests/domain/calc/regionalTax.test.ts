import { describe, it, expect } from "vitest";
import { calculateRegionalTax, getEffectiveRegionalRate, calculateLocalTaxes } from "@/domain/calc/regionalTaxCalculations.ts";
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
