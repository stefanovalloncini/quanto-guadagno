import { describe, it, expect } from "vitest";
import {
  calculateDependentsDeduction,
  calculateExpenseDeduction,
  calculatePensionFundDeduction,
} from "./deductionCalculations.ts";
import { SHARED_DEPENDENTS_DEDUCTION, SHARED_EXPENSE_DEDUCTIONS } from "@/domain/data";

const CFG = SHARED_DEPENDENTS_DEDUCTION;

const EXP = SHARED_EXPENSE_DEDUCTIONS;

function expenses(pensionFund: number) {
  return { mortgageInterest: 0, medicalExpenses: 0, otherDeductions: 0, pensionFund };
}

// Previdenza complementare — onere deducibile, massimale €5.164,57 (D.Lgs. 252/2005).
describe("calculatePensionFundDeduction", () => {
  it("deduce l'intero versamento entro il massimale", () => {
    expect(calculatePensionFundDeduction(expenses(2000), EXP)).toBe(2000);
  });

  it("cap al massimale €5.164,57", () => {
    expect(calculatePensionFundDeduction(expenses(8000), EXP)).toBeCloseTo(5164.57, 2);
  });

  it("nessun versamento → 0", () => {
    expect(calculatePensionFundDeduction(expenses(0), EXP)).toBe(0);
    expect(calculatePensionFundDeduction(undefined, EXP)).toBe(0);
  });
});

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

function spouse(spouseIncome?: number) {
  return {
    hasSpouse: true,
    childrenOver21: 0,
    otherDependents: 0,
    ...(spouseIncome !== undefined && { spouseIncome }),
  };
}

// Detrazione per coniuge a carico — TUIR art. 12 c.1 (importi a fasce di reddito).
describe("calculateDependentsDeduction — coniuge a carico", () => {
  it("reddito fino a 15.000 → 800 €", () => {
    expect(calculateDependentsDeduction(12_000, spouse(), CFG)).toBe(800);
  });

  it("fascia intermedia (20.000) → 690 €", () => {
    expect(calculateDependentsDeduction(20_000, spouse(), CFG)).toBe(690);
  });

  it("picco della maggiorazione a 35.000 → 720 €", () => {
    expect(calculateDependentsDeduction(35_000, spouse(), CFG)).toBe(720);
  });

  it("oltre l'ultima fascia decresce linearmente verso zero", () => {
    expect(calculateDependentsDeduction(100_000, spouse(), CFG)).toBeCloseTo(345, 2);
    expect(calculateDependentsDeduction(120_000, spouse(), CFG)).toBe(0);
  });

  it("coniuge con reddito oltre il limite di carico → 0", () => {
    expect(calculateDependentsDeduction(20_000, spouse(3000), CFG)).toBe(0);
    expect(calculateDependentsDeduction(20_000, spouse(2000), CFG)).toBe(690);
  });
});

function children(childrenOver21: number) {
  return { hasSpouse: false, childrenOver21, otherDependents: 0 };
}

// Figli a carico oltre 21 anni — TUIR art. 12, phase-out tra 95.000 e 120.000.
describe("calculateDependentsDeduction — figli over 21", () => {
  it("950 € pieno fino a 95.000, per figlio", () => {
    expect(calculateDependentsDeduction(50_000, children(1), CFG)).toBe(950);
    expect(calculateDependentsDeduction(50_000, children(2), CFG)).toBe(1900);
  });

  it("decresce tra 95.000 e 120.000", () => {
    expect(calculateDependentsDeduction(107_500, children(1), CFG)).toBeCloseTo(475, 2);
  });

  it("azzerato a 120.000", () => {
    expect(calculateDependentsDeduction(120_000, children(1), CFG)).toBe(0);
  });
});

function expenseInput(mortgageInterest: number, medicalExpenses: number, otherDeductions: number) {
  return { mortgageInterest, medicalExpenses, otherDeductions };
}

// Detrazioni spese al 19% — TUIR art. 15.
describe("calculateExpenseDeduction", () => {
  it("interessi sul mutuo: 19% fino al tetto di 4.000 €", () => {
    expect(calculateExpenseDeduction(expenseInput(5000, 0, 0), EXP)).toBeCloseTo(760, 2);
    expect(calculateExpenseDeduction(expenseInput(2000, 0, 0), EXP)).toBeCloseTo(380, 2);
  });

  it("spese sanitarie: 19% sulla parte oltre la franchigia di 129,11 €", () => {
    expect(calculateExpenseDeduction(expenseInput(0, 1000, 0), EXP)).toBeCloseTo(
      (1000 - 129.11) * 0.19,
      2,
    );
    expect(calculateExpenseDeduction(expenseInput(0, 100, 0), EXP)).toBe(0);
  });

  it("altre detrazioni al 19%", () => {
    expect(calculateExpenseDeduction(expenseInput(0, 0, 1000), EXP)).toBeCloseTo(190, 2);
  });

  it("nessuna spesa → 0", () => {
    expect(calculateExpenseDeduction(undefined, EXP)).toBe(0);
  });
});
