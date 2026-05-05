export const it = {
  "app.title": "Quanto Guadagno",
  "a11y.skipLink": "Salta al contenuto",
  "error.boundary.title": "Qualcosa è andato storto",
  "error.boundary.body": "Ricarica la pagina per riprovare.",

  "nav.home": "Home",
  "nav.employee": "Calcolatore stipendio",

  "home.eyebrow": "Quanto Guadagno",
  "home.title": "Capire davvero quanto resta in busta",
  "home.subtitle":
    "Una raccolta di strumenti per leggere lo stipendio italiano. Calcoli verificati su norme e circolari, niente promesse e niente fronzoli.",
  "home.tools.heading": "Strumenti",
  "home.tools.open": "Apri",
  "home.tools.soon": "In arrivo",
  "home.tools.employee.title": "Calcolatore stipendio netto",
  "home.tools.employee.desc":
    "Dal lordo al netto: IRPEF, INPS, addizionali per il 2024, 2025 e 2026.",
  "home.tools.freelancer.title": "Partita IVA",
  "home.tools.freelancer.desc": "Forfettario o ordinario, gestione separata o cassa professionale.",
  "home.tools.comparison.title": "Confronto scenari",
  "home.tools.comparison.desc":
    "Più ipotesi di stipendio una accanto all'altra, con esportazione CSV.",
  "home.tools.statistics.title": "Statistiche",
  "home.tools.statistics.desc":
    "Dove si colloca il tuo stipendio rispetto alla distribuzione ISTAT.",
  "home.tools.tools.title": "Approfondimento dipendente",
  "home.tools.tools.desc": "Costo per il datore, dettaglio della busta paga, analisi.",
  "home.tools.payslip.title": "Busta paga",
  "home.tools.payslip.desc": "Voci di una busta paga mensile, pronta da stampare.",
  "home.tools.inflation.title": "Analisi inflazione",
  "home.tools.inflation.desc": "Potere d'acquisto reale degli stipendi nel tempo.",
  "home.tools.tfr.title": "TFR",
  "home.tools.tfr.desc": "Proiezione del trattamento di fine rapporto e tassazione.",
  "home.tools.apprenticeship.title": "Progressione apprendistato",
  "home.tools.apprenticeship.desc": "Crescita anno per anno della retribuzione in apprendistato.",
  "home.tools.tax-system.title": "Sistema fiscale",
  "home.tools.tax-system.desc": "Come funziona, chi paga, cuneo fiscale, dove vanno le tasse.",
  "home.tools.data-sources.title": "Fonti dei dati",
  "home.tools.data-sources.desc":
    "Ogni numero usato dal calcolatore, con la sua norma di riferimento.",
  "home.tools.europe.title": "Confronto Europa",
  "home.tools.europe.desc": "Lo stipendio netto a parità di lordo nei paesi europei.",
  "home.disclaimer.title": "Lavori in corso",
  "home.disclaimer.body":
    "Il progetto sta tornando online un modulo alla volta. Solo il calcolatore stipendio è operativo. Gli altri strumenti compaiono qui appena passano la verifica.",

  "theme.toggle.label": "Passa al tema {mode}",
  "theme.light": "chiaro",
  "theme.dark": "scuro",

  "footer.attribution":
    "Calcoli basati su norme e circolari ufficiali. Vedi i documenti di verifica nelle sorgenti.",
  "footer.disclaimer":
    "Strumento informativo. Per situazioni complesse rivolgersi a un commercialista.",

  "page.employee.title": "Calcolatore stipendio netto",
  "page.employee.subtitle":
    "Inserisci la retribuzione annua lorda. Il calcolo applica IRPEF, INPS, addizionale regionale e comunale per l'anno selezionato.",
  "page.employee.eyebrow": "Anno fiscale {year}",

  "form.section.title": "I tuoi dati",
  "form.gross.label": "Retribuzione annua lorda (RAL)",
  "form.gross.hint": "Importo lordo annuale, prima delle ritenute.",
  "form.year.label": "Anno fiscale",
  "form.year.hint": "Le aliquote e le politiche cambiano da un anno all'altro.",
  "form.regional.label": "Aliquota addizionale regionale",
  "form.regional.hint": "Tasso regionale, in percentuale. Default: 1,73%.",
  "form.municipal.label": "Aliquota addizionale comunale",
  "form.municipal.hint": "Tasso comunale, in percentuale. Default: 0,80%.",

  "results.section.title": "Risultato",
  "results.netAnnual": "Netto annuo",
  "results.netMonthly": "Netto mensile",
  "results.effectiveRate": "Aliquota effettiva",

  "breakdown.title": "Dettaglio",
  "breakdown.gross": "Retribuzione lorda",
  "breakdown.inps": "Contributi INPS",
  "breakdown.taxable": "Reddito imponibile",
  "breakdown.irpefNet": "IRPEF",
  "breakdown.regional": "Addizionale regionale",
  "breakdown.municipal": "Addizionale comunale",
  "breakdown.trattamentoIntegrativo": "Trattamento integrativo",
  "breakdown.sommaAggiuntiva": "Somma aggiuntiva (taglio cuneo)",
  "breakdown.netAnnual": "Netto annuo",

  "scope.title": "Cosa è incluso oggi",
  "scope.body":
    "Lavoratore dipendente, settore privato. Anni 2024, 2025 e 2026. Le aliquote regionali e comunali sono inserite manualmente. Non sono ancora supportati: detrazioni per familiari, fringe benefit, regimi speciali, settore pubblico, contratti di apprendistato.",
} as const;

export type MessageKey = keyof typeof it;
