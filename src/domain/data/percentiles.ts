import type { PercentileBracket } from "@/domain/calc/percentile.ts";

export const ITALIAN_NET_PERCENTILES_2023: ReadonlyArray<PercentileBracket> = [
  { percentile: 99, threshold: 0, labelId: "percentile.bottom1" },
  { percentile: 90, threshold: 15_000, labelId: "percentile.bottom10" },
  { percentile: 80, threshold: 22_000, labelId: "percentile.bottom20" },
  { percentile: 50, threshold: 28_000, labelId: "percentile.median" },
  { percentile: 30, threshold: 33_000, labelId: "percentile.top30" },
  { percentile: 20, threshold: 35_000, labelId: "percentile.top20" },
  { percentile: 10, threshold: 45_000, labelId: "percentile.top10" },
  { percentile: 5, threshold: 55_000, labelId: "percentile.top5" },
  { percentile: 1, threshold: 100_000, labelId: "percentile.top1" },
];
