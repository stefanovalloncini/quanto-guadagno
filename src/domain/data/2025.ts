/**
 * Italian Tax Configuration - 2025
 *
 * Changes from 2024:
 * - IRPEF brackets confirmed (3-bracket system made permanent)
 * - INPS ceiling updated (Circolare INPS n. 26/2025)
 * - Taglio cuneo fiscale replaces esonero contributivo INPS
 * - Welfare thresholds updated (L. 207/2024)
 * - Company car: new powertrain-based system for contracts from 01/01/2025
 *
 * Sources:
 * - Legge di Bilancio 2025 (L. 207/2024)
 * - Circolare INPS n. 26/2025, n. 38/2025
 */

import type { YearlyTaxConfig } from "./types.ts";
import {
  SHARED_INPS_STANDARD_RATE,
  SHARED_INPS_ABOVE_CEILING_RATE,
  SHARED_INPS_APPRENTICESHIP_RATE,
  SHARED_INPS_LARGE_COMPANY_ADDITIONAL_RATE,
  SHARED_INPS_PUBLIC_EMPLOYEE_RATE,
  SHARED_WORK_DEDUCTION,
  SHARED_TRATTAMENTO_INTEGRATIVO,
  SHARED_DEPENDENTS_DEDUCTION,
  SHARED_EXPENSE_DEDUCTIONS,
  SHARED_EMPLOYER_INPS,
  SHARED_TFR_CONFIG,
  SHARED_OTHER_EMPLOYER_COSTS,
  SHARED_MADRE_LAVORATRICE,
  SHARED_REGIME_IMPATRIATI,
  SHARED_MEAL_VOUCHERS_DAILY_THRESHOLD,
  SHARED_HEALTH_INSURANCE_THRESHOLD,
  SHARED_DEFAULT_CONVENTIONAL_KM,
  SHARED_COMPANY_CAR_CO2_THRESHOLDS,
  SHARED_TAX_WEDGE_CUT_PARAMS,
  SHARED_FORFETTARIO,
  SHARED_GESTIONE_SEPARATA_FULL_RATE,
  SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
} from "./shared.ts";

export const TAX_CONFIG_2025: YearlyTaxConfig = {
  year: 2025,

  inps: {
    // Fonte: Circolare INPS n. 26/2025
    standardRate: SHARED_INPS_STANDARD_RATE,
    aboveCeilingRate: SHARED_INPS_ABOVE_CEILING_RATE,
    ceiling: 55_448, // Prima fascia retributiva 2025 (€4.621/mese)
    massimale: 120_607, // Massimale contributivo 2025
    apprenticeshipRate: SHARED_INPS_APPRENTICESHIP_RATE,
    largeCompanyAdditionalRate: SHARED_INPS_LARGE_COMPANY_ADDITIONAL_RATE,
    publicEmployeeRate: SHARED_INPS_PUBLIC_EMPLOYEE_RATE,
  },

  irpefBrackets: [
    { min: 0, max: 28_000, rate: 0.23 },
    { min: 28_000, max: 50_000, rate: 0.35 },
    { min: 50_000, max: null, rate: 0.43 },
  ],

  workDeduction: SHARED_WORK_DEDUCTION,
  trattamentoIntegrativo: SHARED_TRATTAMENTO_INTEGRATIVO,

  inpsExemption2024: null,

  // Taglio cuneo fiscale 2025 — Art. 1, commi 4-9, L. 207/2024
  taxWedgeCut: SHARED_TAX_WEDGE_CUT_PARAMS,

  dependentsDeduction: SHARED_DEPENDENTS_DEDUCTION,
  expenseDeductions: SHARED_EXPENSE_DEDUCTIONS,
  employerInps: SHARED_EMPLOYER_INPS,
  tfr: SHARED_TFR_CONFIG,
  otherEmployerCosts: SHARED_OTHER_EMPLOYER_COSTS,

  // Fringe benefits — Art. 1, commi 386-389, L. 207/2024
  fringeBenefits: {
    mealVouchersDailyThreshold: SHARED_MEAL_VOUCHERS_DAILY_THRESHOLD,
    healthInsuranceThreshold: SHARED_HEALTH_INSURANCE_THRESHOLD,
    // €1.000/anno welfare generale (triennio 2025-2027)
    welfareThresholdGeneral: 1000,
    // €2.000/anno con figli fiscalmente a carico (triennio 2025-2027)
    welfareThresholdWithChildren: 2000,
    companyCarCo2Thresholds: SHARED_COMPANY_CAR_CO2_THRESHOLDS,
    // L. 207/2024 Art. 48: sistema a powertrain per contratti nuovi dal 01/01/2025
    companyCarPowertrainRates: [
      { powertrainType: "bev", taxablePercentage: 0.1 },
      { powertrainType: "phev", taxablePercentage: 0.2 },
      { powertrainType: "other", taxablePercentage: 0.5 },
    ],
    defaultConventionalKm: SHARED_DEFAULT_CONVENTIONAL_KM,
  },

  madreLavoratrice: SHARED_MADRE_LAVORATRICE,
  regimeImpatriati: SHARED_REGIME_IMPATRIATI,

  // Premio di Risultato — confermato al 5% per il 2025
  pdrSostitutiva: {
    rate: 0.05,
    maxAmount: 3000,
  },

  forfettario: SHARED_FORFETTARIO,

  // Gestione Separata 2025 — Circolare INPS n. 27/2025
  gestioneSeparata: {
    fullRate: SHARED_GESTIONE_SEPARATA_FULL_RATE,
    reducedRate: SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
    massimale: 120_607,
    minimaleReddito: 18_555,
  },

  sources: {
    primary: {
      name: "Ministero dell'Economia e delle Finanze",
      url: "https://www.mef.gov.it/focus/Principali-misure-della-legge-di-bilancio-2025/",
      document: "Legge di Bilancio 2025 (L. 207/2024)",
      lastVerified: "2026-01-02",
    },
    inps: {
      name: "INPS",
      url: "https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.01.circolare-numero-26-del-30-01-2025_14806.html",
      document: "Circolare INPS n. 26/2025, n. 38/2025",
      lastVerified: "2026-01-02",
    },
  },
};
