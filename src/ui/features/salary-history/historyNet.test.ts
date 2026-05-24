import { describe, it, expect } from "vitest";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { buildSalaryInput, computeHistoryNet } from "./historyNet.ts";
import { DEFAULT_ENTRY_SETTINGS, type SalaryEntry } from "./salaryHistory.ts";

const BASE: SalaryEntry = {
  id: "x",
  year: 2024,
  grossAnnual: 30_000,
  createdAt: "2024-06-01T00:00:00Z",
  settings: DEFAULT_ENTRY_SETTINGS,
};

describe("buildSalaryInput", () => {
  it("maps a supported-year entry to a SalaryInput", () => {
    const input = buildSalaryInput(BASE);
    expect(input).not.toBeNull();
    expect(input?.taxYear).toBe(2024);
    expect(input?.grossAnnual).toBe(30_000);
    expect(input?.regionCode).toBe("lazio");
    expect(input?.contractType).toBe("indeterminato");
    expect(input?.paymentFrequency).toBe(13);
    expect(input?.municipalTaxRate).toBeCloseTo(0.008);
  });

  it("returns null for pre-2024 years", () => {
    expect(buildSalaryInput({ ...BASE, year: 2023 })).toBeNull();
    expect(buildSalaryInput({ ...BASE, year: 2015 })).toBeNull();
  });

  it("returns null for post-2026 years", () => {
    expect(buildSalaryInput({ ...BASE, year: 2027 })).toBeNull();
  });

  it("passes through optional settings when present", () => {
    const dependents = {
      hasSpouse: true,
      spouseIncome: 0,
      childrenOver21: 1,
      otherDependents: 0,
    };
    const input = buildSalaryInput({
      ...BASE,
      settings: { ...DEFAULT_ENTRY_SETTINGS, dependents, companySize: "large" },
    });
    expect(input?.dependents).toEqual(dependents);
    expect(input?.companySize).toBe("large");
  });
});

describe("computeHistoryNet", () => {
  it("matches the composer called directly", () => {
    const direct = calculateSalaryBreakdown({
      grossAnnual: 30_000,
      taxYear: 2024,
      regionCode: "lazio",
      municipalTaxRate: 0.008,
      contractType: "indeterminato",
      paymentFrequency: 13,
    });
    const viaMapper = computeHistoryNet(BASE);
    expect(viaMapper?.netAnnual).toBe(direct.netAnnual);
    expect(viaMapper?.netMonthly).toBe(direct.netMonthly);
    expect(viaMapper?.irpefNet).toBe(direct.irpefNet);
  });

  it("returns null for unsupported years", () => {
    expect(computeHistoryNet({ ...BASE, year: 2023 })).toBeNull();
  });
});
