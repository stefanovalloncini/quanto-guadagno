import { FormattedMessage } from "react-intl";
import { Ledger, LedgerCells, Money } from "@/ui/design-system/primitives";
import type { AdjustedEntry } from "./useSalaryHistory.ts";

interface SalaryHistoryDataTableProps {
  readonly rows: ReadonlyArray<AdjustedEntry>;
  readonly targetYear: number;
}

const label = (id: string) => <FormattedMessage id={id} />;

/** The chart's own numbers, readable as a table by anyone who prefers one. */
export function SalaryHistoryDataTable({ rows, targetYear }: SalaryHistoryDataTableProps) {
  return (
    <div className="qg-ledger-scroll">
      <Ledger
        caption={label("history.chart.title")}
        columns={[
          label("history.table.year"),
          label("history.table.gross"),
          label("history.table.net"),
          <FormattedMessage key="adj" id="history.table.adjusted" values={{ year: targetYear }} />,
        ]}
      >
        {rows.map(({ entry, adjusted, net }) => (
          <LedgerCells
            key={entry.id}
            header={entry.year}
            cells={[
              <Money key="gross" amount={entry.grossAnnual} whole />,
              net !== null ? (
                <Money key="net" amount={net.netAnnual} whole />
              ) : (
                <FormattedMessage key="net" id="history.table.net.na" />
              ),
              adjusted ? (
                <Money key="adj" amount={adjusted.adjusted} whole />
              ) : (
                <FormattedMessage key="adj" id="history.table.adjusted.na" />
              ),
            ]}
          />
        ))}
      </Ledger>
    </div>
  );
}
