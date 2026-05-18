import { useCallback, useMemo, useState } from "react";
import { calculateForfettario, type ForfettarioBreakdown, type Gestion } from "@/domain/calc";
import {
  ACTIVITY_COEFFICIENTS,
  type ActivityCategory,
  type SupportedYear,
  getAutonomiConfig,
  getTaxConfig,
} from "@/domain/data";

export interface ForfettarioFormState {
  readonly revenue: number;
  readonly activity: ActivityCategory;
  readonly year: SupportedYear;
  readonly yearsOfActivity: number;
  readonly hasOtherPension: boolean;
  readonly employeeCosts: number;
  readonly gestion: Gestion;
  readonly mesiAttivita: number;
  readonly isConcurrentFullTimeEmployee: boolean;
  readonly concurrentEmployeeRal: number;
  readonly forfettarioDiscount35: boolean;
  readonly newRegistrantDiscount50: boolean;
  readonly cassaManualAmount: number;
}

const DEFAULTS: ForfettarioFormState = {
  revenue: 30_000,
  activity: "professionisti",
  year: 2026,
  yearsOfActivity: 1,
  hasOtherPension: false,
  employeeCosts: 0,
  gestion: "gestione-separata",
  mesiAttivita: 12,
  isConcurrentFullTimeEmployee: false,
  concurrentEmployeeRal: 0,
  forfettarioDiscount35: false,
  newRegistrantDiscount50: false,
  cassaManualAmount: 0,
};

export interface ForfettarioCalculator {
  readonly state: ForfettarioFormState;
  readonly update: (patch: Partial<ForfettarioFormState>) => void;
  readonly result: ForfettarioBreakdown;
}

export function useForfettarioCalculator(): ForfettarioCalculator {
  const [state, setState] = useState<ForfettarioFormState>(DEFAULTS);

  const update = useCallback((patch: Partial<ForfettarioFormState>) => {
    setState((s) => {
      const next = { ...s, ...patch };
      if (patch.forfettarioDiscount35 === true) {
        return { ...next, newRegistrantDiscount50: false };
      }
      if (patch.newRegistrantDiscount50 === true) {
        return { ...next, forfettarioDiscount35: false };
      }
      return next;
    });
  }, []);

  const result = useMemo(() => {
    const config = getTaxConfig(state.year);
    const autonomi = getAutonomiConfig(state.year);
    const coefficient = ACTIVITY_COEFFICIENTS[state.activity].coefficient;
    return calculateForfettario(
      {
        revenue: state.revenue,
        coefficient,
        yearsOfActivity: state.yearsOfActivity,
        hasOtherPension: state.hasOtherPension,
        employeeCosts: state.employeeCosts,
        gestion: state.gestion,
        mesiAttivita: state.mesiAttivita,
        isConcurrentFullTimeEmployee: state.isConcurrentFullTimeEmployee,
        concurrentEmployeeRal: state.concurrentEmployeeRal,
        forfettarioDiscount35: state.forfettarioDiscount35,
        newRegistrantDiscount50: state.newRegistrantDiscount50,
        cassaManualAmount: state.cassaManualAmount,
        autonomi,
      },
      config.forfettario,
      config.gestioneSeparata,
    );
  }, [state]);

  return { state, update, result };
}
