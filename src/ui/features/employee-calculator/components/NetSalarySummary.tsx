import { FormattedMessage } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { PaymentFrequency, SalaryBreakdown } from "@/domain/calc";

interface NetSalarySummaryProps {
  readonly breakdown: SalaryBreakdown;
  readonly paymentFrequency: PaymentFrequency;
}

export function NetSalarySummary({ breakdown, paymentFrequency }: NetSalarySummaryProps) {
  return (
    <>
      <div className="qg-cedolino__head">
        <span className="qg-cedolino__label">
          <FormattedMessage id="employee.summary.monthlyNet" />
        </span>
        {/* The live region stays mounted; the key inside it re-runs the settle. */}
        <div className="qg-cedolino__amount" aria-live="polite">
          <strong className="qg-cifra" key={breakdown.netMonthly}>
            <Money amount={breakdown.netMonthly} />
          </strong>
        </div>
      </div>
      <p className="qg-cedolino__annual">
        <FormattedMessage
          id="employee.summary.annualLine"
          values={{
            amount: <Money amount={breakdown.netAnnual} whole />,
            frequency: paymentFrequency,
          }}
        />
      </p>
      <p className="qg-cedolino__rates">
        <FormattedMessage
          id="employee.summary.rates"
          values={{
            effective: formatPercentage(breakdown.effectiveTaxRate),
            marginal: formatPercentage(breakdown.marginalTaxRate),
          }}
        />
      </p>
      {breakdown.pdrNet > 0 && (
        <p className="qg-cedolino__rates">
          <FormattedMessage id="employee.summary.pdr" /> <Money amount={breakdown.pdrNet} whole />
        </p>
      )}
    </>
  );
}
