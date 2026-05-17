/**
 * Italian Tax Configuration - 2026
 *
 * Legge di Bilancio 2026 approvata il 30 dicembre 2025.
 *
 * Changes from 2025:
 * - IRPEF: aliquota secondo scaglione ridotta dal 35% al 33% (€28.001-€50.000)
 * - INPS ceiling updated (rivalutazione ISTAT +1,40%)
 * - Taglio cuneo fiscale reso strutturale (confermato per 2026)
 * - Buoni pasto elettronici: soglia passa da €8 a €10
 * - Premio di Risultato: aliquota sostitutiva ridotta al 1%, soglia elevata a €5.000
 *
 * Sources:
 * - Legge di Bilancio 2026 (L. 199/2025) — GU n. 301 del 30/12/2025
 * - Circolare INPS n. 6/2026, n. 8/2026, n. 14/2026
 * - Decreto MEF 19 novembre 2025 (perequazione automatica +1,40%)
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
  SHARED_HEALTH_INSURANCE_THRESHOLD,
  SHARED_DEFAULT_CONVENTIONAL_KM,
  SHARED_COMPANY_CAR_CO2_THRESHOLDS,
  SHARED_TAX_WEDGE_CUT_PARAMS,
  SHARED_FORFETTARIO,
  SHARED_GESTIONE_SEPARATA_FULL_RATE,
  SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
} from "./shared.ts";

export const TAX_CONFIG_2026: YearlyTaxConfig = {
  year: 2026,

  inps: {
    // Rivalutazione ISTAT +1,40% — Decreto MEF 19/11/2025
    // Fonte: Circolare INPS n. 6 del 30/01/2026
    standardRate: SHARED_INPS_STANDARD_RATE,
    aboveCeilingRate: SHARED_INPS_ABOVE_CEILING_RATE,
    ceiling: 56_224, // Prima fascia retributiva 2026 (€56.224,40)
    massimale: 122_295, // Massimale contributivo 2026
    apprenticeshipRate: SHARED_INPS_APPRENTICESHIP_RATE,
    largeCompanyAdditionalRate: SHARED_INPS_LARGE_COMPANY_ADDITIONAL_RATE,
    publicEmployeeRate: SHARED_INPS_PUBLIC_EMPLOYEE_RATE,
  },

  // IRPEF 2026 — Legge di Bilancio 2026
  // Novità: aliquota secondo scaglione ridotta dal 35% al 33%
  irpefBrackets: [
    { min: 0, max: 28_000, rate: 0.23 },
    { min: 28_000, max: 50_000, rate: 0.33 },
    { min: 50_000, max: null, rate: 0.43 },
  ],

  workDeduction: SHARED_WORK_DEDUCTION,
  trattamentoIntegrativo: SHARED_TRATTAMENTO_INTEGRATIVO,

  inpsExemption2024: null,

  // Taglio cuneo fiscale — reso strutturale dalla L. 207/2024, confermato per 2026
  taxWedgeCut: SHARED_TAX_WEDGE_CUT_PARAMS,

  dependentsDeduction: SHARED_DEPENDENTS_DEDUCTION,
  expenseDeductions: SHARED_EXPENSE_DEDUCTIONS,
  employerInps: SHARED_EMPLOYER_INPS,
  tfr: SHARED_TFR_CONFIG,
  otherEmployerCosts: SHARED_OTHER_EMPLOYER_COSTS,

  // Fringe benefits — Art. 1, commi 386-389, L. 207/2024
  // Buoni pasto: L. 199/2025 art. 1 c.16 (soglia passa da €8 a €10)
  fringeBenefits: {
    mealVouchersDailyThreshold: 10,
    healthInsuranceThreshold: SHARED_HEALTH_INSURANCE_THRESHOLD,
    // €1.000/anno welfare generale (triennio 2025-2027)
    welfareThresholdGeneral: 1000,
    // €2.000/anno con figli fiscalmente a carico (triennio 2025-2027)
    welfareThresholdWithChildren: 2000,
    companyCarCo2Thresholds: SHARED_COMPANY_CAR_CO2_THRESHOLDS,
    // L. 207/2024 Art. 48: sistema a powertrain confermato per il 2026
    companyCarPowertrainRates: [
      { powertrainType: "bev", taxablePercentage: 0.1 },
      { powertrainType: "phev", taxablePercentage: 0.2 },
      { powertrainType: "other", taxablePercentage: 0.5 },
    ],
    defaultConventionalKm: SHARED_DEFAULT_CONVENTIONAL_KM,
  },

  madreLavoratrice: SHARED_MADRE_LAVORATRICE,
  regimeImpatriati: SHARED_REGIME_IMPATRIATI,

  // Premio di Risultato — Art. 1, comma 9, L. 199/2025
  // Riduzione imposta sostitutiva dal 5% all'1%; soglia innalzata da €3.000 a €5.000
  // Fonte: AdE Circolare n. 2/E del 24 febbraio 2026
  pdrSostitutiva: {
    rate: 0.01,
    maxAmount: 5000,
  },

  forfettario: SHARED_FORFETTARIO,

  // Gestione Separata 2026 — Circolare INPS n. 8/2026
  // Rivalutazione ISTAT +1,40% applicata a massimale e minimale (DM 19/11/2025).
  gestioneSeparata: {
    fullRate: SHARED_GESTIONE_SEPARATA_FULL_RATE,
    reducedRate: SHARED_GESTIONE_SEPARATA_REDUCED_RATE,
    massimale: 122_295,
    minimaleReddito: 18_815,
  },

  sources: {
    primary: {
      name: "Gazzetta Ufficiale",
      url: "https://www.gazzettaufficiale.it/atto/vediMenuHTML?atto.dataPubblicazioneGazzetta=2025-12-30&atto.codiceRedazionale=25G00212&tipoSerie=serie_generale&tipoVigenza=originario",
      document: "Legge di Bilancio 2026 (L. 199/2025) — GU n. 301 del 30/12/2025",
      lastVerified: "2026-02-21",
    },
    inps: {
      name: "INPS",
      url: "https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html",
      document: "Circolare INPS n. 6/2026 (dipendenti), n. 8/2026 (Gestione Separata)",
      lastVerified: "2026-02-21",
    },
  },
};
