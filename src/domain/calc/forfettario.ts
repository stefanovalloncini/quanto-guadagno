import { round } from "./_math.ts";

export interface ForfettarioConfig {
  readonly startupRate: number;
  readonly standardRate: number;
  readonly startupYears: number;
  readonly maxRevenue: number;
  readonly maxEmployeeCosts: number;
}

export interface GestioneSeparataConfig {
  readonly fullRate: number;
  readonly reducedRate: number;
  readonly massimale: number;
  readonly minimaleReddito: number;
}

export interface ForfettarioEligibility {
  readonly eligible: boolean;
  readonly reasons: ReadonlyArray<string>;
  readonly revenueLimitPercentage: number;
  readonly warning: boolean;
}

export interface ForfettarioInput {
  readonly revenue: number;
  readonly coefficient: number;
  readonly yearsOfActivity: number;
  readonly hasOtherPension: boolean;
  readonly employeeCosts: number;
}

export interface ForfettarioBreakdown {
  readonly revenue: number;
  readonly coefficient: number;
  readonly imponibileLordo: number;
  readonly contributoInps: number;
  readonly aliquotaInps: number;
  readonly imponibileNetto: number;
  readonly aliquotaSostitutiva: number;
  readonly impostaSostitutiva: number;
  readonly totaleImposte: number;
  readonly nettoAnnuale: number;
  readonly nettoMensile: number;
  readonly pressioneFiscaleEffettiva: number;
  readonly eligibility: ForfettarioEligibility;
}

export function calculateForfettarioEligibility(
  revenue: number,
  employeeCosts: number,
  cfg: ForfettarioConfig,
): ForfettarioEligibility {
  const reasons: string[] = [];
  const percentage = cfg.maxRevenue > 0 ? (revenue / cfg.maxRevenue) * 100 : 0;

  if (revenue > cfg.maxRevenue) {
    reasons.push("revenue-exceeds-limit");
  }
  if (employeeCosts > cfg.maxEmployeeCosts) {
    reasons.push("employee-costs-exceed-limit");
  }

  return {
    eligible: reasons.length === 0,
    reasons,
    revenueLimitPercentage: Math.min(percentage, 100),
    warning: percentage >= 80 && percentage <= 100 && reasons.length === 0,
  };
}

export function calculateGestioneSeparataContribution(
  imponibile: number,
  hasOtherPension: boolean,
  cfg: GestioneSeparataConfig,
): { contribution: number; rate: number } {
  if (imponibile <= 0) {
    return { contribution: 0, rate: hasOtherPension ? cfg.reducedRate : cfg.fullRate };
  }
  const rate = hasOtherPension ? cfg.reducedRate : cfg.fullRate;
  const cappedBase = Math.min(imponibile, cfg.massimale);
  return { contribution: cappedBase * rate, rate };
}

export function calculateForfettario(
  input: ForfettarioInput,
  cfg: ForfettarioConfig,
  gestioneSeparata: GestioneSeparataConfig,
): ForfettarioBreakdown {
  const { revenue, coefficient, yearsOfActivity, hasOtherPension, employeeCosts } = input;

  const eligibility = calculateForfettarioEligibility(revenue, employeeCosts, cfg);

  const imponibileLordo = revenue * coefficient;
  const inps = calculateGestioneSeparataContribution(
    imponibileLordo,
    hasOtherPension,
    gestioneSeparata,
  );

  const imponibileNetto = Math.max(0, imponibileLordo - inps.contribution);
  const aliquotaSostitutiva =
    yearsOfActivity < cfg.startupYears ? cfg.startupRate : cfg.standardRate;
  const impostaSostitutiva = imponibileNetto * aliquotaSostitutiva;

  const totaleImposte = inps.contribution + impostaSostitutiva;
  const nettoAnnuale = revenue - totaleImposte;
  const nettoMensile = nettoAnnuale / 12;
  const pressioneFiscaleEffettiva = revenue > 0 ? totaleImposte / revenue : 0;

  return {
    revenue: round(revenue),
    coefficient,
    imponibileLordo: round(imponibileLordo),
    contributoInps: round(inps.contribution),
    aliquotaInps: inps.rate,
    imponibileNetto: round(imponibileNetto),
    aliquotaSostitutiva,
    impostaSostitutiva: round(impostaSostitutiva),
    totaleImposte: round(totaleImposte),
    nettoAnnuale: round(nettoAnnuale),
    nettoMensile: round(nettoMensile),
    pressioneFiscaleEffettiva,
    eligibility,
  };
}
