import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Field, Stack } from "@/ui/design-system";
import { calculateApprenticeship, DEFAULT_APPRENTICESHIP_PROGRESSION } from "@/domain/calc";
import { formatCurrency, formatPercentage } from "@/domain/format.ts";

export function ApprenticeshipPage() {
  const [targetGrossAnnual, setTargetGrossAnnual] = useState(28_000);
  const [years, setYears] = useState(3);

  const result = calculateApprenticeship({
    targetGrossAnnual,
    years,
    progression: DEFAULT_APPRENTICESHIP_PROGRESSION,
  });

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="apprenticeship.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="apprenticeship.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="apprenticeship.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <section className="qg-form" aria-labelledby="qg-app-form">
            <h2 id="qg-app-form" className="qg-form__title">
              <FormattedMessage id="apprenticeship.form.title" />
            </h2>
            <Stack gap="md">
              <Field
                type="currency"
                label={<FormattedMessage id="apprenticeship.form.target.label" />}
                hint={<FormattedMessage id="apprenticeship.form.target.hint" />}
                value={targetGrossAnnual}
                onChange={setTargetGrossAnnual}
              />
              <Field
                type="currency"
                label={<FormattedMessage id="apprenticeship.form.years.label" />}
                hint={<FormattedMessage id="apprenticeship.form.years.hint" />}
                value={years}
                onChange={(v) => setYears(Math.round(v))}
                step={1}
                max={5}
              />
            </Stack>
          </section>

          <section className="qg-results" aria-live="polite">
            <h2 className="qg-results__title">
              <FormattedMessage id="apprenticeship.results.title" />
            </h2>
            <table className="qg-table">
              <thead>
                <tr>
                  <th scope="col">
                    <FormattedMessage id="apprenticeship.col.year" />
                  </th>
                  <th scope="col" className="qg-table__num">
                    <FormattedMessage id="apprenticeship.col.percent" />
                  </th>
                  <th scope="col" className="qg-table__num">
                    <FormattedMessage id="apprenticeship.col.gross" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.year}>
                    <td>
                      <FormattedMessage id="apprenticeship.row.yearN" values={{ n: row.year }} />
                    </td>
                    <td className="qg-table__num">{formatPercentage(row.percentageOfTarget)}</td>
                    <td className="qg-table__num">{formatCurrency(row.grossAnnual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <aside className="qg-scope-note" aria-labelledby="qg-app-scope">
          <h3 id="qg-app-scope" className="qg-scope-note__title">
            <FormattedMessage id="apprenticeship.scope.title" />
          </h3>
          <p>
            <FormattedMessage id="apprenticeship.scope.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
