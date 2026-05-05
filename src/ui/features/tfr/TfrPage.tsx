import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Field, Stack } from "@/ui/design-system";
import { calculateTfr } from "@/domain/calc";
import { formatCurrency, formatCurrencyWhole } from "@/domain/format.ts";

export function TfrPage() {
  const [grossAnnual, setGrossAnnual] = useState(35_000);
  const [years, setYears] = useState(10);
  const [inflationPercent, setInflationPercent] = useState(2);

  const result = calculateTfr({ grossAnnual, years, annualInflation: inflationPercent / 100 });

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="tfr.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="tfr.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="tfr.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <section className="qg-form" aria-labelledby="qg-tfr-form">
            <h2 id="qg-tfr-form" className="qg-form__title">
              <FormattedMessage id="tfr.form.title" />
            </h2>
            <Stack gap="md">
              <Field
                type="currency"
                label={<FormattedMessage id="form.gross.label" />}
                hint={<FormattedMessage id="tfr.form.gross.hint" />}
                value={grossAnnual}
                onChange={setGrossAnnual}
              />
              <Field
                type="currency"
                label={<FormattedMessage id="tfr.form.years.label" />}
                hint={<FormattedMessage id="tfr.form.years.hint" />}
                value={years}
                onChange={(v) => setYears(Math.round(v))}
                step={1}
                max={50}
              />
              <Field
                type="percentage"
                label={<FormattedMessage id="tfr.form.inflation.label" />}
                hint={<FormattedMessage id="tfr.form.inflation.hint" />}
                value={inflationPercent}
                onChange={setInflationPercent}
                max={20}
              />
            </Stack>
          </section>

          <section className="qg-results" aria-live="polite">
            <h2 className="qg-results__title">
              <FormattedMessage id="tfr.results.title" />
            </h2>
            <div className="qg-result-card">
              <p className="qg-result-card__primary-label">
                <FormattedMessage id="tfr.results.netLabel" />
              </p>
              <p className="qg-result-card__primary-value">{formatCurrencyWhole(result.tfrNet)}</p>
              <dl className="qg-result-card__secondary">
                <div className="qg-result-card__metric">
                  <dt>
                    <FormattedMessage id="tfr.results.accruedLabel" />
                  </dt>
                  <dd>{formatCurrency(result.accruedTotal)}</dd>
                </div>
                <div className="qg-result-card__metric">
                  <dt>
                    <FormattedMessage id="tfr.results.revaluationLabel" />
                  </dt>
                  <dd>{formatCurrency(result.revaluationGross)}</dd>
                </div>
              </dl>
            </div>
            <details className="qg-disclosure">
              <summary>
                <FormattedMessage id="breakdown.title" />
              </summary>
              <table className="qg-breakdown">
                <tbody>
                  <tr className="qg-breakdown__row qg-breakdown__row--default">
                    <th scope="row">
                      <FormattedMessage id="tfr.row.annualAccrual" />
                    </th>
                    <td>{formatCurrency(result.annualAccrual)}</td>
                  </tr>
                  <tr className="qg-breakdown__row qg-breakdown__row--default">
                    <th scope="row">
                      <FormattedMessage id="tfr.row.years" />
                    </th>
                    <td>{result.years}</td>
                  </tr>
                  <tr className="qg-breakdown__row qg-breakdown__row--default">
                    <th scope="row">
                      <FormattedMessage id="tfr.row.accrued" />
                    </th>
                    <td>{formatCurrency(result.accruedTotal)}</td>
                  </tr>
                  <tr className="qg-breakdown__row qg-breakdown__row--default">
                    <th scope="row">
                      <FormattedMessage id="tfr.row.revaluation" />
                    </th>
                    <td>{formatCurrency(result.revaluationGross)}</td>
                  </tr>
                  <tr className="qg-breakdown__row qg-breakdown__row--default">
                    <th scope="row">
                      <FormattedMessage id="tfr.row.tax" />
                    </th>
                    <td>−{formatCurrency(result.revaluationTax)}</td>
                  </tr>
                  <tr className="qg-breakdown__row qg-breakdown__row--total">
                    <th scope="row">
                      <FormattedMessage id="tfr.row.net" />
                    </th>
                    <td>{formatCurrency(result.tfrNet)}</td>
                  </tr>
                </tbody>
              </table>
            </details>
          </section>
        </div>

        <aside className="qg-scope-note" aria-labelledby="qg-tfr-scope">
          <h3 id="qg-tfr-scope" className="qg-scope-note__title">
            <FormattedMessage id="tfr.scope.title" />
          </h3>
          <p>
            <FormattedMessage id="tfr.scope.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
