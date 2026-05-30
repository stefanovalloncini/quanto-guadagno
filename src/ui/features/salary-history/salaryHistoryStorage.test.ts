import { describe, it, expect, beforeEach } from "vitest";
import {
  loadSalaryHistory,
  saveSalaryHistory,
  SALARY_HISTORY_STORAGE_KEY,
} from "./salaryHistoryStorage.ts";
import { DEFAULT_ENTRY_SETTINGS, type SalaryEntry } from "./salaryHistory.ts";

function entry(year: number, grossAnnual: number): SalaryEntry {
  return {
    id: `e-${year}`,
    year,
    grossAnnual,
    createdAt: "2026-01-01T00:00:00.000Z",
    settings: DEFAULT_ENTRY_SETTINGS,
  };
}

describe("salary history storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty array when nothing is stored", () => {
    expect(loadSalaryHistory()).toEqual([]);
  });

  it("round-trips saved entries", () => {
    saveSalaryHistory([entry(2023, 25_000), entry(2024, 30_000)]);
    const loaded = loadSalaryHistory();
    expect(loaded).toHaveLength(2);
    expect(loaded[0]).toEqual(entry(2023, 25_000));
    expect(loaded[1]?.year).toBe(2024);
  });

  it("returns an empty array when the stored value is not valid JSON", () => {
    localStorage.setItem(SALARY_HISTORY_STORAGE_KEY, "{not json");
    expect(loadSalaryHistory()).toEqual([]);
  });

  it("drops entries that fail validation, keeping the valid ones", () => {
    localStorage.setItem(
      SALARY_HISTORY_STORAGE_KEY,
      JSON.stringify([
        entry(2024, 30_000),
        { garbage: true },
        42,
        null,
        { id: "", year: 2024, grossAnnual: 1, createdAt: "x", settings: DEFAULT_ENTRY_SETTINGS },
      ]),
    );
    const loaded = loadSalaryHistory();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.id).toBe("e-2024");
  });

  it("overwrites the previous entries on each save", () => {
    saveSalaryHistory([entry(2023, 25_000)]);
    saveSalaryHistory([entry(2024, 30_000)]);
    const loaded = loadSalaryHistory();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]?.year).toBe(2024);
  });
});
