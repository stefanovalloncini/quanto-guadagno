import { FormattedMessage } from "react-intl";
import type { MessageKey } from "@/ui/i18n/messages/it";

interface Entry {
  readonly termId: MessageKey;
  readonly definitionId: MessageKey;
}

const ENTRIES: ReadonlyArray<Entry> = [
  { termId: "glossario.irpef.term", definitionId: "glossario.irpef.definition" },
  { termId: "glossario.inps.term", definitionId: "glossario.inps.definition" },
  { termId: "glossario.cuneo.term", definitionId: "glossario.cuneo.definition" },
  { termId: "glossario.trattamento.term", definitionId: "glossario.trattamento.definition" },
  { termId: "glossario.regionale.term", definitionId: "glossario.regionale.definition" },
  { termId: "glossario.comunale.term", definitionId: "glossario.comunale.definition" },
  { termId: "glossario.tfr.term", definitionId: "glossario.tfr.definition" },
  { termId: "glossario.ccnl.term", definitionId: "glossario.ccnl.definition" },
  { termId: "glossario.naspi.term", definitionId: "glossario.naspi.definition" },
  { termId: "glossario.forfettario.term", definitionId: "glossario.forfettario.definition" },
];

export function GlossarioPage() {
  return (
    <section className="qg-glossario">
      <header className="qg-calc__hero">
        <p className="qg-eyebrow">
          <FormattedMessage id="glossario.eyebrow" />
        </p>
        <h1>
          <FormattedMessage id="glossario.title" values={{ em: (chunks) => <em>{chunks}</em> }} />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id="glossario.lede" />
        </p>
      </header>

      <dl className="qg-glossario__list">
        {ENTRIES.map((entry) => (
          <div key={entry.termId} className="qg-glossario__item">
            <dt className="qg-glossario__term">
              <FormattedMessage id={entry.termId} />
            </dt>
            <dd className="qg-glossario__definition">
              <FormattedMessage id={entry.definitionId} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
