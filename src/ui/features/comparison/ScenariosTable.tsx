import { FormattedMessage, useIntl } from "react-intl";
import { formatCurrency, formatPercentage } from "@/domain/format.ts";
import type { ScenarioRow } from "./useScenarios.ts";

export interface ScenariosTableProps {
  readonly rows: ReadonlyArray<ScenarioRow>;
  readonly onRemove: (id: string) => void;
}

export function ScenariosTable({ rows, onRemove }: ScenariosTableProps) {
  const intl = useIntl();
  if (rows.length === 0) {
    return (
      <p className="qg-comparison-empty">
        <FormattedMessage id="comparison.empty" />
      </p>
    );
  }

  return (
    <table className="qg-table">
      <thead>
        <tr>
          <th scope="col">
            <FormattedMessage id="comparison.table.label" />
          </th>
          <th scope="col">
            <FormattedMessage id="comparison.table.year" />
          </th>
          <th scope="col" className="qg-table__num">
            <FormattedMessage id="comparison.table.gross" />
          </th>
          <th scope="col" className="qg-table__num">
            <FormattedMessage id="comparison.table.netAnnual" />
          </th>
          <th scope="col" className="qg-table__num">
            <FormattedMessage id="comparison.table.netMonthly" />
          </th>
          <th scope="col" className="qg-table__num">
            <FormattedMessage id="comparison.table.effective" />
          </th>
          <th scope="col">
            <span className="sr-only">
              <FormattedMessage id="comparison.table.actions" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ entry, result }) => (
          <tr key={entry.id}>
            <td>{entry.label}</td>
            <td>{entry.payload.taxYear}</td>
            <td className="qg-table__num">{formatCurrency(result.grossAnnual)}</td>
            <td className="qg-table__num">{formatCurrency(result.netAnnual)}</td>
            <td className="qg-table__num">{formatCurrency(result.netMonthly)}</td>
            <td className="qg-table__num">{formatPercentage(result.effectiveTaxRate)}</td>
            <td>
              <button
                type="button"
                className="qg-table__remove"
                aria-label={intl.formatMessage(
                  { id: "comparison.table.removeLabel" },
                  { name: entry.label },
                )}
                onClick={() => onRemove(entry.id)}
              >
                <FormattedMessage id="comparison.table.remove" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
