import type { SupportedYear } from "./index.ts";

export interface NaspiConfig {
  readonly year: number;
  readonly soglia: number;
  readonly massimale: number;
  readonly weeklyToMonthlyCoef: number;
  readonly pctBase: number;
  readonly pctMarginal: number;
  readonly decalageRate: number;
  readonly decalageStartUnder55: number;
  readonly decalageStart55plus: number;
  readonly minWeeks: number;
  readonly maxDurationWeeks: number;
  readonly lookbackYears: number;
}

const COMMON = {
  weeklyToMonthlyCoef: 52 / 12,
  pctBase: 0.75,
  pctMarginal: 0.25,
  decalageRate: 0.03,
  decalageStartUnder55: 6,
  decalageStart55plus: 8,
  minWeeks: 13,
  maxDurationWeeks: 104,
  lookbackYears: 4,
} as const;

export const NASPI_2024: NaspiConfig = {
  ...COMMON,
  year: 2024,
  soglia: 1_425.21,
  massimale: 1_550.42,
};

export const NASPI_2025: NaspiConfig = {
  ...COMMON,
  year: 2025,
  soglia: 1_436.78,
  massimale: 1_562.82,
};

export const NASPI_2026: NaspiConfig = {
  ...COMMON,
  year: 2026,
  soglia: 1_456.72,
  massimale: 1_584.7,
};

const TABLE: Record<SupportedYear, NaspiConfig> = {
  2024: NASPI_2024,
  2025: NASPI_2025,
  2026: NASPI_2026,
};

export function getNaspiConfig(year: SupportedYear): NaspiConfig {
  return TABLE[year];
}
