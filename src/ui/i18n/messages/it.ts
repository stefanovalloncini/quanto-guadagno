export const it = {
  "app.title": "Quanto Guadagno",
  "a11y.skipLink": "Salta al contenuto",
  "error.boundary.title": "Qualcosa è andato storto",
  "error.boundary.body": "Ricarica la pagina per riprovare.",

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
