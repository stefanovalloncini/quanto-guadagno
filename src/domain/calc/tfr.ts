export interface TfrConfig {
  readonly accrualDivisor: number;
  readonly fixedRevaluationRate: number;
  readonly inflationCoefficient: number;
  readonly revaluationTaxRate: number;
}

export const TFR_DEFAULT_CONFIG: TfrConfig = {
  accrualDivisor: 13.5,
  fixedRevaluationRate: 0.015,
  inflationCoefficient: 0.75,
  revaluationTaxRate: 0.17,
};

export interface TfrInput {
  readonly grossAnnual: number;
  readonly years: number;
  readonly annualInflation: number;
}

export interface TfrBreakdown {
  readonly grossAnnual: number;
  readonly years: number;
  readonly annualAccrual: number;
  readonly accruedTotal: number;
  readonly revaluationGross: number;
  readonly revaluationTax: number;
  readonly tfrNet: number;
}

const round = (n: number): number => Math.round(n * 100) / 100;

export function calculateTfr(input: TfrInput, cfg: TfrConfig = TFR_DEFAULT_CONFIG): TfrBreakdown {
  const grossAnnual = Math.max(0, input.grossAnnual);
  const years = Math.max(0, Math.floor(input.years));
  const annualAccrual = grossAnnual / cfg.accrualDivisor;
  const revaluationRate =
    cfg.fixedRevaluationRate + cfg.inflationCoefficient * input.annualInflation;

  let principal = 0;
  for (let i = 0; i < years; i += 1) {
    principal = principal * (1 + revaluationRate) + annualAccrual;
  }

  const principalNoRevaluation = annualAccrual * years;
  const revaluationGross = Math.max(0, principal - principalNoRevaluation);
  const revaluationTax = revaluationGross * cfg.revaluationTaxRate;
  const tfrNet = principal - revaluationTax;

  return {
    grossAnnual: round(grossAnnual),
    years,
    annualAccrual: round(annualAccrual),
    accruedTotal: round(principal),
    revaluationGross: round(revaluationGross),
    revaluationTax: round(revaluationTax),
    tfrNet: round(tfrNet),
  };
}
