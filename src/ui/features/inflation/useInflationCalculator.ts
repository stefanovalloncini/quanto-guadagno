import { useMemo } from "react";
import { adjustValueAcrossYears, cumulativeInflation } from "@/domain/calc";
import { FOI_INDEX, FOI_LATEST_YEAR } from "@/domain/data";
import { usePatchState } from "@/ui/shared/usePatchState.ts";

const YEARS: ReadonlyArray<number> = FOI_INDEX.map((p) => p.year);

export interface InflationFormState {
  readonly amount: number;
  readonly fromYear: number;
  readonly toYear: number;
}

const DEFAULTS: InflationFormState = {
  amount: 1000,
  fromYear: 2015,
  toYear: FOI_LATEST_YEAR,
};

export interface InflationResult {
  readonly nominal: number;
  readonly adjusted: number;
  readonly factor: number;
  readonly cumulativeRate: number;
  readonly fromYear: number;
  readonly toYear: number;
}

export interface InflationCalculator {
  readonly state: InflationFormState;
  readonly years: ReadonlyArray<number>;
  readonly update: (patch: Partial<InflationFormState>) => void;
  readonly result: InflationResult;
}

export function useInflationCalculator(): InflationCalculator {
  const [state, update] = usePatchState<InflationFormState>(DEFAULTS);

  const result = useMemo<InflationResult>(() => {
    const adjusted = adjustValueAcrossYears(state.amount, state.fromYear, state.toYear);
    const rate = cumulativeInflation(state.fromYear, state.toYear);
    return {
      nominal: state.amount,
      adjusted: adjusted?.adjusted ?? state.amount,
      factor: adjusted?.factor ?? 1,
      cumulativeRate: rate ?? 0,
      fromYear: state.fromYear,
      toYear: state.toYear,
    };
  }, [state]);

  return { state, years: YEARS, update, result };
}
