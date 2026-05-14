import { FormattedMessage } from "react-intl";
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import type { SalaryBreakdown } from "@/domain/calc";

interface NetSalarySummaryProps {
  readonly breakdown: SalaryBreakdown;
  readonly paymentFrequency: 12 | 13 | 14;
}

export function NetSalarySummary({ breakdown, paymentFrequency }: NetSalarySummaryProps) {
  const effectiveRate = breakdown.effectiveTaxRate * 100;
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
          <span className="qg-summary__rate-value">{effectiveRate.toFixed(1)}%</span>
        </span>
      </div>

      <div className="qg-summary__gross">
        <span className="qg-summary__gross-label">
          <FormattedMessage id="employee.summary.gross" />
        </span>
        <Money amount={breakdown.grossAnnual} whole />
      </div>

      {breakdown.tfrAnnual > 0 && (
        <div className="qg-summary__tfr">
          <span className="qg-summary__tfr-label">
            <FormattedMessage id="employee.summary.tfr" />
          </span>
          <Money amount={breakdown.tfrMonthly} whole />
          <span className="qg-summary__tfr-unit">
            <FormattedMessage id="employee.summary.tfr.monthly" />
          </span>
        </div>
      )}

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
