import { useMemo } from "react";
import type { SalaryEntry } from "./salaryHistory.ts";
import { projectSalary, type ProjectionYear } from "./projection.ts";

export interface ProjectionBundle {
  readonly expected: ReadonlyArray<ProjectionYear>;
  readonly low: ReadonlyArray<ProjectionYear>;
  readonly high: ReadonlyArray<ProjectionYear>;
  readonly growthRate: number;
  readonly horizonYears: number;
}

const BAND_DELTA = 0.01;

export function useSalaryProjection(
  baseEntry: SalaryEntry | null,
  horizonYears: number,
  growthPct: number,
): ProjectionBundle {
  return useMemo(() => {
    const growthRate = growthPct / 100;
    if (baseEntry === null || horizonYears <= 0) {
      return { expected: [], low: [], high: [], growthRate, horizonYears };
    }
    return {
      expected: projectSalary({ baseEntry, horizonYears, growthRate }),
      low: projectSalary({
        baseEntry,
        horizonYears,
        growthRate: growthRate - BAND_DELTA,
      }),
      high: projectSalary({
        baseEntry,
        horizonYears,
        growthRate: growthRate + BAND_DELTA,
      }),
      growthRate,
      horizonYears,
    };
  }, [baseEntry, horizonYears, growthPct]);
}
