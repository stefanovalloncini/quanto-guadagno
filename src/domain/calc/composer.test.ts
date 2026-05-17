import { describe, it, expect } from "vitest";
import { calculateSalaryBreakdown, type SalaryInput } from "./composer.ts";

// Base case: 30k RAL, Toscana, 14 mensilità, 2026, comunale 0,2%.
// Same input is run through five INPS variants to lock employee contribution
// against the rates published in INPS Circolare n. 6/2026.
const BASE: SalaryInput = {
  grossAnnual: 30_000,
  taxYear: 2026,
  regionCode: "toscana",
  municipalTaxRate: 0.002,
  contractType: "indeterminato",
  paymentFrequency: 14,
};

describe("calculateSalaryBreakdown — INPS contribution by variant", () => {
  it("small company, indeterminato → 9,19% × 30.000 = 2.757 €", () => {
    const r = calculateSalaryBreakdown(BASE);
    expect(r.inpsContribution).toBe(2757);
    expect(r.inpsRate).toBeCloseTo(0.0919, 4);
  });

  it("azienda > 15 dipendenti → 9,49% × 30.000 = 2.847 €", () => {
    const r = calculateSalaryBreakdown({ ...BASE, companySize: "large" });
    expect(r.inpsContribution).toBe(2847);
    expect(r.inpsRate).toBeCloseTo(0.0949, 4);
  });

  it("dipendente pubblico → 8,80% × 30.000 = 2.640 €", () => {
    const r = calculateSalaryBreakdown({ ...BASE, isPublicEmployee: true });
    expect(r.inpsContribution).toBe(2640);
    expect(r.inpsRate).toBeCloseTo(0.088, 4);
  });

  it("apprendistato → 5,84% × 30.000 = 1.752 €", () => {
    const r = calculateSalaryBreakdown({ ...BASE, contractType: "apprendistato" });
    expect(r.inpsContribution).toBe(1752);
    expect(r.inpsRate).toBeCloseTo(0.0584, 4);
  });

  it("override → uses the provided employee rate exactly", () => {
    const r = calculateSalaryBreakdown({
      ...BASE,
      inpsOverride: { employeeRate: 0.0975, employerRate: 0.25 },
    });
    expect(r.inpsContribution).toBe(Math.round(30_000 * 0.0975));
    expect(r.inpsRate).toBeCloseTo(0.0975, 4);
    expect(r.employerInps).toBe(Math.round(30_000 * 0.25));
    expect(r.employerInpsRate).toBeCloseTo(0.25, 4);
  });
});

describe("calculateSalaryBreakdown — invariants", () => {
  it("changing companySize moves taxable income by the CIGS delta", () => {
    const small = calculateSalaryBreakdown(BASE);
    const large = calculateSalaryBreakdown({ ...BASE, companySize: "large" });
    const expectedDelta = Math.round(30_000 * 0.003);
    expect(small.inpsContribution + expectedDelta).toBe(large.inpsContribution);
    expect(small.taxableIncome - expectedDelta).toBe(large.taxableIncome);
  });

  it("override does not affect taxable income via fringe-benefits path", () => {
    const r = calculateSalaryBreakdown({
      ...BASE,
      inpsOverride: { employeeRate: 0.0919, employerRate: 0.2381 },
    });
    const base = calculateSalaryBreakdown(BASE);
    expect(r.inpsContribution).toBe(base.inpsContribution);
    expect(r.taxableIncome).toBe(base.taxableIncome);
  });

  it("netAnnual reconciles with gross minus taxes plus monetary credits", () => {
    const r = calculateSalaryBreakdown({ ...BASE, companySize: "large" });
    // Only the somma aggiuntiva and trattamento integrativo are *paid back* in cash;
    // the detrazione aggiuntiva is folded into irpefNet (already inside totalTaxes).
    const cashCredits = r.trattamentoIntegrativo + r.sommaAggiuntiva;
    expect(r.netAnnual + r.totalTaxes - cashCredits).toBe(r.grossAnnual);
  });
});
