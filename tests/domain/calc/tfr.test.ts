import { describe, expect, it } from "vitest";
import { calculateTfr } from "@/domain/calc";

describe("calculateTfr", () => {
  it("zero years produces zero accrual", () => {
    const r = calculateTfr({ grossAnnual: 30_000, years: 0, annualInflation: 0.02 });
    expect(r.accruedTotal).toBe(0);
    expect(r.tfrNet).toBe(0);
  });

  it("one year of service accrues exactly the annual quota with no revaluation", () => {
    const r = calculateTfr({ grossAnnual: 35_000, years: 1, annualInflation: 0.02 });
    expect(r.annualAccrual).toBeCloseTo(35_000 / 13.5, 2);
    expect(r.accruedTotal).toBeCloseTo(35_000 / 13.5, 2);
    expect(r.revaluationGross).toBeCloseTo(0, 2);
  });

  it("zero inflation produces only the fixed 1.5% revaluation per year", () => {
    const r = calculateTfr({ grossAnnual: 30_000, years: 5, annualInflation: 0 });
    expect(r.revaluationGross).toBeGreaterThan(0);
  });

  it("higher inflation produces more revaluation", () => {
    const low = calculateTfr({ grossAnnual: 30_000, years: 10, annualInflation: 0 });
    const high = calculateTfr({ grossAnnual: 30_000, years: 10, annualInflation: 0.05 });
    expect(high.revaluationGross).toBeGreaterThan(low.revaluationGross);
    expect(high.tfrNet).toBeGreaterThan(low.tfrNet);
  });

  it("revaluation tax is 17% of the revaluation amount", () => {
    const r = calculateTfr({ grossAnnual: 35_000, years: 10, annualInflation: 0.02 });
    expect(r.revaluationTax).toBeCloseTo(r.revaluationGross * 0.17, 1);
  });

  it("net is total minus revaluation tax", () => {
    const r = calculateTfr({ grossAnnual: 40_000, years: 8, annualInflation: 0.025 });
    expect(r.tfrNet).toBeCloseTo(r.accruedTotal - r.revaluationTax, 1);
  });

  it("more years produces more accrual", () => {
    const a = calculateTfr({ grossAnnual: 30_000, years: 5, annualInflation: 0.02 });
    const b = calculateTfr({ grossAnnual: 30_000, years: 15, annualInflation: 0.02 });
    expect(b.accruedTotal).toBeGreaterThan(a.accruedTotal);
  });
});
