import type {
  WorkDeductionConfig,
  TrattamentoIntegrativoConfig,
  DependentsDeductionConfig,
  ExpenseDeductionsConfig,
  EmployerInpsConfig,
  TfrConfig,
  OtherEmployerCostsConfig,
  MadreLavoratriceConfig,
  RegimeImpatriatiConfig,
  CompanyCarCo2Threshold,
  TaxWedgeCutConfig,
  ForfettarioConfig,
} from "./types.ts";

export const SHARED_WORK_DEDUCTION: WorkDeductionConfig = {
  thresholds: [15_000, 28_000, 50_000],
  baseDeduction: 1955,
  additionalDeduction: 1190,
  midBracketFixed: 1910,
};

export const SHARED_TRATTAMENTO_INTEGRATIVO: TrattamentoIntegrativoConfig = {
  maxAnnualBonus: 1200,
  fullBonusThreshold: 15_000,
  partialBonusThreshold: 28_000,
};

export const SHARED_DEPENDENTS_DEDUCTION: DependentsDeductionConfig = {
  spouseThresholds: [
    { income: 15_000, deduction: 800 },
    { income: 29_000, deduction: 690 },
    { income: 29_200, deduction: 700 },
    { income: 34_700, deduction: 710 },
    { income: 35_000, deduction: 720 },
    { income: 35_100, deduction: 710 },
    { income: 35_200, deduction: 700 },
    { income: 40_000, deduction: 690 },
    { income: 80_000, deduction: 690 },
  ],
  childOver21Deduction: 950,
  otherFamilyDeduction: 750,
  dependentIncomeLimit: 2840.51,
  dependentIncomeLimitYoung: 4000,
};

export const SHARED_EXPENSE_DEDUCTIONS: ExpenseDeductionsConfig = {
  maxMortgageInterest: 4000,
  medicalExpenseFloor: 129.11,
  medicalDeductionRate: 0.19,
  standardDeductionRate: 0.19,
};

export const SHARED_EMPLOYER_INPS: EmployerInpsConfig = {
  rate: 0.2381,
  aboveCeilingRate: 0.2381,
  apprenticeshipRate: 0.1181,
};

export const SHARED_TFR_CONFIG: TfrConfig = {
  accrualDivisor: 13.5,
  fixedRevaluationRate: 0.015,
  inflationPercentage: 0.75,
  revaluationTaxRate: 0.17,
};

export const SHARED_OTHER_EMPLOYER_COSTS: OtherEmployerCostsConfig = {
  inailRate: 0.004,
  maternityRate: 0.0046,
  naspiRate: 0.0161,
  naspiAdditionalDeterminatoRate: 0.014,
  cigRate: 0.009,
  otherRate: 0.0068,
};

export const SHARED_MADRE_LAVORATRICE: MadreLavoratriceConfig = {
  maxAnnualExemption: 3000,
  maxMonthlyExemption: 250,
  minChildrenFullExemption: 3,
  maxYoungestChildAge: 18,
};

export const SHARED_REGIME_IMPATRIATI: RegimeImpatriatiConfig = {
  standardExemptionRate: 0.5,
  withMinorChildrenExemptionRate: 0.6,
  maxEligibleIncome: 600_000,
  durationYears: 5,
};

export const SHARED_INPS_STANDARD_RATE = 0.0919;
export const SHARED_INPS_ABOVE_CEILING_RATE = 0.1019;
export const SHARED_INPS_APPRENTICESHIP_RATE = 0.0584;
// Addizionale CIGS 0,30% a carico lavoratore per aziende > 15 dipendenti.
// Fonte: Art. 9 c. 1 L. 407/1990, confermato dalle circolari INPS annuali.
export const SHARED_INPS_LARGE_COMPANY_ADDITIONAL_RATE = 0.003;
// Aliquota IVS dipendenti pubblici 8,80%.
// Fonte: Gestione Dipendenti Pubblici INPS (ex-INPDAP), Art. 22 L. 335/1995.
export const SHARED_INPS_PUBLIC_EMPLOYEE_RATE = 0.088;

// Forfettario — Art. 1, commi 54-89, L. 190/2014, novellato da L. 197/2022 (Bilancio 2023)
// Soglia ricavi €85.000 e tetto costi dipendenti €20.000 in vigore dal 2023.
export const SHARED_FORFETTARIO: ForfettarioConfig = {
  startupRate: 0.05,
  standardRate: 0.15,
  startupYears: 5,
  maxRevenue: 85_000,
  maxEmployeeCosts: 20_000,
};

// Gestione Separata INPS — aliquota piena (no altra copertura) e ridotta (con altra)
// Fonti: Circolari INPS n. 8/2024, n. 27/2025, n. 8/2026
export const SHARED_GESTIONE_SEPARATA_FULL_RATE = 0.2607;
export const SHARED_GESTIONE_SEPARATA_REDUCED_RATE = 0.24;

export const SHARED_MEAL_VOUCHERS_DAILY_THRESHOLD = 8;
export const SHARED_HEALTH_INSURANCE_THRESHOLD = 3615.2;
export const SHARED_DEFAULT_CONVENTIONAL_KM = 15_000;

// Company car CO2 brackets (used for contracts predating 2025 new-system)
// Fonte: Art. 51 TUIR
export const SHARED_COMPANY_CAR_CO2_THRESHOLDS: readonly CompanyCarCo2Threshold[] = [
  { maxCO2: 60, taxablePercentage: 0.25 },
  { maxCO2: 160, taxablePercentage: 0.3 },
  { maxCO2: 190, taxablePercentage: 0.5 },
  { maxCO2: null, taxablePercentage: 0.6 },
];

// Taglio cuneo fiscale 2025 — reso strutturale dalla L. 207/2024
// Fonte: Art. 1, commi 4-9, L. 207/2024
export const SHARED_TAX_WEDGE_CUT_PARAMS: TaxWedgeCutConfig = {
  sommaAggiuntiva: [
    { maxIncome: 8_500, rate: 0.071 },
    { maxIncome: 15_000, rate: 0.053 },
    { maxIncome: 20_000, rate: 0.048 },
  ],
  detrazioneAggiuntiva: {
    maxDeduction: 1000,
    fullDeductionThreshold: 32_000,
    phaseOutEnd: 40_000,
  },
};
