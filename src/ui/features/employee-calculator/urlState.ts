import { SUPPORTED_YEARS, type RegionCode, type SupportedYear } from "@/domain/data";
import type { CompanySize, ContractType, InpsRateOverride, PaymentFrequency } from "@/domain/calc";

export type SalaryMode = "gross" | "net";

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
  readonly salaryMode: SalaryMode;
  readonly targetNetMonthly: number;
}

export const MAX_TARGET_NET_MONTHLY = 100_000;

// Short param keys. Aliases let old links (?lordo= from apprenticeship, etc.)
// keep working forever, while new shares write only the short form.
const KEY_ALIASES: Record<string, ReadonlyArray<string>> = {
  l: ["lordo"],
  y: ["anno"],
  r: ["regione"],
  c: ["comune"],
  m: ["mens"],
  t: ["contratto"],
  a: ["az15"],
  p: ["pubblico"],
  e: ["inpsEmp"],
  d: ["inpsDat"],
  s: ["partenza"],
  n: ["netto"],
};

// Read a single value by preferred short key, falling back to known long aliases.
function readParam(params: URLSearchParams, short: string): string | null {
  const direct = params.get(short);
  if (direct !== null) return direct;
  for (const alias of KEY_ALIASES[short] ?? []) {
    const value = params.get(alias);
    if (value !== null) return value;
  }
  return null;
}

const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14, 15, 16];
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

  const l = parseInt0(readParam(params, "l"));
  if (l !== null && l > 0) out.grossAnnual = l;

  const y = pickFromList<SupportedYear>(readParam(params, "y"), SUPPORTED_YEARS, (s) => {
    const n = Number(s);
    return n === 2024 || n === 2025 || n === 2026 ? n : null;
  });
  if (y !== null) out.taxYear = y;

  const r = pickFromList<RegionCode>(readParam(params, "r"), REGION_CODES, (s) => s as RegionCode);
  if (r !== null) out.regionCode = r;

  const c = parsePercent(readParam(params, "c"));
  if (c !== null) out.municipalTaxRate = c;

  const m = pickFromList<PaymentFrequency>(readParam(params, "m"), PAYMENT_FREQUENCIES, (s) => {
    const n = Number(s);
    return n === 12 || n === 13 || n === 14 ? n : null;
  });
  if (m !== null) out.paymentFrequency = m;

  const t = pickFromList<ContractType>(
    readParam(params, "t"),
    CONTRACT_TYPES,
    (s) => s as ContractType,
  );
  if (t !== null) out.contractType = t;

  const a = readParam(params, "a");
  if (a === "1") out.companySize = "large";
  else if (a === "0") out.companySize = "small";

  const p = readParam(params, "p");
  if (p === "1") out.isPublicEmployee = true;
  else if (p === "0") out.isPublicEmployee = false;

  const e = parsePercent(readParam(params, "e"));
  const d = parsePercent(readParam(params, "d"));
  if (e !== null && d !== null) {
    out.inpsOverride = { employeeRate: e, employerRate: d };
  }

  const s = readParam(params, "s");
  if (s === "n") out.salaryMode = "net";
  else if (s === "l") out.salaryMode = "gross";

  const n = parseInt0(readParam(params, "n"));
  if (n !== null && n > 0 && n <= MAX_TARGET_NET_MONTHLY) out.targetNetMonthly = n;

  return out;
}

// Drop every alias from the URL so we never emit both `lordo=…` and `l=…`.
function stripAllKnownKeys(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const [short, aliases] of Object.entries(KEY_ALIASES)) {
    next.delete(short);
    for (const alias of aliases) next.delete(alias);
  }
  return next;
}

export function writeUrlState(
  base: URLSearchParams,
  state: UrlState,
  defaults: UrlState,
): URLSearchParams {
  const next = stripAllKnownKeys(base);

  if (state.grossAnnual !== defaults.grossAnnual) {
    next.set("l", String(Math.round(state.grossAnnual)));
  }
  if (state.taxYear !== defaults.taxYear) {
    next.set("y", String(state.taxYear));
  }
  if (state.regionCode !== defaults.regionCode) {
    next.set("r", state.regionCode);
  }
  if (state.municipalTaxRate !== defaults.municipalTaxRate) {
    next.set("c", String(roundTo(state.municipalTaxRate * 100, 2)));
  }
  if (state.paymentFrequency !== defaults.paymentFrequency) {
    next.set("m", String(state.paymentFrequency));
  }
  if (state.contractType !== defaults.contractType) {
    next.set("t", state.contractType);
  }
  if (state.companySize !== defaults.companySize) {
    next.set("a", state.companySize === "large" ? "1" : "0");
  }
  if (state.isPublicEmployee !== defaults.isPublicEmployee) {
    next.set("p", state.isPublicEmployee ? "1" : "0");
  }
  if (state.inpsOverride !== null) {
    next.set("e", String(roundTo(state.inpsOverride.employeeRate * 100, 2)));
    next.set("d", String(roundTo(state.inpsOverride.employerRate * 100, 2)));
  }
  if (state.salaryMode !== defaults.salaryMode) {
    next.set("s", state.salaryMode === "net" ? "n" : "l");
  }
  if (state.targetNetMonthly !== defaults.targetNetMonthly) {
    next.set("n", String(Math.round(state.targetNetMonthly)));
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
