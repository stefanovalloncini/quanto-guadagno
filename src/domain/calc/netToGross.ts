import type { YearlyTaxConfig } from "@/domain/data/types.ts";
import { calculateSalaryBreakdown } from "./composer.ts";
import type { SalaryInput, SalaryBreakdown } from "./composer.ts";

const MAX_ITERATIONS = 50;
const TOLERANCE = 1; // ±€1 is acceptable for this use-case

export interface NetToGrossResult {
  readonly grossAnnual: number;
  readonly netAnnual: number;
  readonly breakdown: SalaryBreakdown;
  readonly converged: boolean;
  readonly iterations: number;
}

export function estimateGrossFromNet(targetNet: number): number {
  return Math.round(targetNet / (1 - 0.35));
}

// Binary-search for the gross that produces a net within TOLERANCE of targetNet.
// Uses the standard calculateSalaryBreakdown; optional baseInput lets callers
// carry region/municipalRate through to the inner loop.
export function calculateGrossFromNet(
  targetNet: number,
  baseInput: Pick<SalaryInput, "regionalRate" | "municipalRate">,
  cfg: YearlyTaxConfig,
): NetToGrossResult {
  if (targetNet <= 0) {
    const breakdown = calculateSalaryBreakdown({ grossAnnual: 0, ...baseInput }, cfg);
    return { grossAnnual: 0, netAnnual: 0, breakdown, converged: true, iterations: 0 };
  }

  let low = targetNet;
  let high = targetNet * 2.5;

  const makeInput = (g: number): SalaryInput => ({ grossAnnual: g, ...baseInput });

  let highBreakdown = calculateSalaryBreakdown(makeInput(high), cfg);
  while (highBreakdown.netAnnual < targetNet && high < 10_000_000) {
    high *= 1.5;
    highBreakdown = calculateSalaryBreakdown(makeInput(high), cfg);
  }

  let iterations = 0;
  let bestGross = high;
  let bestNet = highBreakdown.netAnnual;
  let bestBreakdown = highBreakdown;

  while (iterations < MAX_ITERATIONS && high - low > TOLERANCE) {
    const mid = Math.round((low + high) / 2);
    const breakdown = calculateSalaryBreakdown(makeInput(mid), cfg);
    const netAtMid = breakdown.netAnnual;
    iterations++;

    if (Math.abs(netAtMid - targetNet) < Math.abs(bestNet - targetNet)) {
      bestGross = mid;
      bestNet = netAtMid;
      bestBreakdown = breakdown;
    }

    if (Math.abs(netAtMid - targetNet) <= TOLERANCE) {
      return { grossAnnual: mid, netAnnual: netAtMid, breakdown, converged: true, iterations };
    }

    if (netAtMid < targetNet) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return {
    grossAnnual: bestGross,
    netAnnual: bestNet,
    breakdown: bestBreakdown,
    converged: Math.abs(bestNet - targetNet) <= TOLERANCE * 10,
    iterations,
  };
}
