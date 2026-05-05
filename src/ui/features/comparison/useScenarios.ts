import { useEffect, useMemo, useState } from "react";
import type { HistoryEntry } from "@/ports/HistoryPort";
import { createContainer } from "@/app/container.ts";
import { calculateSalaryBreakdown, type SalaryBreakdown } from "@/domain/calc";
import { getTaxConfig } from "@/domain/data";
import type { ScenarioPayload } from "./scenarioPayload.ts";

export interface ScenarioRow {
  readonly entry: HistoryEntry<ScenarioPayload>;
  readonly result: SalaryBreakdown;
}

export interface ScenariosState {
  readonly rows: ReadonlyArray<ScenarioRow>;
  readonly add: (label: string, payload: ScenarioPayload) => void;
  readonly remove: (id: string) => void;
  readonly clear: () => void;
}

const computeRow = (entry: HistoryEntry<ScenarioPayload>): ScenarioRow => ({
  entry,
  result: calculateSalaryBreakdown(
    {
      grossAnnual: entry.payload.grossAnnual,
      regionalRate: entry.payload.regionalRatePercent / 100,
      municipalRate: entry.payload.municipalRatePercent / 100,
    },
    getTaxConfig(entry.payload.taxYear),
  ),
});

export function useScenarios(): ScenariosState {
  const port = useMemo(() => createContainer().scenarios, []);
  const [entries, setEntries] = useState<ReadonlyArray<HistoryEntry<ScenarioPayload>>>([]);

  useEffect(() => {
    let cancelled = false;
    void port.list().then((value) => {
      if (!cancelled) setEntries(value);
    });
    return () => {
      cancelled = true;
    };
  }, [port]);

  const rows = useMemo(() => entries.map(computeRow), [entries]);

  return {
    rows,
    add: (label, payload) => {
      void port.add({ label, payload }).then((created) => setEntries((prev) => [...prev, created]));
    },
    remove: (id) => {
      void port.remove(id).then(() => setEntries((prev) => prev.filter((e) => e.id !== id)));
    },
    clear: () => {
      void port.clear().then(() => setEntries([]));
    },
  };
}
