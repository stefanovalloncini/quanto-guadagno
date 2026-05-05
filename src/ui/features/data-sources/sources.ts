import irpef from "../../../../docs/data-verification/irpef.md?raw";
import inps from "../../../../docs/data-verification/inps.md?raw";
import workDeduction from "../../../../docs/data-verification/work-deduction.md?raw";
import trattamentoIntegrativo from "../../../../docs/data-verification/trattamento-integrativo.md?raw";
import taxWedgeCut from "../../../../docs/data-verification/tax-wedge-cut.md?raw";
import inpsExemption2024 from "../../../../docs/data-verification/inps-exemption-2024.md?raw";
import forfettario from "../../../../docs/data-verification/forfettario.md?raw";
import gestioneSeparata from "../../../../docs/data-verification/gestione-separata.md?raw";
import percentili from "../../../../docs/data-verification/percentili.md?raw";

export interface SourceDoc {
  readonly slug: string;
  readonly titleId: string;
  readonly content: string;
}

export const SOURCE_DOCS: ReadonlyArray<SourceDoc> = [
  { slug: "irpef", titleId: "sources.doc.irpef", content: irpef },
  { slug: "inps", titleId: "sources.doc.inps", content: inps },
  { slug: "work-deduction", titleId: "sources.doc.workDeduction", content: workDeduction },
  {
    slug: "trattamento-integrativo",
    titleId: "sources.doc.trattamentoIntegrativo",
    content: trattamentoIntegrativo,
  },
  { slug: "tax-wedge-cut", titleId: "sources.doc.taxWedgeCut", content: taxWedgeCut },
  {
    slug: "inps-exemption-2024",
    titleId: "sources.doc.inpsExemption2024",
    content: inpsExemption2024,
  },
  { slug: "forfettario", titleId: "sources.doc.forfettario", content: forfettario },
  {
    slug: "gestione-separata",
    titleId: "sources.doc.gestioneSeparata",
    content: gestioneSeparata,
  },
  { slug: "percentili", titleId: "sources.doc.percentili", content: percentili },
];
