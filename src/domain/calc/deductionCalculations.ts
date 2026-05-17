import type { DependentsDeductionConfig, ExpenseDeductionsConfig } from "@/domain/data/types.ts";
import { clamp, linearPhaseOut } from "./_math.ts";

// Phase-out thresholds for dependents deductions (Art. 12 TUIR).
const SPOUSE_PHASE_OUT_RANGE = 40_000;
const CHILD_PHASE_OUT_START = 95_000;
const CHILD_PHASE_OUT_END = 120_000;

export interface DependentsInput {
  readonly hasSpouse: boolean;
  readonly spouseIncome?: number;
  readonly childrenOver21: number;
  readonly otherDependents: number;
}

export interface ExpenseDeductionsInput {
  readonly mortgageInterest: number;
  readonly medicalExpenses: number;
  readonly otherDeductions: number;
}

function calculateSpouseDeduction(
  taxableIncome: number,
  spouseIncome: number | undefined,
  cfg: DependentsDeductionConfig,
): number {
  if (spouseIncome !== undefined && spouseIncome > cfg.dependentIncomeLimit) {
    return 0;
  }

  for (const threshold of cfg.spouseThresholds) {
    if (taxableIncome <= threshold.income) {
      return threshold.deduction;
    }
  }

  const last = cfg.spouseThresholds[cfg.spouseThresholds.length - 1];
  if (!last) return 0;

  const reductionFactor = clamp(1 - (taxableIncome - last.income) / SPOUSE_PHASE_OUT_RANGE, 0, 1);
  return last.deduction * reductionFactor;
}

export function calculateDependentsDeduction(
  taxableIncome: number,
  dependents: DependentsInput | undefined,
  cfg: DependentsDeductionConfig,
): number {
  if (!dependents) return 0;

  let total = 0;

  if (dependents.hasSpouse) {
    total += calculateSpouseDeduction(taxableIncome, dependents.spouseIncome, cfg);
  }

  if (dependents.childrenOver21 > 0) {
    const rate = linearPhaseOut(taxableIncome, CHILD_PHASE_OUT_START, CHILD_PHASE_OUT_END);
    total += dependents.childrenOver21 * cfg.childOver21Deduction * rate;
  }

  if (dependents.otherDependents > 0) {
    total += dependents.otherDependents * cfg.otherFamilyDeduction;
  }

  return total;
}

export function calculateExpenseDeduction(
  expenses: ExpenseDeductionsInput | undefined,
  cfg: ExpenseDeductionsConfig,
): number {
  if (!expenses) return 0;

  let total = 0;

  if (expenses.mortgageInterest > 0) {
    const deductible = Math.min(expenses.mortgageInterest, cfg.maxMortgageInterest);
    total += deductible * cfg.standardDeductionRate;
  }

  if (expenses.medicalExpenses > cfg.medicalExpenseFloor) {
    total += (expenses.medicalExpenses - cfg.medicalExpenseFloor) * cfg.medicalDeductionRate;
  }

  if (expenses.otherDeductions > 0) {
    total += expenses.otherDeductions * cfg.standardDeductionRate;
  }

  return total;
}
