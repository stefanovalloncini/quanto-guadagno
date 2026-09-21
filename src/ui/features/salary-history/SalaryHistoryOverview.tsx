import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import { SalaryHistoryChart } from "./SalaryHistoryChart.tsx";
import { SalaryHistoryDataTable } from "./SalaryHistoryDataTable.tsx";
import type { AdjustedEntry } from "./useSalaryHistory.ts";
import type { ProjectionBundle } from "./useSalaryProjection.ts";

interface SalaryHistoryOverviewProps {
  readonly rows: ReadonlyArray<AdjustedEntry>;
  readonly projection: ProjectionBundle;
  readonly targetYear: number;
}

export function SalaryHistoryOverview({
  rows,
  projection,
  targetYear,
}: SalaryHistoryOverviewProps) {
  const [asTable, setAsTable] = useState(false);
  const latest = rows[rows.length - 1];
  const first = rows[0];
  const realChange =
    first && latest && first.adjusted && latest.adjusted && first.adjusted.adjusted > 0
      ? latest.adjusted.adjusted / first.adjusted.adjusted - 1
      : null;

  return (
    <div className="qg-history__overview">
      {latest !== undefined && latest.adjusted !== null && (
        <ResultFigure
          label={
            <FormattedMessage
              id="history.overview.label"
              values={{ year: latest.entry.year, target: targetYear }}
            />
          }
          value={<Money amount={latest.adjusted.adjusted} whole />}
          settleKey={latest.adjusted.adjusted}
          secondary={
            <FormattedMessage
              id="history.overview.nominal"
              values={{
                amount: <Money amount={latest.entry.grossAnnual} whole />,
                year: latest.entry.year,
              }}
            />
          }
          {...(realChange !== null &&
            first !== undefined &&
            first.entry.year !== latest.entry.year && {
              note: (
                <FormattedMessage
                  id="history.overview.realChange"
                  values={{ change: realChange, year: first.entry.year }}
                />
              ),
            })}
        />
      )}

      {asTable ? (
        <div className="qg-ledger-scroll">
          <SalaryHistoryDataTable rows={rows} targetYear={targetYear} />
        </div>
      ) : (
        <>
          <SalaryHistoryChart rows={rows} projection={projection} targetYear={targetYear} />
          {/* The chart's numbers stay readable by screen reader while the chart is shown. */}
          <div className="qg-visually-hidden">
            <SalaryHistoryDataTable rows={rows} targetYear={targetYear} />
          </div>
        </>
      )}

      {rows.length > 0 && (
        <p className="qg-result__more">
          <Button variant="quiet" type="button" onClick={() => setAsTable((v) => !v)}>
            <FormattedMessage id={asTable ? "history.view.asChart" : "history.view.asTable"} />
          </Button>
        </p>
      )}
    </div>
  );
}
