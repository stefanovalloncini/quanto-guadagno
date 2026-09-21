import type { Region, RegionCode } from "@/domain/data/types.ts";
import { REGIONS } from "@/domain/data/regions.ts";
import { applyProgressiveBrackets, getMarginalRate } from "./irpef.ts";

function deductionFor(taxableIncome: number, region: Region): number {
  const deduction = region.taxDeduction;
  if (deduction === undefined || taxableIncome > deduction.incomeCeiling) return 0;
  return deduction.amount;
}

export function calculateRegionalTax(taxableIncome: number, region: Region): number {
  if (region.exemptionThreshold !== undefined && taxableIncome <= region.exemptionThreshold) {
    return 0;
  }
  const tax = applyProgressiveBrackets(taxableIncome, region.taxBrackets);
  return Math.max(0, tax - deductionFor(taxableIncome, region));
}

export function getEffectiveRegionalRate(taxableIncome: number, region: Region): number {
  if (taxableIncome <= 0) return 0;
  return calculateRegionalTax(taxableIncome, region) / taxableIncome;
}

export function getRegionalMarginalRate(taxableIncome: number, region: Region): number {
  if (region.exemptionThreshold !== undefined && taxableIncome <= region.exemptionThreshold) {
    return 0;
  }
  // While the detrazione still covers the whole tax, another euro of income
  // costs nothing. The jump at the ceiling is a cliff, not a marginal rate.
  const gross = applyProgressiveBrackets(taxableIncome, region.taxBrackets);
  if (gross < deductionFor(taxableIncome, region)) return 0;
  return getMarginalRate(taxableIncome, region.taxBrackets);
}

export function calculateLocalTaxes(
  taxableIncome: number,
  regionCode: RegionCode,
  municipalTaxRate: number,
): {
  readonly regionalTax: number;
  readonly regionalTaxRate: number;
  readonly regionalMarginalRate: number;
  readonly municipalTax: number;
} {
  const region = REGIONS[regionCode];
  const regionalTax = calculateRegionalTax(taxableIncome, region);
  const regionalTaxRate = getEffectiveRegionalRate(taxableIncome, region);
  const regionalMarginalRate = getRegionalMarginalRate(taxableIncome, region);

  return {
    regionalTax,
    regionalTaxRate,
    regionalMarginalRate,
    municipalTax: taxableIncome * municipalTaxRate,
  };
}
