import { describe, expect, it } from "vitest";
import { calculateForfettarioBreakdown } from "@/domain/calc";
import { getFreelancerConfig } from "@/domain/data";

const cfg2026 = getFreelancerConfig(2026).forfettario;

const run = (
  revenue: number,
  opts: { startup?: boolean; coeff?: number; inps?: "full" | "reduced" } = {},
) =>
  calculateForfettarioBreakdown(
    {
      revenue,
      profitabilityCoefficient: opts.coeff ?? 0.78,
      isStartup: opts.startup ?? false,
      inpsKind: opts.inps ?? "full",
    },
    cfg2026,
  );

describe("forfettario 2026", () => {
  it("zero revenue produces zero net", () => {
    const r = run(0);
    expect(r.netAnnual).toBe(0);
    expect(r.substituteTax).toBe(0);
  });

  it("standard regime applies 15% substitute tax on net taxable", () => {
    const r = run(50_000, { startup: false });
    expect(r.substituteRate).toBe(0.15);
    expect(r.substituteTax).toBeCloseTo(r.netTaxableIncome * 0.15, 1);
  });

  it("startup regime applies 5% substitute tax", () => {
    const r = run(50_000, { startup: true });
    expect(r.substituteRate).toBe(0.05);
  });

  it("coefficient is multiplied into taxable base", () => {
    const r = run(50_000, { coeff: 0.78 });
    expect(r.grossTaxableIncome).toBeCloseTo(50_000 * 0.78, 2);
  });

  it("INPS gestione separata is at least the minimum contribution", () => {
    const r = run(5_000);
    expect(r.inpsContribution).toBeCloseTo(cfg2026.gestioneSeparata.minContribution, 2);
  });

  it("INPS reduced rate gives lower contribution than full rate", () => {
    const full = run(50_000, { inps: "full" });
    const reduced = run(50_000, { inps: "reduced" });
    expect(reduced.inpsContribution).toBeLessThan(full.inpsContribution);
  });

  it("flags revenue above the regime limit", () => {
    expect(run(80_000).aboveRevenueLimit).toBe(false);
    expect(run(95_000).aboveRevenueLimit).toBe(true);
  });

  it("net is revenue minus INPS minus substitute tax", () => {
    const r = run(60_000);
    expect(r.netAnnual).toBeCloseTo(r.revenue - r.inpsContribution - r.substituteTax, 2);
  });

  it("startup regime produces higher net than standard at same inputs", () => {
    const standard = run(50_000, { startup: false });
    const startup = run(50_000, { startup: true });
    expect(startup.netAnnual).toBeGreaterThan(standard.netAnnual);
  });
});
