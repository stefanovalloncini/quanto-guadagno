import { FormattedMessage, useIntl } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import type { AdjustedEntry } from "./useSalaryHistory.ts";

interface SalaryHistoryTableProps {
  readonly rows: ReadonlyArray<AdjustedEntry>;
  readonly targetYear: number;
  readonly onDelete: (id: string) => void;
}

export function SalaryHistoryTable({ rows, targetYear, onDelete }: SalaryHistoryTableProps) {
  const intl = useIntl();

  if (rows.length === 0) {
    return (
      <p className="qg-history-table__empty">
        <FormattedMessage id="history.table.empty" />
      </p>
    );
  }

  return (
    <table className="qg-history-table">
      <thead>
        <tr>
          <th>
            <FormattedMessage id="history.table.year" />
          </th>
          <th>
            <FormattedMessage id="history.table.gross" />
          </th>
          <th>
            <FormattedMessage id="history.table.adjusted" values={{ year: targetYear }} />
          </th>
          <th>
            <FormattedMessage id="history.table.note" />
          </th>
          <th aria-label={intl.formatMessage({ id: "history.table.actions" })} />
        </tr>
      </thead>
      <tbody>
        {rows.map(({ entry, adjusted }) => (
          <tr key={entry.id}>
            <td>{entry.year}</td>
            <td>
              <Money amount={entry.grossAnnual} whole />
            </td>
            <td>
              {adjusted ? (
                <Money amount={adjusted.adjusted} whole />
              ) : (
                <span className="qg-history-table__na">
                  <FormattedMessage id="history.table.adjusted.na" />
                </span>
              )}
            </td>
            <td className="qg-history-table__note">{entry.note ?? ""}</td>
            <td>
              <button
                type="button"
                className="qg-history-table__delete"
                aria-label={intl.formatMessage(
                  { id: "history.table.delete.aria" },
                  { year: entry.year },
                )}
                onClick={() => onDelete(entry.id)}
              >
                <FormattedMessage id="history.table.delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
