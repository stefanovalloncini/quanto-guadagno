import { useCallback, useMemo, useState } from "react";
import { calculateTredicesima, type TredicesimaResult } from "@/domain/calc";
import { getTaxConfig, type SupportedYear } from "@/domain/data";

const STANDARD_INPS_RATE = 0.0919;

export interface TredicesimaFormState {
  readonly ral: number;
  readonly mensilita: 13 | 14;
  readonly taxYear: SupportedYear;
}

const DEFAULTS: TredicesimaFormState = {
  ral: 30_000,
  mensilita: 13,
  taxYear: 2026,
};

export interface TredicesimaCalculator {
  readonly state: TredicesimaFormState;
  readonly update: (patch: Partial<TredicesimaFormState>) => void;
  readonly result: TredicesimaResult;
}

export function useTredicesimaCalculator(): TredicesimaCalculator {
  const [state, setState] = useState<TredicesimaFormState>(DEFAULTS);

  const update = useCallback((patch: Partial<TredicesimaFormState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const result = useMemo(
    () =>
      calculateTredicesima({
        ral: state.ral,
        mensilita: state.mensilita,
        inpsRate: STANDARD_INPS_RATE,
        brackets: getTaxConfig(state.taxYear).irpefBrackets,
      }),
    [state],
  );

  return { state, update, result };
}
