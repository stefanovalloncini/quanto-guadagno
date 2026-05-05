export interface ToolEntry {
  readonly id: string;
  readonly to: string | null;
  readonly available: boolean;
}

export const TOOLS: ReadonlyArray<ToolEntry> = [
  { id: "employee", to: "/calcola-stipendio", available: true },
  { id: "freelancer", to: "/calcolo-partita-iva", available: true },
  { id: "comparison", to: null, available: false },
  { id: "statistics", to: null, available: false },
  { id: "tools", to: null, available: false },
  { id: "payslip", to: null, available: false },
  { id: "inflation", to: null, available: false },
  { id: "tfr", to: null, available: false },
  { id: "apprenticeship", to: null, available: false },
  { id: "tax-system", to: null, available: false },
  { id: "data-sources", to: null, available: false },
  { id: "europe", to: null, available: false },
];
