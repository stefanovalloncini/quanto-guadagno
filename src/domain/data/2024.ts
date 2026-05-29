/**
 * Italian Tax Configuration - 2024
 *
 * Sources:
 * - INPS rates: Circolare INPS n. 19/2024, n. 21/2024
 * - IRPEF brackets: Art. 11 TUIR, Legge di Bilancio 2024
 * - Work deductions: Art. 13 TUIR
 * - Trattamento Integrativo: Art. 1 D.L. 3/2020
 * - Esonero contributivo: Art. 1 cc. 15-16, L. 213/2023; Circolare INPS n. 11/2024
 * - Dependents deductions: Art. 12 TUIR
 * - Expense deductions: Art. 15 TUIR
 * - Fringe benefits: Art. 51 TUIR
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
  SHARED_MEAL_VOUCHERS_PAPER_THRESHOLD,
  SHARED_HEALTH_INSURANCE_THRESHOLD,
  SHARED_DEFAULT_CONVENTIONAL_KM,
  SHARED_COMPANY_CAR_CO2_THRESHOLDS,
  SHARED_FORFETTARIO,
  SHARED_GESTIONE_SEPARATA_FULL_RATE,
  SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
} from "./shared.ts";

export const TAX_CONFIG_2024: YearlyTaxConfig = {
  year: 2024,

  inps: {
    // Fonte: Circolare INPS n. 21/2024
    standardRate: SHARED_INPS_STANDARD_RATE,
    aboveCeilingRate: SHARED_INPS_ABOVE_CEILING_RATE,
    ceiling: 55_008, // Prima fascia retributiva 2024 (€4.584/mese)
    massimale: 119_650, // Massimale contributivo 2024
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

  // Esonero contributivo INPS 2024 — Circolare INPS n. 11 del 16/01/2024
  inpsExemption2024: {
    brackets: [
      { maxMonthlyIncome: 1923, exemptionRate: 0.07 },
      { maxMonthlyIncome: 2692, exemptionRate: 0.06 },
    ],
  },

  taxWedgeCut: null,

  dependentsDeduction: SHARED_DEPENDENTS_DEDUCTION,
  expenseDeductions: SHARED_EXPENSE_DEDUCTIONS,
  employerInps: SHARED_EMPLOYER_INPS,
  tfr: SHARED_TFR_CONFIG,
  otherEmployerCosts: SHARED_OTHER_EMPLOYER_COSTS,

  // Fringe benefits — Art. 51 TUIR
  fringeBenefits: {
    mealVouchersDailyThreshold: SHARED_MEAL_VOUCHERS_DAILY_THRESHOLD,
    mealVouchersPaperThreshold: SHARED_MEAL_VOUCHERS_PAPER_THRESHOLD,
    healthInsuranceThreshold: SHARED_HEALTH_INSURANCE_THRESHOLD,
    // €1.000/anno welfare generale (L. 213/2023, Legge di Bilancio 2024, art. 1 c. 16)
    welfareThresholdGeneral: 1000,
    // €2.000/anno con figli fiscalmente a carico (stessa norma)
    welfareThresholdWithChildren: 2000,
    companyCarCo2Thresholds: SHARED_COMPANY_CAR_CO2_THRESHOLDS,
    defaultConventionalKm: SHARED_DEFAULT_CONVENTIONAL_KM,
  },

  madreLavoratrice: SHARED_MADRE_LAVORATRICE,
  regimeImpatriati: SHARED_REGIME_IMPATRIATI,

  // Premio di Risultato — Art. 1 c.182 L.208/2015
  // L. Bilancio 2024 ha ridotto l'aliquota sostitutiva dal 10% al 5%
  pdrSostitutiva: {
    rate: 0.05,
    maxAmount: 3000,
  },

  forfettario: SHARED_FORFETTARIO,

  // Gestione Separata 2024 — Circolare INPS n. 8/2024
  gestioneSeparata: {
    fullRate: SHARED_GESTIONE_SEPARATA_FULL_RATE,
    reducedRate: SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
    massimale: 119_650,
    minimaleReddito: 18_415,
  },

  sources: {
    primary: {
      name: "Agenzia delle Entrate",
      url: "https://www.agenziaentrate.gov.it",
      document: "Art. 11 TUIR, Legge di Bilancio 2024",
      lastVerified: "2024-12-01",
    },
    inps: {
      name: "INPS",
      url: "https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2024.01.circolare-numero-11-del-16-01-2024_14437.html",
      document: "Circolare INPS n. 11/2024, n. 19/2024, n. 21/2024",
      lastVerified: "2024-12-01",
    },
  },
};
