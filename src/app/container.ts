import type { TaxDataPort } from "@/ports/TaxDataPort";
import type { HistoryPort } from "@/ports/HistoryPort";
import type { ShareLinkPort } from "@/ports/ShareLinkPort";

export interface Container {
  readonly taxData: TaxDataPort;
  readonly history: HistoryPort;
  readonly shareLink: ShareLinkPort;
}

export const createContainer = (): Container => {
  throw new Error("Container not wired yet. Adapters land in the next plan.");
};
