import { useMemo } from "react";
import { calculateSalaryBreakdown, type SalaryBreakdown, type ContractType } from "@/domain/calc";
import { type SupportedYear } from "@/domain/data";
import { usePatchState } from "@/ui/shared/usePatchState.ts";

export interface EmployerCostFormState {
  readonly grossAnnual: number;
  readonly taxYear: SupportedYear;
  readonly contractType: ContractType;
}

const DEFAULTS: EmployerCostFormState = {
  grossAnnual: 30_000,
  taxYear: 2026,
  contractType: "indeterminato",
};

export interface EmployerCostCalculator {
  readonly state: EmployerCostFormState;
  readonly update: (patch: Partial<EmployerCostFormState>) => void;
  readonly result: SalaryBreakdown;
}

// Employer cost does not depend on region or municipality (those are
// employee-side surcharges), so the comparison fixes them to neutral values.
export function useEmployerCostCalculator(): EmployerCostCalculator {
  const [state, update] = usePatchState<EmployerCostFormState>(DEFAULTS);

  const result = useMemo(
    () =>
      calculateSalaryBreakdown({
        grossAnnual: state.grossAnnual,
        taxYear: state.taxYear,
        regionCode: "lombardia",
        municipalTaxRate: 0,
        contractType: state.contractType,
      }),
    [state],
  );

  return { state, update, result };
}
