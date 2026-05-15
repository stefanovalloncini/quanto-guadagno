import { useCallback, useMemo, useState } from "react";
import { calculateForfettario, type ForfettarioBreakdown } from "@/domain/calc";
import {
  ACTIVITY_COEFFICIENTS,
  type ActivityCategory,
  type SupportedYear,
  getTaxConfig,
} from "@/domain/data";

interface FormState {
  readonly revenue: number;
  readonly activity: ActivityCategory;
  readonly year: SupportedYear;
  readonly yearsOfActivity: number;
  readonly hasOtherPension: boolean;
  readonly employeeCosts: number;
}

const DEFAULTS: FormState = {
  revenue: 30_000,
  activity: "professionisti",
  year: 2026,
  yearsOfActivity: 1,
  hasOtherPension: false,
  employeeCosts: 0,
};

export interface ForfettarioCalculator {
  readonly state: FormState;
  readonly update: (patch: Partial<FormState>) => void;
  readonly result: ForfettarioBreakdown;
}

export function useForfettarioCalculator(): ForfettarioCalculator {
  const [state, setState] = useState<FormState>(DEFAULTS);

  const update = useCallback((patch: Partial<FormState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const result = useMemo(() => {
    const config = getTaxConfig(state.year);
    const coefficient = ACTIVITY_COEFFICIENTS[state.activity].coefficient;
    return calculateForfettario(
      {
        revenue: state.revenue,
        coefficient,
        yearsOfActivity: state.yearsOfActivity,
        hasOtherPension: state.hasOtherPension,
        employeeCosts: state.employeeCosts,
      },
      config.forfettario,
      config.gestioneSeparata,
    );
  }, [state]);

  return { state, update, result };
}
