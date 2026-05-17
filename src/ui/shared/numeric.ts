export function clampInt(raw: string, min: number, max: number): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

const thousandsFormatter = new Intl.NumberFormat("it-IT", {
  useGrouping: true,
  maximumFractionDigits: 0,
});

export function formatThousands(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "";
  return thousandsFormatter.format(value);
}

export function parseDigits(raw: string): number {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits === "") return 0;
  return parseInt(digits, 10);
}
