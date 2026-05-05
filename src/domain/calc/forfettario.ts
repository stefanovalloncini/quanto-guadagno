import {
  calculateGestioneSeparata,
  type GestioneSeparataConfig,
  type GestioneSeparataKind,
} from "./inpsGestioneSeparata.ts";

export interface ForfettarioConfig {
  readonly startupRate: number;
  readonly standardRate: number;
  readonly maxRevenue: number;
  readonly gestioneSeparata: GestioneSeparataConfig;
}

export interface ForfettarioInput {
  readonly revenue: number;
  readonly profitabilityCoefficient: number;
  readonly isStartup: boolean;
  readonly inpsKind: GestioneSeparataKind;
}

export interface ForfettarioBreakdown {
  readonly revenue: number;
  readonly grossTaxableIncome: number;
  readonly inpsContribution: number;
  readonly netTaxableIncome: number;
  readonly substituteRate: number;
  readonly substituteTax: number;
  readonly netAnnual: number;
  readonly netMonthly: number;
  readonly effectiveTaxRate: number;
  readonly aboveRevenueLimit: boolean;
}

const round = (n: number): number => Math.round(n * 100) / 100;

export function calculateForfettarioBreakdown(
  input: ForfettarioInput,
  cfg: ForfettarioConfig,
): ForfettarioBreakdown {
  const revenue = Math.max(0, input.revenue);
  const aboveRevenueLimit = revenue > cfg.maxRevenue;

  const coefficient = Math.min(1, Math.max(0, input.profitabilityCoefficient));
  const grossTaxableIncome = revenue * coefficient;

  const inpsContribution = calculateGestioneSeparata(
    grossTaxableIncome,
    input.inpsKind,
    cfg.gestioneSeparata,
  );

  const netTaxableIncome = Math.max(0, grossTaxableIncome - inpsContribution);
  const substituteRate = input.isStartup ? cfg.startupRate : cfg.standardRate;
  const substituteTax = netTaxableIncome * substituteRate;

  const netAnnual = revenue - inpsContribution - substituteTax;
  const effectiveTaxRate = revenue > 0 ? 1 - netAnnual / revenue : 0;

  return {
    revenue: round(revenue),
    grossTaxableIncome: round(grossTaxableIncome),
    inpsContribution: round(inpsContribution),
    netTaxableIncome: round(netTaxableIncome),
    substituteRate,
    substituteTax: round(substituteTax),
    netAnnual: round(netAnnual),
    netMonthly: round(netAnnual / 12),
    effectiveTaxRate: Math.round(effectiveTaxRate * 10000) / 10000,
    aboveRevenueLimit,
  };
}
