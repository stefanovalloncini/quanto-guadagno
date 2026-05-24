import { useCallback, useMemo, useState } from "react";
import { adjustValueAcrossYears, type AdjustedValue, type SalaryBreakdown } from "@/domain/calc";
import { FOI_LATEST_YEAR } from "@/domain/data";
import {
  DEFAULT_ENTRY_SETTINGS,
  makeId,
  sortEntriesByYear,
  type SalaryEntry,
  type SalaryEntrySettings,
} from "./salaryHistory.ts";
import { computeHistoryNet } from "./historyNet.ts";
import { loadSalaryHistory, saveSalaryHistory } from "./salaryHistoryStorage.ts";

export interface NewEntryInput {
  readonly year: number;
  readonly grossAnnual: number;
  readonly settings?: SalaryEntrySettings;
  readonly note?: string;
}

export interface AdjustedEntry {
  readonly entry: SalaryEntry;
  readonly adjusted: AdjustedValue | null;
  readonly net: SalaryBreakdown | null;
}

export interface SalaryHistory {
  readonly entries: ReadonlyArray<SalaryEntry>;
  readonly adjusted: ReadonlyArray<AdjustedEntry>;
  readonly targetYear: number;
  readonly lastSettings: SalaryEntrySettings;
  readonly latestSupportedEntry: SalaryEntry | null;
  readonly addEntry: (input: NewEntryInput) => void;
  readonly removeEntry: (id: string) => void;
  readonly clear: () => void;
}

export function useSalaryHistory(): SalaryHistory {
  const [entries, setEntries] = useState<SalaryEntry[]>(() =>
    sortEntriesByYear(loadSalaryHistory()),
  );

  const persist = useCallback((next: SalaryEntry[]) => {
    const sorted = sortEntriesByYear(next);
    setEntries(sorted);
    saveSalaryHistory(sorted);
  }, []);

  const addEntry = useCallback(
    (input: NewEntryInput) => {
      const entry: SalaryEntry = {
        id: makeId(),
        year: input.year,
        grossAnnual: input.grossAnnual,
        createdAt: new Date().toISOString(),
        settings: input.settings ?? DEFAULT_ENTRY_SETTINGS,
        ...(input.note !== undefined && input.note.length > 0 ? { note: input.note } : {}),
      };
      persist([...entries, entry]);
    },
    [entries, persist],
  );

  const removeEntry = useCallback(
    (id: string) => {
      persist(entries.filter((e) => e.id !== id));
    },
    [entries, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  const targetYear = FOI_LATEST_YEAR;

  const adjusted = useMemo<ReadonlyArray<AdjustedEntry>>(
    () =>
      entries.map((entry) => ({
        entry,
        adjusted: adjustValueAcrossYears(entry.grossAnnual, entry.year, targetYear),
        net: computeHistoryNet(entry),
      })),
    [entries, targetYear],
  );

  const lastSettings = useMemo<SalaryEntrySettings>(() => {
    if (entries.length === 0) return DEFAULT_ENTRY_SETTINGS;
    return entries[entries.length - 1]?.settings ?? DEFAULT_ENTRY_SETTINGS;
  }, [entries]);

  const latestSupportedEntry = useMemo<SalaryEntry | null>(() => {
    for (let i = adjusted.length - 1; i >= 0; i -= 1) {
      const row = adjusted[i];
      if (row && row.net !== null) return row.entry;
    }
    return null;
  }, [adjusted]);

  return {
    entries,
    adjusted,
    targetYear,
    lastSettings,
    latestSupportedEntry,
    addEntry,
    removeEntry,
    clear,
  };
}
