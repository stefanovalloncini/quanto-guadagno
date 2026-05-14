import { describe, expect, it } from "vitest";
import { calculateSalaryBreakdown } from "@/domain/calc";

const run = (grossAnnual: number) =>
  calculateSalaryBreakdown({
    grossAnnual,
    taxYear: 2024,
    regionCode: "lombardia",
    municipalTaxRate: 0,
  });

describe("salary breakdown 2024", () => {
  it("low income (15k) gets full trattamento integrativo and INPS exemption", () => {
    const r = run(15_000);
    expect(r.trattamentoIntegrativo).toBeCloseTo(1200, 0);
    expect(r.inpsExemption).toBeGreaterThan(0);
    expect(r.inpsExemption).toBeCloseTo(15_000 * 0.07, 1);
  });

  it("INPS exemption applies 7% in lowest bracket", () => {
    const r = run(20_000);
    expect(r.inpsExemption).toBeCloseTo(20_000 * 0.07, 1);
  });

  it("INPS exemption applies 6% in second bracket", () => {
    const r = run(30_000);
    expect(r.inpsExemption).toBeCloseTo(30_000 * 0.06, 1);
  });

  it("INPS exemption disappears above the second bracket", () => {
    const r = run(35_000);
    expect(r.inpsExemption).toBe(0);
  });

  it("does not apply the tax wedge cut (2025+ only)", () => {
    const r = run(30_000);
    expect(r.sommaAggiuntiva).toBe(0);
    expect(r.detrazioneAggiuntiva).toBe(0);
  });

  it("uses 35% mid IRPEF bracket (not 33%)", () => {
    const grossForTaxable40k = 40_000 / (1 - 0.0919);
    const r = run(grossForTaxable40k);
    expect(r.taxableIncome).toBeCloseTo(40_000, 0);
    expect(r.irpefGross).toBeCloseTo(28_000 * 0.23 + 12_000 * 0.35, 0);
  });
});
