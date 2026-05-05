import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Field, Stack } from "@/ui/design-system";
import { findPercentile } from "@/domain/calc";
import { ITALIAN_NET_PERCENTILES_2023 } from "@/domain/data";
import { formatCurrencyWhole } from "@/domain/format.ts";

export function StatisticsPage() {
  const [netAnnual, setNetAnnual] = useState(25_000);
  const result = findPercentile(netAnnual, ITALIAN_NET_PERCENTILES_2023);

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="statistics.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="statistics.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="statistics.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <section className="qg-form" aria-labelledby="qg-stats-form">
            <h2 id="qg-stats-form" className="qg-form__title">
              <FormattedMessage id="statistics.form.title" />
            </h2>
            <Stack gap="md">
              <Field
                type="currency"
                label={<FormattedMessage id="statistics.form.input.label" />}
                hint={<FormattedMessage id="statistics.form.input.hint" />}
                value={netAnnual}
                onChange={setNetAnnual}
              />
            </Stack>
          </section>

          <section className="qg-results" aria-live="polite">
            <h2 className="qg-results__title">
              <FormattedMessage id="statistics.results.title" />
            </h2>
            <div className="qg-result-card">
              <p className="qg-result-card__primary-label">
                <FormattedMessage id="statistics.results.bracket" />
              </p>
              <p className="qg-result-card__primary-value">
                <FormattedMessage id={result.bracket.labelId} />
              </p>
              <dl className="qg-result-card__secondary">
                <div className="qg-result-card__metric">
                  <dt>
                    <FormattedMessage id="statistics.results.thresholdLabel" />
                  </dt>
                  <dd>{formatCurrencyWhole(result.bracket.threshold)}</dd>
                </div>
                {result.nextBracket ? (
                  <div className="qg-result-card__metric">
                    <dt>
                      <FormattedMessage id="statistics.results.nextLabel" />
                    </dt>
                    <dd>{formatCurrencyWhole(result.nextBracket.threshold)}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <p className="qg-stats-explainer">
              <FormattedMessage id="statistics.explainer" />
            </p>
          </section>
        </div>

        <aside className="qg-scope-note" aria-labelledby="qg-stats-source">
          <h3 id="qg-stats-source" className="qg-scope-note__title">
            <FormattedMessage id="statistics.source.title" />
          </h3>
          <p>
            <FormattedMessage id="statistics.source.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
