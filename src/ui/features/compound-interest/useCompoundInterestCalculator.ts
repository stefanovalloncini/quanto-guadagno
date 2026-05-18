import { useCallback, useMemo, useState } from "react";
import {
  calculateCompoundInterest,
  type CompoundInterestBreakdown,
  type CompoundingFrequency,
  type ContributionFrequency,
} from "@/domain/calc";

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

export function useCompoundInterestCalculator(): CompoundInterestCalculator {
  const [state, setState] = useState<CompoundInterestFormState>(DEFAULTS);
  const update = useCallback((patch: Partial<CompoundInterestFormState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);
  const result = useMemo(() => calculateCompoundInterest(state), [state]);
  return { state, update, result };
}
