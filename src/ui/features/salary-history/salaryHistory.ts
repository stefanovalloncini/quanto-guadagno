import type { CompanySize, ContractType, DependentsInput } from "@/domain/calc";
import { REGIONS, type RegionCode } from "@/domain/data";

export type PaymentFrequency = 12 | 13 | 14 | 15 | 16;

export interface SalaryEntrySettings {
  readonly contractType: ContractType;
  readonly regionCode: RegionCode;
  readonly municipalTaxRate: number;
  readonly paymentFrequency: PaymentFrequency;
  readonly dependents?: DependentsInput;
  readonly companySize?: CompanySize;
}

export interface SalaryEntry {
  readonly id: string;
  readonly year: number;
  readonly grossAnnual: number;
  readonly note?: string;
  readonly createdAt: string;
  readonly settings: SalaryEntrySettings;
  readonly isMigrated?: boolean;
}

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

const COMPANY_SIZES: ReadonlyArray<CompanySize> = ["small", "large"];

const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14, 15, 16];

const REGION_CODES = Object.keys(REGIONS) as ReadonlyArray<RegionCode>;

export const DEFAULT_ENTRY_SETTINGS: SalaryEntrySettings = {
  contractType: "indeterminato",
  regionCode: "lazio",
  municipalTaxRate: 0.008,
  paymentFrequency: 13,
};

function isContractType(v: unknown): v is ContractType {
  return typeof v === "string" && (CONTRACT_TYPES as ReadonlyArray<string>).includes(v);
}

function isRegionCode(v: unknown): v is RegionCode {
  return typeof v === "string" && (REGION_CODES as ReadonlyArray<string>).includes(v);
}

function isPaymentFrequency(v: unknown): v is PaymentFrequency {
  return typeof v === "number" && (PAYMENT_FREQUENCIES as ReadonlyArray<number>).includes(v);
}

function isCompanySize(v: unknown): v is CompanySize {
  return typeof v === "string" && (COMPANY_SIZES as ReadonlyArray<string>).includes(v);
}

function parseDependents(raw: unknown): DependentsInput | undefined {
  if (raw === null || typeof raw !== "object") return undefined;
  const obj = raw as Record<string, unknown>;
  const hasSpouse = obj.hasSpouse === true;
  const spouseIncomeRaw = obj.spouseIncome;
  const spouseIncome =
    typeof spouseIncomeRaw === "number" && Number.isFinite(spouseIncomeRaw) && spouseIncomeRaw >= 0
      ? spouseIncomeRaw
      : undefined;
  const childrenOver21 =
    typeof obj.childrenOver21 === "number" &&
    Number.isFinite(obj.childrenOver21) &&
    obj.childrenOver21 >= 0
      ? Math.floor(obj.childrenOver21)
      : 0;
  const otherDependents =
    typeof obj.otherDependents === "number" &&
    Number.isFinite(obj.otherDependents) &&
    obj.otherDependents >= 0
      ? Math.floor(obj.otherDependents)
      : 0;
  return {
    hasSpouse,
    ...(spouseIncome !== undefined ? { spouseIncome } : {}),
    childrenOver21,
    otherDependents,
  };
}

function parseSettings(raw: unknown, legacyContractType: unknown): SalaryEntrySettings {
  const obj = raw !== null && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  const contractType = isContractType(obj.contractType)
    ? obj.contractType
    : isContractType(legacyContractType)
      ? legacyContractType
      : DEFAULT_ENTRY_SETTINGS.contractType;

  const regionCode = isRegionCode(obj.regionCode)
    ? obj.regionCode
    : DEFAULT_ENTRY_SETTINGS.regionCode;

  const municipalTaxRate =
    typeof obj.municipalTaxRate === "number" &&
    Number.isFinite(obj.municipalTaxRate) &&
    obj.municipalTaxRate >= 0 &&
    obj.municipalTaxRate <= 1
      ? obj.municipalTaxRate
      : DEFAULT_ENTRY_SETTINGS.municipalTaxRate;

  const paymentFrequency = isPaymentFrequency(obj.paymentFrequency)
    ? obj.paymentFrequency
    : DEFAULT_ENTRY_SETTINGS.paymentFrequency;

  const dependents = parseDependents(obj.dependents);
  const companySize = isCompanySize(obj.companySize) ? obj.companySize : undefined;

  return {
    contractType,
    regionCode,
    municipalTaxRate,
    paymentFrequency,
    ...(dependents ? { dependents } : {}),
    ...(companySize ? { companySize } : {}),
  };
}

// Defensive runtime parser. Anything unrecognised is dropped silently — the data
// lives in localStorage and might be touched by older versions of the app,
// browser extensions, or hand-edits. Entries from before the settings split are
// migrated by filling defaults, and flagged with isMigrated so the UI can
// prompt the user to confirm the imported settings.
export function parseSalaryEntry(raw: unknown): SalaryEntry | null {
  if (raw === null || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const id = typeof obj.id === "string" && obj.id.length > 0 ? obj.id : null;
  const year =
    typeof obj.year === "number" && Number.isFinite(obj.year) ? Math.floor(obj.year) : null;
  const gross =
    typeof obj.grossAnnual === "number" && Number.isFinite(obj.grossAnnual) && obj.grossAnnual >= 0
      ? Math.floor(obj.grossAnnual)
      : null;
  const createdAt =
    typeof obj.createdAt === "string" && obj.createdAt.length > 0 ? obj.createdAt : null;

  if (id === null || year === null || gross === null || createdAt === null) return null;
  if (year < 1900 || year > 2100) return null;

  const hasSettings = obj.settings !== undefined && obj.settings !== null;
  const settings = parseSettings(obj.settings, obj.contractType);

  return {
    id,
    year,
    grossAnnual: gross,
    createdAt,
    settings,
    ...(typeof obj.note === "string" && obj.note.length > 0 ? { note: obj.note } : {}),
    ...(hasSettings ? {} : { isMigrated: true as const }),
  };
}

export function parseSalaryEntries(raw: unknown): SalaryEntry[] {
  if (!Array.isArray(raw)) return [];
  const out: SalaryEntry[] = [];
  for (const item of raw) {
    const parsed = parseSalaryEntry(item);
    if (parsed !== null) out.push(parsed);
  }
  return out;
}

export function sortEntriesByYear(entries: ReadonlyArray<SalaryEntry>): SalaryEntry[] {
  return [...entries].sort((a, b) => a.year - b.year);
}

export function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
