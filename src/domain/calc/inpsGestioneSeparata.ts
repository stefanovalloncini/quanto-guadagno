export interface GestioneSeparataConfig {
  readonly fullRate: number;
  readonly reducedRate: number;
  readonly minContribution: number;
  readonly maxContribution: number;
}

export type GestioneSeparataKind = "full" | "reduced";

export function calculateGestioneSeparata(
  taxableBase: number,
  kind: GestioneSeparataKind,
  cfg: GestioneSeparataConfig,
): number {
  if (taxableBase <= 0) return 0;
  const rate = kind === "full" ? cfg.fullRate : cfg.reducedRate;
  const cappedBase = Math.min(taxableBase, cfg.maxContribution);
  const contribution = cappedBase * rate;
  return Math.max(cfg.minContribution, contribution);
}
