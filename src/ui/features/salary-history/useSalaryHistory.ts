import { useCallback, useMemo, useState } from "react";
import { adjustValueAcrossYears, type AdjustedValue, type ContractType } from "@/domain/calc";
import { FOI_LATEST_YEAR } from "@/domain/data";
import { makeId, sortEntriesByYear, type SalaryEntry } from "./salaryHistory.ts";
import { loadSalaryHistory, saveSalaryHistory } from "./salaryHistoryStorage.ts";

export interface NewEntryInput {
  readonly year: number;
  readonly grossAnnual: number;
  readonly contractType?: ContractType;
  readonly note?: string;
}

export interface AdjustedEntry {
  readonly entry: SalaryEntry;
  readonly adjusted: AdjustedValue | null;
}

export interface SalaryHistory {
  readonly entries: ReadonlyArray<SalaryEntry>;
  readonly adjusted: ReadonlyArray<AdjustedEntry>;
  readonly targetYear: number;
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
        ...(input.contractType !== undefined ? { contractType: input.contractType } : {}),
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
      })),
    [entries, targetYear],
  );

  return { entries, adjusted, targetYear, addEntry, removeEntry, clear };
}
