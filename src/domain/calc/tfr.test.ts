import { describe, it, expect } from "vitest";
import { projectTfr } from "./tfr.ts";
import { SHARED_TFR_CONFIG } from "@/domain/data";

const CFG = SHARED_TFR_CONFIG;

describe("projectTfr — accumulo TFR (Art. 2120 c.c.)", () => {
  it("quota annua = RAL / 13,5", () => {
    const r = projectTfr(30_000, 1, 0.02, CFG);
    expect(r.annualQuota).toBeCloseTo(2222.22, 2);
  });

  it("il primo anno non ha rivalutazione (stock iniziale zero)", () => {
    const r = projectTfr(30_000, 1, 0.02, CFG);
    expect(r.schedule).toHaveLength(1);
    expect(r.schedule[0]?.revaluation).toBe(0);
    expect(r.finalStock).toBeCloseTo(2222.22, 2);
  });

  it("3 anni, inflazione 2% → rivalutazione netta su quote precedenti", () => {
    // revalRate = 1,5% + 75%×2% = 3%; imposta sostitutiva 17%
    const r = projectTfr(30_000, 3, 0.02, CFG);
    expect(r.totalQuote).toBeCloseTo(6666.67, 2);
    expect(r.finalStock).toBeCloseTo(6834.04, 1);
    expect(r.totalRevaluationTax).toBeCloseTo(34.28, 1);
    expect(r.schedule).toHaveLength(3);
  });

  it("inflazione più alta accumula più TFR", () => {
    const low = projectTfr(30_000, 10, 0.0, CFG);
    const high = projectTfr(30_000, 10, 0.04, CFG);
    expect(high.finalStock).toBeGreaterThan(low.finalStock);
    // a inflazione zero resta solo l'1,5% fisso
    expect(low.totalRevaluation).toBeGreaterThan(0);
  });

  it("RAL non positiva → tutto a zero", () => {
    const r = projectTfr(0, 5, 0.02, CFG);
    expect(r.annualQuota).toBe(0);
    expect(r.finalStock).toBe(0);
  });

  it("zero anni → nessun accantonamento", () => {
    const r = projectTfr(30_000, 0, 0.02, CFG);
    expect(r.finalStock).toBe(0);
    expect(r.schedule).toHaveLength(0);
  });
});
