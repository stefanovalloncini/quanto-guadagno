import type { ScenarioRow } from "./useScenarios.ts";

const HEADERS = [
  "label",
  "year",
  "gross_annual",
  "net_annual",
  "net_monthly",
  "irpef_net",
  "inps",
  "regional",
  "municipal",
  "effective_rate",
];

const escapeField = (value: string | number): string => {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export function buildScenariosCsv(rows: ReadonlyArray<ScenarioRow>): string {
  const lines = [HEADERS.join(",")];
  for (const row of rows) {
    const r = row.result;
    lines.push(
      [
        escapeField(row.entry.label),
        row.entry.payload.taxYear,
        r.grossAnnual.toFixed(2),
        r.netAnnual.toFixed(2),
        r.netMonthly.toFixed(2),
        r.irpefNet.toFixed(2),
        r.inps.toFixed(2),
        r.regionalAddizionale.toFixed(2),
        r.municipalAddizionale.toFixed(2),
        r.effectiveTaxRate.toFixed(4),
      ].join(","),
    );
  }
  return lines.join("\n");
}

export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
