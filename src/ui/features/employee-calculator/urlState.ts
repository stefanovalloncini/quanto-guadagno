import type { RegionCode, SupportedYear } from "@/domain/data";
import type { CompanySize, ContractType, InpsRateOverride, PaymentFrequency } from "@/domain/calc";

export interface UrlState {
  readonly grossAnnual: number;
  readonly taxYear: SupportedYear;
  readonly regionCode: RegionCode;
  readonly municipalTaxRate: number;
  readonly contractType: ContractType;
  readonly paymentFrequency: PaymentFrequency;
  readonly companySize: CompanySize;
  readonly isPublicEmployee: boolean;
  readonly inpsOverride: InpsRateOverride | null;
}

const SUPPORTED_YEARS: ReadonlyArray<SupportedYear> = [2024, 2025, 2026];
const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14];
const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];
const REGION_CODES: ReadonlyArray<RegionCode> = [
  "piemonte",
  "valle-daosta",
  "lombardia",
  "bolzano",
  "trento",
  "veneto",
  "friuli-venezia-giulia",
  "liguria",
  "emilia-romagna",
  "toscana",
  "umbria",
  "marche",
  "lazio",
  "abruzzo",
  "molise",
  "campania",
  "puglia",
  "basilicata",
  "calabria",
  "sicilia",
  "sardegna",
];

function pickFromList<T extends string | number>(
  raw: string | null,
  allowed: ReadonlyArray<T>,
  coerce: (s: string) => T | null,
): T | null {
  if (raw === null) return null;
  const value = coerce(raw);
  if (value === null) return null;
  return allowed.includes(value) ? value : null;
}

function parseInt0(raw: string | null): number | null {
  if (raw === null) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}

function parsePercent(raw: string | null): number | null {
  if (raw === null) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0 || n > 100) return null;
  return roundTo(n / 100, 6);
}

export function parseUrlState(params: URLSearchParams): Partial<UrlState> {
  const out: Partial<Writable<UrlState>> = {};

  const lordo = parseInt0(params.get("lordo"));
  if (lordo !== null && lordo > 0) out.grossAnnual = lordo;

  const anno = pickFromList<SupportedYear>(params.get("anno"), SUPPORTED_YEARS, (s) => {
    const n = Number(s);
    return n === 2024 || n === 2025 || n === 2026 ? n : null;
  });
  if (anno !== null) out.taxYear = anno;

  const regione = pickFromList<RegionCode>(
    params.get("regione"),
    REGION_CODES,
    (s) => s as RegionCode,
  );
  if (regione !== null) out.regionCode = regione;

  const comune = parsePercent(params.get("comune"));
  if (comune !== null) out.municipalTaxRate = comune;

  const mens = pickFromList<PaymentFrequency>(params.get("mens"), PAYMENT_FREQUENCIES, (s) => {
    const n = Number(s);
    return n === 12 || n === 13 || n === 14 ? n : null;
  });
  if (mens !== null) out.paymentFrequency = mens;

  const contratto = pickFromList<ContractType>(
    params.get("contratto"),
    CONTRACT_TYPES,
    (s) => s as ContractType,
  );
  if (contratto !== null) out.contractType = contratto;

  const az15 = params.get("az15");
  if (az15 === "1") out.companySize = "large";
  else if (az15 === "0") out.companySize = "small";

  const pubblico = params.get("pubblico");
  if (pubblico === "1") out.isPublicEmployee = true;
  else if (pubblico === "0") out.isPublicEmployee = false;

  const inpsEmp = parsePercent(params.get("inpsEmp"));
  const inpsDat = parsePercent(params.get("inpsDat"));
  if (inpsEmp !== null && inpsDat !== null) {
    out.inpsOverride = { employeeRate: inpsEmp, employerRate: inpsDat };
  }

  return out;
}

export function writeUrlState(base: URLSearchParams, state: UrlState): URLSearchParams {
  const next = new URLSearchParams(base);

  next.set("lordo", String(Math.round(state.grossAnnual)));
  next.set("anno", String(state.taxYear));
  next.set("regione", state.regionCode);
  next.set("comune", String(roundTo(state.municipalTaxRate * 100, 2)));
  next.set("mens", String(state.paymentFrequency));
  next.set("contratto", state.contractType);

  if (state.companySize === "large") next.set("az15", "1");
  else next.delete("az15");

  if (state.isPublicEmployee) next.set("pubblico", "1");
  else next.delete("pubblico");

  if (state.inpsOverride) {
    next.set("inpsEmp", String(roundTo(state.inpsOverride.employeeRate * 100, 2)));
    next.set("inpsDat", String(roundTo(state.inpsOverride.employerRate * 100, 2)));
  } else {
    next.delete("inpsEmp");
    next.delete("inpsDat");
  }

  return next;
}

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};
