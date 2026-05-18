import { FormattedMessage } from "react-intl";
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import type { InverseSalaryResult } from "@/domain/calc";

interface InverseResultsProps {
  readonly result: InverseSalaryResult;
}

export function InverseResults({ result }: InverseResultsProps) {
  return (
    <Stack gap="md">
      <MetricBlock
        label={<FormattedMessage id="inverse.result.grossAnnual" />}
        amount={result.grossAnnual}
        whole
        announce
      />
      <MetricBlock
        label={<FormattedMessage id="inverse.result.grossMonthly" />}
        amount={result.breakdown.grossMonthly}
        whole
      />
      <MetricBlock
        label={<FormattedMessage id="inverse.result.netAnnualAchieved" />}
        amount={result.breakdown.netAnnual}
        whole
      />
      <MetricBlock
        label={<FormattedMessage id="inverse.result.netMonthly" />}
        amount={result.breakdown.netMonthly}
        whole
      />
      <Stack direction="row" gap="md" wrap>
        <div className="qg-metric">
          <div className="qg-metric__label">
            <FormattedMessage id="inverse.result.inps" />
          </div>
          <div className="qg-metric__amount">
            <Money amount={result.breakdown.inpsContribution} whole />
          </div>
        </div>
        <div className="qg-metric">
          <div className="qg-metric__label">
            <FormattedMessage id="inverse.result.irpef" />
          </div>
          <div className="qg-metric__amount">
            <Money amount={result.breakdown.irpefNet} whole />
          </div>
        </div>
      </Stack>
      {!result.converged && (
        <p className="qg-note">
          <FormattedMessage id="inverse.result.notConverged" />
        </p>
      )}
    </Stack>
  );
}
