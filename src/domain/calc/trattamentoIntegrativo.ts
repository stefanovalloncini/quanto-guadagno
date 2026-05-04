export interface TrattamentoIntegrativoConfig {
  readonly maxAnnualBonus: number;
  readonly fullBonusThreshold: number;
  readonly partialBonusThreshold: number;
}

export function calculateTrattamentoIntegrativo(
  taxableIncome: number,
  irpefGross: number,
  totalDeductions: number,
  cfg: TrattamentoIntegrativoConfig,
): number {
  if (taxableIncome <= 0) return 0;
  if (taxableIncome > cfg.partialBonusThreshold) return 0;
  if (taxableIncome <= cfg.fullBonusThreshold) return cfg.maxAnnualBonus;

  const surplus = totalDeductions - irpefGross;
  if (surplus <= 0) return 0;
  return Math.min(cfg.maxAnnualBonus, surplus);
}
