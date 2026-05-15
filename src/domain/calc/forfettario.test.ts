import { describe, it, expect } from "vitest";
import {
  calculateForfettario,
  calculateForfettarioEligibility,
  calculateGestioneSeparataContribution,
  type ForfettarioConfig,
  type GestioneSeparataConfig,
} from "./forfettario.ts";

const CFG: ForfettarioConfig = {
  startupRate: 0.05,
  standardRate: 0.15,
  startupYears: 5,
  maxRevenue: 85_000,
  maxEmployeeCosts: 20_000,
};

const GS_2025: GestioneSeparataConfig = {
  fullRate: 0.2607,
  reducedRate: 0.24,
  massimale: 120_607,
  minimaleReddito: 18_555,
};

describe("calculateForfettarioEligibility", () => {
  it("returns eligible when revenue and employee costs are under the limits", () => {
    const result = calculateForfettarioEligibility(50_000, 0, CFG);
    expect(result.eligible).toBe(true);
    expect(result.reasons).toEqual([]);
    expect(result.warning).toBe(false);
  });

  it("flags a warning between 80% and 100% of the revenue limit", () => {
    const result = calculateForfettarioEligibility(70_000, 0, CFG);
    expect(result.eligible).toBe(true);
    expect(result.warning).toBe(true);
    expect(result.revenueLimitPercentage).toBeCloseTo(82.35, 1);
  });

  it("rejects when revenue exceeds the limit", () => {
    const result = calculateForfettarioEligibility(90_000, 0, CFG);
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("revenue-exceeds-limit");
  });

  it("rejects when employee costs exceed the limit", () => {
    const result = calculateForfettarioEligibility(40_000, 25_000, CFG);
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("employee-costs-exceed-limit");
  });
});

describe("calculateGestioneSeparataContribution", () => {
  it("applies the full rate when there is no other pension", () => {
    const result = calculateGestioneSeparataContribution(23_400, false, GS_2025);
    expect(result.rate).toBe(0.2607);
    expect(result.contribution).toBeCloseTo(6100.38, 2);
  });

  it("applies the reduced rate when an other pension exists", () => {
    const result = calculateGestioneSeparataContribution(23_400, true, GS_2025);
    expect(result.rate).toBe(0.24);
    expect(result.contribution).toBeCloseTo(5616, 2);
  });

  it("caps the contribution base at the massimale", () => {
    const result = calculateGestioneSeparataContribution(200_000, false, GS_2025);
    expect(result.contribution).toBeCloseTo(120_607 * 0.2607, 2);
  });

  it("returns zero contribution on non-positive imponibile", () => {
    const result = calculateGestioneSeparataContribution(0, false, GS_2025);
    expect(result.contribution).toBe(0);
  });
});

describe("calculateForfettario — golden vectors", () => {
  it("startup professionisti 30k, year 1 (5% sostitutiva)", () => {
    const result = calculateForfettario(
      {
        revenue: 30_000,
        coefficient: 0.78,
        yearsOfActivity: 1,
        hasOtherPension: false,
        employeeCosts: 0,
      },
      CFG,
      GS_2025,
    );

    expect(result.imponibileLordo).toBeCloseTo(23_400, 2);
    expect(result.contributoInps).toBeCloseTo(6_100.38, 2);
    expect(result.imponibileNetto).toBeCloseTo(17_299.62, 2);
    expect(result.aliquotaSostitutiva).toBe(0.05);
    expect(result.impostaSostitutiva).toBeCloseTo(864.98, 2);
    expect(result.totaleImposte).toBeCloseTo(6_965.36, 2);
    expect(result.nettoAnnuale).toBeCloseTo(23_034.64, 2);
    expect(result.nettoMensile).toBeCloseTo(1_919.55, 2);
    expect(result.eligibility.eligible).toBe(true);
  });

  it("standard professionisti 60k, year 7 (15% sostitutiva)", () => {
    const result = calculateForfettario(
      {
        revenue: 60_000,
        coefficient: 0.78,
        yearsOfActivity: 7,
        hasOtherPension: false,
        employeeCosts: 0,
      },
      CFG,
      GS_2025,
    );

    expect(result.aliquotaSostitutiva).toBe(0.15);
    expect(result.imponibileLordo).toBeCloseTo(46_800, 2);
    expect(result.contributoInps).toBeCloseTo(12_200.76, 2);
    expect(result.impostaSostitutiva).toBeCloseTo(5_189.89, 2);
    expect(result.nettoAnnuale).toBeCloseTo(42_609.35, 2);
  });

  it("commercio at revenue limit 85k", () => {
    const result = calculateForfettario(
      {
        revenue: 85_000,
        coefficient: 0.4,
        yearsOfActivity: 6,
        hasOtherPension: false,
        employeeCosts: 0,
      },
      CFG,
      GS_2025,
    );

    expect(result.eligibility.eligible).toBe(true);
    expect(result.eligibility.revenueLimitPercentage).toBe(100);
    expect(result.imponibileLordo).toBeCloseTo(34_000, 2);
    expect(result.contributoInps).toBeCloseTo(8_863.8, 2);
    expect(result.impostaSostitutiva).toBeCloseTo(3_770.43, 2);
    expect(result.nettoAnnuale).toBeCloseTo(72_365.77, 2);
  });

  it("returns ineligibility flags but still computes a hypothetical net for over-limit revenue", () => {
    const result = calculateForfettario(
      {
        revenue: 100_000,
        coefficient: 0.78,
        yearsOfActivity: 3,
        hasOtherPension: false,
        employeeCosts: 0,
      },
      CFG,
      GS_2025,
    );

    expect(result.eligibility.eligible).toBe(false);
    expect(result.eligibility.reasons).toContain("revenue-exceeds-limit");
    expect(result.nettoAnnuale).toBeGreaterThan(0);
  });
});
