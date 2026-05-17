import { FOI_INDEX, type InflationDataPoint } from "@/domain/data/inflation.ts";

export interface AdjustedValue {
  readonly nominal: number;
  readonly adjusted: number;
  readonly fromYear: number;
  readonly toYear: number;
  readonly factor: number;
}

function findIndex(year: number): InflationDataPoint | undefined {
  return FOI_INDEX.find((p) => p.year === year);
}

// Convert a nominal value from one year to its purchasing-power equivalent in
// another year, using the FOI index. Returns `null` when either year is missing.
export function adjustValueAcrossYears(
  nominal: number,
  fromYear: number,
  toYear: number,
): AdjustedValue | null {
  const from = findIndex(fromYear);
  const to = findIndex(toYear);
  if (from === undefined || to === undefined) return null;
  if (from.index === 0) return null;
  const factor = to.index / from.index;
  return {
    nominal,
    adjusted: nominal * factor,
    fromYear,
    toYear,
    factor,
  };
}

export function cumulativeInflation(fromYear: number, toYear: number): number | null {
  const from = findIndex(fromYear);
  const to = findIndex(toYear);
  if (from === undefined || to === undefined) return null;
  if (from.index === 0) return null;
  return to.index / from.index - 1;
}
