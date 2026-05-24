import { calculateSalaryBreakdown, type SalaryBreakdown, type SalaryInput } from "@/domain/calc";
import { SUPPORTED_YEARS, type SupportedYear } from "@/domain/data";
import type { SalaryEntry } from "./salaryHistory.ts";

function isSupportedYear(year: number): year is SupportedYear {
  return (SUPPORTED_YEARS as ReadonlyArray<number>).includes(year);
}

export function buildSalaryInput(entry: SalaryEntry): SalaryInput | null {
  if (!isSupportedYear(entry.year)) return null;
  const s = entry.settings;
  return {
    grossAnnual: entry.grossAnnual,
    taxYear: entry.year,
    regionCode: s.regionCode,
    municipalTaxRate: s.municipalTaxRate,
    contractType: s.contractType,
    paymentFrequency: s.paymentFrequency,
    ...(s.companySize !== undefined ? { companySize: s.companySize } : {}),
    ...(s.dependents !== undefined ? { dependents: s.dependents } : {}),
  };
}

export function computeHistoryNet(entry: SalaryEntry): SalaryBreakdown | null {
  const input = buildSalaryInput(entry);
  if (input === null) return null;
  return calculateSalaryBreakdown(input);
}
