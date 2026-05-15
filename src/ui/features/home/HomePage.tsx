import { FormattedMessage } from "react-intl";
import { Tile } from "@/ui/design-system/primitives";

interface SoonTile {
  readonly titleId: string;
  readonly bodyId: string;
}

const soonTiles: ReadonlyArray<SoonTile> = [
  { titleId: "home.soon.comparison.title", bodyId: "home.soon.comparison.body" },
  { titleId: "home.soon.tfr.title", bodyId: "home.soon.tfr.body" },
  { titleId: "home.soon.payslip.title", bodyId: "home.soon.payslip.body" },
  { titleId: "home.soon.statistics.title", bodyId: "home.soon.statistics.body" },
  { titleId: "home.soon.inflation.title", bodyId: "home.soon.inflation.body" },
  { titleId: "home.soon.taxSystem.title", bodyId: "home.soon.taxSystem.body" },
];

export function HomePage() {
  return (
    <section className="qg-home">
      <header className="qg-home__hero">
        <h1>
          <FormattedMessage id="home.hero.title" values={{ em: (chunks) => <em>{chunks}</em> }} />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id="home.hero.lede" />
        </p>
      </header>

      <div className="qg-home__tiles" aria-label="Strumenti">
        <Tile
          variant="feature"
          to="/calcola-stipendio"
          title={<FormattedMessage id="home.feature.title" />}
          badge={<FormattedMessage id="home.feature.badge" />}
          cta={<FormattedMessage id="home.feature.cta" />}
        >
          <p>
            <FormattedMessage id="home.feature.body" />
          </p>
        </Tile>

        <Tile
          variant="available"
          to="/progressione-apprendistato"
          title={<FormattedMessage id="home.available.apprenticeship.title" />}
          badge={<FormattedMessage id="home.feature.badge" />}
          cta={<FormattedMessage id="home.feature.cta" />}
        >
          <p>
            <FormattedMessage id="home.available.apprenticeship.body" />
          </p>
        </Tile>

        <Tile
          variant="available"
          to="/partita-iva-forfettario"
          title={<FormattedMessage id="home.available.forfettario.title" />}
          badge={<FormattedMessage id="home.feature.badge" />}
          cta={<FormattedMessage id="home.feature.cta" />}
        >
          <p>
            <FormattedMessage id="home.available.forfettario.body" />
          </p>
        </Tile>

        {soonTiles.map((t) => (
          <Tile
            key={t.titleId}
            variant="soon"
            title={<FormattedMessage id={t.titleId} />}
            badge={<FormattedMessage id="home.soon.badge" />}
          >
            <p>
              <FormattedMessage id={t.bodyId} />
            </p>
          </Tile>
        ))}
      </div>

      <footer className="qg-home__footnote">
        <FormattedMessage
          id="home.footnote"
          values={{
            shimmer: (chunks) => <span className="qg-shimmer">{chunks}</span>,
          }}
        />
      </footer>
    </section>
  );
}
