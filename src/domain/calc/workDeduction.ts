export interface WorkDeductionConfig {
  readonly thresholds: readonly [number, number, number];
  readonly baseDeduction: number;
  readonly additionalDeduction: number;
  readonly midBracketFixed: number;
}

const MID_BRACKET_BONUS_LOWER = 25_000;
const MID_BRACKET_BONUS_UPPER = 35_000;
const MID_BRACKET_BONUS = 65;

export function calculateWorkDeduction(taxableIncome: number, cfg: WorkDeductionConfig): number {
  if (taxableIncome <= 0) return 0;

  const [t1, t2, t3] = cfg.thresholds;
  let deduction: number;

  if (taxableIncome <= t1) {
    deduction = cfg.baseDeduction;
  } else if (taxableIncome <= t2) {
    const coef = (t2 - taxableIncome) / (t2 - t1);
    deduction = cfg.midBracketFixed + cfg.additionalDeduction * coef;
  } else if (taxableIncome <= t3) {
    const coef = (t3 - taxableIncome) / (t3 - t2);
    deduction = cfg.midBracketFixed * coef;
  } else {
    deduction = 0;
  }

  if (taxableIncome > MID_BRACKET_BONUS_LOWER && taxableIncome <= MID_BRACKET_BONUS_UPPER) {
    deduction += MID_BRACKET_BONUS;
  }

  return deduction;
}
