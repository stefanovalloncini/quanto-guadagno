import { FormattedMessage } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import { formatPercentage } from "@/domain/format.ts";
import type { InflationResult } from "./useInflationCalculator.ts";

interface InflationResultsProps {
  readonly result: InflationResult;
}

export function InflationResults({ result }: InflationResultsProps) {
  return (
    <div className="qg-result">
      <ResultFigure
        label={
          <FormattedMessage
            id="inflation.result.adjusted"
            values={{ year: String(result.toYear) }}
          />
        }
        value={<Money amount={result.adjusted} whole />}
        settleKey={result.adjusted}
        secondary={
          <FormattedMessage
            id="inflation.result.adjusted.sub"
            values={{ year: String(result.fromYear) }}
          />
        }
        note={
          <>
            <span>
              <FormattedMessage id="inflation.result.cumulative" />
            </span>{" "}
            <span className="qg-num">{formatPercentage(result.cumulativeRate)}</span>
          </>
        }
      />

      <p className="qg-figure__note">
        <FormattedMessage id="inflation.result.note" />
      </p>
    </div>
  );
}
