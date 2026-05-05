export interface ToolEntry {
  readonly id: string;
  readonly to: string | null;
  readonly available: boolean;
}

export const TOOLS: ReadonlyArray<ToolEntry> = [
  { id: "employee", to: "/calcola-stipendio", available: true },
  { id: "freelancer", to: "/calcolo-partita-iva", available: true },
  { id: "comparison", to: "/confronto-scenari", available: true },
  { id: "statistics", to: "/statistiche", available: true },
  { id: "tools", to: null, available: false },
  { id: "payslip", to: "/busta-paga", available: true },
  { id: "inflation", to: null, available: false },
  { id: "tfr", to: "/simulatore-tfr", available: true },
  { id: "apprenticeship", to: null, available: false },
  { id: "tax-system", to: null, available: false },
  { id: "data-sources", to: "/fonti-dati", available: true },
  { id: "europe", to: null, available: false },
];
