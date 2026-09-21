import { FormattedMessage } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { InflationResult } from "./useInflationCalculator.ts";

interface InflationResultsProps {
  readonly result: InflationResult;
}

export function InflationResults({ result }: InflationResultsProps) {
  return (
    <div className="qg-cedolino">
      <div className="qg-cedolino__head">
        <span className="qg-cedolino__label">
          <FormattedMessage
            id="inflation.result.adjusted"
            values={{ year: String(result.toYear) }}
          />
        </span>
        {/* The live region stays mounted; the key inside it re-runs the settle. */}
        <div className="qg-cedolino__amount" aria-live="polite">
          <strong className="qg-cifra qg-cifra--sm" key={result.adjusted}>
            <Money amount={result.adjusted} whole />
          </strong>
        </div>
      </div>

      <p className="qg-cedolino__annual">
        <FormattedMessage
          id="inflation.result.adjusted.sub"
          values={{ year: String(result.fromYear) }}
        />
      </p>
      <p className="qg-cedolino__rates">
        <span>
          <FormattedMessage id="inflation.result.cumulative" />
        </span>{" "}
        <span className="qg-num">{formatPercentage(result.cumulativeRate)}</span>
      </p>

      <p className="qg-note">
        <FormattedMessage id="inflation.result.note" />
      </p>
    </div>
  );
}
