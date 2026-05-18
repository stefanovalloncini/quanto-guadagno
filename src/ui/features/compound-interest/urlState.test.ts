import { describe, expect, it } from "vitest";
import { buildCompoundInterestSearch, parseCompoundInterestUrlState } from "./urlState.ts";
import type { CompoundInterestFormState } from "./useCompoundInterestCalculator.ts";

const DEFAULTS: CompoundInterestFormState = {
  principal: 10_000,
  annualRate: 0.05,
  years: 20,
  contribution: 200,
  contributionFrequency: "monthly",
  compoundingFrequency: "monthly",
  inflationRate: 0.02,
};

describe("compound interest URL state", () => {
  it("returns defaults for empty search string", () => {
    const r = parseCompoundInterestUrlState("", DEFAULTS);
    expect(r).toEqual(DEFAULTS);
  });

  it("round-trips a non-default state", () => {
    const state: CompoundInterestFormState = {
      principal: 50_000,
      annualRate: 0.08,
      years: 10,
      contribution: 500,
      contributionFrequency: "yearly",
      compoundingFrequency: "daily",
      inflationRate: 0.03,
    };
    const search = buildCompoundInterestSearch(state, DEFAULTS);
    const parsed = parseCompoundInterestUrlState(search, DEFAULTS);
    expect(parsed).toEqual(state);
  });

  it("emits an empty search when state matches defaults", () => {
    expect(buildCompoundInterestSearch(DEFAULTS, DEFAULTS)).toBe("");
  });

  it("ignores unknown params and bad values", () => {
    const r = parseCompoundInterestUrlState("?p=abc&r=notanumber&cf=invalid&extra=xyz", DEFAULTS);
    expect(r).toEqual(DEFAULTS);
  });
});
