import { describe, expect, it } from "vitest";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { TAX_CONFIG_2025 } from "@/domain/data";

const run = (grossAnnual: number) =>
  calculateSalaryBreakdown({
    grossAnnual,
    taxYear: 2025,
    regionCode: "lombardia",
    municipalTaxRate: 0,
  });

describe("salary breakdown 2025", () => {
  it("uses 35% mid IRPEF bracket", () => {
    const grossForTaxable40k = 40_000 / (1 - 0.0919);
    const r = run(grossForTaxable40k);
    expect(r.taxableIncome).toBeCloseTo(40_000, 0);
    expect(r.irpefGross).toBeCloseTo(28_000 * 0.23 + 12_000 * 0.35, 0);
  });

  it("does not apply the 2024 INPS exemption", () => {
    const r = run(20_000);
    expect(r.inpsExemption).toBe(0);
  });

  it("applies the somma aggiuntiva for income up to 20k", () => {
    const r = run(18_000);
    expect(r.sommaAggiuntiva).toBeGreaterThan(0);
  });

  it("applies the detrazione aggiuntiva between 20k and 32k", () => {
    const r = run(28_000);
    expect(r.detrazioneAggiuntiva).toBeGreaterThan(0);
    expect(r.sommaAggiuntiva).toBe(0);
  });

  it("phases out the detrazione aggiuntiva by 40k", () => {
    const r = run(45_000);
    expect(r.detrazioneAggiuntiva).toBe(0);
  });

  it("INPS ceiling for 2025 is 55448", () => {
    expect(TAX_CONFIG_2025.inps.ceiling).toBe(55_448);
  });
});
