import type { MessageKey } from "./it.ts";

export const en: Record<MessageKey, string> = {
  "app.title": "Quanto Guadagno",
  "a11y.skipLink": "Skip to content",
  "error.boundary.title": "Something went wrong",
  "error.boundary.body": "Reload the page to try again.",

  "nav.home": "Home",
  "nav.employee": "Salary calculator",

  "theme.toggle.label": "Switch to {mode} theme",
  "theme.light": "light",
  "theme.dark": "dark",

  "footer.attribution":
    "Calculations based on official rules and circulars. See the verification documents in sources.",
  "footer.disclaimer": "Informational tool. For complex situations consult a commercialista.",

  "page.employee.title": "Net salary calculator",
  "page.employee.subtitle":
    "Enter your gross annual salary. The calculation applies IRPEF, INPS, regional and municipal addizionale for the selected year.",
  "page.employee.eyebrow": "Tax year {year}",

  "form.section.title": "Your inputs",
  "form.gross.label": "Gross annual salary (RAL)",
  "form.gross.hint": "Annual gross amount, before withholdings.",
  "form.year.label": "Tax year",
  "form.year.hint": "Rates and policies change year to year.",
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
  "breakdown.irpefNet": "IRPEF",
  "breakdown.regional": "Regional addizionale",
  "breakdown.municipal": "Municipal addizionale",
  "breakdown.trattamentoIntegrativo": "Trattamento integrativo bonus",
  "breakdown.sommaAggiuntiva": "Tax wedge cut bonus",
  "breakdown.netAnnual": "Annual net",

  "scope.title": "What's included today",
  "scope.body":
    "Private-sector employee. Tax years 2024, 2025 and 2026. Regional and municipal rates are entered manually. Not yet supported: family deductions, fringe benefits, special regimes, public sector, apprenticeship contracts.",
};
