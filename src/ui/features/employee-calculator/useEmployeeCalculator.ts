import { useMemo, useState } from "react";
import { calculateSalaryBreakdown, type SalaryBreakdown } from "@/domain/calc";
import { getTaxConfig, type SupportedYear } from "@/domain/data";

interface FormState {
  readonly grossAnnual: number;
  readonly regionalRatePercent: number;
  readonly municipalRatePercent: number;
  readonly taxYear: SupportedYear;
}

const DEFAULTS: FormState = {
  grossAnnual: 30_000,
  regionalRatePercent: 1.73,
  municipalRatePercent: 0.8,
  taxYear: 2026,
};

export interface EmployeeCalculator {
  readonly state: FormState;
  readonly setGross: (n: number) => void;
  readonly setRegionalPercent: (n: number) => void;
  readonly setMunicipalPercent: (n: number) => void;
  readonly setTaxYear: (year: SupportedYear) => void;
  readonly result: SalaryBreakdown;
}

export function useEmployeeCalculator(): EmployeeCalculator {
  const [state, setState] = useState<FormState>(DEFAULTS);

  const result = useMemo(
    () =>
      calculateSalaryBreakdown(
        {
          grossAnnual: state.grossAnnual,
          regionalRate: state.regionalRatePercent / 100,
          municipalRate: state.municipalRatePercent / 100,
        },
        getTaxConfig(state.taxYear),
      ),
    [state],
  );

  return {
    state,
    setGross: (grossAnnual) => setState((s) => ({ ...s, grossAnnual })),
    setRegionalPercent: (regionalRatePercent) => setState((s) => ({ ...s, regionalRatePercent })),
    setMunicipalPercent: (municipalRatePercent) =>
      setState((s) => ({ ...s, municipalRatePercent })),
    setTaxYear: (taxYear) => setState((s) => ({ ...s, taxYear })),
    result,
  };
}
