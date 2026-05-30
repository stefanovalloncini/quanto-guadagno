import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  calculateApprenticeship,
  DEFAULT_APPRENTICESHIP_PROGRESSION,
  type ApprenticeshipBreakdown,
} from "@/domain/calc";
import { usePatchState } from "@/ui/shared/usePatchState.ts";

interface FormState {
  readonly targetGrossAnnual: number;
  readonly years: number;
}

const DEFAULTS: FormState = {
  targetGrossAnnual: 28_000,
  years: 3,
};

const MAX_TARGET = 1_000_000;

export interface ApprenticeshipCalculator {
  readonly state: FormState;
  readonly setTarget: (n: number) => void;
  readonly setYears: (n: number) => void;
  readonly result: ApprenticeshipBreakdown;
}

export function useApprenticeshipCalculator(): ApprenticeshipCalculator {
  const [params] = useSearchParams();
  const [state, update] = usePatchState<FormState>(() => {
    const lordoRaw = params.get("lordo");
    const lordo = lordoRaw !== null ? Number(lordoRaw) : NaN;
    if (Number.isFinite(lordo) && lordo > 0) {
      return { ...DEFAULTS, targetGrossAnnual: Math.min(Math.floor(lordo), MAX_TARGET) };
    }
    return DEFAULTS;
  });

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
    setTarget: (targetGrossAnnual) => update({ targetGrossAnnual }),
    setYears: (years) => update({ years }),
    result,
  };
}
