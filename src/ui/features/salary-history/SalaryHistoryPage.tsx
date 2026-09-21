import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSalaryHistory } from "./useSalaryHistory.ts";
import { useSalaryProjection } from "./useSalaryProjection.ts";
import { defaultGrowthRate } from "./projection.ts";
import { SalaryHistoryForm } from "./SalaryHistoryForm.tsx";
import { SalaryHistoryTable } from "./SalaryHistoryTable.tsx";
import { SalaryHistoryOverview } from "./SalaryHistoryOverview.tsx";
import { SalaryHistoryProjection } from "./SalaryHistoryProjection.tsx";

const DEFAULT_HORIZON = 5;

export function SalaryHistoryPage() {
  const history = useSalaryHistory();
  const [horizon, setHorizon] = useState<number>(DEFAULT_HORIZON);
  const [growthPct, setGrowthPct] = useState<number>(() =>
    Number((defaultGrowthRate() * 100).toFixed(2)),
  );
  const projection = useSalaryProjection(history.latestSupportedEntry, horizon, growthPct);

  return (
    <section className="qg-history">
      <header className="qg-calc__hero">
        <h1>
          <FormattedMessage id="history.title" />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id="history.lede" values={{ year: history.targetYear }} />
        </p>
      </header>

      <div className="qg-calc__grid">
        <div className="qg-calc__form">
          <h2 className="qg-subhead qg-subhead--md">
            <FormattedMessage id="history.form.title" />
          </h2>
          <SalaryHistoryForm defaultSettings={history.lastSettings} onSubmit={history.addEntry} />
        </div>

        <aside className="qg-calc__result">
          <SalaryHistoryOverview
            rows={history.adjusted}
            projection={projection}
            targetYear={history.targetYear}
          />
        </aside>
      </div>

      <div className="qg-history__wide">
        <section className="qg-history__panel">
          <h2 className="qg-subhead qg-subhead--md">
            <FormattedMessage id="history.projection.title" />
          </h2>
          <SalaryHistoryProjection
            baseEntry={history.latestSupportedEntry}
            projection={projection}
            horizon={horizon}
            growthPct={growthPct}
            onHorizonChange={setHorizon}
            onGrowthPctChange={setGrowthPct}
          />
        </section>

        <section className="qg-history__panel">
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
