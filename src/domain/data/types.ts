import type { IrpefBracket } from "@/domain/calc/irpef.ts";
import type { InpsConfig } from "@/domain/calc/inps.ts";
import type { WorkDeductionConfig } from "@/domain/calc/workDeduction.ts";
import type { TrattamentoIntegrativoConfig } from "@/domain/calc/trattamentoIntegrativo.ts";
import type { TaxWedgeCutConfig } from "@/domain/calc/taxWedgeCut.ts";
import type { InpsExemption2024Config } from "@/domain/calc/inpsExemption2024.ts";

// Re-export calc-layer config types so domain/data is the single import for consumers.
export type {
  InpsConfig,
  WorkDeductionConfig,
  TrattamentoIntegrativoConfig,
  TaxWedgeCutConfig,
  InpsExemption2024Config,
};

export type TaxYear = 2024 | 2025 | 2026;

// ─── Region ──────────────────────────────────────────────────────────────────

export type RegionCode =
  | "piemonte"
  | "valle-daosta"
  | "lombardia"
  | "bolzano"
  | "trento"
  | "veneto"
  | "friuli-venezia-giulia"
  | "liguria"
  | "emilia-romagna"
  | "toscana"
  | "umbria"
  | "marche"
  | "lazio"
  | "abruzzo"
  | "molise"
  | "campania"
  | "puglia"
  | "basilicata"
  | "calabria"
  | "sicilia"
  | "sardegna";

export interface RegionalTaxBracket {
  readonly min: number;
  readonly max: number | null;
  readonly rate: number;
}

export interface Region {
  readonly code: RegionCode;
  readonly name: string;
  readonly taxBrackets: readonly RegionalTaxBracket[];
  readonly exemptionThreshold?: number;
}

// ─── Dependents deduction ────────────────────────────────────────────────────

export interface SpouseDeductionThreshold {
  readonly income: number;
  readonly deduction: number;
}

export interface DependentsDeductionConfig {
  readonly spouseThresholds: readonly SpouseDeductionThreshold[];
  readonly childOver21Deduction: number;
  readonly otherFamilyDeduction: number;
  readonly dependentIncomeLimit: number;
  readonly dependentIncomeLimitYoung: number;
}

// ─── Expense deductions ───────────────────────────────────────────────────────

export interface ExpenseDeductionsConfig {
  readonly maxMortgageInterest: number;
  readonly medicalExpenseFloor: number;
  readonly medicalDeductionRate: number;
  readonly standardDeductionRate: number;
}

// ─── Employer INPS ────────────────────────────────────────────────────────────

export interface EmployerInpsConfig {
  readonly rate: number;
  readonly aboveCeilingRate?: number;
  readonly apprenticeshipRate: number;
}

// ─── TFR ─────────────────────────────────────────────────────────────────────

export interface TfrConfig {
  readonly accrualDivisor: number;
  readonly fixedRevaluationRate: number;
  readonly inflationPercentage: number;
  readonly revaluationTaxRate: number;
}

// ─── Other employer costs ─────────────────────────────────────────────────────

export interface OtherEmployerCostsConfig {
  readonly inailRate: number;
  readonly maternityRate: number;
  readonly naspiRate: number;
  readonly naspiAdditionalDeterminatoRate: number;
  readonly cigRate: number;
  readonly otherRate: number;
}

// ─── Fringe benefits ─────────────────────────────────────────────────────────

export type PowertrainType = "bev" | "phev" | "other";

export interface CompanyCarCo2Threshold {
  readonly maxCO2: number | null;
  readonly taxablePercentage: number;
}

export interface CompanyCarPowertrainRate {
  readonly powertrainType: PowertrainType;
  readonly taxablePercentage: number;
}

export interface FringeBenefitsConfig {
  readonly mealVouchersDailyThreshold: number;
  readonly healthInsuranceThreshold: number;
  readonly welfareThresholdGeneral: number;
  readonly welfareThresholdWithChildren: number;
  readonly companyCarCo2Thresholds: readonly CompanyCarCo2Threshold[];
  readonly companyCarPowertrainRates?: readonly CompanyCarPowertrainRate[];
  readonly defaultConventionalKm: number;
}

// ─── Madre lavoratrice ────────────────────────────────────────────────────────

export interface MadreLavoratriceConfig {
  readonly maxAnnualExemption: number;
  readonly maxMonthlyExemption: number;
  readonly minChildrenFullExemption: number;
  readonly maxYoungestChildAge: number;
}

// ─── Regime impatriati ────────────────────────────────────────────────────────

export interface RegimeImpatriatiConfig {
  readonly standardExemptionRate: number;
  readonly withMinorChildrenExemptionRate: number;
  readonly maxEligibleIncome: number;
  readonly durationYears: number;
}

// ─── Premio di risultato ──────────────────────────────────────────────────────

export interface PdrSostitutivaConfig {
  readonly rate: number;
  readonly maxAmount: number;
}

// ─── Data sources ─────────────────────────────────────────────────────────────

export interface TaxDataSource {
  readonly name: string;
  readonly url: string;
  readonly document?: string;
  readonly lastVerified: string;
}

export interface TaxDataSources {
  readonly primary: TaxDataSource;
  readonly inps?: TaxDataSource;
  readonly irpef?: TaxDataSource;
}

// ─── Full yearly tax config ───────────────────────────────────────────────────

export interface YearlyTaxConfig {
  readonly year: TaxYear;
  readonly inps: InpsConfig;
  readonly irpefBrackets: ReadonlyArray<IrpefBracket>;
  readonly workDeduction: WorkDeductionConfig;
  readonly trattamentoIntegrativo: TrattamentoIntegrativoConfig;
  // Composer-layer convenience fields (derived from temporaryPolicies in the old repo)
  readonly taxWedgeCut: TaxWedgeCutConfig | null;
  readonly inpsExemption2024: InpsExemption2024Config | null;
  // Extended fields
  readonly dependentsDeduction: DependentsDeductionConfig;
  readonly expenseDeductions: ExpenseDeductionsConfig;
  readonly employerInps: EmployerInpsConfig;
  readonly tfr: TfrConfig;
  readonly otherEmployerCosts: OtherEmployerCostsConfig;
  readonly fringeBenefits: FringeBenefitsConfig;
  readonly madreLavoratrice: MadreLavoratriceConfig;
  readonly regimeImpatriati: RegimeImpatriatiConfig;
  readonly pdrSostitutiva: PdrSostitutivaConfig;
  readonly sources: TaxDataSources;
}
