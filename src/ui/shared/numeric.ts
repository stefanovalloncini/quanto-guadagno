// For react-intl formatNumber: euro amount that drops cents when whole
// (€1.000) but keeps them when present (€258,23). Locale-aware, unlike
// the it-IT formatters below.
export const EUR_AMOUNT_FORMAT = {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  // Group below 10.000 too (€1.000, not €1000); the runtime default is "min2".
  useGrouping: true,
} as const satisfies Intl.NumberFormatOptions;

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
