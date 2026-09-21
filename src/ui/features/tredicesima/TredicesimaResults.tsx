import { FormattedMessage } from "react-intl";
import { Ledger, LedgerRow, LedgerTotal, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import { formatPercentage } from "@/domain/format.ts";
import type { TredicesimaResult } from "@/domain/calc";

interface TredicesimaResultsProps {
  readonly result: TredicesimaResult;
}

const label = (id: string) => <FormattedMessage id={id} />;

export function TredicesimaResults({ result }: TredicesimaResultsProps) {
  return (
    <div className="qg-result">
      <ResultFigure
        label={label("tredicesima.result.net")}
        value={<Money amount={result.net} whole />}
        settleKey={result.net}
        {...(result.extraMonths > 1 && {
          secondary: (
            <FormattedMessage
              id="tredicesima.result.netTotal"
              values={{ amount: <Money amount={result.netTotal} whole /> }}
            />
          ),
        })}
        note={
          <FormattedMessage
            id="tredicesima.result.net.sub"
            values={{ rate: formatPercentage(result.effectiveRate) }}
          />
        }
      />

      <Ledger>
        <LedgerRow label={label("tredicesima.breakdown.gross")} amount={result.gross} />
        <LedgerRow label={label("tredicesima.breakdown.inps")} amount={result.inps} subtract />
        <LedgerRow
          label={label("tredicesima.breakdown.irpef")}
          amount={result.irpef}
          rate={result.marginalRate}
          subtract
        />
        <LedgerTotal label={label("tredicesima.breakdown.net")} amount={result.net} />
      </Ledger>

      <p className="qg-figure__note">
        <FormattedMessage id="tredicesima.result.note" />
      </p>
    </div>
  );
}
