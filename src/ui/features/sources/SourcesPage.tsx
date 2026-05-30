import { FormattedMessage } from "react-intl";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface Citation {
  readonly text: string;
  readonly href?: string;
}

interface SourceEntry {
  readonly key: string;
  readonly titleId: MessageKey;
  readonly bodyId: MessageKey;
  readonly citations: ReadonlyArray<Citation>;
}

const sources: ReadonlyArray<SourceEntry> = [
  {
    key: "irpef",
    titleId: "sources.irpef.title",
    bodyId: "sources.irpef.body",
    citations: [
      {
        text: "L. 199/2025 — Legge di Bilancio 2026",
        href: "https://www.gazzettaufficiale.it/eli/id/2025/12/30/25G00214/sg",
      },
      {
        text: "L. 207/2024 — Legge di Bilancio 2025",
        href: "https://www.mef.gov.it/focus/Principali-misure-della-legge-di-bilancio-2025/",
      },
      { text: "D.Lgs. 216/2023 — riforma IRPEF, Art. 11 TUIR" },
      {
        text: "Agenzia delle Entrate",
        href: "https://www.agenziaentrate.gov.it",
      },
    ],
  },
  {
    key: "inps",
    titleId: "sources.inps.title",
    bodyId: "sources.inps.body",
    citations: [
      {
        text: "Circolare INPS n. 6/2026 — aliquote dipendenti privati 2026",
        href: "https://www.inps.it",
      },
      { text: "Circolare INPS n. 26/2025 — aliquote 2025" },
      { text: "Circolare INPS n. 21/2024 — aliquote 2024" },
      { text: "Decreto MEF 19 novembre 2025 — perequazione +1,40% per il 2026" },
    ],
  },
  {
    key: "workDeduction",
    titleId: "sources.workDeduction.title",
    bodyId: "sources.workDeduction.body",
    citations: [
      { text: "Art. 13 TUIR (D.P.R. 917/1986)" },
      { text: "L. 213/2023, Art. 1 c. 2 — innalzamento detrazione minima" },
      { text: "L. 207/2024 e L. 199/2025 — formula vigente per 2025–2026" },
      {
        text: "Agenzia delle Entrate — Detrazioni per redditi di lavoro dipendente",
        href: "https://www.agenziaentrate.gov.it",
      },
    ],
  },
  {
    key: "trattamento",
    titleId: "sources.trattamento.title",
    bodyId: "sources.trattamento.body",
    citations: [
      { text: "D.L. 3/2020 convertito in L. 21/2020, Art. 1" },
      { text: "L. 234/2021 (Bilancio 2022), Art. 2 — adeguamento del meccanismo" },
      { text: "Agenzia delle Entrate, Circolare 4/E del 18 febbraio 2022" },
    ],
  },
  {
    key: "taxWedge",
    titleId: "sources.taxWedge.title",
    bodyId: "sources.taxWedge.body",
    citations: [
      { text: "L. 207/2024, Art. 1 commi 4–9 — cuneo fiscale 2025" },
      { text: "L. 199/2025, Art. 1 c. 11 — cuneo strutturale dal 2026" },
      { text: "Agenzia delle Entrate, Circolare 4/E del 16 maggio 2025" },
    ],
  },
  {
    key: "exemption",
    titleId: "sources.exemption.title",
    bodyId: "sources.exemption.body",
    citations: [
      { text: "L. 213/2023 (Bilancio 2024), Art. 1 commi 15–16" },
      { text: "Circolare INPS n. 11 del 16/01/2024" },
    ],
  },
  {
    key: "forfettario",
    titleId: "sources.forfettario.title",
    bodyId: "sources.forfettario.body",
    citations: [
      { text: "L. 190/2014, commi 54–89 — regime forfettario" },
      { text: "L. 197/2022 — soglia ricavi €85.000" },
      { text: "Circolari INPS Gestione Separata e gestioni autonomi" },
    ],
  },
  {
    key: "naspi",
    titleId: "sources.naspi.title",
    bodyId: "sources.naspi.body",
    citations: [
      { text: "D.Lgs. 22/2015, Artt. 3–8" },
      { text: "Circolari INPS annuali — massimali e décalage", href: "https://www.inps.it" },
    ],
  },
  {
    key: "preavviso",
    titleId: "sources.preavviso.title",
    bodyId: "sources.preavviso.body",
    citations: [{ text: "Art. 2118 c.c." }, { text: "CCNL di categoria — termini di preavviso" }],
  },
  {
    key: "tredicesima",
    titleId: "sources.tredicesima.title",
    bodyId: "sources.tredicesima.body",
    citations: [
      { text: "Art. 2099 c.c. e contrattazione collettiva" },
      { text: "Art. 51 TUIR — imponibilità" },
    ],
  },
  {
    key: "tfr",
    titleId: "sources.tfr.title",
    bodyId: "sources.tfr.body",
    citations: [{ text: "Art. 2120 c.c." }, { text: "DL 47/2014 — imposta sostitutiva 17%" }],
  },
  {
    key: "fringe",
    titleId: "sources.fringe.title",
    bodyId: "sources.fringe.body",
    citations: [
      { text: "Art. 51 TUIR" },
      { text: "L. 207/2024 — welfare €1.000/€2.000 e auto per alimentazione" },
      { text: "L. 160/2019 — buoni pasto €8 elettronici, €4 cartacei" },
      { text: "D.Lgs. 252/2005 — previdenza complementare €5.164,57" },
    ],
  },
  {
    key: "inflation",
    titleId: "sources.inflation.title",
    bodyId: "sources.inflation.body",
    citations: [{ text: "ISTAT — Prezzi al consumo, indice FOI", href: "https://www.istat.it" }],
  },
];

function CitationLink({ citation }: { readonly citation: Citation }) {
  if (citation.href === undefined) return <span>{citation.text}</span>;
  return (
    <a className="qg-sources__cite-link" href={citation.href} target="_blank" rel="noreferrer">
      {citation.text}
    </a>
  );
}

export function SourcesPage() {
  return (
    <section className="qg-sources">
      <p className="qg-eyebrow">
        <FormattedMessage id="sources.eyebrow" />
      </p>
      <h1>
        <FormattedMessage id="sources.title" />
      </h1>
      <p className="qg-lede">
        <FormattedMessage id="sources.lede" />
      </p>

      <dl className="qg-sources__list">
        {sources.map((s) => (
          <div key={s.key} className="qg-sources__item">
            <dt>
              <FormattedMessage id={s.titleId} />
            </dt>
            <dd>
              <p className="qg-sources__body">
                <FormattedMessage id={s.bodyId} />
              </p>
              <p className="qg-sources__cite-label">
                <FormattedMessage id="sources.citations" />
              </p>
              <ul className="qg-sources__cite-list">
                {s.citations.map((c) => (
                  <li key={c.text}>
                    <CitationLink citation={c} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
