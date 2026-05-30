import { describe, it, expect } from "vitest";
import { clampInt, formatThousands, formatWholeEuro, parseDigits } from "./numeric.ts";

describe("clampInt", () => {
  it("parses a base-10 integer", () => {
    expect(clampInt("42", 0, 100)).toBe(42);
  });

  it("returns the minimum for input that is not a number", () => {
    expect(clampInt("abc", 5, 100)).toBe(5);
    expect(clampInt("", 5, 100)).toBe(5);
  });

  it("clamps below the minimum and above the maximum", () => {
    expect(clampInt("-3", 0, 100)).toBe(0);
    expect(clampInt("250", 0, 100)).toBe(100);
  });

  it("reads the leading integer like parseInt", () => {
    expect(clampInt("30px", 0, 100)).toBe(30);
  });
});

describe("formatThousands", () => {
  it("groups thousands in the Italian style", () => {
    expect(formatThousands(1_234_567)).toBe("1.234.567");
  });

  it("rounds away any fractional part", () => {
    expect(formatThousands(1999.9)).toBe("2.000");
  });

  it("returns an empty string for zero or non-finite input", () => {
    expect(formatThousands(0)).toBe("");
    expect(formatThousands(Number.NaN)).toBe("");
    expect(formatThousands(Number.POSITIVE_INFINITY)).toBe("");
  });
});

describe("formatWholeEuro", () => {
  it("formats with Italian grouping, the euro sign, and no cents", () => {
    const out = formatWholeEuro(1_234_567);
    expect(out).toContain("1.234.567");
    expect(out).toContain("€");
    expect(out).not.toContain(",");
  });

  it("rounds to the nearest whole euro", () => {
    expect(formatWholeEuro(1234.49)).toBe(formatWholeEuro(1234));
    expect(formatWholeEuro(1234.5)).toBe(formatWholeEuro(1235));
  });
});

describe("parseDigits", () => {
  it("keeps only digit characters", () => {
    expect(parseDigits("1.234,56")).toBe(123456);
    expect(parseDigits("€ 2.000")).toBe(2000);
  });

  it("returns 0 when there are no digits", () => {
    expect(parseDigits("abc")).toBe(0);
    expect(parseDigits("")).toBe(0);
  });
});
