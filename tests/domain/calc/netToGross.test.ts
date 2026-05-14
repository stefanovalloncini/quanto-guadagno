import { describe, it, expect } from "vitest";
import { calculateGrossFromNet, estimateGrossFromNet } from "@/domain/calc/netToGross.ts";
import { TAX_CONFIG_2025 } from "@/domain/data/2025.ts";

const cfg = TAX_CONFIG_2025;

// Lombardia effective regional rate at ~35k (approximate, used as fixed input)
const BASE_INPUT = {
  regionalRate: 0.0161,
  municipalRate: 0.008,
};

describe("calculateGrossFromNet", () => {
  it("returns gross 0 for target net 0", () => {
    const result = calculateGrossFromNet(0, BASE_INPUT, cfg);
    expect(result.grossAnnual).toBe(0);
    expect(result.netAnnual).toBe(0);
    expect(result.converged).toBe(true);
    expect(result.iterations).toBe(0);
  });

  it("converges to a reasonable gross for target net 24000 (2025, Lombardia)", () => {
    const result = calculateGrossFromNet(24_000, BASE_INPUT, cfg);
    // Net 24k → gross should be somewhere around 33k–38k
    expect(result.converged).toBe(true);
    expect(result.grossAnnual).toBeGreaterThan(30_000);
    expect(result.grossAnnual).toBeLessThan(45_000);
    expect(Math.abs(result.netAnnual - 24_000)).toBeLessThanOrEqual(10);
  });

  it("the resulting breakdown netAnnual matches the returned netAnnual", () => {
    const result = calculateGrossFromNet(30_000, BASE_INPUT, cfg);
    expect(result.netAnnual).toBeCloseTo(result.breakdown.netAnnual, 0);
  });

  it("uses fewer than MAX_ITERATIONS for typical inputs", () => {
    const result = calculateGrossFromNet(20_000, BASE_INPUT, cfg);
    expect(result.iterations).toBeLessThan(50);
  });

  it("produces a gross that is higher than the net", () => {
    const result = calculateGrossFromNet(40_000, BASE_INPUT, cfg);
    expect(result.grossAnnual).toBeGreaterThan(40_000);
  });
});

describe("estimateGrossFromNet", () => {
  it("returns targetNet / 0.65 rounded", () => {
    expect(estimateGrossFromNet(20_000)).toBe(Math.round(20_000 / 0.65));
  });
});
