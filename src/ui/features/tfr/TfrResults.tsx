import { FormattedMessage, useIntl } from "react-intl";
import { BreakdownRow, MetricBlock, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT } from "@/ui/shared/numeric.ts";
import type { TfrProjection } from "@/domain/calc";

interface TfrResultsProps {
  readonly result: TfrProjection;
}

export function TfrResults({ result }: TfrResultsProps) {
  const intl = useIntl();

  return (
    <Stack gap="md">
      <MetricBlock
        label={<FormattedMessage id="tfr.result.stock" />}
        amount={result.finalStock}
        sublabel={
          <FormattedMessage
            id="tfr.result.stock.sub"
            values={{ amount: intl.formatNumber(result.annualQuota, EUR_AMOUNT_FORMAT) }}
          />
        }
        whole
        announce
      />

      <div className="qg-results-breakdown__flow">
        <BreakdownRow labelId="tfr.breakdown.quote" amount={result.totalQuote} />
        <BreakdownRow labelId="tfr.breakdown.revaluation" amount={result.totalRevaluation} />
        <BreakdownRow labelId="tfr.result.stock" amount={result.finalStock} total highlight />
      </div>

      <p className="qg-note">
        <FormattedMessage id="tfr.result.note" />
      </p>
    </Stack>
  );
}
