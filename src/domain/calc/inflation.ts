import type { InflationEntry } from "@/domain/data/inflation.ts";

export interface InflationInput {
  readonly amount: number;
  readonly fromYear: number;
  readonly toYear: number;
}

export interface InflationResult {
  readonly nominalAmount: number;
  readonly realAmount: number;
  readonly cumulativeInflation: number;
  readonly fromYear: number;
  readonly toYear: number;
}

const round = (n: number): number => Math.round(n * 100) / 100;

export function calculateRealValue(
  input: InflationInput,
  series: ReadonlyArray<InflationEntry>,
): InflationResult {
  const fromYear = input.fromYear;
  const toYear = input.toYear;
  const startYear = Math.min(fromYear, toYear);
  const endYear = Math.max(fromYear, toYear);

  const reverse = toYear < fromYear;

  let factor = 1;
  for (const entry of series) {
    if (entry.year > startYear && entry.year <= endYear) {
      factor *= 1 + entry.rate;
    }
  }

  const cumulative = factor - 1;
  const realAmount = reverse ? input.amount * factor : input.amount / factor;

  return {
    nominalAmount: round(input.amount),
    realAmount: round(realAmount),
    cumulativeInflation: Math.round(cumulative * 10000) / 10000,
    fromYear,
    toYear,
  };
}
