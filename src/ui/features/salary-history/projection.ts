import { calculateSalaryBreakdown, type SalaryBreakdown } from "@/domain/calc";
import { FOI_INDEX, FOI_LATEST_YEAR } from "@/domain/data";
import { buildSalaryInput } from "./historyNet.ts";
import type { SalaryEntry } from "./salaryHistory.ts";

export interface ProjectionInput {
  readonly baseEntry: SalaryEntry;
  readonly horizonYears: number;
  readonly growthRate: number;
}

export interface ProjectionYear {
  readonly year: number;
  readonly grossAnnual: number;
  readonly net: SalaryBreakdown | null;
}

const ROLLING_WINDOW = 3;
const FALLBACK_RATE = 0.015;

export function defaultGrowthRate(): number {
  const recent = FOI_INDEX.slice(-ROLLING_WINDOW);
  if (recent.length === 0) return FALLBACK_RATE;
  const sum = recent.reduce((acc, p) => acc + p.yoyRate, 0);
  return sum / recent.length;
}

export function projectSalary({
  baseEntry,
  horizonYears,
  growthRate,
}: ProjectionInput): ReadonlyArray<ProjectionYear> {
  const baseInput = buildSalaryInput(baseEntry);
  if (baseInput === null) return [];

  const out: ProjectionYear[] = [];
  for (let i = 1; i <= horizonYears; i += 1) {
    const factor = (1 + growthRate) ** i;
    const gross = Math.max(0, Math.round(baseEntry.grossAnnual * factor));
    const net = calculateSalaryBreakdown({
      ...baseInput,
      grossAnnual: gross,
      taxYear: FOI_LATEST_YEAR,
    });
    out.push({ year: baseEntry.year + i, grossAnnual: gross, net });
  }
  return out;
}
