import { useMemo } from "react";
import { compareSalaries, type SalaryComparison } from "@/domain/calc";
import type { PaymentFrequency } from "@/domain/calc";
import { LATEST_SUPPORTED_YEAR, type SupportedYear, type RegionCode } from "@/domain/data";
import { usePatchState } from "@/ui/shared/usePatchState.ts";

export interface ComparisonFormState {
  readonly ralA: number;
  readonly ralB: number;
  readonly taxYear: SupportedYear;
  readonly regionCode: RegionCode;
  readonly municipalTaxRate: number;
  readonly paymentFrequency: PaymentFrequency;
}

const DEFAULTS: ComparisonFormState = {
  ralA: 30_000,
  ralB: 35_000,
  taxYear: LATEST_SUPPORTED_YEAR,
  regionCode: "lombardia",
  municipalTaxRate: 0.008,
  paymentFrequency: 13,
};

export interface ComparisonCalculator {
  readonly state: ComparisonFormState;
  readonly update: (patch: Partial<ComparisonFormState>) => void;
  readonly result: SalaryComparison;
}

export function useComparisonCalculator(): ComparisonCalculator {
  const [state, update] = usePatchState<ComparisonFormState>(DEFAULTS);

  const result = useMemo(() => {
    const shared = {
      taxYear: state.taxYear,
      regionCode: state.regionCode,
      municipalTaxRate: state.municipalTaxRate,
      paymentFrequency: state.paymentFrequency,
    };
    return compareSalaries(
      { grossAnnual: state.ralA, ...shared },
      { grossAnnual: state.ralB, ...shared },
    );
  }, [state]);

  return { state, update, result };
}
