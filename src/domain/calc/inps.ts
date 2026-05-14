export interface InpsConfig {
  readonly standardRate: number;
  readonly aboveCeilingRate: number;
  readonly ceiling: number;
  readonly massimale: number;
  readonly apprenticeshipRate?: number;
}

export interface InpsResult {
  readonly contribution: number;
  readonly belowCeiling: number;
  readonly aboveCeiling: number;
}

export function calculateInps(grossAnnual: number, cfg: InpsConfig): InpsResult {
  if (grossAnnual <= 0) {
    return { contribution: 0, belowCeiling: 0, aboveCeiling: 0 };
  }

  const cappedGross = Math.min(grossAnnual, cfg.massimale);
  const belowCeilingBase = Math.min(cappedGross, cfg.ceiling);
  const aboveCeilingBase = Math.max(0, cappedGross - cfg.ceiling);

  const belowCeiling = belowCeilingBase * cfg.standardRate;
  const aboveCeiling = aboveCeilingBase * cfg.aboveCeilingRate;

  return {
    contribution: belowCeiling + aboveCeiling,
    belowCeiling,
    aboveCeiling,
  };
}
