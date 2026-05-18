import { FormattedMessage } from "react-intl";
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { PaymentFrequency, SalaryBreakdown } from "@/domain/calc";

interface NetSalarySummaryProps {
  readonly breakdown: SalaryBreakdown;
  readonly paymentFrequency: PaymentFrequency;
}

export function NetSalarySummary({ breakdown, paymentFrequency }: NetSalarySummaryProps) {
  const delta = breakdown.netAnnual - breakdown.grossAnnual;

  return (
    <div className="qg-summary">
      <Stack gap="md">
        <MetricBlock
          label={<FormattedMessage id="employee.summary.monthlyNet" />}
          amount={breakdown.netMonthly}
          announce
        />
        <MetricBlock
          label={<FormattedMessage id="employee.summary.annualNet" />}
          amount={breakdown.netAnnual}
          sublabel={
            <FormattedMessage
              id="employee.summary.annualNet.sub"
              values={{ frequency: paymentFrequency }}
            />
          }
          whole
        />
      </Stack>

      <div className="qg-summary__meta">
        <span className="qg-summary__delta">
          <FormattedMessage id="employee.summary.delta" />{" "}
          <Money amount={delta} whole className="qg-summary__delta-amount" />
        </span>
        <span className="qg-summary__rate">
          <FormattedMessage id="employee.summary.effectiveRate" />{" "}
          <span className="qg-summary__rate-value">
            {formatPercentage(breakdown.effectiveTaxRate)}
          </span>
        </span>
        <span className="qg-summary__rate">
          <FormattedMessage id="employee.summary.marginalRate" />{" "}
          <span className="qg-summary__rate-value">
            {formatPercentage(breakdown.marginalTaxRate)}
          </span>
        </span>
      </div>

      <div className="qg-summary__gross">
        <span className="qg-summary__gross-label">
          <FormattedMessage id="employee.summary.gross" />
        </span>
        <Money amount={breakdown.grossAnnual} whole />
      </div>

      {breakdown.pdrNet > 0 && (
        <div className="qg-summary__pdr">
          <span className="qg-summary__pdr-label">
            <FormattedMessage id="employee.summary.pdr" />
          </span>
          <Money amount={breakdown.pdrNet} whole />
        </div>
      )}
    </div>
  );
}
