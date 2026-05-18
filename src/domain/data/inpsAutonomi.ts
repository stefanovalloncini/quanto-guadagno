// INPS contribution rates and minimali for self-employed / partita IVA in regime forfettario.
// Sources cited in docs/data-verification/inps-autonomi.md.

import type { SupportedYear } from "./index.ts";

export interface GestionSeparataAutonomiConfig {
  readonly fullRate: number;
  readonly reducedRate: number;
  readonly minimaleReddito: number;
  readonly massimale: number;
}

export interface GestionAutonomiConfig {
  readonly rate: number;
  readonly rateOver1stBand: number;
  readonly band1Ceiling: number;
  readonly minimaleReddito: number;
  readonly maternityYearly: number;
  /** Massimale for iscritti post-1996. */
  readonly massimale: number;
  /** Massimale for iscritti ante-1996 (pre-riforma Dini). */
  readonly massimaleAnte1996: number;
}

export interface AutonomiYear {
  readonly year: number;
  readonly gestionSeparata: GestionSeparataAutonomiConfig;
  readonly artigiani: GestionAutonomiConfig;
  readonly commercianti: GestionAutonomiConfig;
  readonly forfettarioDiscount: number;
  readonly newRegistrantDiscount: number;
  readonly concurrentEmployeeRalLimit: number;
}

const _2026: AutonomiYear = {
  year: 2026,
  gestionSeparata: {
    fullRate: 0.2607,
    reducedRate: 0.24,
    minimaleReddito: 18_808,
    massimale: 122_295,
  },
  artigiani: {
    rate: 0.24,
    rateOver1stBand: 0.25,
    band1Ceiling: 56_224,
    minimaleReddito: 18_808,
    maternityYearly: 7.44,
    massimale: 122_295,
    massimaleAnte1996: 86_334,
  },
  commercianti: {
    rate: 0.2448,
    rateOver1stBand: 0.2548,
    band1Ceiling: 56_224,
    minimaleReddito: 18_808,
    maternityYearly: 7.44,
    massimale: 122_295,
    massimaleAnte1996: 86_334,
  },
  forfettarioDiscount: 0.35,
  newRegistrantDiscount: 0.5,
  concurrentEmployeeRalLimit: 35_000,
};

const _2025: AutonomiYear = {
  ..._2026,
  year: 2025,
  gestionSeparata: {
    fullRate: 0.2607,
    reducedRate: 0.24,
    minimaleReddito: 18_555,
    massimale: 120_607,
  },
  artigiani: { ..._2026.artigiani, minimaleReddito: 18_555 },
  commercianti: { ..._2026.commercianti, minimaleReddito: 18_555 },
};

const _2024: AutonomiYear = {
  ..._2025,
  year: 2024,
  gestionSeparata: {
    fullRate: 0.2607,
    reducedRate: 0.24,
    minimaleReddito: 18_415,
    massimale: 119_650,
  },
  artigiani: { ..._2025.artigiani, minimaleReddito: 17_504 },
  commercianti: { ..._2025.commercianti, minimaleReddito: 17_504 },
};

const TABLE: Record<SupportedYear, AutonomiYear> = {
  2024: _2024,
  2025: _2025,
  2026: _2026,
};

export function getAutonomiConfig(year: SupportedYear): AutonomiYear {
  return TABLE[year];
}
