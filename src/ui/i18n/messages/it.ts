export const it = {
  "app.title": "Quanto Guadagno",
  "a11y.skipLink": "Salta al contenuto",
  "error.boundary.title": "Qualcosa è andato storto",
  "error.boundary.body": "Ricarica la pagina per riprovare.",
  "page.employee.placeholder.title": "Calcolatore stipendio netto",
  "page.employee.placeholder.body":
    "La nuova versione del calcolatore è in arrivo. Stiamo ricostruendo i moduli un passo alla volta.",
} as const;

export type MessageKey = keyof typeof it;
