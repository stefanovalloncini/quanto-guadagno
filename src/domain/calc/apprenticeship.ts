export interface ApprenticeshipInput {
  readonly targetGrossAnnual: number;
  readonly years: number;
  readonly progression: ReadonlyArray<number>;
}

export interface ApprenticeshipYear {
  readonly year: number;
  readonly percentageOfTarget: number;
  readonly grossAnnual: number;
}

export interface ApprenticeshipBreakdown {
  readonly targetGrossAnnual: number;
  readonly years: number;
  readonly schedule: ReadonlyArray<ApprenticeshipYear>;
}

const round = (n: number): number => Math.round(n * 100) / 100;

export const DEFAULT_APPRENTICESHIP_PROGRESSION: ReadonlyArray<number> = [0.85, 0.9, 0.95, 1, 1];

export function calculateApprenticeship(input: ApprenticeshipInput): ApprenticeshipBreakdown {
  const target = Math.max(0, input.targetGrossAnnual);
  const years = Math.max(1, Math.min(5, Math.floor(input.years)));

  const schedule: ApprenticeshipYear[] = [];
  for (let i = 0; i < years; i += 1) {
    const pct = input.progression[i] ?? input.progression[input.progression.length - 1] ?? 1;
    schedule.push({
      year: i + 1,
      percentageOfTarget: pct,
      grossAnnual: round(target * pct),
    });
  }

  return {
    targetGrossAnnual: round(target),
    years,
    schedule,
  };
}
