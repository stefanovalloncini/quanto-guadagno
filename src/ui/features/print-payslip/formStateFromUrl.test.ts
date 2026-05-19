import { describe, it, expect } from "vitest";
import { formStateFromUrl } from "./formStateFromUrl";
import { DEFAULTS } from "@/ui/features/employee-calculator/useEmployeeCalculator";

describe("formStateFromUrl", () => {
  it("returns DEFAULTS when params are empty", () => {
    const out = formStateFromUrl(new URLSearchParams(""));
    expect(out).toEqual(DEFAULTS);
  });

  it("overrides gross annual when l param present", () => {
    const out = formStateFromUrl(new URLSearchParams("l=40000"));
    expect(out.grossAnnual).toBe(40000);
    expect(out.taxYear).toBe(DEFAULTS.taxYear);
  });

  it("decodes region and municipal rate", () => {
    const out = formStateFromUrl(new URLSearchParams("r=lazio&c=0.9"));
    expect(out.regionCode).toBe("lazio");
    expect(out.municipalTaxRate).toBeCloseTo(0.009, 6);
  });

  it("accepts long alias keys", () => {
    const out = formStateFromUrl(new URLSearchParams("lordo=45000"));
    expect(out.grossAnnual).toBe(45000);
  });

  it("ignores malformed values, falling back to defaults", () => {
    const out = formStateFromUrl(new URLSearchParams("l=abc&r=narnia"));
    expect(out.grossAnnual).toBe(DEFAULTS.grossAnnual);
    expect(out.regionCode).toBe(DEFAULTS.regionCode);
  });
});
