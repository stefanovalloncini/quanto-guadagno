import { useCallback, useMemo, useState } from "react";
import { calculateNaspi, type NaspiBreakdown } from "@/domain/calc";
import { getNaspiConfig, type SupportedYear } from "@/domain/data";

export interface NaspiFormState {
  readonly grossPay4Years: number;
  readonly weeksContribution4Years: number;
  readonly age: number;
  readonly voluntaryResignationInLast12Months: boolean;
  readonly weeksAfterVoluntaryResignation: number;
  readonly year: SupportedYear;
}

const DEFAULTS: NaspiFormState = {
  grossPay4Years: 100_000,
  weeksContribution4Years: 200,
  age: 40,
  voluntaryResignationInLast12Months: false,
  weeksAfterVoluntaryResignation: 0,
  year: 2026,
};

export interface NaspiCalculator {
  readonly state: NaspiFormState;
  readonly update: (patch: Partial<NaspiFormState>) => void;
  readonly result: NaspiBreakdown;
}

export function useNaspiCalculator(): NaspiCalculator {
  const [state, setState] = useState<NaspiFormState>(DEFAULTS);
  const update = useCallback((patch: Partial<NaspiFormState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);
  const result = useMemo(
    () =>
      calculateNaspi({
        grossPay4Years: state.grossPay4Years,
        weeksContribution4Years: state.weeksContribution4Years,
        age: state.age,
        voluntaryResignationInLast12Months: state.voluntaryResignationInLast12Months,
        weeksAfterVoluntaryResignation: state.weeksAfterVoluntaryResignation,
        config: getNaspiConfig(state.year),
      }),
    [state],
  );
  return { state, update, result };
}
