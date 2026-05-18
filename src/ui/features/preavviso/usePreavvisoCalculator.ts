import { useCallback, useMemo, useState } from "react";
import { calculatePreavviso, type PreavvisoBreakdown } from "@/domain/calc";
import { CCNL_TABLE, type CcnlId } from "@/domain/data";

export interface PreavvisoFormState {
  readonly ccnlId: CcnlId;
  readonly livelloId: string;
  readonly hireDate: string;
  readonly resignationDate: string;
}

function defaultLivelloFor(ccnlId: CcnlId): string {
  const first = CCNL_TABLE[ccnlId].livelli[0];
  if (!first) throw new Error(`CCNL ${ccnlId} has no livelli`);
  return first.id;
}

const DEFAULTS: PreavvisoFormState = {
  ccnlId: "commercio",
  livelloId: defaultLivelloFor("commercio"),
  hireDate: "2020-01-01",
  resignationDate: "2026-05-18",
};

export interface PreavvisoCalculator {
  readonly state: PreavvisoFormState;
  readonly update: (patch: Partial<PreavvisoFormState>) => void;
  readonly setCcnl: (ccnlId: CcnlId) => void;
  readonly result: PreavvisoBreakdown | null;
  readonly invalidDates: boolean;
}

export function usePreavvisoCalculator(): PreavvisoCalculator {
  const [state, setState] = useState<PreavvisoFormState>(DEFAULTS);

  const update = useCallback((patch: Partial<PreavvisoFormState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setCcnl = useCallback((ccnlId: CcnlId) => {
    setState((prev) => ({
      ...prev,
      ccnlId,
      livelloId: defaultLivelloFor(ccnlId),
    }));
  }, []);

  const { result, invalidDates } = useMemo(() => {
    const hire = new Date(state.hireDate);
    const resignation = new Date(state.resignationDate);
    if (
      Number.isNaN(hire.getTime()) ||
      Number.isNaN(resignation.getTime()) ||
      resignation <= hire
    ) {
      return { result: null, invalidDates: true };
    }
    const ccnl = CCNL_TABLE[state.ccnlId];
    return {
      result: calculatePreavviso({
        ccnl,
        livelloId: state.livelloId,
        hireDate: hire,
        resignationDate: resignation,
      }),
      invalidDates: false,
    };
  }, [state]);

  return { state, update, setCcnl, result, invalidDates };
}
