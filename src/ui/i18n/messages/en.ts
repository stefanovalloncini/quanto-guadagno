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
  "home.soon.taxSystem.title": "How the tax system works",
  "home.soon.taxSystem.body": "Who pays, the tax wedge, where the money goes.",
  "home.footnote":
    "Project <shimmer>open source</shimmer> · no account · no tracker · code on GitHub",

  "employee.eyebrow": "Tool",
  "employee.title": "Net salary from <em>gross</em>.",
  "employee.lede":
    "Tax years 2024–2026. Regional and municipal rates are editable. Numbers are an estimate — not a substitute for the actual payslip.",

  "employee.form.gross": "Annual gross salary",
  "employee.form.salary": "Annual gross salary",
  "employee.form.salary.monthly": "Monthly gross: {amount}",
  "employee.form.year": "Tax year",
  "employee.form.year.hint": "Select the year for tax calculation.",
  "employee.form.contractType": "Contract type",
  "employee.form.contractType.indeterminato": "Permanent",
  "employee.form.contractType.determinato": "Fixed-term",
  "employee.form.contractType.apprendistato": "Apprenticeship",
  "employee.form.contractType.apprenticeshipLink": "See your apprenticeship salary progression",
  "employee.form.paymentFrequency": "Monthly instalments",
  "employee.form.paymentFrequency.option12": "12 — salary over 12 months",
  "employee.form.paymentFrequency.option13": "13 — includes 13th-month bonus",
  "employee.form.paymentFrequency.option14": "14 — includes 13th and 14th-month bonuses",
  "employee.form.region": "Region of residence",
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

  "employee.dependents.title": "Dependent family members",
  "employee.dependents.spouse": "Dependent spouse",
  "employee.dependents.spouseIncome": "Annual spouse income",
  "employee.dependents.spouseIncome.hint": "Maximum to be considered dependent: {limit}",
  "employee.dependents.spouseIncome.warning": "Income exceeds the limit",
  "employee.dependents.spouseIncome.warningDetails":
    "With income above {limit}, the spouse is not considered dependent and the deduction does not apply.",
  "employee.dependents.childrenOver21": "Dependent children (over 21)",
  "employee.dependents.childrenOver21.hint":
    "Children under 21 are covered by the Universal Allowance",
  "employee.dependents.otherDependents": "Other dependent family members",
  "employee.dependents.otherDependents.hint":
    "Parents, cohabiting grandparents, and other family members",

  "employee.expenses.title": "Expense deductions",
  "employee.expenses.mortgageInterest": "Mortgage interest",
  "employee.expenses.mortgageInterest.hint": "Deductible at 19% up to €4,000",
  "employee.expenses.medicalExpenses": "Medical expenses",
  "employee.expenses.medicalExpenses.hint": "Deductible at 19% above the threshold of €129.11",
  "employee.expenses.otherDeductions": "Other deductions at 19%",
  "employee.expenses.otherDeductions.hint": "Education, insurance, etc.",

  "employee.premio.title": "Performance bonus (PdR)",
  "employee.premio.amount": "Gross amount (max {max})",
  "employee.premio.hint": "{rate} flat tax for incomes under €80,000",

  "employee.fringe.title": "Fringe benefits",
  "employee.fringe.companyCar.title": "Company car",
  "employee.fringe.companyCar.mode.simple": "Simple",
  "employee.fringe.companyCar.mode.detailed": "Detailed",
  "employee.fringe.companyCar.modeLabel": "Calculation mode",
  "employee.fringe.companyCar.annualValue": "Annual taxable value",
  "employee.fringe.companyCar.annualValue.hint": "Annual amount provided by employer",
  "employee.fringe.companyCar.co2": "CO2 emissions (g/km)",
  "employee.fringe.companyCar.co2.hint":
    "From registration: ≤60 = 25%, 61–160 = 30%, 161–190 = 50%, >190 = 60%",
  "employee.fringe.companyCar.aciCost": "ACI cost per km (cents)",
  "employee.fringe.companyCar.aciCost.hint": "From ACI tables (e.g., 42 for €0.42/km)",
  "employee.fringe.companyCar.conventionalKm": "Conventional annual km",
  "employee.fringe.companyCar.conventionalKm.hint": "Default: 15,000 km/year",
  "employee.fringe.companyCar.powertrain.label": "Powertrain type",
  "employee.fringe.companyCar.powertrain.bev": "Electric (BEV): 10%",
  "employee.fringe.companyCar.powertrain.phev": "Plug-in hybrid (PHEV): 20%",
  "employee.fringe.companyCar.powertrain.other": "Other (ICE/mild hybrid): 50%",
  "employee.fringe.mealVouchers.title": "Electronic meal vouchers",
  "employee.fringe.mealVouchers.dailyValue": "Daily value (€)",
  "employee.fringe.mealVouchers.dailyValue.hint": "Tax-free up to €8/day (electronic)",
  "employee.fringe.mealVouchers.workingDays": "Working days/month",
  "employee.fringe.mealVouchers.workingDays.hint": "Typically 20–22 days",
  "employee.fringe.healthInsurance.title": "Health insurance",
  "employee.fringe.healthInsurance.annualPremium": "Annual premium",
  "employee.fringe.healthInsurance.annualPremium.hint": "Tax-free up to €3,615.20/year",
  "employee.fringe.welfare.title": "Company welfare",
  "employee.fringe.welfare.annualAmount": "Annual welfare amount",
  "employee.fringe.welfare.annualAmount.hint": "Tax-free up to €258.23/year",
  "employee.fringe.welfare.annualAmount.hintWithChildren":
    "Tax-free up to €3,000/year (with children under 18)",
  "employee.fringe.welfare.hasChildren": "I have dependent children under 18",

  "employee.specialConditions.title": "Special conditions",
  "employee.specialConditions.regimeImpatriati.label": "Impatriate Regime (Return of Talent)",
  "employee.specialConditions.regimeImpatriati.hint":
    "50% of income exempt from IRPEF for 5 years (Art. 5 Legislative Decree 209/2023)",
  "employee.specialConditions.regimeImpatriati.minorChildren": "I have minor children",
  "employee.specialConditions.regimeImpatriati.minorChildren.hint":
    "Increases exemption from 50% to 60%",
  "employee.specialConditions.madreLavoratrice.label": "Esonero Madre Lavoratrice",
  "employee.specialConditions.madreLavoratrice.hint":
    "100% INPS exemption (max €3,000/year) for mothers with 3+ children",
  "employee.specialConditions.madreLavoratrice.numberOfChildren": "Number of children",
  "employee.specialConditions.madreLavoratrice.youngestChildAge": "Age of youngest child",
  "employee.specialConditions.madreLavoratrice.years": "years",
  "employee.specialConditions.madreLavoratrice.notEligible.children":
    "At least 3 children are required for full exemption",
  "employee.specialConditions.madreLavoratrice.notEligible.age":
    "The exemption ends when the youngest child turns 18",
  "employee.specialConditions.madreLavoratrice.eligible":
    "You are entitled to the 100% contribution exemption (max €3,000/year)",
};
