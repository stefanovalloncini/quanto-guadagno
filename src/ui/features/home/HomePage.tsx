import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Stack } from "@/ui/design-system";
import { TOOLS, type ToolEntry } from "./tools.ts";

function ToolCard({ entry }: { readonly entry: ToolEntry }) {
  const titleId = `home.tools.${entry.id}.title`;
  const descId = `home.tools.${entry.id}.desc`;

  if (entry.available && entry.to) {
    return (
      <li className="qg-tool qg-tool--available">
        <Link to={entry.to} className="qg-tool__link">
          <h3 className="qg-tool__title">
            <FormattedMessage id={titleId} />
          </h3>
          <p className="qg-tool__desc">
            <FormattedMessage id={descId} />
          </p>
          <span className="qg-tool__cta">
            <FormattedMessage id="home.tools.open" />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li className="qg-tool qg-tool--soon">
      <h3 className="qg-tool__title">
        <FormattedMessage id={titleId} />
      </h3>
      <p className="qg-tool__desc">
        <FormattedMessage id={descId} />
      </p>
      <span className="qg-tool__badge">
        <FormattedMessage id="home.tools.soon" />
      </span>
    </li>
  );
}

export function HomePage() {
  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="home.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="home.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="home.subtitle" />
          </p>
        </header>

        <section aria-labelledby="home-tools-heading">
          <h2 id="home-tools-heading" className="qg-section-title">
            <FormattedMessage id="home.tools.heading" />
          </h2>
          <ul className="qg-tools">
            {TOOLS.map((entry) => (
              <ToolCard key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>

        <aside className="qg-scope-note" aria-labelledby="home-disclaimer-title">
          <h3 id="home-disclaimer-title" className="qg-scope-note__title">
            <FormattedMessage id="home.disclaimer.title" />
          </h3>
          <p>
            <FormattedMessage id="home.disclaimer.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
