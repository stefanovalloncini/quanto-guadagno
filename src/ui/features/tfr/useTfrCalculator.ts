import { useMemo } from "react";
import { projectTfr, type TfrProjection } from "@/domain/calc";
import { SHARED_TFR_CONFIG } from "@/domain/data";
import { usePatchState } from "@/ui/shared/usePatchState.ts";

export interface TfrFormState {
  readonly ral: number;
  readonly years: number;
  readonly inflationRate: number;
}

const DEFAULTS: TfrFormState = {
  ral: 30_000,
  years: 10,
  inflationRate: 0.02,
};

export interface TfrCalculator {
  readonly state: TfrFormState;
  readonly update: (patch: Partial<TfrFormState>) => void;
  readonly result: TfrProjection;
}

export function useTfrCalculator(): TfrCalculator {
  const [state, update] = usePatchState<TfrFormState>(DEFAULTS);

  const result = useMemo(
    () => projectTfr(state.ral, state.years, state.inflationRate, SHARED_TFR_CONFIG),
    [state],
  );

  return { state, update, result };
}
