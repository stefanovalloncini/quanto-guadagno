export type {
  CompanyCarMode,
  CO2EmissionCategory,
  FringePowertrainType,
  CompanyCarInput,
  MealVouchersInput,
  MealVoucherType,
  HealthInsuranceInput,
  WelfareInput,
  FringeBenefitsInput,
  FringeBenefitsBreakdown,
} from "./fringeBenefits.ts";

export type {
  TaxYear,
  RegionCode,
  RegionalTaxBracket,
  Region,
  SpouseDeductionThreshold,
  DependentsDeductionConfig,
  ExpenseDeductionsConfig,
  EmployerInpsConfig,
  TfrConfig,
  OtherEmployerCostsConfig,
  PowertrainType,
  CompanyCarCo2Threshold,
  CompanyCarPowertrainRate,
  FringeBenefitsConfig,
  MadreLavoratriceConfig,
  RegimeImpatriatiConfig,
  PdrSostitutivaConfig,
  TaxDataSource,
  TaxDataSources,
  YearlyTaxConfig,
  // Re-exported calc-layer types
  InpsConfig,
  WorkDeductionConfig,
  TrattamentoIntegrativoConfig,
  TaxWedgeCutConfig,
  InpsExemption2024Config,
  ForfettarioConfig,
  GestioneSeparataConfig,
} from "./types.ts";

export { REGIONS, REGIONS_LIST } from "./regions.ts";

export { FOI_INDEX, FOI_BASE_YEAR, FOI_LATEST_YEAR } from "./inflation.ts";
export type { InflationDataPoint } from "./inflation.ts";

export type { ActivityCategory, ActivityCoefficient } from "./forfettario.ts";
export { ACTIVITY_COEFFICIENTS, ACTIVITY_CATEGORIES } from "./forfettario.ts";

export {
  SHARED_WORK_DEDUCTION,
  SHARED_TRATTAMENTO_INTEGRATIVO,
  SHARED_DEPENDENTS_DEDUCTION,
  SHARED_EXPENSE_DEDUCTIONS,
  SHARED_EMPLOYER_INPS,
  SHARED_TFR_CONFIG,
  SHARED_OTHER_EMPLOYER_COSTS,
  SHARED_MADRE_LAVORATRICE,
  SHARED_REGIME_IMPATRIATI,
  SHARED_INPS_STANDARD_RATE,
  SHARED_INPS_ABOVE_CEILING_RATE,
  SHARED_INPS_APPRENTICESHIP_RATE,
  SHARED_MEAL_VOUCHERS_DAILY_THRESHOLD,
  SHARED_HEALTH_INSURANCE_THRESHOLD,
  SHARED_DEFAULT_CONVENTIONAL_KM,
  SHARED_COMPANY_CAR_CO2_THRESHOLDS,
  SHARED_TAX_WEDGE_CUT_PARAMS,
  SHARED_FORFETTARIO,
  SHARED_GESTIONE_SEPARATA_FULL_RATE,
  SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
} from "./shared.ts";

import { TAX_CONFIG_2024 } from "./2024.ts";
import { TAX_CONFIG_2025 } from "./2025.ts";
import { TAX_CONFIG_2026 } from "./2026.ts";
import type { YearlyTaxConfig } from "./types.ts";

export { TAX_CONFIG_2024, TAX_CONFIG_2025, TAX_CONFIG_2026 };

export type SupportedYear = 2024 | 2025 | 2026;

export const SUPPORTED_YEARS: ReadonlyArray<SupportedYear> = [2024, 2025, 2026];

export const LATEST_SUPPORTED_YEAR: SupportedYear = 2026;

const REGISTRY: Record<SupportedYear, YearlyTaxConfig> = {
  2024: TAX_CONFIG_2024,
  2025: TAX_CONFIG_2025,
  2026: TAX_CONFIG_2026,
};

export function getTaxConfig(year: SupportedYear): YearlyTaxConfig {
  return REGISTRY[year];
}

export { getNaspiConfig, type NaspiConfig, NASPI_2024, NASPI_2025, NASPI_2026 } from "./naspi.ts";

export {
  CCNL_TABLE,
  CCNL_IDS,
  type CcnlId,
  type SeniorityBand,
  type CcnlLivello,
  type CcnlNoticeEntry,
  type CcnlNoticeRow,
  type CcnlDefinition,
} from "./preavviso.ts";

export { CCNL_PRESETS, CCNL_PRESET_IDS, type CcnlPreset } from "./ccnlPresets.ts";

export {
  getAutonomiConfig,
  type AutonomiYear,
  type GestionAutonomiConfig,
  type GestionSeparataAutonomiConfig,
} from "./inpsAutonomi.ts";
