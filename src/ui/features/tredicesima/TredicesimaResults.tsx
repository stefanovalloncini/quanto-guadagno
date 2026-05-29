import { FormattedMessage } from "react-intl";
import { BreakdownRow, MetricBlock, Stack } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { TredicesimaResult } from "@/domain/calc";

interface TredicesimaResultsProps {
  readonly result: TredicesimaResult;
}

export function TredicesimaResults({ result }: TredicesimaResultsProps) {
  return (
    <Stack gap="md">
      <MetricBlock
        label={<FormattedMessage id="tredicesima.result.net" />}
        amount={result.net}
        sublabel={
          <FormattedMessage
            id="tredicesima.result.net.sub"
            values={{ rate: formatPercentage(result.effectiveRate) }}
          />
        }
        whole
        announce
      />

      {result.extraMonths > 1 && (
        <MetricBlock
          label={<FormattedMessage id="tredicesima.result.netTotal" />}
          amount={result.netTotal}
          whole
        />
      )}

      <div className="qg-results-breakdown__flow">
        <BreakdownRow labelId="tredicesima.breakdown.gross" amount={result.gross} />
        <BreakdownRow labelId="tredicesima.breakdown.inps" amount={result.inps} subtract />
        <BreakdownRow
          labelId="tredicesima.breakdown.irpef"
          amount={result.irpef}
          rate={result.marginalRate}
          subtract
        />
        <BreakdownRow labelId="tredicesima.breakdown.net" amount={result.net} total highlight />
      </div>

      <p className="qg-note">
        <FormattedMessage id="tredicesima.result.note" />
      </p>
    </Stack>
  );
}
