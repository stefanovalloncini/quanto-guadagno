import { FormattedMessage, FormattedNumber } from "react-intl";
import { BreakdownRow, MetricBlock } from "@/ui/design-system/primitives";
import type { SalaryBreakdown } from "@/domain/calc";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface EmployerCostViewProps {
  readonly breakdown: SalaryBreakdown;
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

export function EmployerCostView({ breakdown }: EmployerCostViewProps) {
  const otherCosts = buildOtherCosts(breakdown);
  const showInsight = breakdown.netAnnual > 0 && breakdown.totalEmployerCost > 0;
  const ratio = showInsight ? breakdown.totalEmployerCost / breakdown.netAnnual : 0;

  return (
    <section className="qg-employer" aria-labelledby="employer-cost-title">
      <h2 id="employer-cost-title" className="qg-employer__title">
        <FormattedMessage id="employee.employer.section" />
      </h2>

      <div className="qg-employer__gap">
        <MetricBlock
          label={<FormattedMessage id="employee.employer.youTake" />}
          amount={breakdown.netAnnual}
          whole
        />
        <span className="qg-employer__gap-arrow" aria-hidden="true">
          →
        </span>
        <MetricBlock
          label={<FormattedMessage id="employee.employer.companyPays" />}
          amount={breakdown.totalEmployerCost}
          whole
        />
      </div>

      {showInsight && (
        <p className="qg-employer__insight">
          <FormattedMessage
            id="employee.employer.insight"
            values={{
              ratio: (
                <strong className="qg-employer__insight-ratio">
                  <FormattedNumber
                    value={ratio}
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                  />{" "}
                  €
                </strong>
              ),
            }}
          />
        </p>
      )}

      <div className="qg-employer__flow">
        <BreakdownRow labelId="employee.breakdown.gross" amount={breakdown.grossAnnual} />
        <BreakdownRow
          labelId="employee.employer.inps"
          amount={breakdown.employerInps}
          rate={breakdown.employerInpsRate}
        />
        <BreakdownRow
          labelId="employee.employer.tfr"
          amount={breakdown.tfrAnnual}
          rate={breakdown.tfrRate}
        />

        {otherCosts.length > 0 && (
          <>
            <p className="qg-subhead qg-subhead--md qg-employer__group-label">
              <FormattedMessage id="employee.employer.otherCosts" />
            </p>
            {otherCosts.map((row) => (
              <BreakdownRow key={row.labelId} labelId={row.labelId} amount={row.amount} />
            ))}
            <BreakdownRow
              labelId="employee.employer.totalOtherCosts"
              amount={breakdown.totalOtherEmployerCosts}
              total
            />
          </>
        )}

        <BreakdownRow
          labelId="employee.employer.total"
          amount={breakdown.totalEmployerCost}
          highlight
          total
        />
      </div>

      <p className="qg-employer__disclaimer">
        <FormattedMessage id="employee.employer.disclaimer" />
      </p>
    </section>
  );
}
