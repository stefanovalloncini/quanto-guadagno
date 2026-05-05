export interface PercentileBracket {
  readonly percentile: number;
  readonly threshold: number;
  readonly labelId: string;
}

export interface PercentileResult {
  readonly bracket: PercentileBracket;
  readonly nextBracket: PercentileBracket | null;
}

export function findPercentile(
  income: number,
  brackets: ReadonlyArray<PercentileBracket>,
): PercentileResult {
  if (brackets.length === 0) {
    throw new Error("brackets must not be empty");
  }
  const sorted = [...brackets].sort((a, b) => a.threshold - b.threshold);
  let bracket = sorted[0] as PercentileBracket;
  let nextIdx = 1;

  for (let i = 0; i < sorted.length; i += 1) {
    const candidate = sorted[i] as PercentileBracket;
    if (income >= candidate.threshold) {
      bracket = candidate;
      nextIdx = i + 1;
    } else {
      break;
    }
  }

  const nextBracket = nextIdx < sorted.length ? (sorted[nextIdx] as PercentileBracket) : null;
  return { bracket, nextBracket };
}
