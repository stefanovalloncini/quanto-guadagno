import type { ContractType } from "@/domain/calc";

export interface SalaryEntry {
  readonly id: string;
  readonly year: number;
  readonly grossAnnual: number;
  readonly contractType?: ContractType;
  readonly note?: string;
  readonly createdAt: string;
}

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

function isContractType(value: unknown): value is ContractType {
  return typeof value === "string" && (CONTRACT_TYPES as ReadonlyArray<string>).includes(value);
}

// Defensive runtime parser. Anything unrecognised is dropped silently — we never
// throw, because the data lives in localStorage and might be touched by older
// versions of the app, browser extensions, or hand-edits.
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

  const entry: SalaryEntry = {
    id,
    year,
    grossAnnual: gross,
    createdAt,
    ...(isContractType(obj.contractType) ? { contractType: obj.contractType } : {}),
    ...(typeof obj.note === "string" && obj.note.length > 0 ? { note: obj.note } : {}),
  };
  return entry;
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
  // Cheap fallback for very old environments. Quality matters less here than
  // having something unique-enough within a single user's history list.
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
