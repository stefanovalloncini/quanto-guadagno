import { FormattedMessage, FormattedNumber } from "react-intl";
import { Ledger, LedgerGroup, LedgerRow, LedgerTotal } from "@/ui/design-system/primitives";
import type { SalaryBreakdown } from "@/domain/calc";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface EmployerCostViewProps {
  readonly breakdown: SalaryBreakdown;
  readonly defaultOpen?: boolean;
}

interface OtherCostRow {
  readonly labelId: MessageKey;
  readonly amount: number;
}

function buildOtherCosts(breakdown: SalaryBreakdown): ReadonlyArray<OtherCostRow> {
  const rows: ReadonlyArray<OtherCostRow> = [
    { labelId: "employee.employer.inail", amount: breakdown.inailContribution },
    { labelId: "employee.employer.maternity", amount: breakdown.maternityContribution },
    { labelId: "employee.employer.naspi", amount: breakdown.naspiContribution },
    { labelId: "employee.employer.naspiAdditional", amount: breakdown.naspiAdditionalContribution },
    { labelId: "employee.employer.cig", amount: breakdown.cigContribution },
    { labelId: "employee.employer.other", amount: breakdown.otherEmployerContributions },
  ];
  return rows.filter((row) => row.amount > 0);
}

const label = (id: string) => <FormattedMessage id={id} />;

export function EmployerCostView({ breakdown, defaultOpen }: EmployerCostViewProps) {
  const otherCosts = buildOtherCosts(breakdown);
  const showInsight = breakdown.netAnnual > 0 && breakdown.totalEmployerCost > 0;
  const ratio = showInsight ? breakdown.totalEmployerCost / breakdown.netAnnual : 0;

  return (
    <details className="qg-employer" {...(defaultOpen === true && { open: true })}>
      <summary>
        <FormattedMessage id="employee.employer.section" />
      </summary>

      <div className="qg-employer__body">
        <Ledger>
          <LedgerRow label={label("employee.breakdown.gross")} amount={breakdown.grossAnnual} />
          <LedgerRow
            label={label("employee.employer.inps")}
            amount={breakdown.employerInps}
            rate={breakdown.employerInpsRate}
          />
          <LedgerRow
            label={label("employee.employer.tfr")}
            amount={breakdown.tfrAnnual}
            rate={breakdown.tfrRate}
          />

          {otherCosts.length > 0 && <LedgerGroup label={label("employee.employer.otherCosts")} />}
          {otherCosts.map((row) => (
            <LedgerRow key={row.labelId} label={label(row.labelId)} amount={row.amount} />
          ))}
          {otherCosts.length > 0 && (
            <LedgerTotal
              label={label("employee.employer.totalOtherCosts")}
              amount={breakdown.totalOtherEmployerCosts}
            />
          )}

          <LedgerTotal
            label={label("employee.employer.total")}
            amount={breakdown.totalEmployerCost}
          />
        </Ledger>

        {showInsight && (
          <p className="qg-employer__insight">
            <FormattedMessage
              id="employee.employer.insight"
              values={{
                ratio: (
                  <span className="qg-employer__insight-ratio">
                    <FormattedNumber
                      value={ratio}
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                    />{" "}
                    €
                  </span>
                ),
              }}
            />
          </p>
        )}

        <p className="qg-employer__disclaimer">
          <FormattedMessage id="employee.employer.disclaimer" />
        </p>
      </div>
    </details>
  );
}
