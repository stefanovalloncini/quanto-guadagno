import type { TfrConfig } from "@/domain/data/types.ts";
import { round } from "./_math.ts";

export interface TfrYear {
  readonly year: number;
  readonly quota: number;
  readonly revaluation: number; // net of imposta sostitutiva
  readonly stock: number;
}

export interface TfrProjection {
  readonly annualQuota: number;
  readonly totalQuote: number;
  readonly totalRevaluation: number; // net of the 17% substitute tax
  readonly totalRevaluationTax: number;
  readonly finalStock: number;
  readonly schedule: ReadonlyArray<TfrYear>;
}

// Accumulated TFR over a number of years. Each year a quota of RAL/13.5 is set
// aside (Art. 2120 c.c.); the existing stock is revalued by 1.5% fixed + 75% of
// the ISTAT FOI inflation, net of the 17% imposta sostitutiva (DL 47/2014). The
// current year's quota is not revalued until the following year. This is the
// accumulated severance before the final tassazione separata at payout.
export function projectTfr(
  ral: number,
  years: number,
  inflationRate: number,
  cfg: TfrConfig,
): TfrProjection {
  const quota = ral > 0 ? ral / cfg.accrualDivisor : 0;
  const revaluationRate = cfg.fixedRevaluationRate + cfg.inflationPercentage * inflationRate;
  const netRevaluationFactor = 1 - cfg.revaluationTaxRate;

  const schedule: TfrYear[] = [];
  let stock = 0;
  let totalRevaluationGross = 0;

  const n = Math.max(0, Math.floor(years));
  for (let y = 1; y <= n; y++) {
    const grossRevaluation = stock * revaluationRate;
    const netRevaluation = grossRevaluation * netRevaluationFactor;
    totalRevaluationGross += grossRevaluation;
    stock += quota + netRevaluation;
    schedule.push({
      year: y,
      quota: round(quota),
      revaluation: round(netRevaluation),
      stock: round(stock),
    });
  }

  const totalRevaluationTax = totalRevaluationGross * cfg.revaluationTaxRate;
  return {
    annualQuota: round(quota),
    totalQuote: round(quota * n),
    totalRevaluation: round(totalRevaluationGross - totalRevaluationTax),
    totalRevaluationTax: round(totalRevaluationTax),
    finalStock: round(stock),
    schedule,
  };
}
