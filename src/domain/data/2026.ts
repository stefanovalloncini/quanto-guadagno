import type { YearTaxConfig } from "@/domain/calc/composer.ts";

export const TAX_CONFIG_2026: YearTaxConfig = {
  year: 2026,
  inps: {
    standardRate: 0.0919,
    aboveCeilingRate: 0.1019,
    ceiling: 56_224,
    massimale: 122_295,
  },
  irpefBrackets: [
    { min: 0, max: 28_000, rate: 0.23 },
    { min: 28_000, max: 50_000, rate: 0.33 },
    { min: 50_000, max: null, rate: 0.43 },
  ],
  workDeduction: {
    thresholds: [15_000, 28_000, 50_000],
    baseDeduction: 1955,
    additionalDeduction: 1190,
    midBracketFixed: 1910,
  },
  trattamentoIntegrativo: {
    maxAnnualBonus: 1200,
    fullBonusThreshold: 15_000,
    partialBonusThreshold: 28_000,
  },
  taxWedgeCut: {
    sommaAggiuntiva: [
      { maxIncome: 8500, rate: 0.071 },
      { maxIncome: 15_000, rate: 0.053 },
      { maxIncome: 20_000, rate: 0.048 },
    ],
    detrazioneAggiuntiva: {
      maxDeduction: 1000,
      fullDeductionThreshold: 32_000,
      phaseOutEnd: 40_000,
    },
  },
  inpsExemption2024: null,
};
