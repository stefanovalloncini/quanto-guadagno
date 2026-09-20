import { describe, it, expect } from "vitest";
import { parseUrlState, writeUrlState, type UrlState } from "./urlState.ts";

const DEFAULTS: UrlState = {
  grossAnnual: 30_000,
  taxYear: 2026,
  regionCode: "lombardia",
  municipalTaxRate: 0.008,
  contractType: "indeterminato",
  paymentFrequency: 13,
  companySize: "small",
  isPublicEmployee: false,
  inpsOverride: null,
  salaryMode: "gross",
  targetNetMonthly: 1_800,
};

describe("writeUrlState — compact output", () => {
  it("emits no params when the state matches defaults", () => {
    const p = writeUrlState(new URLSearchParams(), DEFAULTS, DEFAULTS);
    expect(p.toString()).toBe("");
  });

  it("emits only the keys that diverge from defaults", () => {
    const p = writeUrlState(
      new URLSearchParams(),
      { ...DEFAULTS, grossAnnual: 42_000, regionCode: "toscana" },
      DEFAULTS,
    );
    expect(p.get("l")).toBe("42000");
    expect(p.get("r")).toBe("toscana");
    expect(p.has("y")).toBe(false);
    expect(p.has("c")).toBe(false);
    expect(p.has("m")).toBe(false);
    expect(p.has("t")).toBe(false);
  });

  it("writes az15 only when companySize is large", () => {
    const off = writeUrlState(new URLSearchParams(), DEFAULTS, DEFAULTS);
    const on = writeUrlState(
      new URLSearchParams(),
      { ...DEFAULTS, companySize: "large" },
      DEFAULTS,
    );
    expect(off.has("a")).toBe(false);
    expect(on.get("a")).toBe("1");
  });

  it("writes pubblico only when set", () => {
    const off = writeUrlState(new URLSearchParams(), DEFAULTS, DEFAULTS);
    const on = writeUrlState(
      new URLSearchParams(),
      { ...DEFAULTS, isPublicEmployee: true },
      DEFAULTS,
    );
    expect(off.has("p")).toBe(false);
    expect(on.get("p")).toBe("1");
  });

  it("writes inps override when set", () => {
    const p = writeUrlState(
      new URLSearchParams(),
      { ...DEFAULTS, inpsOverride: { employeeRate: 0.0949, employerRate: 0.2381 } },
      DEFAULTS,
    );
    expect(p.get("e")).toBe("9.49");
    expect(p.get("d")).toBe("23.81");
  });

  it("preserves unknown params already in the URL", () => {
    const base = new URLSearchParams("ref=newsletter&utm_source=foo");
    const p = writeUrlState(base, { ...DEFAULTS, grossAnnual: 42_000 }, DEFAULTS);
    expect(p.get("ref")).toBe("newsletter");
    expect(p.get("utm_source")).toBe("foo");
  });

  it("strips long alias keys so we never emit duplicates", () => {
    const base = new URLSearchParams("lordo=99999&contratto=apprendistato");
    const p = writeUrlState(base, { ...DEFAULTS, grossAnnual: 42_000 }, DEFAULTS);
    expect(p.has("lordo")).toBe(false);
    expect(p.has("contratto")).toBe(false);
    expect(p.get("l")).toBe("42000");
  });
});

describe("parseUrlState", () => {
  it("round-trips a full state through write + parse", () => {
    const full: UrlState = {
      ...DEFAULTS,
      grossAnnual: 42_000,
      regionCode: "toscana",
      municipalTaxRate: 0.002,
      paymentFrequency: 14,
      contractType: "apprendistato",
      companySize: "large",
      isPublicEmployee: true,
      inpsOverride: { employeeRate: 0.0949, employerRate: 0.2381 },
    };
    const params = writeUrlState(new URLSearchParams(), full, DEFAULTS);
    const parsed = parseUrlState(params);
    expect(parsed).toEqual({
      grossAnnual: full.grossAnnual,
      regionCode: full.regionCode,
      municipalTaxRate: full.municipalTaxRate,
      paymentFrequency: full.paymentFrequency,
      contractType: full.contractType,
      companySize: "large",
      isPublicEmployee: true,
      inpsOverride: full.inpsOverride,
    });
  });

  it("still reads legacy long names", () => {
    const params = new URLSearchParams("lordo=42000&regione=toscana&contratto=apprendistato");
    const parsed = parseUrlState(params);
    expect(parsed.grossAnnual).toBe(42_000);
    expect(parsed.regionCode).toBe("toscana");
    expect(parsed.contractType).toBe("apprendistato");
  });

  it("prefers the short key when both forms are present", () => {
    const params = new URLSearchParams("l=42000&lordo=10000");
    expect(parseUrlState(params).grossAnnual).toBe(42_000);
  });

  it("rejects an unknown regione", () => {
    expect(parseUrlState(new URLSearchParams("r=narnia")).regionCode).toBeUndefined();
  });

  it("rejects out-of-range lordo", () => {
    expect(parseUrlState(new URLSearchParams("l=-100")).grossAnnual).toBeUndefined();
    expect(parseUrlState(new URLSearchParams("l=0")).grossAnnual).toBeUndefined();
  });

  it("ignores partial inps override (employee only)", () => {
    expect(parseUrlState(new URLSearchParams("e=9.49")).inpsOverride).toBeUndefined();
  });

  it("returns an empty object when no params match", () => {
    expect(parseUrlState(new URLSearchParams("foo=bar"))).toEqual({});
  });
});

describe("salary mode", () => {
  it("writes nothing extra while the gross is the starting point", () => {
    const p = writeUrlState(new URLSearchParams(), DEFAULTS, DEFAULTS);
    expect(p.has("s")).toBe(false);
    expect(p.has("n")).toBe(false);
  });

  it("writes the mode and the target when starting from the net", () => {
    const p = writeUrlState(
      new URLSearchParams(),
      { ...DEFAULTS, salaryMode: "net", targetNetMonthly: 2_000 },
      DEFAULTS,
    );
    expect(p.get("s")).toBe("n");
    expect(p.get("n")).toBe("2000");
  });

  it("round-trips the mode and the target", () => {
    const p = writeUrlState(
      new URLSearchParams(),
      { ...DEFAULTS, salaryMode: "net", targetNetMonthly: 2_150 },
      DEFAULTS,
    );
    const parsed = parseUrlState(p);
    expect(parsed.salaryMode).toBe("net");
    expect(parsed.targetNetMonthly).toBe(2_150);
  });

  it("keeps the target out of the URL when it matches the default", () => {
    const p = writeUrlState(new URLSearchParams(), { ...DEFAULTS, salaryMode: "net" }, DEFAULTS);
    expect(p.get("s")).toBe("n");
    expect(p.has("n")).toBe(false);
    expect(parseUrlState(p).targetNetMonthly).toBeUndefined();
  });

  it("ignores an unknown mode", () => {
    expect(parseUrlState(new URLSearchParams("s=x")).salaryMode).toBeUndefined();
  });

  it("rejects a target net outside the plausible range", () => {
    expect(parseUrlState(new URLSearchParams("n=0")).targetNetMonthly).toBeUndefined();
    expect(parseUrlState(new URLSearchParams("n=-500")).targetNetMonthly).toBeUndefined();
    expect(parseUrlState(new URLSearchParams("n=999999")).targetNetMonthly).toBeUndefined();
  });
});
