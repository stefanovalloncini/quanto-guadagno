import { describe, it, expect } from "vitest";
import { calculateDependentsDeduction } from "./deductionCalculations.ts";
import { SHARED_DEPENDENTS_DEDUCTION } from "@/domain/data";

const CFG = SHARED_DEPENDENTS_DEDUCTION;

function dependents(otherDependents: number) {
  return { hasSpouse: false, childrenOver21: 0, otherDependents };
}

describe("calculateDependentsDeduction — altri familiari (TUIR art. 12 c.4-bis)", () => {
  it("1 altro familiare, reddito 0 → 750 € pieno", () => {
    const r = calculateDependentsDeduction(0, dependents(1), CFG);
    expect(r).toBeCloseTo(750, 2);
  });

  it("1 altro familiare, reddito 40.000 → 375 € (50% phase-out)", () => {
    const r = calculateDependentsDeduction(40_000, dependents(1), CFG);
    expect(r).toBeCloseTo(375, 2);
  });

  it("1 altro familiare, reddito 60.000 → 187,5 € (25% residuo)", () => {
    const r = calculateDependentsDeduction(60_000, dependents(1), CFG);
    expect(r).toBeCloseTo(750 * (20_000 / 80_000), 2);
  });

  it("1 altro familiare, reddito 80.000 → 0", () => {
    const r = calculateDependentsDeduction(80_000, dependents(1), CFG);
    expect(r).toBeCloseTo(0, 2);
  });

  it("1 altro familiare, reddito 100.000 → 0 (oltre soglia)", () => {
    const r = calculateDependentsDeduction(100_000, dependents(1), CFG);
    expect(r).toBe(0);
  });

  it("2 altri familiari, reddito 30.000 → 937,5 €", () => {
    const r = calculateDependentsDeduction(30_000, dependents(2), CFG);
    expect(r).toBeCloseTo(2 * 750 * (50_000 / 80_000), 2);
  });

  it("0 altri familiari → 0 indipendentemente dal reddito", () => {
    expect(calculateDependentsDeduction(30_000, dependents(0), CFG)).toBe(0);
    expect(calculateDependentsDeduction(0, dependents(0), CFG)).toBe(0);
  });
});
