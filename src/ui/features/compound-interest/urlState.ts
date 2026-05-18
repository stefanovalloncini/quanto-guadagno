import type { CompoundingFrequency, ContributionFrequency } from "@/domain/calc";
import type { CompoundInterestFormState } from "./useCompoundInterestCalculator.ts";

const CONTRIBUTION_FREQUENCIES: ReadonlyArray<ContributionFrequency> = [
  "monthly",
  "yearly",
  "none",
];
const COMPOUNDING_FREQUENCIES: ReadonlyArray<CompoundingFrequency> = [
  "annually",
  "monthly",
  "daily",
];

function readNumber(params: URLSearchParams, key: string, fallback: number): number {
  const v = params.get(key);
  if (v === null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function readEnum<T extends string>(
  params: URLSearchParams,
  key: string,
  allowed: ReadonlyArray<T>,
  fallback: T,
): T {
  const v = params.get(key);
  if (v === null) return fallback;
  return allowed.includes(v as T) ? (v as T) : fallback;
}

export function parseCompoundInterestUrlState(
  search: string,
  defaults: CompoundInterestFormState,
): CompoundInterestFormState {
  const params = new URLSearchParams(search);
  return {
    principal: readNumber(params, "p", defaults.principal),
    annualRate: readNumber(params, "r", defaults.annualRate * 100) / 100,
    years: readNumber(params, "y", defaults.years),
    contribution: readNumber(params, "c", defaults.contribution),
    contributionFrequency: readEnum(
      params,
      "cf",
      CONTRIBUTION_FREQUENCIES,
      defaults.contributionFrequency,
    ),
    compoundingFrequency: readEnum(
      params,
      "f",
      COMPOUNDING_FREQUENCIES,
      defaults.compoundingFrequency,
    ),
    inflationRate: readNumber(params, "i", defaults.inflationRate * 100) / 100,
  };
}

export function buildCompoundInterestSearch(
  state: CompoundInterestFormState,
  defaults: CompoundInterestFormState,
): string {
  const params = new URLSearchParams();
  if (state.principal !== defaults.principal) {
    params.set("p", String(state.principal));
  }
  const ratePct = Number((state.annualRate * 100).toFixed(2));
  const defaultRatePct = Number((defaults.annualRate * 100).toFixed(2));
  if (ratePct !== defaultRatePct) params.set("r", String(ratePct));
  if (state.years !== defaults.years) params.set("y", String(state.years));
  if (state.contribution !== defaults.contribution) {
    params.set("c", String(state.contribution));
  }
  if (state.contributionFrequency !== defaults.contributionFrequency) {
    params.set("cf", state.contributionFrequency);
  }
  if (state.compoundingFrequency !== defaults.compoundingFrequency) {
    params.set("f", state.compoundingFrequency);
  }
  const inflationPct = Number((state.inflationRate * 100).toFixed(2));
  const defaultInflationPct = Number((defaults.inflationRate * 100).toFixed(2));
  if (inflationPct !== defaultInflationPct) {
    params.set("i", String(inflationPct));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}
