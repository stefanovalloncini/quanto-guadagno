import { FormattedMessage } from "react-intl";
import { MetricBlock, Stack } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { InflationResult } from "./useInflationCalculator.ts";

interface InflationResultsProps {
  readonly result: InflationResult;
}

export function InflationResults({ result }: InflationResultsProps) {
  return (
    <Stack gap="md">
      <MetricBlock
        label={
          <FormattedMessage
            id="inflation.result.adjusted"
            values={{ year: String(result.toYear) }}
          />
        }
        amount={result.adjusted}
        sublabel={
          <FormattedMessage
            id="inflation.result.adjusted.sub"
            values={{ year: String(result.fromYear) }}
          />
        }
        whole
        announce
      />

      <div className="qg-metric">
        <div className="qg-metric__label">
          <FormattedMessage id="inflation.result.cumulative" />
        </div>
        <div className="qg-metric__amount">{formatPercentage(result.cumulativeRate)}</div>
      </div>

      <p className="qg-note">
        <FormattedMessage id="inflation.result.note" />
      </p>
    </Stack>
  );
}
