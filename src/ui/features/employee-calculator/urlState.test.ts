import { describe, it, expect } from "vitest";
import { parseUrlState, writeUrlState, type UrlState } from "./urlState.ts";

const STATE: UrlState = {
  grossAnnual: 30_000,
  taxYear: 2026,
  regionCode: "toscana",
  municipalTaxRate: 0.002,
  contractType: "indeterminato",
  paymentFrequency: 14,
  companySize: "small",
  isPublicEmployee: false,
  inpsOverride: null,
};

describe("writeUrlState", () => {
  it("emits the core fields", () => {
    const p = writeUrlState(new URLSearchParams(), STATE);
    expect(p.get("lordo")).toBe("30000");
    expect(p.get("anno")).toBe("2026");
    expect(p.get("regione")).toBe("toscana");
    expect(p.get("comune")).toBe("0.2");
    expect(p.get("mens")).toBe("14");
    expect(p.get("contratto")).toBe("indeterminato");
  });

  it("omits az15 when companySize is small", () => {
    const p = writeUrlState(new URLSearchParams(), STATE);
    expect(p.has("az15")).toBe(false);
  });

  it("writes az15=1 for large companies", () => {
    const p = writeUrlState(new URLSearchParams(), { ...STATE, companySize: "large" });
    expect(p.get("az15")).toBe("1");
  });

  it("writes pubblico=1 only when set", () => {
    const off = writeUrlState(new URLSearchParams(), STATE);
    const on = writeUrlState(new URLSearchParams(), { ...STATE, isPublicEmployee: true });
    expect(off.has("pubblico")).toBe(false);
    expect(on.get("pubblico")).toBe("1");
  });

  it("writes inpsEmp/inpsDat when override is set", () => {
    const p = writeUrlState(new URLSearchParams(), {
      ...STATE,
      inpsOverride: { employeeRate: 0.0949, employerRate: 0.2381 },
    });
    expect(p.get("inpsEmp")).toBe("9.49");
    expect(p.get("inpsDat")).toBe("23.81");
  });

  it("preserves unknown params already in the URL", () => {
    const base = new URLSearchParams("ref=newsletter&utm_source=foo");
    const p = writeUrlState(base, STATE);
    expect(p.get("ref")).toBe("newsletter");
    expect(p.get("utm_source")).toBe("foo");
  });
});

describe("parseUrlState", () => {
  it("round-trips a full state through write + parse", () => {
    const full: UrlState = {
      ...STATE,
      companySize: "large",
      isPublicEmployee: true,
      inpsOverride: { employeeRate: 0.0949, employerRate: 0.2381 },
    };
    const params = writeUrlState(new URLSearchParams(), full);
    const parsed = parseUrlState(params);
    expect(parsed).toEqual({
      grossAnnual: full.grossAnnual,
      taxYear: full.taxYear,
      regionCode: full.regionCode,
      municipalTaxRate: full.municipalTaxRate,
      paymentFrequency: full.paymentFrequency,
      contractType: full.contractType,
      companySize: "large",
      isPublicEmployee: true,
      inpsOverride: full.inpsOverride,
    });
  });

  it("rejects an unknown regione", () => {
    const parsed = parseUrlState(new URLSearchParams("regione=narnia"));
    expect(parsed.regionCode).toBeUndefined();
  });

  it("rejects out-of-range lordo", () => {
    const negative = parseUrlState(new URLSearchParams("lordo=-100"));
    const zero = parseUrlState(new URLSearchParams("lordo=0"));
    expect(negative.grossAnnual).toBeUndefined();
    expect(zero.grossAnnual).toBeUndefined();
  });

  it("ignores partial inps override (employee only)", () => {
    const parsed = parseUrlState(new URLSearchParams("inpsEmp=9.49"));
    expect(parsed.inpsOverride).toBeUndefined();
  });

  it("returns an empty object when no params match", () => {
    const parsed = parseUrlState(new URLSearchParams("foo=bar"));
    expect(parsed).toEqual({});
  });
});
