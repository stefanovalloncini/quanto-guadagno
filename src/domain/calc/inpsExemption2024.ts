export interface InpsExemptionBracket {
  readonly maxMonthlyIncome: number;
  readonly exemptionRate: number;
}

export interface InpsExemption2024Config {
  readonly brackets: ReadonlyArray<InpsExemptionBracket>;
}

const MONTHLY_DIVISOR = 12;

export function calculateInpsExemption2024(
  grossAnnual: number,
  cfg: InpsExemption2024Config,
): number {
  if (grossAnnual <= 0) return 0;
  const monthly = grossAnnual / MONTHLY_DIVISOR;

  for (const bracket of cfg.brackets) {
    if (monthly <= bracket.maxMonthlyIncome) {
      return grossAnnual * bracket.exemptionRate;
    }
  }
  return 0;
}
