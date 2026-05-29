import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Money, Tile } from "@/ui/design-system/primitives";

interface SoonItem {
  readonly id: string;
  readonly labelId: string;
}

const soonItems: ReadonlyArray<SoonItem> = [
  { id: "comparison", labelId: "home.soon.comparison.title" },
  { id: "tfr", labelId: "home.soon.tfr.title" },
  { id: "payslip", labelId: "home.soon.payslip.title" },
  { id: "statistics", labelId: "home.soon.statistics.title" },
  { id: "taxSystem", labelId: "home.soon.taxSystem.title" },
];

export function HomePage() {
  return (
    <section className="qg-home">
      <header className="qg-home__hero">
        <h1>
          <FormattedMessage id="home.hero.title" values={{ em: (chunks) => <em>{chunks}</em> }} />
        </h1>
        <p className="qg-lede">
          <FormattedMessage
            id="home.hero.lede"
            values={{ shimmer: (chunks) => <span className="qg-shimmer">{chunks}</span> }}
          />
        </p>
      </header>

      <Link to="/calcola-stipendio" className="qg-home__feature">
        <span className="qg-home__feature-badge">
          <FormattedMessage id="home.feature.badge" />
        </span>
        <div className="qg-home__feature-body">
          <h2 className="qg-home__feature-title">
            <FormattedMessage id="home.feature.title" />
          </h2>
          <p className="qg-home__feature-lede">
            <FormattedMessage id="home.feature.body" />
          </p>
        </div>
        <div className="qg-home__feature-specimen" aria-hidden="true">
          <span className="qg-home__feature-specimen-line">
            <FormattedMessage id="home.feature.specimen.gross" />
            <Money amount={30000} whole className="qg-home__feature-specimen-amount" />
          </span>
          <span className="qg-home__feature-specimen-arrow">→</span>
          <span className="qg-home__feature-specimen-line">
            <FormattedMessage id="home.feature.specimen.net" />
            <Money
              amount={1952}
              whole
              className="qg-home__feature-specimen-amount qg-home__feature-specimen-amount--accent"
            />
          </span>
        </div>
        <span className="qg-home__feature-cta" aria-hidden="true">
          <FormattedMessage id="home.feature.cta" />
        </span>
      </Link>

      <section className="qg-home__alsoavailable" aria-labelledby="home-also">
        <h2 id="home-also" className="qg-subhead qg-subhead--lg qg-home__subhead">
          <FormattedMessage id="home.also.title" />
        </h2>
        <div className="qg-home__pair">
          <Tile
            variant="available"
            to="/partita-iva-forfettario"
            title={<FormattedMessage id="home.available.forfettario.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.forfettario.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/progressione-apprendistato"
            title={<FormattedMessage id="home.available.apprenticeship.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.apprenticeship.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/storico-stipendio"
            title={<FormattedMessage id="home.available.history.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.history.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/interesse-composto"
            title={<FormattedMessage id="home.available.compoundInterest.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.compoundInterest.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/calcolo-naspi"
            title={<FormattedMessage id="home.available.naspi.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.naspi.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/preavviso-dimissioni"
            title={<FormattedMessage id="home.available.preavviso.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.preavviso.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/calcolo-netto-lordo"
            title={<FormattedMessage id="home.available.inverse.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.inverse.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/calcolo-tredicesima"
            title={<FormattedMessage id="home.available.tredicesima.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.tredicesima.body" />
            </p>
          </Tile>

          <Tile
            variant="available"
            to="/inflazione"
            title={<FormattedMessage id="home.available.inflation.title" />}
            cta={<FormattedMessage id="home.feature.cta" />}
          >
            <p>
              <FormattedMessage id="home.available.inflation.body" />
            </p>
          </Tile>
        </div>
      </section>

      <section className="qg-home__upcoming" aria-labelledby="home-upcoming">
        <h2 id="home-upcoming" className="qg-subhead qg-subhead--lg qg-home__subhead">
          <FormattedMessage id="home.upcoming.title" />
        </h2>
        <ul className="qg-home__upcoming-list">
          {soonItems.map((item) => (
            <li key={item.id}>
              <FormattedMessage id={item.labelId} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
