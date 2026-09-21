import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { calculateRaiseImpact, type SalaryInput } from "@/domain/calc";
import { formatPercentage } from "@/domain/format.ts";
import { Ledger, LedgerRow, Money } from "@/ui/design-system/primitives";

interface RaiseImpactBlockProps {
  readonly input: SalaryInput;
}

export function RaiseImpactBlock({ input }: RaiseImpactBlockProps) {
  const impact = useMemo(() => calculateRaiseImpact(input), [input]);

  return (
    <details className="qg-disclosure qg-raise">
      <summary>
        <FormattedMessage id="employee.raise.title" />
      </summary>

      <div className="qg-raise__body">
        <Ledger>
          {impact.steps.map((step) => (
            <LedgerRow
              key={step.increment}
              label={
                <>
                  <span className="qg-num">
                    +<Money amount={step.increment} whole />
                  </span>
                  <span className="qg-ledger__rate">
                    <FormattedMessage
                      id="employee.raise.row.detail"
                      values={{
                        kept: formatPercentage(step.keptShare),
                        marginal: formatPercentage(step.marginalTaxRate),
                      }}
                    />
                  </span>
                </>
              }
              amount={step.netGain}
            />
          ))}
        </Ledger>

        <p className="qg-note">
          <FormattedMessage id="employee.raise.note" />
        </p>
      </div>
    </details>
  );
}
