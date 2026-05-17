import { FormattedMessage } from "react-intl";
import { useSalaryHistory } from "./useSalaryHistory.ts";
import { SalaryHistoryForm } from "./SalaryHistoryForm.tsx";
import { SalaryHistoryTable } from "./SalaryHistoryTable.tsx";
import { SalaryHistoryChart } from "./SalaryHistoryChart.tsx";

export function SalaryHistoryPage() {
  const history = useSalaryHistory();

  return (
    <section className="qg-history">
      <header className="qg-calc__hero">
        <p className="qg-eyebrow">
          <FormattedMessage id="history.eyebrow" />
        </p>
        <h1>
          <FormattedMessage id="history.title" values={{ em: (chunks) => <em>{chunks}</em> }} />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id="history.lede" values={{ year: history.targetYear }} />
        </p>
      </header>

      <div className="qg-history__grid">
        <section className="qg-history__panel">
          <h2 className="qg-subhead qg-subhead--md">
            <FormattedMessage id="history.form.title" />
          </h2>
          <SalaryHistoryForm onSubmit={history.addEntry} />
        </section>

        <section className="qg-history__panel">
          <h2 className="qg-subhead qg-subhead--md">
            <FormattedMessage id="history.chart.title" />
          </h2>
          <SalaryHistoryChart rows={history.adjusted} targetYear={history.targetYear} />
        </section>

        <section className="qg-history__panel qg-history__panel--wide">
          <h2 className="qg-subhead qg-subhead--md">
            <FormattedMessage id="history.table.title" />
          </h2>
          <SalaryHistoryTable
            rows={history.adjusted}
            targetYear={history.targetYear}
            onDelete={history.removeEntry}
          />
        </section>
      </div>
    </section>
  );
}
