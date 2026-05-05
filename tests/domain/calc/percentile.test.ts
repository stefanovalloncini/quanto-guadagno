import { describe, expect, it } from "vitest";
import { findPercentile } from "@/domain/calc";
import { ITALIAN_NET_PERCENTILES_2023 } from "@/domain/data";

describe("findPercentile", () => {
  it("zero income falls into the bottom bracket", () => {
    const r = findPercentile(0, ITALIAN_NET_PERCENTILES_2023);
    expect(r.bracket.percentile).toBe(99);
    expect(r.nextBracket?.threshold).toBe(15_000);
  });

  it("income of 25k sits in the bottom-20 bracket", () => {
    const r = findPercentile(25_000, ITALIAN_NET_PERCENTILES_2023);
    expect(r.bracket.threshold).toBe(22_000);
    expect(r.nextBracket?.threshold).toBe(28_000);
  });

  it("income at the median threshold lands in the median bracket", () => {
    const r = findPercentile(28_000, ITALIAN_NET_PERCENTILES_2023);
    expect(r.bracket.threshold).toBe(28_000);
  });

  it("very high income lands in the top-1 bracket with no next", () => {
    const r = findPercentile(500_000, ITALIAN_NET_PERCENTILES_2023);
    expect(r.bracket.threshold).toBe(100_000);
    expect(r.nextBracket).toBeNull();
  });
});
