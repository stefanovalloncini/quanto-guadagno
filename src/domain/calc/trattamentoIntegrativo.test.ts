import { describe, it, expect } from "vitest";
import { calculateTrattamentoIntegrativo } from "./trattamentoIntegrativo.ts";
import { SHARED_TRATTAMENTO_INTEGRATIVO } from "@/domain/data";

const CFG = SHARED_TRATTAMENTO_INTEGRATIVO;

// Signature: (taxableIncome, irpefGross, totalDeductions, cfg). D.L. 3/2020.
describe("calculateTrattamentoIntegrativo", () => {
  it("bonus pieno 1.200 € fino a 15.000 €", () => {
    expect(calculateTrattamentoIntegrativo(14_000, 3220, 1955, CFG)).toBe(1200);
  });

  it("oltre 28.000 € non spetta", () => {
    expect(calculateTrattamentoIntegrativo(30_000, 6900, 2000, CFG)).toBe(0);
  });

  it("tra 15k e 28k: nullo se le detrazioni non superano l'IRPEF", () => {
    expect(calculateTrattamentoIntegrativo(20_000, 4600, 2642, CFG)).toBe(0);
  });

  it("tra 15k e 28k: parziale = min(1.200, detrazioni − IRPEF)", () => {
    expect(calculateTrattamentoIntegrativo(20_000, 4000, 4320, CFG)).toBe(320);
  });

  it("parziale plafonato a 1.200 €", () => {
    expect(calculateTrattamentoIntegrativo(20_000, 4000, 6000, CFG)).toBe(1200);
  });

  it("reddito non positivo → 0", () => {
    expect(calculateTrattamentoIntegrativo(0, 0, 0, CFG)).toBe(0);
  });
});
