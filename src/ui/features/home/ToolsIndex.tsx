import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface ToolEntry {
  readonly to: string;
  readonly titleId: MessageKey;
  readonly bodyId: MessageKey;
}

interface ToolGroup {
  readonly nameId: MessageKey;
  readonly tools: ReadonlyArray<ToolEntry>;
}

const tool = (to: string, key: string): ToolEntry => ({
  to,
  titleId: `home.available.${key}.title` as MessageKey,
  bodyId: `home.available.${key}.body` as MessageKey,
});

const groups: ReadonlyArray<ToolGroup> = [
  {
    nameId: "home.tools.group.employee",
    tools: [
      tool("/calcolo-tredicesima", "tredicesima"),
      tool("/calcolo-netto-lordo", "inverse"),
      tool("/confronto-stipendi", "comparison"),
      tool("/costo-azienda", "employerCost"),
      tool("/tfr", "tfr"),
      tool("/progressione-apprendistato", "apprenticeship"),
      tool("/storico-stipendio", "history"),
    ],
  },
  {
    nameId: "home.tools.group.vat",
    tools: [tool("/partita-iva-forfettario", "forfettario")],
  },
  {
    nameId: "home.tools.group.exit",
    tools: [tool("/calcolo-naspi", "naspi"), tool("/preavviso-dimissioni", "preavviso")],
  },
  {
    nameId: "home.tools.group.time",
    tools: [tool("/interesse-composto", "compoundInterest"), tool("/inflazione", "inflation")],
  },
  {
    nameId: "home.tools.group.reference",
    tools: [
      tool("/glossario", "glossario"),
      tool("/fonti", "sources"),
      tool("/informazioni", "about"),
    ],
  },
];

export function ToolsIndex() {
  return (
    <section className="qg-tools" aria-labelledby="qg-tools-title">
      <h2 id="qg-tools-title" className="qg-tools__title">
        <FormattedMessage id="home.tools.title" />
      </h2>
      {groups.map((group) => (
        <div key={group.nameId} className="qg-tools__group">
          <h3 className="qg-tools__group-name">
            <FormattedMessage id={group.nameId} />
          </h3>
          <dl className="qg-tools__list">
            {group.tools.map((entry) => (
              <div key={entry.to} className="qg-tools__entry">
                <dt className="qg-tools__name">
                  <Link to={entry.to} className="qg-tools__link">
                    <FormattedMessage id={entry.titleId} />
                  </Link>
                </dt>
                <dd className="qg-tools__desc">
                  <FormattedMessage id={entry.bodyId} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </section>
  );
}
