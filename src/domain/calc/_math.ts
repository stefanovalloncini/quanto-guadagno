export function round(n: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function linearPhaseOut(value: number, start: number, end: number): number {
  if (value <= start) return 1;
  if (value >= end || end === start) return 0;
  return (end - value) / (end - start);
}
