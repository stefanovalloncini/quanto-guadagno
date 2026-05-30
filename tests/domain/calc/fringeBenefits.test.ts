import { describe, it, expect } from "vitest";
import {
  calculateFringeBenefits,
  calculateCompanyCarBenefit,
  calculateMealVouchersBenefit,
  calculateHealthInsuranceBenefit,
  calculateWelfareBenefit,
  hasFringeBenefits,
} from "@/domain/calc/fringeBenefitsCalculations.ts";
import { TAX_CONFIG_2025 } from "@/domain/data/2025.ts";

const cfg = TAX_CONFIG_2025.fringeBenefits;

describe("calculateCompanyCarBenefit", () => {
  it("returns gross = taxable in simple mode", () => {
    const result = calculateCompanyCarBenefit({ mode: "simple", annualBenefitValue: 5000 }, cfg);
    expect(result.grossValue).toBe(5000);
    expect(result.taxableValue).toBe(5000);
  });

  it("uses powertrain rates in detailed mode when config has them (2025)", () => {
    // 2025: bev = 10%, so taxable = grossValue * 0.10
    const result = calculateCompanyCarBenefit(
      { mode: "detailed", aciCostPerKm: 0.5, conventionalKm: 15_000, powertrainType: "bev" },
      cfg,
    );
    expect(result.grossValue).toBe(7500);
    expect(result.taxableValue).toBeCloseTo(750, 1); // 10%
    expect(result.powertrainCategory).toBe("bev");
    expect(result.taxablePercentage).toBe(0.1);
  });

  it("returns zero when no car provided", () => {
    const result = calculateCompanyCarBenefit(undefined, cfg);
    expect(result.grossValue).toBe(0);
    expect(result.taxableValue).toBe(0);
  });
});

describe("calculateMealVouchersBenefit", () => {
  it("returns zero values when no meal vouchers", () => {
    const result = calculateMealVouchersBenefit(undefined, cfg);
    expect(result.annualValue).toBe(0);
    expect(result.taxableValue).toBe(0);
    expect(result.taxFreeThreshold).toBeGreaterThan(0);
  });

  it("computes taxable portion above daily threshold", () => {
    // threshold = 8 €/day (2025), dailyValue = 10 €
    const dailyExcess = 10 - cfg.mealVouchersDailyThreshold;
    const annualWorkingDays = 22 * 12;
    const result = calculateMealVouchersBenefit(
      { dailyValue: 10, workingDaysPerMonth: 22 },
      cfg,
    );
    expect(result.taxableValue).toBeCloseTo(dailyExcess * annualWorkingDays, 1);
  });

  it("has zero taxable when daily value is at threshold", () => {
    const result = calculateMealVouchersBenefit(
      { dailyValue: cfg.mealVouchersDailyThreshold, workingDaysPerMonth: 22 },
      cfg,
    );
    expect(result.taxableValue).toBe(0);
  });
});

describe("calculateHealthInsuranceBenefit", () => {
  it("returns zero when no insurance", () => {
    const result = calculateHealthInsuranceBenefit(undefined, cfg);
    expect(result.annualValue).toBe(0);
    expect(result.taxableValue).toBe(0);
  });

  it("taxes only the portion above threshold", () => {
    const premium = cfg.healthInsuranceThreshold + 500;
    const result = calculateHealthInsuranceBenefit({ annualPremium: premium }, cfg);
    expect(result.taxableValue).toBeCloseTo(500, 1);
  });
});

describe("calculateWelfareBenefit", () => {
  it("uses higher threshold when children under 18 present", () => {
    const withChildren = calculateWelfareBenefit({ annualAmount: 500, hasDependentChildren: true }, cfg);
    const withoutChildren = calculateWelfareBenefit({ annualAmount: 500, hasDependentChildren: false }, cfg);
    // withChildren threshold is higher so the taxable portion should be ≤ without
    expect(withChildren.taxFreeThreshold).toBeGreaterThan(withoutChildren.taxFreeThreshold);
  });
});

describe("calculateFringeBenefits (aggregate)", () => {
  it("aggregates all components correctly", () => {
    const result = calculateFringeBenefits(
      {
        companyCar: { mode: "simple", annualBenefitValue: 3000 },
        healthInsurance: { annualPremium: cfg.healthInsuranceThreshold + 200 },
      },
      cfg,
    );
    expect(result.totalGrossBenefit).toBe(3000 + cfg.healthInsuranceThreshold + 200);
    expect(result.taxableAmount).toBeGreaterThan(0);
    expect(result.taxFreeAmount).toBeGreaterThan(0);
    expect(result.taxableAmount + result.taxFreeAmount).toBeCloseTo(result.totalGrossBenefit, 2);
  });

  it("returns all-zero breakdown for no benefits", () => {
    const result = calculateFringeBenefits(undefined, cfg);
    expect(result.totalGrossBenefit).toBe(0);
    expect(result.taxableAmount).toBe(0);
  });
});

describe("hasFringeBenefits", () => {
  it("returns false for undefined", () => {
    expect(hasFringeBenefits(undefined)).toBe(false);
  });

  it("returns false for empty object", () => {
    expect(hasFringeBenefits({})).toBe(false);
  });

  it("returns true when any benefit is present", () => {
    expect(hasFringeBenefits({ healthInsurance: { annualPremium: 500 } })).toBe(true);
  });
});
