import { describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";

function wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

function setup(initialEntry = "/") {
  return renderHook(() => useEmployeeCalculator(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    ),
  });
}

describe("useEmployeeCalculator", () => {
  it("starts from the gross", () => {
    const { result } = renderHook(() => useEmployeeCalculator(), { wrapper });
    expect(result.current.state.salaryMode).toBe("gross");
    expect(result.current.input.grossAnnual).toBe(30_000);
    expect(result.current.result.netAnnual).toBeCloseTo(23_425.52, 2);
  });

  it("seeds the target net from the current result when the mode flips", () => {
    const { result } = renderHook(() => useEmployeeCalculator(), { wrapper });
    act(() => {
      result.current.setSalaryMode("net");
    });
    expect(result.current.state.salaryMode).toBe("net");
    expect(result.current.state.targetNetMonthly).toBe(1_802);
  });

  it("solves the gross that produces the wanted net", () => {
    const { result } = setup("/?s=n&n=1800");
    expect(result.current.state.salaryMode).toBe("net");
    expect(result.current.input.grossAnnual).toBeGreaterThan(29_000);
    expect(result.current.input.grossAnnual).toBeLessThan(30_000);
    expect(Math.abs(result.current.result.netAnnual - 1_800 * 13)).toBeLessThan(2);
  });

  it("keeps the other inputs in effect while solving", () => {
    const { result } = setup("/?s=n&n=1800&r=lazio&y=2025");
    expect(result.current.input.regionCode).toBe("lazio");
    expect(result.current.input.taxYear).toBe(2025);
    expect(Math.abs(result.current.result.netAnnual - 1_800 * 13)).toBeLessThan(2);
  });

  it("re-solves when the mensilità change", () => {
    const { result } = setup("/?s=n&n=1800");
    const before = result.current.input.grossAnnual;
    act(() => {
      result.current.update({ paymentFrequency: 14 });
    });
    expect(result.current.input.grossAnnual).toBeGreaterThan(before);
    expect(Math.abs(result.current.result.netAnnual - 1_800 * 14)).toBeLessThan(2);
  });

  it("carries the solved gross over when the mode flips back", () => {
    const { result } = setup("/?s=n&n=1800");
    const solved = result.current.input.grossAnnual;
    act(() => {
      result.current.setSalaryMode("gross");
    });
    expect(result.current.state.salaryMode).toBe("gross");
    expect(result.current.state.grossAnnual).toBe(solved);
    expect(result.current.input.grossAnnual).toBe(solved);
  });
});
