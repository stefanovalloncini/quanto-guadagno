import { describe, expect, it } from "vitest";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { TAX_CONFIG_2026 } from "@/domain/data";

const run = (grossAnnual: number, municipalTaxRate = 0.008) =>
  calculateSalaryBreakdown({
    grossAnnual,
    taxYear: 2026,
    regionCode: "lombardia",
    municipalTaxRate,
  });

describe("salary breakdown 2026", () => {
  it("zero gross produces zero everything", () => {
    const r = run(0);
    expect(r.netAnnual).toBe(0);
    expect(r.inpsContribution).toBe(0);
    expect(r.irpefGross).toBe(0);
  });

  it("low income (15k) gets full trattamento integrativo", () => {
    const r = run(15_000);
    expect(r.trattamentoIntegrativo).toBeCloseTo(1200, 0);
    expect(r.netAnnual).toBeGreaterThan(12_000);
    expect(r.netAnnual).toBeLessThan(15_500);
  });

  it("median income (30k) sits in second IRPEF bracket at 33%", () => {
    const r = run(30_000);
    expect(r.taxableIncome).toBeCloseTo(30_000 - r.inpsContribution, 0);
    expect(r.irpefGross).toBeGreaterThan(0);
    expect(r.netAnnual).toBeGreaterThan(20_000);
    expect(r.netAnnual).toBeLessThan(25_000);
  });

  it("previdenza complementare lowers taxable income and raises net", () => {
    const base = run(40_000);
    const withFund = calculateSalaryBreakdown({
      grossAnnual: 40_000,
      taxYear: 2026,
      regionCode: "lombardia",
      municipalTaxRate: 0.008,
      expenseDeductions: {
        mortgageInterest: 0,
        medicalExpenses: 0,
        otherDeductions: 0,
        pensionFund: 3_000,
      },
    });
    expect(withFund.pensionFundDeduction).toBe(3_000);
    expect(withFund.taxableIncome).toBeCloseTo(base.taxableIncome - 3_000, 0);
    expect(withFund.netAnnual).toBeGreaterThan(base.netAnnual);
  });

  it("high income (80k) hits the 43% top bracket", () => {
    const r = run(80_000);
    expect(r.netAnnual).toBeLessThan(50_000);
    expect(r.netAnnual).toBeGreaterThan(40_000);
    expect(r.trattamentoIntegrativo).toBe(0);
  });

  it("very high income (200k) clamps INPS at the massimale", () => {
    const lowGross = run(120_000);
    const highGross = run(200_000);
    const inpsBase = TAX_CONFIG_2026.inps.massimale;
    const expectedInps =
      TAX_CONFIG_2026.inps.ceiling * TAX_CONFIG_2026.inps.standardRate +
      (inpsBase - TAX_CONFIG_2026.inps.ceiling) * TAX_CONFIG_2026.inps.aboveCeilingRate;
    expect(highGross.inpsContribution).toBeCloseTo(expectedInps, 0);
    expect(highGross.inpsContribution).toBeGreaterThanOrEqual(lowGross.inpsContribution);
  });

  it("effective tax rate increases with income", () => {
    const a = run(20_000);
    const b = run(60_000);
    expect(b.effectiveTaxRate).toBeGreaterThan(a.effectiveTaxRate);
  });

  it("regional and municipal rates apply to taxable income", () => {
    const noLocal = run(40_000, 0);
    const withLocal = run(40_000, 0.008);
    expect(withLocal.municipalTax).toBeCloseTo(noLocal.taxableIncome * 0.008, 1);
    expect(withLocal.netAnnual).toBeLessThan(noLocal.netAnnual);
  });

  it("monthly net is annual net divided by 12", () => {
    const r = run(35_000);
    expect(r.netMonthly).toBeCloseTo(r.netAnnual / 12, 1);
  });
});

describe("IRPEF 2026 brackets", () => {
  it("28k taxable income pays only 23% bracket", () => {
    const grossForTaxable28k = 28_000 / (1 - 0.0919);
    const r = run(grossForTaxable28k);
    expect(r.taxableIncome).toBeCloseTo(28_000, 0);
    expect(r.irpefGross).toBeCloseTo(28_000 * 0.23, 0);
  });

  it("50k taxable income pays 23% on first 28k + 33% on next 22k", () => {
    const grossForTaxable50k = 50_000 / (1 - 0.0919);
    const r = run(grossForTaxable50k);
    expect(r.taxableIncome).toBeCloseTo(50_000, 0);
    expect(r.irpefGross).toBeCloseTo(28_000 * 0.23 + 22_000 * 0.33, 0);
  });
});
