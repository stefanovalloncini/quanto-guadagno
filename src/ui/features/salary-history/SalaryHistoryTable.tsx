import { Fragment, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import { REGIONS } from "@/domain/data";
import type { AdjustedEntry } from "./useSalaryHistory.ts";
import type { SalaryEntrySettings } from "./salaryHistory.ts";

interface SalaryHistoryTableProps {
  readonly rows: ReadonlyArray<AdjustedEntry>;
  readonly targetYear: number;
  readonly onDelete: (id: string) => void;
}

const COLUMN_COUNT = 6;

export function SalaryHistoryTable({ rows, targetYear, onDelete }: SalaryHistoryTableProps) {
  const intl = useIntl();
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
            <FormattedMessage id="history.table.net" />
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
        {rows.map(({ entry, adjusted, net }) => {
          const isExpanded = expandedId === entry.id;
          return (
            <Fragment key={entry.id}>
              <tr>
                <td>
                  <span className="qg-history-table__year-cell">
                    {entry.year}
                    {entry.isMigrated === true ? (
                      <span
                        className="qg-history-table__pill"
                        title={intl.formatMessage({ id: "history.table.migrated.hint" })}
                      >
                        <FormattedMessage id="history.table.migrated" />
                      </span>
                    ) : null}
                  </span>
                </td>
                <td>
                  <Money amount={entry.grossAnnual} whole />
                </td>
                <td>
                  {net !== null ? (
                    <Money amount={net.netAnnual} whole />
                  ) : (
                    <span
                      className="qg-history-table__na"
                      title={intl.formatMessage(
                        { id: "history.table.net.naHint" },
                        { year: entry.year },
                      )}
                    >
                      <FormattedMessage id="history.table.net.na" />
                    </span>
                  )}
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
                  <div className="qg-history-table__actions">
                    <button
                      type="button"
                      className="qg-history-table__details"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    >
                      <FormattedMessage
                        id={isExpanded ? "history.table.collapse" : "history.table.expand"}
                      />
                    </button>
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
                  </div>
                </td>
              </tr>
              {isExpanded ? (
                <tr className="qg-history-table__expanded">
                  <td colSpan={COLUMN_COUNT}>
                    <SettingsSummary settings={entry.settings} />
                  </td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

interface SettingsSummaryProps {
  readonly settings: SalaryEntrySettings;
}

function SettingsSummary({ settings }: SettingsSummaryProps) {
  const intl = useIntl();
  const region = REGIONS[settings.regionCode].name;
  const contract = intl.formatMessage({
    id: `employee.form.contractType.${settings.contractType}`,
  });
  const mensilita = intl.formatMessage({
    id: `employee.form.paymentFrequency.option${settings.paymentFrequency}`,
  });
  const municipalPct = (settings.municipalTaxRate * 100).toFixed(2).replace(".", ",");

  return (
    <dl className="qg-history-table__settings">
      <div>
        <dt>
          <FormattedMessage id="history.table.settings.region" />
        </dt>
        <dd>{region}</dd>
      </div>
      <div>
        <dt>
          <FormattedMessage id="history.table.settings.contractType" />
        </dt>
        <dd>{contract}</dd>
      </div>
      <div>
        <dt>
          <FormattedMessage id="history.table.settings.paymentFrequency" />
        </dt>
        <dd>{mensilita}</dd>
      </div>
      <div>
        <dt>
          <FormattedMessage id="history.table.settings.municipalTaxRate" />
        </dt>
        <dd>{municipalPct}%</dd>
      </div>
      {settings.dependents ? (
        <div>
          <dt>
            <FormattedMessage id="history.table.settings.dependents" />
          </dt>
          <dd>
            <FormattedMessage
              id="history.table.settings.dependents.summary"
              values={{
                spouse: settings.dependents.hasSpouse ? 1 : 0,
                children: settings.dependents.childrenOver21,
                other: settings.dependents.otherDependents,
              }}
            />
          </dd>
        </div>
      ) : null}
      {settings.companySize !== undefined ? (
        <div>
          <dt>
            <FormattedMessage id="history.table.settings.companySize" />
          </dt>
          <dd>
            <FormattedMessage id={`history.form.companySize.${settings.companySize}`} />
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
