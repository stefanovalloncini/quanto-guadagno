import { parseSalaryEntries, type SalaryEntry } from "./salaryHistory.ts";

const STORAGE_KEY = "qg.salary-history.v1";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadSalaryHistory(): SalaryEntry[] {
  const storage = getStorage();
  if (storage === null) return [];
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  try {
    return parseSalaryEntries(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveSalaryHistory(entries: ReadonlyArray<SalaryEntry>): void {
  const storage = getStorage();
  if (storage === null) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Quota or privacy-mode failures: silent. The UI shouldn't crash.
  }
}

export { STORAGE_KEY as SALARY_HISTORY_STORAGE_KEY };
