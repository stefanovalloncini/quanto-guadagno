import { FormattedMessage } from "react-intl";
import { Ledger, LedgerRow, LedgerTotal, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import type { InverseSalaryResult } from "@/domain/calc";

interface InverseResultsProps {
  readonly result: InverseSalaryResult;
}

const label = (id: string) => <FormattedMessage id={id} />;

export function InverseResults({ result }: InverseResultsProps) {
  const { breakdown } = result;

  return (
    <div className="qg-result">
      <ResultFigure
        label={label("inverse.result.grossAnnual")}
        value={<Money amount={result.grossAnnual} whole />}
        settleKey={result.grossAnnual}
        secondary={
          <FormattedMessage
            id="inverse.result.grossMonthly"
            values={{ amount: <Money amount={breakdown.grossMonthly} whole /> }}
          />
        }
        {...(!result.converged && { note: label("inverse.result.notConverged") })}
      />

      <Ledger>
        <LedgerRow
          label={label("inverse.result.inps")}
          amount={breakdown.inpsContribution}
          rate={breakdown.inpsRate}
          subtract
        />
        <LedgerRow label={label("inverse.result.irpef")} amount={breakdown.irpefNet} subtract />
        <LedgerTotal
          label={label("inverse.result.netAnnualAchieved")}
          amount={breakdown.netAnnual}
        />
        <LedgerRow label={label("inverse.result.netMonthly")} amount={breakdown.netMonthly} />
      </Ledger>
    </div>
  );
}
