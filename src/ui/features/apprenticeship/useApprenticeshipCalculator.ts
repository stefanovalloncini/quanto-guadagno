import { useMemo, useState } from "react";
import {
  calculateApprenticeship,
  DEFAULT_APPRENTICESHIP_PROGRESSION,
  type ApprenticeshipBreakdown,
} from "@/domain/calc";

interface FormState {
  readonly targetGrossAnnual: number;
  readonly years: number;
}

const DEFAULTS: FormState = {
  targetGrossAnnual: 28_000,
  years: 3,
};

export interface ApprenticeshipCalculator {
  readonly state: FormState;
  readonly setTarget: (n: number) => void;
  readonly setYears: (n: number) => void;
  readonly result: ApprenticeshipBreakdown;
}

export function useApprenticeshipCalculator(): ApprenticeshipCalculator {
  const [state, setState] = useState<FormState>(DEFAULTS);

  const result = useMemo(
    () =>
      calculateApprenticeship({
        ...state,
        progression: DEFAULT_APPRENTICESHIP_PROGRESSION,
      }),
    [state],
  );

  return {
    state,
    setTarget: (targetGrossAnnual) => setState((s) => ({ ...s, targetGrossAnnual })),
    setYears: (years) => setState((s) => ({ ...s, years })),
    result,
  };
}
