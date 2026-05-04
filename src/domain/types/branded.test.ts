import { describe, expect, it } from "vitest";
import { isTaxYear, toEur, toSalary } from "./branded.ts";

describe("branded types", () => {
  it("toEur accepts finite numbers", () => {
    expect(toEur(0)).toBe(0);
    expect(toEur(1234.56)).toBe(1234.56);
  });

  it("toEur rejects NaN and Infinity", () => {
    expect(() => toEur(Number.NaN)).toThrow(RangeError);
    expect(() => toEur(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });

  it("toSalary rejects negatives", () => {
    expect(() => toSalary(-1)).toThrow(RangeError);
  });

  it("isTaxYear narrows correctly", () => {
    expect(isTaxYear(2024)).toBe(true);
    expect(isTaxYear(2030)).toBe(false);
  });
});
