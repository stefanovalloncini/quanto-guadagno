import { describe, it, expect } from "vitest";
import {
  calculateDependentsDeduction,
  calculateExpenseDeduction,
} from "@/domain/calc/deductionCalculations.ts";
import { SHARED_DEPENDENTS_DEDUCTION, SHARED_EXPENSE_DEDUCTIONS } from "@/domain/data/shared.ts";

describe("calculateDependentsDeduction", () => {
  it("returns 0 with no dependents", () => {
    expect(calculateDependentsDeduction(40_000, undefined, SHARED_DEPENDENTS_DEDUCTION)).toBe(0);
  });

  it("applies childOver21 deduction at income below phase-out start (95k)", () => {
    // One child over 21 at 40k income — full deduction, no phase-out
    const result = calculateDependentsDeduction(
      40_000,
      { hasSpouse: false, childrenOver21: 1, otherDependents: 0 },
      SHARED_DEPENDENTS_DEDUCTION,
    );
    expect(result).toBeGreaterThan(0);
    expect(result).toBe(SHARED_DEPENDENTS_DEDUCTION.childOver21Deduction);
  });

  it("phases out child deduction above 95k income", () => {
    const fullDeduction = calculateDependentsDeduction(
      40_000,
      { hasSpouse: false, childrenOver21: 1, otherDependents: 0 },
      SHARED_DEPENDENTS_DEDUCTION,
    );
    const reducedDeduction = calculateDependentsDeduction(
      110_000,
      { hasSpouse: false, childrenOver21: 1, otherDependents: 0 },
      SHARED_DEPENDENTS_DEDUCTION,
    );
    expect(reducedDeduction).toBeLessThan(fullDeduction);
    expect(reducedDeduction).toBeGreaterThan(0);
  });

  it("zero child deduction at 120k (end of phase-out)", () => {
    const result = calculateDependentsDeduction(
      120_000,
      { hasSpouse: false, childrenOver21: 1, otherDependents: 0 },
      SHARED_DEPENDENTS_DEDUCTION,
    );
    expect(result).toBe(0);
  });

  it("adds other dependents deduction", () => {
    const result = calculateDependentsDeduction(
      40_000,
      { hasSpouse: false, childrenOver21: 0, otherDependents: 2 },
      SHARED_DEPENDENTS_DEDUCTION,
    );
    expect(result).toBe(SHARED_DEPENDENTS_DEDUCTION.otherFamilyDeduction * 2);
  });
});

describe("calculateExpenseDeduction", () => {
  it("returns 0 with no expenses", () => {
    expect(calculateExpenseDeduction(undefined, SHARED_EXPENSE_DEDUCTIONS)).toBe(0);
  });

  it("applies 19% to medical expenses above the floor", () => {
    const floor = SHARED_EXPENSE_DEDUCTIONS.medicalExpenseFloor;
    const medical = floor + 1000;
    const result = calculateExpenseDeduction(
      { mortgageInterest: 0, medicalExpenses: medical, otherDeductions: 0 },
      SHARED_EXPENSE_DEDUCTIONS,
    );
    expect(result).toBeCloseTo(1000 * SHARED_EXPENSE_DEDUCTIONS.medicalDeductionRate, 2);
  });

  it("returns 0 for medical expenses at or below the floor", () => {
    const floor = SHARED_EXPENSE_DEDUCTIONS.medicalExpenseFloor;
    const result = calculateExpenseDeduction(
      { mortgageInterest: 0, medicalExpenses: floor, otherDeductions: 0 },
      SHARED_EXPENSE_DEDUCTIONS,
    );
    expect(result).toBe(0);
  });

  it("caps mortgage interest at maxMortgageInterest", () => {
    const max = SHARED_EXPENSE_DEDUCTIONS.maxMortgageInterest;
    const aboveMax = calculateExpenseDeduction(
      { mortgageInterest: max + 5000, medicalExpenses: 0, otherDeductions: 0 },
      SHARED_EXPENSE_DEDUCTIONS,
    );
    const atMax = calculateExpenseDeduction(
      { mortgageInterest: max, medicalExpenses: 0, otherDeductions: 0 },
      SHARED_EXPENSE_DEDUCTIONS,
    );
    expect(aboveMax).toBe(atMax);
  });
});
