import type { HistoryPort } from "@/ports/HistoryPort";
import type { ShareLinkPort } from "@/ports/ShareLinkPort";
import { createLocalHistoryAdapter } from "@/adapters/storage-local/createLocalHistoryAdapter.ts";
import type { ScenarioPayload } from "@/ui/features/comparison/scenarioPayload.ts";

export interface Container {
  readonly scenarios: HistoryPort<ScenarioPayload>;
  readonly shareLink: ShareLinkPort | null;
}

let cached: Container | null = null;

export const createContainer = (): Container => {
  if (cached) return cached;
  cached = {
    scenarios: createLocalHistoryAdapter<ScenarioPayload>("qg.scenarios"),
    shareLink: null,
  };
  return cached;
};
