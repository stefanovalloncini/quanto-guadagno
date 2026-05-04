import type { MessageKey } from "./it.ts";

export const en: Record<MessageKey, string> = {
  "app.title": "Quanto Guadagno",
  "a11y.skipLink": "Skip to content",
  "error.boundary.title": "Something went wrong",
  "error.boundary.body": "Reload the page to try again.",

  "page.employee.title": "Net salary calculator",
  "page.employee.subtitle":
    "Enter your gross annual salary. The calculation applies IRPEF, INPS, regional and municipal addizionale for 2026.",
  "page.employee.year2026": "Tax year 2026",

  "form.section.title": "Your inputs",
  "form.gross.label": "Gross annual salary (RAL)",
  "form.gross.hint": "Annual gross amount, before withholdings.",
  "form.regional.label": "Regional addizionale rate",
  "form.regional.hint": "Regional rate, percentage. Default: 1.73%.",
  "form.municipal.label": "Municipal addizionale rate",
  "form.municipal.hint": "Municipal rate, percentage. Default: 0.80%.",

  "results.section.title": "Result",
  "results.netAnnual": "Annual net",
  "results.netMonthly": "Monthly net",
  "results.effectiveRate": "Effective tax rate",

  "breakdown.title": "Breakdown",
  "breakdown.gross": "Gross salary",
  "breakdown.inps": "INPS contributions",
  "breakdown.taxable": "Taxable income",
  "breakdown.irpefGross": "IRPEF gross",
  "breakdown.workDeduction": "Employee work deduction",
  "breakdown.detrazioneAggiuntiva": "Additional deduction (tax wedge cut)",
  "breakdown.totalDeductions": "Total deductions",
  "breakdown.irpefNet": "IRPEF net",
  "breakdown.regional": "Regional addizionale",
  "breakdown.municipal": "Municipal addizionale",
  "breakdown.trattamentoIntegrativo": "Trattamento integrativo bonus",
  "breakdown.sommaAggiuntiva": "Tax wedge cut bonus",
  "breakdown.netAnnual": "Annual net",

  "scope.title": "What's included today",
  "scope.body":
    "Tax year 2026. Private-sector employee. Regional and municipal rates are entered manually. Not yet supported: family deductions, fringe benefits, special regimes, years 2024 and 2025.",
};
