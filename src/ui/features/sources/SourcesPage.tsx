import { FormattedMessage } from "react-intl";

interface Source {
  readonly title: string;
  readonly body: string;
}

const sources: ReadonlyArray<Source> = [
  { title: "sources.irpef.title", body: "sources.irpef.body" },
  { title: "sources.inps.title", body: "sources.inps.body" },
  { title: "sources.workDeduction.title", body: "sources.workDeduction.body" },
  { title: "sources.trattamento.title", body: "sources.trattamento.body" },
  { title: "sources.taxWedge.title", body: "sources.taxWedge.body" },
  { title: "sources.exemption.title", body: "sources.exemption.body" },
];

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
          <div key={s.title} className="qg-sources__item">
            <dt>
              <FormattedMessage id={s.title} />
            </dt>
            <dd>
              <FormattedMessage id={s.body} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
