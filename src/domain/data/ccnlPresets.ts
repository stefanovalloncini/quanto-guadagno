import type { CcnlId } from "./preavviso.ts";
import type { PaymentFrequency } from "@/domain/calc";

export interface CcnlPreset {
  readonly paymentFrequency: PaymentFrequency;
}

// Mensilità tipiche per i quattro CCNL coperti dal calcolatore preavviso.
// Fonti in docs/data-verification/ccnl-mensilita.md.
export const CCNL_PRESETS: Readonly<Record<CcnlId, CcnlPreset>> = {
  commercio: { paymentFrequency: 14 },
  metalmeccanici: { paymentFrequency: 13 },
  logistica: { paymentFrequency: 14 },
  "cooperative-sociali": { paymentFrequency: 13 },
};

export const CCNL_PRESET_IDS: ReadonlyArray<CcnlId> = [
  "commercio",
  "metalmeccanici",
  "logistica",
  "cooperative-sociali",
];
