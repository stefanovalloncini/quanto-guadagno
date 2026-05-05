import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system";
import { calculateRealValue } from "@/domain/calc";
import { ITALIAN_INFLATION_FOI } from "@/domain/data";
import { formatCurrency, formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";

const yearOptions = ITALIAN_INFLATION_FOI.map((e) => ({ value: e.year, label: String(e.year) }));

export function InflationPage() {
  const [amount, setAmount] = useState(20_000);
  const [fromYear, setFromYear] = useState(2020);
  const [toYear, setToYear] = useState(2026);

  const result = calculateRealValue({ amount, fromYear, toYear }, ITALIAN_INFLATION_FOI);

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="inflation.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="inflation.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="inflation.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <section className="qg-form" aria-labelledby="qg-inflation-form">
            <h2 id="qg-inflation-form" className="qg-form__title">
              <FormattedMessage id="inflation.form.title" />
            </h2>
            <Stack gap="md">
              <Field
                type="currency"
                label={<FormattedMessage id="inflation.form.amount.label" />}
                hint={<FormattedMessage id="inflation.form.amount.hint" />}
                value={amount}
                onChange={setAmount}
              />
              <Select<number>
                label={<FormattedMessage id="inflation.form.from.label" />}
                value={fromYear}
                options={yearOptions}
                onChange={setFromYear}
              />
              <Select<number>
                label={<FormattedMessage id="inflation.form.to.label" />}
                value={toYear}
                options={yearOptions}
                onChange={setToYear}
              />
            </Stack>
          </section>

          <section className="qg-results" aria-live="polite">
            <h2 className="qg-results__title">
              <FormattedMessage id="inflation.results.title" />
            </h2>
            <div className="qg-result-card">
              <p className="qg-result-card__primary-label">
                <FormattedMessage
                  id="inflation.results.equivalentLabel"
                  values={{ year: result.toYear }}
                />
              </p>
              <p className="qg-result-card__primary-value">
                {formatCurrencyWhole(result.realAmount)}
              </p>
              <dl className="qg-result-card__secondary">
                <div className="qg-result-card__metric">
                  <dt>
                    <FormattedMessage id="inflation.results.nominalLabel" />
                  </dt>
                  <dd>{formatCurrency(result.nominalAmount)}</dd>
                </div>
                <div className="qg-result-card__metric">
                  <dt>
                    <FormattedMessage id="inflation.results.cumulativeLabel" />
                  </dt>
                  <dd>{formatPercentage(result.cumulativeInflation)}</dd>
                </div>
              </dl>
            </div>
            <p className="qg-stats-explainer">
              <FormattedMessage id="inflation.explainer" />
            </p>
          </section>
        </div>

        <aside className="qg-scope-note" aria-labelledby="qg-inflation-source">
          <h3 id="qg-inflation-source" className="qg-scope-note__title">
            <FormattedMessage id="inflation.source.title" />
          </h3>
          <p>
            <FormattedMessage id="inflation.source.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
