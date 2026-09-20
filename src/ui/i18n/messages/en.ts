import type { MessageKey } from "./it.ts";

export const en: Record<MessageKey, string> = {
  "a11y.skipToMain": "Skip to main content",

  "brand.first": "quanto",
  "brand.second": "guadagno",

  "error.boundary.title": "Something went wrong",
  "error.boundary.body": "Reload the page to try again.",

  "nav.employee": "Calculator",
  "nav.apprenticeship": "Apprenticeship",
  "nav.forfettario": "Forfettario",
  "nav.compoundInterest": "Compound interest",
  "nav.naspi": "NASpI",
  "nav.preavviso": "Resignation notice",
  "nav.inverse": "Net-to-gross",
  "nav.sources": "Sources",
  "nav.about": "About",

  "locale.aria.switch":
    "Switch to {next, select, it {Italian} en {English} other {other language}}",

  "theme.prefix": "Theme:",
  "theme.label.light": "light",
  "theme.label.dark": "dark",
  "theme.label.system": "system",
  "theme.aria.cycle": "Change theme",

  "footer.attribution": "Net salary calculator · for personal and informational use",
  "footer.repo": "Code on GitHub",

  "meta.home.title": "Net salary calculator",
  "meta.home.description":
    "Work out monthly and annual net pay from an Italian gross salary, with the IRPEF rates and INPS contributions in force from 2024 to 2026.",
  "meta.employee.title": "Net salary from gross",
  "meta.employee.description":
    "Work out an employee's monthly and annual net pay for tax years 2024 to 2026, with IRPEF, INPS, regional and municipal surtaxes and deductions.",
  "meta.apprenticeship.title": "Apprenticeship progression",
  "meta.apprenticeship.description":
    "Work out gross and net pay year by year under an Italian professional apprenticeship contract.",
  "meta.salaryHistory.title": "Salary history",
  "meta.salaryHistory.description":
    "Record your gross salaries year by year and compare their real value against the ISTAT price index.",
  "meta.forfettario.title": "Self-employed (forfettario)",
  "meta.forfettario.description":
    "Work out net income from invoiced revenue under the forfettario regime, with the profitability coefficient, substitute tax and pension contributions.",
  "meta.compoundInterest.title": "Compound interest",
  "meta.compoundInterest.description":
    "Work out how a sum grows over time with periodic contributions, an annual return and expected inflation.",
  "meta.naspi.title": "NASpI calculator",
  "meta.naspi.description":
    "Work out the monthly amount and the duration of the NASpI unemployment benefit from the pay of the last four years.",
  "meta.preavviso.title": "Resignation notice",
  "meta.preavviso.description":
    "Work out the notice days and the last working day from your CCNL, job level and length of service.",
  "meta.inverse.title": "Net to gross",
  "meta.inverse.description":
    "Work out the annual gross salary needed to reach the monthly net pay you name.",
  "meta.tredicesima.title": "Net 13th salary",
  "meta.tredicesima.description":
    "Work out the net 13th monthly salary, with INPS contributions and IRPEF withheld and no employment deductions applied.",
  "meta.inflation.title": "Purchasing power",
  "meta.inflation.description":
    "Work out what a sum of money from a past year is worth today, with the ISTAT FOI index.",
  "meta.comparison.title": "Salary comparison",
  "meta.comparison.description":
    "Compare two gross job offers and see which one leaves more net pay.",
  "meta.employerCost.title": "Cost of an employee",
  "meta.employerCost.description":
    "Work out what an employee costs the company, from gross pay to employer contributions and severance accrual.",
  "meta.tfr.title": "TFR calculator",
  "meta.tfr.description":
    "Work out the severance pay built up year by year, with the annual quota and its revaluation.",
  "meta.glossary.title": "Glossary",
  "meta.glossary.description":
    "The terms that appear on an Italian payslip and in the net salary calculation, explained one by one.",
  "meta.payslip.title": "Print payslip",
  "meta.payslip.description":
    "A printable version of the net salary calculation, with contributions and withholdings broken out.",
  "meta.sources.title": "Sources",
  "meta.sources.description":
    "The official sources behind every rate and threshold used in the calculations, with the date each was last checked.",
  "meta.about.title": "About",
  "meta.about.description":
    "What this site calculates, how it handles the data of the people who use it and where its limits are.",
  "meta.notFound.title": "Page not found",
  "meta.notFound.description":
    "This page does not exist. Go back to the home page to open one of the calculators.",

  "home.hero.title": "What I really <em>take home</em>.",
  "home.hero.lede":
    "Italian net-salary calculator based on the IRPEF brackets and INPS contributions in force. <shimmer>Open source</shimmer>, no account, no tracker.",
  "home.feature.badge": "Available",
  "home.feature.title": "Net salary from gross",
  "home.feature.body":
    "Employee, tax year 2024, 2025 or 2026. Regional rate, work deduction, trattamento integrativo, tax-wedge cut.",
  "home.feature.cta": "Open the calculator",
  "home.feature.specimen.gross": "Annual gross",
  "home.feature.specimen.net": "Monthly net",
  "home.also.title": "Also available",
  "home.upcoming.title": "Upcoming",
  "home.available.apprenticeship.title": "Apprenticeship progression",
  "home.available.apprenticeship.body":
    "Estimate year-by-year salary during professional apprenticeship contracts.",
  "home.available.history.title": "Salary history",
  "home.available.history.body":
    "Track your gross salaries year by year and see how inflation has changed their real value.",
  "home.available.forfettario.title": "Self-employed (forfettario)",
  "home.available.forfettario.body":
    "Net income from invoiced revenue: 5% or 15% substitute tax and Gestione Separata contributions.",
  "home.available.compoundInterest.title": "Compound interest",
  "home.available.compoundInterest.body":
    "How a sum grows over time with periodic contributions and expected inflation.",
  "home.available.naspi.title": "NASpI",
  "home.available.naspi.body":
    "Estimate the Italian unemployment indemnity: monthly amount, duration, progressive reduction.",
  "home.available.preavviso.title": "Resignation notice",
  "home.available.preavviso.body":
    "Notice days and exit date by CCNL, level and length of service.",
  "home.available.inverse.title": "Net-to-gross calculator",
  "home.available.inverse.body":
    "Know the net you want to take home: find the gross annual salary that produces it.",
  "home.available.tredicesima.title": "Net 13th salary",
  "home.available.tredicesima.body":
    "What's left of the 13th after INPS and IRPEF, with no work deductions applied.",
  "home.available.inflation.title": "Purchasing power",
  "home.available.inflation.body":
    "What an amount from a few years ago is worth today, by the ISTAT FOI index.",
  "home.available.comparison.title": "Compare offers",
  "home.available.comparison.body": "Two gross salaries compared: which one nets more.",
  "home.available.employerCost.title": "Cost of an employee",
  "home.available.employerCost.body": "What an employee costs the company, from gross to on-costs.",
  "home.available.tfr.title": "Severance (TFR)",
  "home.available.tfr.body": "How much severance you build up, with quotas and revaluation.",
  "home.soon.badge": "Coming soon",
  "home.soon.payslip.title": "Payslip",
  "home.soon.payslip.body": "Monthly view, deductions and contributions broken out.",
  "home.soon.statistics.title": "Income percentile",
  "home.soon.statistics.body": "Where you sit relative to ISTAT data.",
  "home.soon.taxSystem.title": "How the tax system works",
  "home.soon.taxSystem.body": "Who pays, the tax wedge, where the money goes.",

  "employee.eyebrow": "Tool",
  "employee.title": "Net salary from <em>gross</em>.",
  "employee.lede":
    "Tax years 2024–2026. Regional and municipal rates are editable. The numbers are an estimate, not a substitute for the actual payslip.",

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
  "employee.form.paymentFrequency.option12": "12 instalments, salary spread over 12 months",
  "employee.form.paymentFrequency.option13": "13 instalments, includes 13th-month bonus",
  "employee.form.paymentFrequency.option14": "14 instalments, includes 13th and 14th-month bonuses",
  "employee.form.paymentFrequency.option15":
    "15 instalments, includes 13th, 14th and 15th-month bonuses",
  "employee.form.paymentFrequency.option16": "16 instalments, additional contractual bonuses",
  "employee.form.region": "Region of residence",
  "employee.form.regional": "Regional surcharge rate",
  "employee.form.regional.hint": "Changes by region of residence.",
  "employee.form.municipal": "Municipal surcharge rate",
  "employee.form.municipal.hint": "Changes by municipality of residence.",

  "employee.results.detail": "Calculation breakdown",

  "employee.faq.title": "Frequently asked questions",
  "employee.faq.gross.q": "How do we get from gross to net?",
  "employee.faq.gross.a":
    "Starting from annual gross, we subtract employee INPS contributions (9.19% on the ordinary portion). On the taxable income we apply the IRPEF brackets, subtract eligible deductions (employee work, dependents, expenses), and add regional and municipal surcharges. We then add trattamento integrativo and other credits. The result is annual net, divided by the number of monthly instalments.",
  "employee.faq.brackets.q": "What IRPEF brackets are currently in force?",
  "employee.faq.brackets.a":
    "For 2026: 23% up to €28,000, 33% from €28,001 to €50,000, 43% above. In 2024 and 2025 the middle bracket was 35%. Reference: D.Lgs. 216/2023 for 2024 and 2025, L. 199/2025 for 2026.",
  "employee.faq.trattamento.q": "What is the trattamento integrativo?",
  "employee.faq.trattamento.a":
    "A credit of up to €1,200 a year for taxable income up to €28,000. Up to €15,000 you get the full amount. Between €15,000 and €28,000 you only get the share of deductions that exceeds gross IRPEF, and never more than €1,200. Reference: D.L. 3/2020.",
  "employee.faq.region.q": "Why does net salary change with the region?",
  "employee.faq.region.a":
    "Each region applies its own IRPEF surcharge to taxable income. In the calculator's data the rates run from 0.70% to 3.63% depending on region and bracket, and some regions have a threshold below which nothing is due. The municipal surcharge is a value you enter, because it changes from town to town.",
  "employee.faq.cuneo.q": "What is the tax-wedge cut?",
  "employee.faq.cuneo.a":
    "The tax wedge is the gap between what an employee costs the company and what reaches the payslip. The cut works in two ways: an extra sum in the payslip up to €20,000 of taxable income, and an IRPEF deduction of up to €1,000 that phases out between €32,000 and €40,000. The 2026 rules are the same as 2025; in 2024 an INPS contribution waiver took their place. Reference: L. 207/2024, made permanent by L. 199/2025.",
  "employee.faq.estimate.q": "Can my actual payslip differ?",
  "employee.faq.estimate.a":
    "Yes. The calculation is an estimate based on standard rates. Fringe benefits, a tax-relieved performance bonus, allowances set by your CCNL or extra withholdings all change the effective net. The employer's payslip remains the reference.",
  "employee.faq.sources.q": "Where do the numbers come from?",
  "employee.faq.sources.a":
    "IRPEF rates come from Agenzia delle Entrate, INPS contributions from the annual circulars, regional surcharges from regional law. The Sources page lists the legal reference for every component.",

  "forfettario.faq.title": "Frequently asked questions",
  "forfettario.faq.what.q": "What is the forfettario regime?",
  "forfettario.faq.what.a":
    "An Italian tax regime for self-employed workers with revenue up to €85,000 a year. The flat substitute tax applies to taxable income, that is revenue multiplied by the profitability coefficient for your activity. No VAT, no ordinary IRPEF, no IRAP. Reference: Law 190/2014.",
  "forfettario.faq.rates.q": "What are the substitute tax rates?",
  "forfettario.faq.rates.a":
    "The standard rate is 15% on taxable income. The first 5 years of activity benefit from a reduced 5% rate, if the eligibility requirements are met (new activity, not a continuation of prior employment).",
  "forfettario.faq.contributi.q": "How are social contributions calculated?",
  "forfettario.faq.contributi.a":
    "It depends on the fund. INPS Gestione Separata at 26.07% for professionals without a dedicated fund, the Artigiani or Commercianti scheme for activities registered there (IVS rate plus an annual minimum), or your profession's own fund. You pick the one that applies in the calculator.",
  "forfettario.faq.combined.q": "Can I use forfettario while also being an employee?",
  "forfettario.faq.combined.a":
    "Yes, forfettario can sit alongside a job, but the law caps the employment income of the previous year and this calculator does not check it. Here you only compute substitute tax and contributions on the self-employed revenue.",
  "forfettario.faq.startup.q": "What changes in the first 5 years?",
  "forfettario.faq.startup.a":
    "The substitute tax drops from 15% to 5% for the first five tax periods, if you meet the legal requirements: you have not carried out the same activity in the previous three years, and the activity is not a continuation of previous employment. The calculator applies the rate from the years of activity you enter; the other requirements are yours to check.",
  "forfettario.faq.exit.q": "When do I exit the forfettario regime?",
  "forfettario.faq.exit.a":
    "Past €85,000 of revenue you leave the regime from the following year. Past €100,000 the exit is immediate, within the same year. You also leave when the other requirements lapse, for instance the €20,000 cap on staff costs. Reference: Art. 1 c. 71 L. 190/2014.",

  "naspi.faq.title": "Frequently asked questions",
  "naspi.faq.what.q": "What is NASpI?",
  "naspi.faq.what.a":
    "Monthly unemployment indemnity introduced by D.Lgs. 22/2015. It is paid to workers who lose their job involuntarily (dismissal, just-cause resignation, settlement in conciliation) and have at least 13 weeks of contributions in the previous 4 years.",
  "naspi.faq.duration.q": "How long does NASpI last?",
  "naspi.faq.duration.a":
    "Half of the contribution weeks from the previous 4 years, with a maximum of 24 months (104 weeks). Example: 100 weeks of contributions → 50 weeks of NASpI.",
  "naspi.faq.amount.q": "How is the monthly amount calculated?",
  "naspi.faq.amount.a":
    "Start from the average monthly wage of the last 4 years. Up to a threshold (€1,456.72 gross monthly in 2026) you receive 75%. Above the threshold you add 25% of the difference, up to a cap (€1,584.70 gross monthly in 2026). Source: INPS Circular 4/2026.",
  "naspi.faq.decalage.q": "When does NASpI start to decrease (décalage)?",
  "naspi.faq.decalage.a":
    "From month 6 (month 8 if you are 55 or older when you apply) the indemnity drops by 3% a month, and each cut applies to the already reduced amount. From €1,200 you go to €1,164 in month 6 and €1,129 in month 7.",
  "naspi.faq.tax.q": "Is NASpI taxed?",
  "naspi.faq.tax.a":
    "Yes, IRPEF applies as if it were employment income. The calculator estimates the net using the IRPEF brackets of the chosen year, with no INPS contributions and no local surcharges.",
  "naspi.faq.work.q": "Can I work while receiving NASpI?",
  "naspi.faq.work.a":
    "Yes, but the rules change with the type of contract and the income, and you have to report the activity to INPS, which then reduces or suspends the payment. This calculator does not model that recalculation: check your case with INPS.",

  "preavviso.faq.title": "Frequently asked questions",
  "preavviso.faq.obbligatorio.q": "Am I required to give notice?",
  "preavviso.faq.obbligatorio.a":
    "Yes, except for resignation for just cause (Art. 2119 c.c., for example unpaid wages or harassment) or during the trial period. The days depend on the CCNL, your level, and your length of service.",
  "preavviso.faq.mancato.q": "What happens if I don't give notice?",
  "preavviso.faq.mancato.a":
    "The employer can withhold an indemnity equivalent to the wages you would have earned during those days. It is deducted from your TFR and final payslip.",
  "preavviso.faq.calendarOrWork.q": "Are notice days calendar days or working days?",
  "preavviso.faq.calendarOrWork.a":
    "By default they are calendar days: Saturdays, Sundays and public holidays count. Some CCNLs prescribe working days for specific levels (the calculator flags this case when it applies).",
  "preavviso.faq.ferie.q": "Do unused holidays count toward notice?",
  "preavviso.faq.ferie.a":
    "No. Holidays taken during notice do not stop the period from running. Unused holidays are paid out in the final payslip and do not shorten the notice days.",
  "preavviso.faq.malattia.q": "Can I resign while on sick leave?",
  "preavviso.faq.malattia.a":
    "Yes, illness does not prevent you from resigning. Most CCNLs suspend the notice period while the illness lasts and resume it on recovery, so check your contract: the calculator does not account for absences.",
  "preavviso.faq.prova.q": "What changes during the trial period?",
  "preavviso.faq.prova.a":
    "During the trial period either party can terminate without notice and without giving reasons (Art. 2096 c.c.). The calculator treats this as a separate case.",
  "esempio.title": "See how we get to the net",
  "esempio.intro":
    "The calculation follows six steps. Each uses the exact numbers from your case and shows how gross becomes net.",
  "esempio.step1.title": "1. Annual gross",
  "esempio.step1.body":
    "The starting point is your annual gross: {amount}. From this we apply social contributions and taxes.",
  "esempio.step2.title": "2. Social contributions",
  "esempio.step2.body":
    "Employee INPS contributions (rate {rate}) come off the gross: {amount}. Your IRPEF taxable income is {taxable}.",
  "esempio.step3.title": "3. Gross IRPEF",
  "esempio.step3.body":
    "On the taxable income we apply the IRPEF brackets for tax year {year}: {brackets}. Gross IRPEF: {amount}.",
  "esempio.step4.title": "4. IRPEF deductions",
  "esempio.step4.body":
    "From gross IRPEF we subtract the deductions you are entitled to (employee work, dependents, deductible expenses). Net IRPEF: {amount}.",
  "esempio.step5.title": "5. Regional and municipal surcharges",
  "esempio.step5.body":
    "On the taxable income we apply the regional surcharge ({regionalRate}, equal to {regional}) and the municipal surcharge ({municipalRate}, equal to {municipal}).",
  "esempio.step6.title": "6. Credits and final net",
  "esempio.step6.body":
    "Then we add the credits you are entitled to (trattamento integrativo, additional sum, net performance bonus, contribution waivers). The annual net you take home is {net}, about {monthly} per month.",
  "esempio.brackets.standard": "23% up to €28,000, 35% up to €50,000, 43% above",
  "esempio.brackets.2026": "23% up to €28,000, 33% up to €50,000, 43% above",

  "glossario.eyebrow": "Glossary",
  "glossario.title": "Italian tax terms <em>in short</em>.",
  "glossario.lede":
    "One definition per term that recurs across the calculators. Logical order, not alphabetical.",
  "glossario.irpef.term": "IRPEF",
  "glossario.irpef.definition":
    "Italian personal income tax. Applied to taxable income (gross minus contributions) via progressive brackets. 2026 rates: 23% up to €28,000, 33% from €28,001 to €50,000, 43% above. Reference: TUIR (DPR 917/1986) and D.Lgs. 216/2023.",
  "glossario.inps.term": "INPS contributions",
  "glossario.inps.definition":
    "Employee social-security contributions paid to the National Social Security Institute. The ordinary part is 9.19% of gross, plus one percentage point on the share above the first pay band (€56,224 in 2026). They fund the future pension. Source: annual INPS circulars.",
  "glossario.cuneo.term": "Tax wedge",
  "glossario.cuneo.definition":
    "The gap between employer labor cost and employee net pay. The cut is the reduction of contributions or IRPEF for low-to-medium incomes: since 2025 an extra sum in the payslip up to €20,000 of income and a deduction of up to €1,000 that phases out at €40,000. Reference: L. 207/2024, made permanent by L. 199/2025.",
  "glossario.trattamento.term": "Trattamento integrativo",
  "glossario.trattamento.definition":
    "Credit of up to €1,200 a year for employment income up to €28,000. Up to €15,000 you get it in full, then only for the share of deductions that exceeds gross IRPEF. Reference: D.L. 3/2020.",
  "glossario.regionale.term": "Regional surcharge",
  "glossario.regionale.definition":
    "IRPEF surcharge for the region of residence, applied to taxable income. In the calculator's data rates run from 0.70% to 3.63%, and some regions have an exemption threshold.",
  "glossario.comunale.term": "Municipal surcharge",
  "glossario.comunale.definition":
    "IRPEF surcharge for the municipality of residence, set each year by municipal resolution. The calculator keeps no table of the eight thousand Italian municipalities: you enter the rate yourself.",
  "glossario.tfr.term": "TFR (Trattamento di Fine Rapporto)",
  "glossario.tfr.definition":
    "Annual provision set aside by the employer for the employee, equal to about 7.4% of compensation (Art. 2120 c.c.). It is revalued each year at 1.5% fixed plus 75% of FOI inflation. Paid out at the end of the employment relationship.",
  "glossario.ccnl.term": "CCNL",
  "glossario.ccnl.definition":
    "National Collective Labor Agreement. Defines minimum wages, job grades, monthly instalments, holidays, notice, and protections for each sector. It is negotiated between employer associations and unions.",
  "glossario.naspi.term": "NASpI",
  "glossario.naspi.definition":
    "New Social Insurance for Employment: monthly unemployment indemnity introduced by D.Lgs. 22/2015. Paid to workers who lose their job involuntarily with at least 13 weeks of contributions in the previous 4 years.",
  "glossario.forfettario.term": "Forfettario regime",
  "glossario.forfettario.definition":
    "Simplified tax regime for self-employed workers with revenue up to €85,000 per year. Substitute tax of 15% (5% in the first 5 years of new activity), no VAT, no ordinary IRPEF. Reference: Law 190/2014.",

  "employee.breakdown.gross": "Gross annual",
  "employee.breakdown.inps": "INPS contributions",
  "employee.breakdown.irpefNet": "IRPEF net",
  "employee.breakdown.regional": "Regional surcharge",
  "employee.breakdown.municipal": "Municipal surcharge",
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
    "The project exists to give an estimate of net salary starting from gross. Regional rates are editable because they differ between regions.",
  "about.body2":
    "The calculation follows the Agenzia delle Entrate brackets and current INPS circulars. No estimate replaces the real payslip: this tool is for orientation.",
  "about.github": "Code on GitHub",

  "sources.eyebrow": "Sources",
  "sources.title": "Where the numbers come from",
  "sources.lede":
    "Every calculation is grounded in public documents. Below, in compact form, the origin of each component.",
  "sources.citations": "References",
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
  "sources.forfettario.title": "Flat-rate (forfettario) regime",
  "sources.forfettario.body":
    "Profitability coefficient by activity, revenue threshold and the 5% or 15% substitute tax. Contributions to the Gestione Separata or the Artisans and Traders schemes.",
  "sources.naspi.title": "NASpI",
  "sources.naspi.body":
    "Monthly benefit on 75% of average pay up to a cap, reduced by 3% a month. Duration depends on weeks of contribution.",
  "sources.preavviso.title": "Resignation notice",
  "sources.preavviso.body":
    "Notice days are set by the CCNL based on level and length of service. The exit date excludes weekends and national holidays.",
  "sources.tredicesima.title": "13th-month salary",
  "sources.tredicesima.body":
    "The Christmas bonus pays INPS and IRPEF at the marginal rate, with no work deductions and no local surcharges.",
  "sources.tfr.title": "Severance (TFR)",
  "sources.tfr.body":
    "Annual quota of pay divided by 13.5, revalued by 1.5% plus 75% of the ISTAT FOI index, with a 17% tax on the revaluation.",
  "sources.fringe.title": "Fringe benefits and welfare",
  "sources.fringe.body":
    "Exemption thresholds for company welfare, meal vouchers, health policies and company cars. Supplementary pension contributions are deductible up to the annual cap.",
  "sources.inflation.title": "ISTAT FOI index",
  "sources.inflation.body":
    "Consumer price index for blue- and white-collar households, 2015 base. It is the same index that revalues TFR and measures purchasing power over time.",

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
  "apprenticeship.col.net": "Monthly net (estimate)",
  "apprenticeship.row.netUnit": "/ month",
  "apprenticeship.row.openLink": "Open the calculator for year {year}",
  "apprenticeship.results.footnote":
    "Monthly net is estimated with Lombardy rates, 0.8% municipal surcharge and an apprenticeship contract. Open any row to refine region, deductions and other inputs.",

  "forfettario.eyebrow": "Tool",
  "forfettario.title": "Self-employed <em>forfettario</em>.",
  "forfettario.lede":
    "From annual invoiced revenue I derive taxable income, Gestione Separata contributions and the substitute tax. Valid for forfettario taxpayers up to {limit} of revenue.",

  "forfettario.form.revenue": "Expected annual revenue",
  "forfettario.form.revenue.hint":
    "Gross amounts you will invoice over the year on your forfettario VAT number.",
  "forfettario.form.activity": "Business activity",
  "forfettario.form.activity.hint": "Determines the profitability coefficient applied to revenue.",
  "forfettario.form.year": "Tax year",
  "forfettario.form.year.hint": "Reference year for rates and ceilings.",
  "forfettario.form.yearsOfActivity": "Years since VAT opened",
  "forfettario.form.yearsOfActivity.hint":
    "In the first 5 years the substitute tax is reduced to 5%.",
  "forfettario.form.hasOtherPension": "I have other pension coverage",
  "forfettario.form.hasOtherPension.hint":
    "Pension, other INPS scheme or employment: Gestione Separata rate drops to 24%.",
  "forfettario.form.employeeCosts": "Annual employee costs",
  "forfettario.form.employeeCosts.hint": "Above {limit} you fall out of the forfettario regime.",

  "forfettario.form.gestion": "Pension fund",
  "forfettario.form.gestion.hint": "Determines contribution rates and minimums.",
  "forfettario.form.gestion.gestione-separata":
    "INPS Gestione Separata (freelancer without dedicated cassa)",
  "forfettario.form.gestion.artigiani": "INPS Gestione Artigiani",
  "forfettario.form.gestion.commercianti": "INPS Gestione Commercianti",
  "forfettario.form.gestion.cassa-professionale": "Professional cassa (manual amount)",
  "forfettario.form.cassaManualAmount": "Annual contribution to the cassa",
  "forfettario.form.cassaManualAmount.hint": "Enter the amount your cassa estimates for the year.",
  "forfettario.form.mesiAttivita": "Months of activity in the year",
  "forfettario.form.mesiAttivita.hint":
    "The minimum annual contribution for Artigiani and Commercianti is prorated by months of registration.",
  "forfettario.form.isConcurrentFullTimeEmployee":
    "I am also a full-time employee (32+ hours per week)",
  "forfettario.form.concurrentEmployeeRal": "Full-time employee gross salary",
  "forfettario.form.concurrentEmployeeRal.hint":
    "Forfettario is barred if the employee gross salary exceeds €35,000.",
  "forfettario.form.isAnte1996": "Enrolled in INPS before 1996 (reduced cap)",
  "forfettario.form.forfettarioDiscount35": "Apply the 35% forfettario reduction (Law 190/2014)",
  "forfettario.form.newRegistrantDiscount50":
    "I am a new registrant: 50% reduction for the first 36 months (Law 207/2024)",

  "forfettario.eligibility.warning": "Revenue close to the regime limit ({percent}% of {limit}).",
  "forfettario.eligibility.revenueExceeded":
    "Revenue above the {limit} limit: forfettario regime does not apply.",
  "forfettario.eligibility.employeeCostsExceeded":
    "Employee costs above {limit}: forfettario regime does not apply.",
  "forfettario.eligibility.concurrentEmployeeRalTooHigh":
    "The employee gross salary exceeds €35,000: forfettario regime does not apply.",

  "forfettario.summary.monthlyNet": "Monthly net",
  "forfettario.summary.annualNet": "Annual net",
  "forfettario.summary.annualNet.sub": "revenue minus contributions and substitute tax",
  "forfettario.summary.effectiveRate": "Effective tax rate:",
  "forfettario.summary.totalTaxes": "Total levy:",
  "forfettario.summary.regimeType": "Regime {rate} ({phase})",
  "forfettario.summary.regimeType.startup": "first 5 years",
  "forfettario.summary.regimeType.standard": "standard",

  "forfettario.breakdown.title": "Calculation breakdown",
  "forfettario.breakdown.revenue": "Annual revenue",
  "forfettario.breakdown.coefficient": "Profitability coefficient",
  "forfettario.breakdown.imponibileLordo": "Gross taxable income",
  "forfettario.breakdown.inps": "Gestione Separata contributions ({rate})",
  "forfettario.breakdown.inps.gestione-separata": "Gestione Separata contributions ({rate})",
  "forfettario.breakdown.inps.artigiani": "INPS Artigiani contributions ({rate})",
  "forfettario.breakdown.inps.commercianti": "INPS Commercianti contributions ({rate})",
  "forfettario.breakdown.inps.cassa-professionale": "Professional cassa contributions",
  "forfettario.breakdown.discount35": "35% discount applied (Law 190/2014).",
  "forfettario.breakdown.discount50": "50% new-registrant discount applied (Law 207/2024).",
  "forfettario.breakdown.imponibileNetto": "Net taxable income",
  "forfettario.breakdown.imponibileNetto.sub": "(gross taxable minus deducted INPS contributions)",
  "forfettario.breakdown.impostaSostitutiva": "Substitute tax ({rate})",
  "forfettario.breakdown.totalTaxes": "Total taxes and contributions",
  "forfettario.breakdown.net": "Annual net",

  "compoundInterest.eyebrow": "Planning",
  "compoundInterest.title": "How my <em>savings</em> grow over time",
  "compoundInterest.lede":
    "Estimate the future value of a sum, accounting for periodic contributions, compounding frequency and expected inflation.",
  "compoundInterest.form.principal": "Initial principal",
  "compoundInterest.form.principal.hint": "The amount you start with.",
  "compoundInterest.form.annualRate": "Expected annual return",
  "compoundInterest.form.annualRate.hint": "Interest rate before inflation.",
  "compoundInterest.form.years": "Duration",
  "compoundInterest.form.years.unit": "years",
  "compoundInterest.form.contribution": "Periodic contribution",
  "compoundInterest.form.contribution.hint": "Leave at zero if you contribute nothing.",
  "compoundInterest.form.contributionFrequency": "Contribution frequency",
  "compoundInterest.form.contributionFrequency.monthly": "Monthly",
  "compoundInterest.form.contributionFrequency.yearly": "Yearly",
  "compoundInterest.form.contributionFrequency.none": "None",
  "compoundInterest.form.compoundingFrequency": "Compounding",
  "compoundInterest.form.compoundingFrequency.annually": "Annually",
  "compoundInterest.form.compoundingFrequency.monthly": "Monthly",
  "compoundInterest.form.compoundingFrequency.daily": "Daily",
  "compoundInterest.form.inflationRate": "Expected inflation",
  "compoundInterest.form.inflationRate.hint": "Used to compute the real final value.",
  "compoundInterest.result.finalNominal": "Final nominal value",
  "compoundInterest.result.finalReal": "Final real value",
  "compoundInterest.result.finalReal.sub": "discounted by expected inflation",
  "compoundInterest.result.totalContributions": "Total contributed",
  "compoundInterest.result.totalInterest": "Interest accrued",
  "compoundInterest.schedule.title": "Year-by-year progression",
  "compoundInterest.schedule.year": "Year",
  "compoundInterest.schedule.balance": "Nominal balance",
  "compoundInterest.schedule.real": "Real balance",
  "compoundInterest.schedule.contributions": "Contributed",
  "compoundInterest.schedule.interest": "Interest",

  "naspi.eyebrow": "Tool",
  "naspi.title": "Unemployment <em>indemnity</em>",
  "naspi.lede":
    "Estimate NASpI: monthly amount, duration and progressive reduction. 2024–2026 INPS parameters.",
  "naspi.form.year": "Year of cessation",
  "naspi.form.grossPay4Years": "Gross pay (last 4 years)",
  "naspi.form.grossPay4Years.hint":
    "Sum of all taxable pay. Excludes TFR and expense reimbursements.",
  "naspi.form.weeksContribution4Years": "Weeks of contribution (last 4 years)",
  "naspi.form.weeksContribution4Years.hint":
    "Minimum 13. Includes paid and figurative contributions (maternity, parental leave).",
  "naspi.form.age": "Age at claim",
  "naspi.form.voluntaryToggle":
    "Voluntary resignation from a permanent contract in the last 12 months",
  "naspi.form.weeksAfterVoluntaryResignation": "Weeks of contribution after resignation",
  "naspi.form.weeksAfterVoluntaryResignation.hint":
    "At least 13 weeks of contribution after the voluntary resignation are required to reopen NASpI.",
  "naspi.ineligible.title": "Not eligible",
  "naspi.ineligible.insufficient-weeks":
    "At least 13 weeks of contribution in the last 4 years are required.",
  "naspi.ineligible.voluntary-resignation-lockout":
    "You resigned voluntarily from a permanent contract in the last 12 months. At least 13 new weeks of contribution are required before a new NASpI can be granted.",
  "naspi.result.monthlyAmount": "Monthly amount (gross)",
  "naspi.result.monthlyAmountNet": "Monthly amount (net)",
  "naspi.result.monthlyAmountGross.sub": "Gross: {gross, number, ::currency/EUR .}",
  "naspi.result.monthlyAmount.capped": "Monthly amount at the {year} cap.",
  "naspi.result.durationMonths": "Duration",
  "naspi.result.durationMonths.value": "{months, plural, one {# month} other {# months}}",
  "naspi.result.totalGross": "Estimated gross total",
  "naspi.result.totalNet": "Estimated net total",
  "naspi.result.totalGross.sub": "Gross: {gross, number, ::currency/EUR .}",
  "naspi.result.referenceMonthly": "Reference monthly pay",
  "naspi.schedule.title": "Month-by-month schedule",
  "naspi.schedule.month": "Month",
  "naspi.schedule.amount": "Gross",
  "naspi.schedule.amountNet": "Net",
  "naspi.decalage.note": "3% monthly reduction from month {month}.",
  "naspi.irpef.note":
    "The net estimate applies IRPEF brackets to the annual total. INPS contributions and surcharges do not apply.",

  "preavviso.eyebrow": "Tool",
  "preavviso.title": "Resignation <em>notice</em>",
  "preavviso.lede": "Compute the notice period and exit date based on CCNL, level and seniority.",
  "preavviso.form.ccnl": "Applicable CCNL",
  "preavviso.form.livello": "Level / category",
  "preavviso.form.hireDate": "Hire date",
  "preavviso.form.resignationDate": "Resignation communication date",
  "preavviso.form.error.invalidDates": "Resignation date must be after the hire date.",
  "preavviso.result.noticeDays": "Notice days",
  "preavviso.result.noticeDays.value": "{days, plural, one {# day} other {# days}}",
  "preavviso.result.exitDate": "Last day of work",
  "preavviso.result.band": "Seniority",
  "preavviso.result.band.lt-5y": "Less than 5 years",
  "preavviso.result.band.5-10y": "5 to 10 years",
  "preavviso.result.band.gt-10y": "More than 10 years",
  "preavviso.result.band.lte-3y": "Up to 3 years",
  "preavviso.result.band.gt-3y": "More than 3 years",
  "preavviso.result.workingDays.note": "These are working days (Saturdays and Sundays excluded).",
  "preavviso.result.calendarDays.note": "These are calendar days.",

  "inverse.eyebrow": "Tool",
  "inverse.title": "From <em>net</em> to gross",
  "inverse.lede":
    "What gross annual salary produces a target net? Bisection on the forward calculator.",
  "inverse.form.targetNetAnnual": "Target annual net",
  "inverse.form.targetNetAnnual.hint":
    "The annual take-home you aim for, spread over 12 months before 13th/14th-month bonuses.",
  "inverse.form.municipal.percent": "%",
  "inverse.result.grossAnnual": "Corresponding gross",
  "inverse.result.grossMonthly": "Monthly gross",
  "inverse.result.netAnnualAchieved": "Net annual achieved",
  "inverse.result.netMonthly": "Monthly net",
  "inverse.result.inps": "INPS contributions",
  "inverse.result.irpef": "Net IRPEF",
  "inverse.result.notConverged":
    "The calculator did not find a precise value. The result is the best approximation.",

  "tredicesima.eyebrow": "Tool",
  "tredicesima.title": "What the <em>13th salary</em> is worth net",
  "tredicesima.lede":
    "The tredicesima is an extra month's pay, but it's taxed more than a normal salary: it carries no work deduction and no local surcharges. Here's what you keep.",
  "tredicesima.form.ral": "Annual gross salary",
  "tredicesima.form.ral.hint": "The RAL the extra month is computed from.",
  "tredicesima.form.mensilita": "Instalments",
  "tredicesima.form.mensilita.hint": "13 for the 13th only, 14 to include the 14th too.",
  "tredicesima.result.net": "Net 13th salary",
  "tredicesima.result.net.sub": "Effective take of {rate} between INPS and IRPEF",
  "tredicesima.result.netTotal": "Net of 13th and 14th",
  "tredicesima.breakdown.gross": "Gross 13th",
  "tredicesima.breakdown.inps": "INPS contributions",
  "tredicesima.breakdown.irpef": "IRPEF",
  "tredicesima.breakdown.net": "Take-home",
  "tredicesima.result.note":
    "The 13th carries no employee work deduction and no regional or municipal surcharge, so it is taxed more than an ordinary month.",

  "inflation.eyebrow": "Tool",
  "inflation.title": "<em>Purchasing power</em> over time",
  "inflation.lede":
    "Inflation erodes the value of money. See what an amount from a few years ago is worth today, by the ISTAT FOI index.",
  "inflation.form.amount": "Amount",
  "inflation.form.amount.hint":
    "The amount whose real value you want to compare between two years.",
  "inflation.form.fromYear": "From year",
  "inflation.form.toYear": "To year",
  "inflation.result.adjusted": "Equivalent in {year}",
  "inflation.result.adjusted.sub": "Same purchasing power as {year}",
  "inflation.result.cumulative": "Cumulative inflation",
  "inflation.result.note":
    "Based on the ISTAT FOI index (consumer prices for blue- and white-collar households), 2015 base. It is the same index used to revalue TFR.",

  "comparison.eyebrow": "Tool",
  "comparison.title": "Two <em>offers</em> compared",
  "comparison.lede":
    "Two gross salaries side by side, under the same conditions. See which leaves more net pay, and by how much.",
  "comparison.form.ralA": "Offer A: annual gross",
  "comparison.form.ralB": "Offer B: annual gross",
  "comparison.result.offerA": "Net, offer A",
  "comparison.result.offerB": "Net, offer B",
  "comparison.result.winner":
    "{winner, select, a {Offer A is higher} b {Offer B is higher} other {Same net pay}}",
  "comparison.result.perMonth": "{amount} per month",
  "comparison.result.note":
    "Same conditions for both: year, region, municipality and instalments. Only the starting gross differs.",

  "employerCost.eyebrow": "Tool",
  "employerCost.title": "What an <em>employee</em> costs",
  "employerCost.lede":
    "What a company really spends on an employee: from the gross on the payslip to the total cost, with contributions and accruals.",

  "tfr.eyebrow": "Tool",
  "tfr.title": "How much <em>TFR</em> you build up",
  "tfr.lede":
    "Severance pay (TFR) grows each year with a share of your salary and a revaluation. Estimate how much you accumulate over time.",
  "tfr.form.years": "Years of service",
  "tfr.form.years.hint": "How many years you stay with the same employer.",
  "tfr.form.inflation": "Expected inflation",
  "tfr.form.inflation.hint": "Drives the yearly revaluation: 1.5% fixed plus 75% of inflation.",
  "tfr.result.stock": "Accumulated TFR",
  "tfr.result.stock.sub": "Annual quota {amount}, before separate taxation",
  "tfr.breakdown.quote": "Quotas set aside",
  "tfr.breakdown.revaluation": "Net revaluation",
  "tfr.result.note":
    "Each year you set aside about 7.4% of your salary, revalued at 1.5% plus 75% of ISTAT inflation, with a 17% substitute tax on the revaluation. At payout, separate taxation applies and is not computed here.",

  "employee.extras.title": "Personalize the calculation",
  "employee.extras.group.contract": "Contract and INPS contributions",
  "employee.extras.group.deductions": "Deductions and personal situation",
  "employee.extras.group.compensation": "Additional compensation",
  "employee.extras.section.inpsRates": "INPS rates",
  "employee.extras.section.inpsRates.lede":
    "Company size, public-sector employees, custom CCNL rates.",
  "employee.extras.section.dependents": "Dependents",
  "employee.extras.section.dependents.lede": "Spouse, children over 21, other dependents.",
  "employee.extras.section.expenses": "Deductible expenses",
  "employee.extras.section.expenses.lede":
    "Medical, mortgage, renovations, supplementary pension contributions.",
  "employee.extras.section.specialConditions": "Special regimes and conditions",
  "employee.extras.section.specialConditions.lede":
    "Returning workers (impatriati), three-children mother exemption.",
  "employee.extras.section.premio": "Performance bonus",
  "employee.extras.section.premio.lede": "Variable amount with 5% substitute taxation.",
  "employee.extras.section.fringe": "Fringe benefits",
  "employee.extras.section.fringe.lede": "Company car, meal vouchers, company welfare.",
  "employee.extras.status.set": "set",
  "employee.extras.toggle.enable": "Apply to the calculation",
  "employee.extras.municipal": "Municipal surcharge rate",
  "employee.extras.municipal.lookup": "Look up your rate",

  "employee.inpsRates.largeCompany.label": "Company with more than 15 employees",
  "employee.inpsRates.largeCompany.hint":
    "Adds the 0.30% CIGS contribution to the employee rate, taking it from 9.19% to 9.49%.",
  "employee.inpsRates.publicEmployee.label": "Public-sector employee",
  "employee.inpsRates.publicEmployee.hint":
    "Uses the 8.80% IVS rate from the INPS Public Employees scheme (ex-INPDAP).",
  "employee.inpsRates.override.label": "Custom INPS rates",
  "employee.inpsRates.override.hint":
    "Overrides the computed rates. Use only when your CCNL specifies non-standard values.",
  "employee.inpsRates.override.employee": "Employee rate",
  "employee.inpsRates.override.employer": "Employer rate",

  "moneyJourney.title": "From company cost to take-home pay",
  "moneyJourney.lede":
    "Every euro the company spends on you breaks down like this: part goes to contributions and accruals, the rest is your gross salary. The gross salary then splits between the net you receive and what's withheld: employee INPS and taxes.",
  "moneyJourney.node.costo": "Company cost",
  "moneyJourney.node.ral": "Gross salary",
  "moneyJourney.node.inpsAzienda": "Employer INPS",
  "moneyJourney.node.tfr": "TFR accrual",
  "moneyJourney.node.oneri": "Insurance and other costs",
  "moneyJourney.node.netto": "Take-home net",
  "moneyJourney.node.inpsDip": "Employee INPS",
  "moneyJourney.node.tasse": "IRPEF and surcharges",

  "share.button.idle": "Copy link to this calculation",
  "share.button.copied": "Link copied",
  "share.button.failed": "Copy failed",
  "share.button.print": "Print payslip",

  "print.title": "Payslip",
  "print.subtitle": "Net salary calculation for tax year {year}",
  "print.section.summary": "Summary",
  "print.section.inputs": "Calculation inputs",
  "print.section.breakdown": "Calculation detail",
  "print.summary.netAnnual": "Annual net",
  "print.summary.netMonthly": "Monthly net",
  "print.input.gross": "Annual gross salary",
  "print.input.year": "Tax year",
  "print.input.region": "Region",
  "print.input.municipality": "Municipal surcharge rate",
  "print.input.contract": "Contract type",
  "print.input.frequency": "Monthly instalments",
  "print.input.companySize": "Company size",
  "print.input.publicEmployee": "Public sector",
  "print.input.inpsOverride": "Custom INPS rates",
  "print.input.contract.indeterminato": "Permanent",
  "print.input.contract.determinato": "Fixed-term",
  "print.input.contract.apprendistato": "Apprenticeship",
  "print.input.companySize.large": "More than 15 employees",
  "print.input.companySize.small": "Up to 15 employees",
  "print.input.yes": "Yes",
  "print.input.no": "No",
  "print.breakdown.gross": "Annual gross salary",
  "print.breakdown.inps": "Employee INPS contributions",
  "print.breakdown.taxableIncome": "IRPEF taxable income",
  "print.breakdown.irpefGross": "Gross IRPEF",
  "print.breakdown.totalDeductions": "Total deductions",
  "print.breakdown.irpefNet": "Net IRPEF",
  "print.breakdown.regional": "Regional surcharge",
  "print.breakdown.municipal": "Municipal surcharge",
  "print.breakdown.trattamento": "Trattamento integrativo",
  "print.breakdown.sommaAggiuntiva": "Additional sum (€100 bonus)",
  "print.breakdown.pdrNet": "Net performance bonus",
  "print.breakdown.totalTaxes": "Total tax and contribution charge",
  "print.breakdown.netAnnual": "Annual net",
  "print.breakdown.netMonthly": "Monthly net",
  "print.footer.note":
    "Estimate for guidance only. Your employer's official payslip remains the reference.",
  "print.footer.sourceLink": "Verify the calculation at quantoguadagno.it",

  "history.eyebrow": "Salary history",
  "history.title": "Your salaries <em>over time</em>",
  "history.lede":
    "Add your gross salary year by year. We show them in today's terms using the ISTAT FOI index up to {year}.",
  "history.form.title": "Add a year",
  "history.form.year": "Year",
  "history.form.gross": "Gross salary that year",
  "history.form.contractType": "Contract",
  "history.form.paymentFrequency": "Monthly payments",
  "history.form.municipalTaxRate": "Municipal surcharge rate",
  "history.form.extras": "More settings",
  "history.form.dependents.hasSpouse": "Dependent spouse",
  "history.form.dependents.spouseIncome": "Spouse annual income",
  "history.form.dependents.childrenOver21": "Dependent children over 21",
  "history.form.dependents.otherDependents": "Other dependents",
  "history.form.companySize": "Company size",
  "history.form.companySize.unspecified": "Unspecified",
  "history.form.companySize.small": "Up to 15 employees",
  "history.form.companySize.large": "Over 15 employees",
  "history.form.note": "Note (optional)",
  "history.form.note.hint": "E.g. employer, role, career event",
  "history.form.submit": "Add to history",
  "history.chart.title": "Trend",
  "history.chart.empty": "Add at least one entry to see the chart.",
  "history.chart.aria":
    "Salaries over time: gross, net and projection up to {year}. Tab to walk through the years.",
  "history.chart.legend.net": "Net",
  "history.chart.legend.gross": "Gross",
  "history.chart.legend.projection": "Projection",
  "history.chart.hit.aria":
    "{year}: {gross} gross, {net} net{projected, plural, =1 { (estimate)} other {}}",
  "history.chart.popover.gross": "Gross",
  "history.chart.popover.net": "Net",
  "history.chart.popover.netMonthly": "Net per month",
  "history.chart.popover.delta": "{pct} vs {year}",
  "history.chart.popover.projectedTag": "estimate",
  "history.table.title": "History",
  "history.table.year": "Year",
  "history.table.gross": "Nominal gross",
  "history.table.net": "Net",
  "history.table.adjusted": "Adjusted to {year}",
  "history.table.note": "Note",
  "history.table.actions": "Actions",
  "history.table.empty": "No entries yet. Add one using the form above.",
  "history.table.delete": "Remove",
  "history.table.delete.aria": "Remove the {year} entry",
  "history.table.adjusted.na": "n/a",
  "history.table.net.na": "n/a",
  "history.table.net.naHint": "We don't yet have tax rules for {year}. Coming as a follow-up.",
  "history.table.expand": "Details",
  "history.table.collapse": "Hide",
  "history.table.migrated": "Estimated settings",
  "history.table.migrated.hint":
    "Saved before the new settings landed. To customise, delete it and add it again.",
  "history.table.settings.region": "Region",
  "history.table.settings.contractType": "Contract",
  "history.table.settings.paymentFrequency": "Monthly payments",
  "history.table.settings.municipalTaxRate": "Municipal rate",
  "history.table.settings.dependents": "Dependents",
  "history.table.settings.dependents.summary":
    "{spouse, plural, =0 {} other {spouse}} {children, plural, =0 {} =1 {1 child over 21} other {# children over 21}} {other, plural, =0 {} =1 {1 other dependent} other {# other dependents}}",
  "history.table.settings.companySize": "Company size",

  "history.projection.title": "Tomorrow",
  "history.projection.lede":
    "If nothing changes from {year} ({gross, number}€ gross), here's how net could evolve.",
  "history.projection.horizonLabel": "Horizon",
  "history.projection.horizonYears": "{years, plural, =1 {1 year} other {# years}}",
  "history.projection.growthRateLabel": "Expected annual growth",
  "history.projection.summary":
    "In {year}: {gross} gross → {net} net per year, about {netMonthly} per month (at {growth} growth).",
  "history.projection.emptyHint": "Add an entry for 2024 or later to see a projection.",

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
    "Parents, in-laws, siblings and other family members under art. 433 c.c. living with you or receiving alimony. €750 per person, phased out by income (zero above €80,000).",

  "employee.expenses.title": "Expense deductions",
  "employee.expenses.mortgageInterest": "Mortgage interest",
  "employee.expenses.mortgageInterest.hint": "Deductible at 19% up to €4,000",
  "employee.expenses.medicalExpenses": "Medical expenses",
  "employee.expenses.medicalExpenses.hint": "Deductible at 19% above the threshold of €129.11",
  "employee.expenses.otherDeductions": "Other deductions at 19%",
  "employee.expenses.otherDeductions.hint": "Education, insurance, etc.",
  "employee.expenses.pensionFund": "Supplementary pension fund",
  "employee.expenses.pensionFund.hint":
    "Pension-fund contributions, deductible from income up to €5,164.57/year.",

  "employee.premio.title": "Performance bonus (PdR)",
  "employee.premio.amount": "Gross amount (max {max})",
  "employee.premio.hint": "{rate} flat tax for incomes under €80,000",

  "employee.fringe.title": "Fringe benefits",
  "employee.fringe.companyCar.title": "Company car",
  "employee.fringe.companyCar.subtitle": "Taxable annual benefit on the payslip.",
  "employee.fringe.mealVouchers.subtitle":
    "Tax-free up to {amount}/day (electronic) or {paper}/day (paper).",
  "employee.fringe.healthInsurance.subtitle": "Exempt up to €3,615/year.",
  "employee.fringe.welfare.subtitle":
    "Exempt up to {amount}/year ({amountChildren} with dependent children).",
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
  "employee.fringe.mealVouchers.title": "Meal vouchers",
  "employee.fringe.mealVouchers.type": "Voucher type",
  "employee.fringe.mealVouchers.type.electronic": "Electronic",
  "employee.fringe.mealVouchers.type.paper": "Paper",
  "employee.fringe.mealVouchers.dailyValue": "Daily value (€)",
  "employee.fringe.mealVouchers.dailyValue.hint": "Tax-free up to {amount}/day.",
  "employee.fringe.mealVouchers.workingDays": "Working days/month",
  "employee.fringe.mealVouchers.workingDays.hint": "Typically 20–22 days",
  "employee.fringe.healthInsurance.title": "Health insurance",
  "employee.fringe.healthInsurance.annualPremium": "Annual premium",
  "employee.fringe.healthInsurance.annualPremium.hint": "Tax-free up to €3,615.20/year",
  "employee.fringe.welfare.title": "Company welfare",
  "employee.fringe.welfare.annualAmount": "Annual welfare amount",
  "employee.fringe.welfare.annualAmount.hint": "Tax-free up to {amount}/year",
  "employee.fringe.welfare.annualAmount.hintWithChildren":
    "Tax-free up to {amount}/year (with dependent children)",
  "employee.fringe.welfare.hasChildren": "I have dependent children",

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

  "employee.summary.monthlyNet": "Net monthly",
  "employee.summary.annualNet": "Net annual",
  "employee.summary.annualNet.sub": "over {frequency} instalments",
  "employee.summary.delta": "Gross-to-net difference:",
  "employee.summary.effectiveRate": "Effective tax rate:",
  "employee.summary.marginalRate": "Marginal tax rate:",
  "employee.summary.gross": "Gross annual",

  "employee.yearCompare.title": "Same gross, different years",
  "employee.yearCompare.perMonth": "month",
  "employee.yearCompare.perYear": "year",
  "employee.yearCompare.currentBadge": "selected year",

  "employee.ccnlPreset.title": "CCNL preset:",
  "employee.ccnlPreset.commercio": "Retail",
  "employee.ccnlPreset.metalmeccanici": "Metalworkers",
  "employee.ccnlPreset.logistica": "Logistics",
  "employee.ccnlPreset.cooperativeSociali": "Social co-ops",
  "employee.ccnlPreset.mensilitaFmt": "{n} instalments",

  "employee.irpefBracket.title": "IRPEF bracket",
  "employee.irpefBracket.range": "{min} – {max}",
  "employee.irpefBracket.rangeOpen": "{min} and above",
  "employee.irpefBracket.distanceToNext": "{distance} left before the {nextRate} bracket.",
  "employee.irpefBracket.topBracket": "You're already in the top bracket.",
  "employee.summary.pdr": "Performance bonus (net)",

  "employee.breakdown.title": "Tax breakdown",
  "employee.breakdown.section.contributions": "Social contributions",
  "employee.breakdown.section.taxes": "Income taxes",
  "employee.breakdown.section.credits": "Credits and bonuses",
  "employee.breakdown.section.pdr": "Performance bonus",
  "employee.breakdown.section.tfr": "TFR accrual",
  "employee.breakdown.tfr": "TFR accruing this year",
  "employee.breakdown.tfr.note":
    "Equal to one thirteenth-and-a-half of gross pay. It isn't paid in the monthly payslip: it's settled when employment ends or as a partial advance (mortgage, medical, training).",
  "employee.breakdown.pensionFund": "Supplementary pension fund",
  "employee.breakdown.taxableIncome": "Taxable income",
  "employee.breakdown.inpsExemption": "2024 contribution exemption",
  "employee.breakdown.madreLavoratrice": "Working mother exemption",
  "employee.breakdown.irpefGross": "IRPEF gross",
  "employee.breakdown.workDeduction": "Work-income deduction",
  "employee.breakdown.dependents": "Dependents deduction",
  "employee.breakdown.expenses": "Expense deductions",
  "employee.breakdown.detrazioneAggiuntiva": "Additional deduction (tax wedge)",
  "employee.breakdown.impatriati": "Impatriate regime saving",
  "employee.breakdown.sommaAggiuntiva": "Somma aggiuntiva (tax wedge)",
  "employee.breakdown.totalTaxes": "Total fiscal charge",
  "employee.breakdown.pdrGross": "Bonus gross",
  "employee.breakdown.pdrInps": "INPS on bonus",
  "employee.breakdown.pdrTax": "Substitute tax on bonus",
  "employee.breakdown.pdrNet": "Bonus net",
  "employee.breakdown.netMonthly": "Net monthly:",

  "employee.employer.section": "Employer side",
  "employee.employer.youTake": "You take home",
  "employee.employer.companyPays": "The company pays",
  "employee.employer.insight": "Every net euro you receive costs the company {ratio}.",
  "employee.employer.inps": "Employer INPS contributions",
  "employee.employer.tfr": "TFR accrual",
  "employee.employer.otherCosts": "Other employer costs",
  "employee.employer.inail": "INAIL",
  "employee.employer.maternity": "Maternity fund",
  "employee.employer.naspi": "NASpI",
  "employee.employer.naspiAdditional": "NASpI additional contribution",
  "employee.employer.cig": "CIG",
  "employee.employer.other": "Other contributions",
  "employee.employer.totalOtherCosts": "Total other costs",
  "employee.employer.total": "Total company cost",
  "employee.employer.disclaimer":
    "Does not include non-contractual costs (training, equipment, benefits, etc.)",
};
