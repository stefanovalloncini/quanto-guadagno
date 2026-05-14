import { describe, it, expect } from "vitest";
import { calculatePremioRisultato } from "@/domain/calc/bonusCalculations.ts";
import {
  calculateRegimeImpatriatiAdjustment,
  calculateMadreLavoratriceExemption,
  isMadreLavoratriceEligible,
} from "@/domain/calc/specialConditionsCalculations.ts";
import { TAX_CONFIG_2025 } from "@/domain/data/2025.ts";

const cfg = TAX_CONFIG_2025;

describe("calculatePremioRisultato", () => {
  it("returns zero result when no premio is provided", () => {
    const result = calculatePremioRisultato(
      undefined,
      30_000,
      cfg.inps.standardRate,
      cfg.irpefBrackets,
      cfg.pdrSostitutiva,
    );
    expect(result.pdrGross).toBe(0);
    expect(result.pdrInps).toBe(0);
    expect(result.pdrTax).toBe(0);
    expect(result.pdrNet).toBe(0);
  });

  it("taxes 3000 € premio at 5% sostitutiva (minus INPS), net is positive", () => {
    // PDR 2025: rate 5%, cap 3000
    // pdrInps = 3000 * 0.0919 ≈ 275.70
    // eligible = 3000, excess = 0
    // substitutiveTax = 3000 * (1 - 0.0919) * 0.05 ≈ 136.22
    // pdrNet = 3000 - 275.70 - 136.22 ≈ 2588
    const result = calculatePremioRisultato(
      { amount: 3000 },
      30_000,
      cfg.inps.standardRate,
      cfg.irpefBrackets,
      cfg.pdrSostitutiva,
    );
    expect(result.pdrGross).toBe(3000);
    expect(result.pdrInps).toBeCloseTo(3000 * cfg.inps.standardRate, 1);
    expect(result.pdrTax).toBeGreaterThan(0);
    expect(result.pdrNet).toBeGreaterThan(2000);
    // Sostitutiva tax should be close to the cap amount * rate * (1 - inpsRate)
    const expectedSubstitutive = 3000 * (1 - cfg.inps.standardRate) * cfg.pdrSostitutiva.rate;
    expect(result.pdrTax).toBeCloseTo(expectedSubstitutive, 1);
  });

  it("applies marginal rate to the amount above the cap", () => {
    // 5000 total: 3000 at sostitutiva 5%, 2000 at marginal 23% (income 20k)
    const result = calculatePremioRisultato(
      { amount: 5000 },
      20_000,
      cfg.inps.standardRate,
      cfg.irpefBrackets,
      cfg.pdrSostitutiva,
    );
    const inpsRate = cfg.inps.standardRate;
    const expectedSubstitutive = 3000 * (1 - inpsRate) * cfg.pdrSostitutiva.rate;
    const expectedExcess = 2000 * (1 - inpsRate) * 0.23; // 23% bracket
    expect(result.pdrTax).toBeCloseTo(expectedSubstitutive + expectedExcess, 1);
  });
});

describe("calculateRegimeImpatriatiAdjustment", () => {
  it("returns unmodified income when not enabled", () => {
    const result = calculateRegimeImpatriatiAdjustment(50_000, undefined, cfg.regimeImpatriati);
    expect(result.adjustedTaxableIncome).toBe(50_000);
    expect(result.exemptionRate).toBe(0);
    expect(result.exemptedIncome).toBe(0);
  });

  it("applies standard exemption rate when enabled without minor children", () => {
    const result = calculateRegimeImpatriatiAdjustment(
      100_000,
      { enabled: true, hasMinorChildren: false },
      cfg.regimeImpatriati,
    );
    expect(result.exemptionRate).toBe(cfg.regimeImpatriati.standardExemptionRate);
    expect(result.exemptedIncome).toBeGreaterThan(0);
    expect(result.adjustedTaxableIncome).toBeLessThan(100_000);
  });

  it("applies higher exemption with minor children", () => {
    const withoutChildren = calculateRegimeImpatriatiAdjustment(
      100_000,
      { enabled: true, hasMinorChildren: false },
      cfg.regimeImpatriati,
    );
    const withChildren = calculateRegimeImpatriatiAdjustment(
      100_000,
      { enabled: true, hasMinorChildren: true },
      cfg.regimeImpatriati,
    );
    expect(withChildren.exemptionRate).toBeGreaterThan(withoutChildren.exemptionRate);
  });
});

describe("isMadreLavoratriceEligible", () => {
  it("returns false when not enabled", () => {
    expect(
      isMadreLavoratriceEligible({ enabled: false, numberOfChildren: 3, youngestChildAge: 5 }, cfg.madreLavoratrice),
    ).toBe(false);
  });

  it("returns false when youngest child is too old", () => {
    const maxAge = cfg.madreLavoratrice.maxYoungestChildAge;
    expect(
      isMadreLavoratriceEligible(
        { enabled: true, numberOfChildren: 3, youngestChildAge: maxAge },
        cfg.madreLavoratrice,
      ),
    ).toBe(false);
  });

  it("returns true for eligible madre lavoratrice", () => {
    expect(
      isMadreLavoratriceEligible(
        { enabled: true, numberOfChildren: 3, youngestChildAge: 5 },
        cfg.madreLavoratrice,
      ),
    ).toBe(true);
  });
});

describe("calculateMadreLavoratriceExemption", () => {
  it("returns 0 when not eligible", () => {
    const exemption = calculateMadreLavoratriceExemption(
      5000,
      undefined,
      cfg.madreLavoratrice,
    );
    expect(exemption).toBe(0);
  });

  it("caps exemption at maxAnnualExemption", () => {
    const bigInps = cfg.madreLavoratrice.maxAnnualExemption * 2;
    const exemption = calculateMadreLavoratriceExemption(
      bigInps,
      { enabled: true, numberOfChildren: 3, youngestChildAge: 5 },
      cfg.madreLavoratrice,
    );
    expect(exemption).toBe(cfg.madreLavoratrice.maxAnnualExemption);
  });
});
