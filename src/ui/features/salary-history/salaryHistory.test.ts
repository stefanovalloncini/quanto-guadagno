import { describe, it, expect } from "vitest";
import {
  parseSalaryEntry,
  parseSalaryEntries,
  sortEntriesByYear,
  makeId,
} from "./salaryHistory.ts";

const VALID = {
  id: "abc",
  year: 2024,
  grossAnnual: 30_000,
  createdAt: "2024-06-01T00:00:00Z",
};

describe("parseSalaryEntry", () => {
  it("accepts a minimal valid object", () => {
    expect(parseSalaryEntry(VALID)).toEqual(VALID);
  });

  it("picks up optional contractType when valid", () => {
    const entry = parseSalaryEntry({ ...VALID, contractType: "apprendistato" });
    expect(entry?.contractType).toBe("apprendistato");
  });

  it("drops an unknown contractType silently", () => {
    const entry = parseSalaryEntry({ ...VALID, contractType: "freelance" });
    expect(entry?.contractType).toBeUndefined();
  });

  it("drops empty notes", () => {
    const entry = parseSalaryEntry({ ...VALID, note: "" });
    expect(entry?.note).toBeUndefined();
  });

  it("rejects missing id, year, gross, or createdAt", () => {
    expect(parseSalaryEntry({ ...VALID, id: undefined })).toBeNull();
    expect(parseSalaryEntry({ ...VALID, year: undefined })).toBeNull();
    expect(parseSalaryEntry({ ...VALID, grossAnnual: undefined })).toBeNull();
    expect(parseSalaryEntry({ ...VALID, createdAt: undefined })).toBeNull();
  });

  it("rejects unreasonable years", () => {
    expect(parseSalaryEntry({ ...VALID, year: 1700 })).toBeNull();
    expect(parseSalaryEntry({ ...VALID, year: 2200 })).toBeNull();
  });

  it("rejects negative gross", () => {
    expect(parseSalaryEntry({ ...VALID, grossAnnual: -1 })).toBeNull();
  });

  it("rejects non-object input", () => {
    expect(parseSalaryEntry(null)).toBeNull();
    expect(parseSalaryEntry(42)).toBeNull();
    expect(parseSalaryEntry("hi")).toBeNull();
  });
});

describe("parseSalaryEntries", () => {
  it("returns an empty array for non-array input", () => {
    expect(parseSalaryEntries(null)).toEqual([]);
    expect(parseSalaryEntries({})).toEqual([]);
  });

  it("drops invalid items and keeps the valid ones", () => {
    const result = parseSalaryEntries([VALID, "garbage", { ...VALID, id: "" }]);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("abc");
  });
});

describe("sortEntriesByYear", () => {
  it("sorts ascending by year", () => {
    const sorted = sortEntriesByYear([
      { ...VALID, id: "a", year: 2024 },
      { ...VALID, id: "b", year: 2020 },
      { ...VALID, id: "c", year: 2022 },
    ]);
    expect(sorted.map((e) => e.year)).toEqual([2020, 2022, 2024]);
  });
});

describe("makeId", () => {
  it("returns a non-empty unique string", () => {
    const a = makeId();
    const b = makeId();
    expect(a.length).toBeGreaterThan(0);
    expect(a).not.toBe(b);
  });
});
