import { FormattedMessage, FormattedNumber } from "react-intl";
import { Ledger, LedgerGroup, LedgerRow, LedgerTotal, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import type { SalaryBreakdown } from "@/domain/calc";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface EmployerCostResultsProps {
  readonly breakdown: SalaryBreakdown;
}

const OTHER_COST_ROWS: ReadonlyArray<{
  readonly labelId: MessageKey;
  readonly pick: (b: SalaryBreakdown) => number;
}> = [
  { labelId: "employee.employer.inail", pick: (b) => b.inailContribution },
  { labelId: "employee.employer.maternity", pick: (b) => b.maternityContribution },
  { labelId: "employee.employer.naspi", pick: (b) => b.naspiContribution },
  { labelId: "employee.employer.naspiAdditional", pick: (b) => b.naspiAdditionalContribution },
  { labelId: "employee.employer.cig", pick: (b) => b.cigContribution },
  { labelId: "employee.employer.other", pick: (b) => b.otherEmployerContributions },
];

const label = (id: string) => <FormattedMessage id={id} />;

export function EmployerCostResults({ breakdown }: EmployerCostResultsProps) {
  const otherCosts = OTHER_COST_ROWS.map((row) => ({
    labelId: row.labelId,
    amount: row.pick(breakdown),
  })).filter((row) => row.amount > 0);

  const hasRatio = breakdown.netAnnual > 0 && breakdown.totalEmployerCost > 0;
  const ratio = hasRatio ? breakdown.totalEmployerCost / breakdown.netAnnual : 0;

  return (
    <div className="qg-result">
      <ResultFigure
        label={label("employee.employer.total")}
        value={<Money amount={breakdown.totalEmployerCost} whole />}
        settleKey={breakdown.totalEmployerCost}
        secondary={
          <FormattedMessage
            id="employerCost.result.summaryLine"
            values={{
              gross: <Money amount={breakdown.grossAnnual} whole />,
              net: <Money amount={breakdown.netAnnual} whole />,
            }}
          />
        }
        {...(hasRatio && {
          note: (
            <FormattedMessage
              id="employee.employer.insight"
              values={{
                ratio: (
                  <span className="qg-num">
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
          ),
        })}
      />

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

      <p className="qg-figure__note">
        <FormattedMessage id="employee.employer.disclaimer" />
      </p>
    </div>
  );
}
