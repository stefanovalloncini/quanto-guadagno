import { FormattedMessage } from "react-intl";
import { Ledger, LedgerRow } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { FrozenSalary } from "@/domain/calc";

interface FrozenSalaryBlockProps {
  readonly frozen: FrozenSalary;
}

export function FrozenSalaryBlock({ frozen }: FrozenSalaryBlockProps) {
  return (
    <details className="qg-disclosure qg-frozen">
      <summary>
        <FormattedMessage id="inflation.frozen.title" />
      </summary>

      <div className="qg-frozen__body">
        <Ledger
          caption={
            <FormattedMessage
              id="inflation.frozen.caption"
              values={{ year: String(frozen.fromYear) }}
            />
          }
        >
          {frozen.years.map((year) => (
            <LedgerRow
              key={year.year}
              label={
                <>
                  <span className="qg-num">{year.year}</span>
                  {year.lossRate > 0 && (
                    <span className="qg-ledger__rate">
                      <FormattedMessage
                        id="inflation.frozen.row.loss"
                        values={{ rate: formatPercentage(year.lossRate) }}
                      />
                    </span>
                  )}
                </>
              }
              amount={year.realValue}
            />
          ))}
        </Ledger>

        <p className="qg-note">
          <FormattedMessage
            id="inflation.frozen.seriesEnd"
            values={{ year: String(frozen.lastYear) }}
          />
        </p>
      </div>
    </details>
  );
}
