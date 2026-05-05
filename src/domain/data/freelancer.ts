import type { ForfettarioConfig } from "@/domain/calc/forfettario.ts";

export interface FreelancerYearConfig {
  readonly year: number;
  readonly forfettario: ForfettarioConfig;
}

const SHARED_FORFETTARIO_RATES = {
  startupRate: 0.05,
  standardRate: 0.15,
  maxRevenue: 85_000,
} as const;

const SHARED_GESTIONE_SEPARATA_RATES = {
  fullRate: 0.2607,
  reducedRate: 0.24,
} as const;

export const FREELANCER_CONFIG_2024: FreelancerYearConfig = {
  year: 2024,
  forfettario: {
    ...SHARED_FORFETTARIO_RATES,
    gestioneSeparata: {
      ...SHARED_GESTIONE_SEPARATA_RATES,
      minContribution: 18_415 * 0.2607,
      maxContribution: 119_650,
    },
  },
};

export const FREELANCER_CONFIG_2025: FreelancerYearConfig = {
  year: 2025,
  forfettario: {
    ...SHARED_FORFETTARIO_RATES,
    gestioneSeparata: {
      ...SHARED_GESTIONE_SEPARATA_RATES,
      minContribution: 18_555 * 0.2607,
      maxContribution: 120_607,
    },
  },
};

export const FREELANCER_CONFIG_2026: FreelancerYearConfig = {
  year: 2026,
  forfettario: {
    ...SHARED_FORFETTARIO_RATES,
    gestioneSeparata: {
      ...SHARED_GESTIONE_SEPARATA_RATES,
      minContribution: 18_808 * 0.2607,
      maxContribution: 122_295,
    },
  },
};

const REGISTRY = {
  2024: FREELANCER_CONFIG_2024,
  2025: FREELANCER_CONFIG_2025,
  2026: FREELANCER_CONFIG_2026,
} as const;

export type FreelancerYear = keyof typeof REGISTRY;

export const FREELANCER_YEARS: ReadonlyArray<FreelancerYear> = [2024, 2025, 2026];

export function getFreelancerConfig(year: FreelancerYear): FreelancerYearConfig {
  return REGISTRY[year];
}
