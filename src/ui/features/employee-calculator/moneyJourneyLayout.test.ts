import { describe, it, expect } from "vitest";
import type { SalaryBreakdown } from "@/domain/calc";
import { computeMoneyJourney, type JourneyNode, type NodeId } from "./moneyJourneyLayout.ts";

function indexById(nodes: ReadonlyArray<JourneyNode>): Record<NodeId, JourneyNode> {
  const result: Partial<Record<NodeId, JourneyNode>> = {};
  for (const node of nodes) result[node.id] = node;
  return result as Record<NodeId, JourneyNode>;
}

function makeBreakdown(overrides: Partial<SalaryBreakdown> = {}): SalaryBreakdown {
  const base: SalaryBreakdown = {
    grossAnnual: 30_000,
    grossMonthly: 30_000 / 14,
    inpsContribution: 2_847,
    inpsRate: 0.0949,
    inpsExemption: 0,
    madreLavoratriceExemption: 0,
    taxableIncome: 27_153,
    irpefGross: 6_245,
    irpefDeduction: 2_053,
    irpefNet: 3_193,
    regimeImpatriatiSavings: 0,
    regimeImpatriatiExemptionRate: 0,
    regionalTax: 387,
    regionalTaxRate: 0.0142,
    municipalTax: 54,
    municipalTaxRate: 0.002,
    trattamentoIntegrativo: 0,
    sommaAggiuntiva: 0,
    detrazioneAggiuntiva: 1_000,
    taxWedgeCutTotal: 1_000,
    dependentsDeduction: 0,
    expenseDeduction: 0,
    pdrGross: 0,
    pdrInps: 0,
    pdrTax: 0,
    pdrNet: 0,
    totalDeductions: 3_053,
    totalTaxes: 6_481,
    netAnnual: 23_519,
    netMonthly: 23_519 / 14,
    effectiveTaxRate: 0.18,
    netToGrossRatio: 0.78,
    employerInps: 7_143,
    employerInpsRate: 0.2381,
    tfrAnnual: 2_222,
    tfrMonthly: 2_222 / 12,
    tfrRate: 1 / 13.5,
    inailContribution: 120,
    maternityContribution: 138,
    naspiContribution: 483,
    naspiAdditionalContribution: 0,
    cigContribution: 270,
    otherEmployerContributions: 204,
    totalOtherEmployerCosts: 1_215,
    totalEmployerCost: 40_580,
    totalEmployerCostMonthly: 40_580 / 12,
    employerCostPerNetEuro: 1.73,
  };
  return { ...base, ...overrides };
}

describe("computeMoneyJourney", () => {
  it("returns 8 nodes and 7 flows for a typical breakdown", () => {
    const layout = computeMoneyJourney(makeBreakdown());
    expect(layout.nodes.length).toBe(8);
    expect(layout.flows.length).toBe(7);
  });

  it("places costo, ral, and netto in their own columns", () => {
    const layout = computeMoneyJourney(makeBreakdown());
    const byId = indexById(layout.nodes);
    expect(byId.costo?.column).toBe(0);
    expect(byId.ral?.column).toBe(1);
    expect(byId.netto?.column).toBe(2);
  });

  it("stage 2 balances: ral height ≈ netto + inpsDip + tasse heights", () => {
    const layout = computeMoneyJourney(makeBreakdown());
    const byId = indexById(layout.nodes);
    const stage2Sum = byId.netto.height + byId.inpsDip.height + byId.tasse.height;
    expect(Math.abs(byId.ral.height - stage2Sum)).toBeLessThan(0.01);
  });

  it("stage 1 fills the available height once gaps are subtracted", () => {
    const layout = computeMoneyJourney(makeBreakdown(), { width: 800, height: 400, gap: 4 });
    const byId = indexById(layout.nodes);
    const stage1Sum =
      byId.ral.height + byId.inpsAzienda.height + byId.tfr.height + byId.oneri.height;
    // Effective height = 400 - 3 gaps = 388
    expect(Math.abs(stage1Sum - 388)).toBeLessThan(0.01);
  });

  it("returns empty layout when costo is zero", () => {
    const layout = computeMoneyJourney(
      makeBreakdown({ totalEmployerCost: 0, grossAnnual: 0, netAnnual: 0 }),
    );
    expect(layout.nodes).toEqual([]);
    expect(layout.flows).toEqual([]);
  });

  it("each flow has a valid SVG path string", () => {
    const layout = computeMoneyJourney(makeBreakdown());
    for (const flow of layout.flows) {
      expect(flow.path).toMatch(/^M [\d.-]+ [\d.-]+/);
      expect(flow.path).toContain("C ");
      expect(flow.path).toContain("Z");
    }
  });
});
