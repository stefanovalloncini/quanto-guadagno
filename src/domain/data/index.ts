import type { YearTaxConfig } from "@/domain/calc/composer.ts";
import { TAX_CONFIG_2024 } from "./2024.ts";
import { TAX_CONFIG_2025 } from "./2025.ts";
import { TAX_CONFIG_2026 } from "./2026.ts";

export { TAX_CONFIG_2024, TAX_CONFIG_2025, TAX_CONFIG_2026 };

export type SupportedYear = 2024 | 2025 | 2026;

export const SUPPORTED_YEARS: ReadonlyArray<SupportedYear> = [2024, 2025, 2026];

const REGISTRY: Record<SupportedYear, YearTaxConfig> = {
  2024: TAX_CONFIG_2024,
  2025: TAX_CONFIG_2025,
  2026: TAX_CONFIG_2026,
};

export function getTaxConfig(year: SupportedYear): YearTaxConfig {
  return REGISTRY[year];
}

export {
  FREELANCER_CONFIG_2024,
  FREELANCER_CONFIG_2025,
  FREELANCER_CONFIG_2026,
  FREELANCER_YEARS,
  getFreelancerConfig,
} from "./freelancer.ts";
export type { FreelancerYear, FreelancerYearConfig } from "./freelancer.ts";

export { ITALIAN_NET_PERCENTILES_2023 } from "./percentiles.ts";

export { ITALIAN_INFLATION_FOI } from "./inflation.ts";
export type { InflationEntry } from "./inflation.ts";
