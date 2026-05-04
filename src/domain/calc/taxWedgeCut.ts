export interface SommaAggiuntivaBracket {
  readonly maxIncome: number;
  readonly rate: number;
}

export interface DetrazioneAggiuntivaConfig {
  readonly maxDeduction: number;
  readonly fullDeductionThreshold: number;
  readonly phaseOutEnd: number;
}

export interface TaxWedgeCutConfig {
  readonly sommaAggiuntiva: ReadonlyArray<SommaAggiuntivaBracket>;
  readonly detrazioneAggiuntiva: DetrazioneAggiuntivaConfig;
}

export interface TaxWedgeCutResult {
  readonly sommaAggiuntiva: number;
  readonly detrazioneAggiuntiva: number;
  readonly total: number;
}

const linearPhaseOut = (value: number, start: number, end: number): number => {
  if (end === start) return 0;
  const span = end - start;
  return Math.max(0, Math.min(1, (end - value) / span));
};

export function calculateSommaAggiuntiva(taxableIncome: number, cfg: TaxWedgeCutConfig): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of cfg.sommaAggiuntiva) {
    if (taxableIncome <= bracket.maxIncome) return taxableIncome * bracket.rate;
  }
  return 0;
}

export function calculateDetrazioneAggiuntiva(
  taxableIncome: number,
  irpefGross: number,
  cfg: TaxWedgeCutConfig,
): number {
  if (irpefGross <= 0) return 0;
  const last = cfg.sommaAggiuntiva[cfg.sommaAggiuntiva.length - 1];
  if (!last) return 0;
  if (taxableIncome <= last.maxIncome) return 0;
  if (taxableIncome > cfg.detrazioneAggiuntiva.phaseOutEnd) return 0;

  const { maxDeduction, fullDeductionThreshold, phaseOutEnd } = cfg.detrazioneAggiuntiva;
  const deduction =
    taxableIncome <= fullDeductionThreshold
      ? maxDeduction
      : maxDeduction * linearPhaseOut(taxableIncome, fullDeductionThreshold, phaseOutEnd);

  return Math.min(deduction, irpefGross);
}

export function calculateTaxWedgeCut(
  taxableIncome: number,
  irpefGross: number,
  cfg: TaxWedgeCutConfig,
): TaxWedgeCutResult {
  const sommaAggiuntiva = calculateSommaAggiuntiva(taxableIncome, cfg);
  const detrazioneAggiuntiva = calculateDetrazioneAggiuntiva(taxableIncome, irpefGross, cfg);
  return {
    sommaAggiuntiva,
    detrazioneAggiuntiva,
    total: sommaAggiuntiva + detrazioneAggiuntiva,
  };
}
