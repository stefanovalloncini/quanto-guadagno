export const it = {
  "app.title": "Quanto Guadagno",
  "a11y.skipLink": "Salta al contenuto",
  "error.boundary.title": "Qualcosa è andato storto",
  "error.boundary.body": "Ricarica la pagina per riprovare.",

  "page.employee.title": "Calcolatore stipendio netto",
  "page.employee.subtitle":
    "Inserisci la retribuzione annua lorda. Il calcolo applica IRPEF, INPS, addizionale regionale e comunale per il 2026.",
  "page.employee.year2026": "Anno fiscale 2026",

  "form.section.title": "I tuoi dati",
  "form.gross.label": "Retribuzione annua lorda (RAL)",
  "form.gross.hint": "Importo lordo annuale, prima delle ritenute.",
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
  "breakdown.irpefGross": "IRPEF lorda",
  "breakdown.workDeduction": "Detrazione lavoro dipendente",
  "breakdown.detrazioneAggiuntiva": "Detrazione aggiuntiva (taglio cuneo)",
  "breakdown.totalDeductions": "Totale detrazioni",
  "breakdown.irpefNet": "IRPEF netta",
  "breakdown.regional": "Addizionale regionale",
  "breakdown.municipal": "Addizionale comunale",
  "breakdown.trattamentoIntegrativo": "Trattamento integrativo",
  "breakdown.sommaAggiuntiva": "Somma aggiuntiva (taglio cuneo)",
  "breakdown.netAnnual": "Netto annuo",

  "scope.title": "Cosa è incluso oggi",
  "scope.body":
    "Anno fiscale 2026. Lavoratore dipendente, settore privato. Le aliquote regionali e comunali sono inserite manualmente. Non sono ancora supportati: detrazioni per familiari, fringe benefit, regimi speciali, anni 2024 e 2025.",
} as const;

export type MessageKey = keyof typeof it;
