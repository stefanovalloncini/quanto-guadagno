import type { YearTaxConfig } from "@/domain/calc/composer.ts";

export const TAX_CONFIG_2024: YearTaxConfig = {
  year: 2024,
  inps: {
    standardRate: 0.0919,
    aboveCeilingRate: 0.1019,
    ceiling: 55_008,
    massimale: 119_650,
  },
  irpefBrackets: [
    { min: 0, max: 28_000, rate: 0.23 },
    { min: 28_000, max: 50_000, rate: 0.35 },
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
  taxWedgeCut: null,
  inpsExemption2024: {
    brackets: [
      { maxMonthlyIncome: 1923, exemptionRate: 0.07 },
      { maxMonthlyIncome: 2692, exemptionRate: 0.06 },
    ],
  },
};
