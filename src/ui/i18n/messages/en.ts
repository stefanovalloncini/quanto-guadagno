import type { MessageKey } from "./it.ts";

export const en: Record<MessageKey, string> = {
  "a11y.skipToMain": "Skip to main content",

  "brand.first": "quanto",
  "brand.second": "guadagno",

  "error.boundary.title": "Something went wrong",
  "error.boundary.body": "Reload the page to try again.",

  "nav.employee": "Calculator",
  "nav.sources": "Sources",
  "nav.about": "About",

  "theme.prefix": "Theme:",
  "theme.label.light": "light",
  "theme.label.dark": "dark",
  "theme.label.system": "system",
  "theme.aria.cycle": "Change theme",

  "footer.attribution": "Net salary calculator · for personal and informational use",
  "footer.repo": "Code on GitHub",

  "home.hero.title": "What I really <em>take home</em>.",
  "home.hero.lede":
    "Italian net-salary calculator based on the IRPEF brackets and INPS contributions in force. Open source, no account, no tracker.",
  "home.feature.badge": "Available",
  "home.feature.title": "Net salary from gross",
  "home.feature.body":
    "Employee, tax year 2024, 2025 or 2026. Regional rate, work deduction, trattamento integrativo, tax-wedge cut.",
  "home.feature.cta": "Open →",
  "home.available.apprenticeship.title": "Apprenticeship progression",
  "home.available.apprenticeship.body":
    "Estimate year-by-year salary during professional apprenticeship contracts.",
  "home.soon.badge": "Coming back",
  "home.soon.freelancer.title": "Self-employed (forfettario)",
  "home.soon.freelancer.body": "Flat rate 5% or 15%, coefficients per ATECO code.",
  "home.soon.comparison.title": "Scenario comparison",
  "home.soon.comparison.body": "Compare two or three offers side by side.",
  "home.soon.tfr.title": "TFR",
  "home.soon.tfr.body": "Long-term severance simulation.",
  "home.soon.payslip.title": "Payslip",
  "home.soon.payslip.body": "Monthly view with deductions and contributions separated.",
  "home.soon.statistics.title": "Income percentile",
  "home.soon.statistics.body": "Where you sit relative to ISTAT data.",
  "home.soon.inflation.title": "Inflation",
  "home.soon.inflation.body": "Purchasing power of your salary over time.",
  "home.footnote":
    "Project <shimmer>open source</shimmer> · no account · no tracker · code on GitHub",

  "employee.eyebrow": "Tool",
  "employee.title": "Net salary from <em>gross</em>.",
  "employee.lede":
    "Tax years 2024–2026. Regional and municipal rates are editable. Numbers are an estimate — not a substitute for the actual payslip.",

  "employee.form.gross": "Annual gross salary",
  "employee.form.year": "Tax year",
  "employee.form.regional": "Regional addizionale rate",
  "employee.form.regional.hint": "Changes by region of residence.",
  "employee.form.municipal": "Municipal addizionale rate",
  "employee.form.municipal.hint": "Changes by municipality of residence.",

  "employee.results.monthly": "Net monthly",
  "employee.results.annual": "Net annual",
  "employee.results.annual.sub": "estimate over 12 months",
  "employee.results.detail": "Calculation breakdown",
  "employee.results.effective": "Effective tax rate:",

  "employee.breakdown.gross": "Gross annual",
  "employee.breakdown.inps": "INPS contributions",
  "employee.breakdown.irpefNet": "IRPEF net",
  "employee.breakdown.regional": "Regional surcharge",
  "employee.breakdown.municipal": "Municipal surcharge",
  "employee.breakdown.deductions": "Work deductions + bonus",
  "employee.breakdown.trattamento": "Trattamento integrativo",
  "employee.breakdown.net": "Net annual",

  "notFound.title": "Page not found",
  "notFound.body": "The page you requested does not exist.",
  "notFound.home": "Back to home",

  "about.eyebrow": "About",
  "about.title": "About quanto guadagno",
  "about.lede":
    "Italian net-salary calculator based on the IRPEF brackets and INPS contributions in force. No account, no tracker.",
  "about.body1":
    "The project exists to give an honest estimate of net salary starting from gross. Regional rates are editable because they differ between regions.",
  "about.body2":
    "The calculation follows the Agenzia delle Entrate brackets and current INPS circulars. No estimate replaces the real payslip: this tool is for orientation.",
  "about.github": "Code on GitHub",

  "sources.eyebrow": "Sources",
  "sources.title": "Where the numbers come from",
  "sources.lede":
    "Every calculation is grounded in public documents. Below, in compact form, the origin of each component.",
  "sources.irpef.title": "IRPEF brackets",
  "sources.irpef.body":
    "Progressive rates 2024–2026 from Agenzia delle Entrate (D.lgs. 216/2023 and amendments).",
  "sources.inps.title": "INPS contributions, employees",
  "sources.inps.body":
    "Rate 9.19% on ordinary income, +1% above the first cap. Annual INPS circulars.",
  "sources.workDeduction.title": "Work-income deduction",
  "sources.workDeduction.body": "Bracketed progressive calculation per article 13 of TUIR.",
  "sources.trattamento.title": "Trattamento integrativo",
  "sources.trattamento.body":
    "Monthly bonus up to an income threshold, defined by D.L. 3/2020 and subsequent changes.",
  "sources.taxWedge.title": "Tax-wedge cut",
  "sources.taxWedge.body":
    "Reduction of employee social contributions in force for 2024–2026, redesigned each budget law.",
  "sources.exemption.title": "2024 contribution exemption",
  "sources.exemption.body": "Partial INPS exemption for 2024 only, conditional on income.",

  "apprenticeship.eyebrow": "Tool",
  "apprenticeship.title": "Apprenticeship <em>progression</em>.",
  "apprenticeship.lede":
    "Estimate year-by-year salary during the apprenticeship period, starting from the target salary. Typical progressions start at 85% of the final level and grow each year.",

  "apprenticeship.form.target": "Target gross salary (RAL)",
  "apprenticeship.form.target.hint": "Final-level annual gross, after the apprenticeship ends.",
  "apprenticeship.form.years": "Duration in years",
  "apprenticeship.form.years.hint": "Typically 3 years; some CCNL contracts allow up to 5.",

  "apprenticeship.col.year": "Year",
  "apprenticeship.col.percent": "% of target",
  "apprenticeship.col.gross": "Gross annual",
};
