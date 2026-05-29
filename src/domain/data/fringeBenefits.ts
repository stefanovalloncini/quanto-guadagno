// Input and output types for fringe benefit valuation.
// The config types (thresholds, CO2 brackets, etc.) live in types.ts.

export type CompanyCarMode = "simple" | "detailed";

export type CO2EmissionCategory = "electric" | "low" | "medium" | "high";

// PowertrainType is also in types.ts (for config); re-exported from there by index.ts.
// Defined separately here as an input type to avoid a circular import.
export type FringePowertrainType = "bev" | "phev" | "other";

export interface CompanyCarInput {
  readonly mode: CompanyCarMode;
  readonly annualBenefitValue?: number;
  readonly co2Emissions?: number;
  readonly aciCostPerKm?: number;
  readonly conventionalKm?: number;
  readonly powertrainType?: FringePowertrainType;
}

export type MealVoucherType = "electronic" | "paper";

export interface MealVouchersInput {
  readonly dailyValue: number;
  readonly workingDaysPerMonth: number;
  readonly type?: MealVoucherType;
}

export interface HealthInsuranceInput {
  readonly annualPremium: number;
}

export interface WelfareInput {
  readonly annualAmount: number;
  readonly hasChildrenUnder18: boolean;
}

export interface FringeBenefitsInput {
  readonly companyCar?: CompanyCarInput;
  readonly mealVouchers?: MealVouchersInput;
  readonly healthInsurance?: HealthInsuranceInput;
  readonly welfare?: WelfareInput;
}

export interface FringeBenefitsBreakdown {
  readonly totalGrossBenefit: number;
  readonly taxFreeAmount: number;
  readonly taxableAmount: number;
  readonly companyCar: {
    readonly grossValue: number;
    readonly taxableValue: number;
    readonly co2Category?: CO2EmissionCategory;
    readonly powertrainCategory?: FringePowertrainType;
    readonly taxablePercentage?: number;
  };
  readonly mealVouchers: {
    readonly annualValue: number;
    readonly taxFreeThreshold: number;
    readonly taxableValue: number;
  };
  readonly healthInsurance: {
    readonly annualValue: number;
    readonly taxFreeThreshold: number;
    readonly taxableValue: number;
  };
  readonly welfare: {
    readonly annualValue: number;
    readonly taxFreeThreshold: number;
    readonly taxableValue: number;
  };
}
