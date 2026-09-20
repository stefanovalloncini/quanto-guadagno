import type { MessageKey } from "@/ui/i18n/messages/it.ts";

export interface PageMetaEntry {
  readonly titleId: MessageKey;
  readonly descriptionId: MessageKey;
}

const NOT_FOUND: PageMetaEntry = {
  titleId: "meta.notFound.title",
  descriptionId: "meta.notFound.description",
};

export const pageMeta: Readonly<Record<string, PageMetaEntry>> = {
  "/": { titleId: "meta.home.title", descriptionId: "meta.home.description" },
  "/calcola-stipendio": {
    titleId: "meta.employee.title",
    descriptionId: "meta.employee.description",
  },
  "/progressione-apprendistato": {
    titleId: "meta.apprenticeship.title",
    descriptionId: "meta.apprenticeship.description",
  },
  "/storico-stipendio": {
    titleId: "meta.salaryHistory.title",
    descriptionId: "meta.salaryHistory.description",
  },
  "/partita-iva-forfettario": {
    titleId: "meta.forfettario.title",
    descriptionId: "meta.forfettario.description",
  },
  "/interesse-composto": {
    titleId: "meta.compoundInterest.title",
    descriptionId: "meta.compoundInterest.description",
  },
  "/calcolo-naspi": { titleId: "meta.naspi.title", descriptionId: "meta.naspi.description" },
  "/preavviso-dimissioni": {
    titleId: "meta.preavviso.title",
    descriptionId: "meta.preavviso.description",
  },
  "/calcolo-netto-lordo": {
    titleId: "meta.inverse.title",
    descriptionId: "meta.inverse.description",
  },
  "/calcolo-tredicesima": {
    titleId: "meta.tredicesima.title",
    descriptionId: "meta.tredicesima.description",
  },
  "/inflazione": { titleId: "meta.inflation.title", descriptionId: "meta.inflation.description" },
  "/confronto-stipendi": {
    titleId: "meta.comparison.title",
    descriptionId: "meta.comparison.description",
  },
  "/costo-azienda": {
    titleId: "meta.employerCost.title",
    descriptionId: "meta.employerCost.description",
  },
  "/tfr": { titleId: "meta.tfr.title", descriptionId: "meta.tfr.description" },
  "/glossario": { titleId: "meta.glossary.title", descriptionId: "meta.glossary.description" },
  "/stampa-busta-paga": {
    titleId: "meta.payslip.title",
    descriptionId: "meta.payslip.description",
  },
  "/fonti": { titleId: "meta.sources.title", descriptionId: "meta.sources.description" },
  "/informazioni": { titleId: "meta.about.title", descriptionId: "meta.about.description" },
  "*": NOT_FOUND,
};

export function metaForPath(pathname: string): PageMetaEntry {
  return pageMeta[pathname] ?? NOT_FOUND;
}
