import { useEffect, useMemo } from "react";
import {
  calculateCompoundInterest,
  type CompoundInterestBreakdown,
  type CompoundingFrequency,
  type ContributionFrequency,
} from "@/domain/calc";
import { usePatchState } from "@/ui/shared/usePatchState.ts";
import { buildCompoundInterestSearch, parseCompoundInterestUrlState } from "./urlState.ts";

export interface CompoundInterestFormState {
  readonly principal: number;
  readonly annualRate: number;
  readonly years: number;
  readonly contribution: number;
  readonly contributionFrequency: ContributionFrequency;
  readonly compoundingFrequency: CompoundingFrequency;
  readonly inflationRate: number;
}

const DEFAULTS: CompoundInterestFormState = {
  principal: 10_000,
  annualRate: 0.05,
  years: 20,
  contribution: 200,
  contributionFrequency: "monthly",
  compoundingFrequency: "monthly",
  inflationRate: 0.02,
};

export interface CompoundInterestCalculator {
  readonly state: CompoundInterestFormState;
  readonly update: (patch: Partial<CompoundInterestFormState>) => void;
  readonly result: CompoundInterestBreakdown;
}

function initialState(): CompoundInterestFormState {
  if (typeof window === "undefined") return DEFAULTS;
  return parseCompoundInterestUrlState(window.location.search, DEFAULTS);
}

export function useCompoundInterestCalculator(): CompoundInterestCalculator {
  const [state, update] = usePatchState<CompoundInterestFormState>(initialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = buildCompoundInterestSearch(state, DEFAULTS);
    const url = `${window.location.pathname}${search}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, [state]);

  const result = useMemo(() => calculateCompoundInterest(state), [state]);
  return { state, update, result };
}
