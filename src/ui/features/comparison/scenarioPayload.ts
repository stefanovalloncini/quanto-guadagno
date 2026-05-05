import type { SupportedYear } from "@/domain/data";

export interface ScenarioPayload {
  readonly grossAnnual: number;
  readonly taxYear: SupportedYear;
  readonly regionalRatePercent: number;
  readonly municipalRatePercent: number;
}
