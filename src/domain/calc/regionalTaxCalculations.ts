import type { Region, RegionCode } from "@/domain/data/types.ts";
import { REGIONS } from "@/domain/data/regions.ts";
import { applyProgressiveBrackets } from "./irpef.ts";

export function calculateRegionalTax(taxableIncome: number, region: Region): number {
  if (region.exemptionThreshold !== undefined && taxableIncome <= region.exemptionThreshold) {
    return 0;
  }
  return applyProgressiveBrackets(taxableIncome, region.taxBrackets);
}

export function getEffectiveRegionalRate(taxableIncome: number, region: Region): number {
  if (taxableIncome <= 0) return 0;
  return calculateRegionalTax(taxableIncome, region) / taxableIncome;
}

export function calculateLocalTaxes(
  taxableIncome: number,
  regionCode: RegionCode,
  municipalTaxRate: number,
): {
  readonly regionalTax: number;
  readonly regionalTaxRate: number;
  readonly municipalTax: number;
} {
  const region = REGIONS[regionCode];
  const regionalTax = calculateRegionalTax(taxableIncome, region);
  const regionalTaxRate = getEffectiveRegionalRate(taxableIncome, region);

  return {
    regionalTax,
    regionalTaxRate,
    municipalTax: taxableIncome * municipalTaxRate,
  };
}
