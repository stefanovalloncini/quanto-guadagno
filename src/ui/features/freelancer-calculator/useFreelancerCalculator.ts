import { useMemo, useState } from "react";
import {
  calculateForfettarioBreakdown,
  type ForfettarioBreakdown,
  type GestioneSeparataKind,
} from "@/domain/calc";
import { getFreelancerConfig, type FreelancerYear } from "@/domain/data";

interface FormState {
  readonly revenue: number;
  readonly profitabilityCoefficientPercent: number;
  readonly isStartup: boolean;
  readonly inpsKind: GestioneSeparataKind;
  readonly taxYear: FreelancerYear;
}

const DEFAULTS: FormState = {
  revenue: 50_000,
  profitabilityCoefficientPercent: 78,
  isStartup: false,
  inpsKind: "full",
  taxYear: 2026,
};

export interface FreelancerCalculator {
  readonly state: FormState;
  readonly setRevenue: (n: number) => void;
  readonly setCoefficient: (n: number) => void;
  readonly setStartup: (v: boolean) => void;
  readonly setInpsKind: (v: GestioneSeparataKind) => void;
  readonly setTaxYear: (year: FreelancerYear) => void;
  readonly result: ForfettarioBreakdown;
}

export function useFreelancerCalculator(): FreelancerCalculator {
  const [state, setState] = useState<FormState>(DEFAULTS);

  const result = useMemo(
    () =>
      calculateForfettarioBreakdown(
        {
          revenue: state.revenue,
          profitabilityCoefficient: state.profitabilityCoefficientPercent / 100,
          isStartup: state.isStartup,
          inpsKind: state.inpsKind,
        },
        getFreelancerConfig(state.taxYear).forfettario,
      ),
    [state],
  );

  return {
    state,
    setRevenue: (revenue) => setState((s) => ({ ...s, revenue })),
    setCoefficient: (profitabilityCoefficientPercent) =>
      setState((s) => ({ ...s, profitabilityCoefficientPercent })),
    setStartup: (isStartup) => setState((s) => ({ ...s, isStartup })),
    setInpsKind: (inpsKind) => setState((s) => ({ ...s, inpsKind })),
    setTaxYear: (taxYear) => setState((s) => ({ ...s, taxYear })),
    result,
  };
}
