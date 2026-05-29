import { describe, it, expect } from "vitest";
import { calculateInpsExemption2024 } from "./inpsExemption2024.ts";
import { getTaxConfig } from "@/domain/data";

// Esonero contributivo, valido solo per il 2024 (L. 213/2023). 2025/2026 = null.
const CFG = getTaxConfig(2024).inpsExemption2024;
if (!CFG) throw new Error("the 2024 config must define inpsExemption2024");

describe("calculateInpsExemption2024", () => {
  it("RAL 20.000 € (mensile ≈ 1.667 ≤ 1.923) → 7% = 1.400 €", () => {
    expect(calculateInpsExemption2024(20_000, CFG)).toBeCloseTo(1400, 2);
  });

  it("RAL 30.000 € (mensile 2.500 ≤ 2.692) → 6% = 1.800 €", () => {
    expect(calculateInpsExemption2024(30_000, CFG)).toBeCloseTo(1800, 2);
  });

  it("RAL 36.000 € (mensile 3.000 > 2.692) → nessun esonero", () => {
    expect(calculateInpsExemption2024(36_000, CFG)).toBe(0);
  });

  it("RAL non positiva → 0", () => {
    expect(calculateInpsExemption2024(0, CFG)).toBe(0);
  });
});
