import { FormattedMessage } from "react-intl";
import { getTaxConfig, type SupportedYear } from "@/domain/data";
import { Money } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";

interface IrpefBracketIndicatorProps {
  readonly taxableIncome: number;
  readonly taxYear: SupportedYear;
}

export function IrpefBracketIndicator({ taxableIncome, taxYear }: IrpefBracketIndicatorProps) {
  const brackets = getTaxConfig(taxYear).irpefBrackets;

  const currentIdx = brackets.findIndex((b) => b.max === null || taxableIncome < b.max);
  if (currentIdx < 0) return null;
  const current = brackets[currentIdx];
  if (!current) return null;

  const nextBracket = brackets[currentIdx + 1];
  const reachedSpan = Math.max(0, taxableIncome - current.min);
  const totalSpan = current.max !== null ? current.max - current.min : reachedSpan;
  const progressPercent =
    totalSpan > 0 ? Math.min(100, Math.max(0, (reachedSpan / totalSpan) * 100)) : 0;
  const distanceToNext = nextBracket && current.max !== null ? current.max - taxableIncome : null;

  return (
    <details className="qg-irpef-indicator">
      <summary>
        <FormattedMessage id="employee.irpefBracket.title" />
      </summary>

      <div className="qg-irpef-indicator__body">
        <div className="qg-irpef-indicator__row">
          {brackets.map((b, i) => {
            const isCurrent = i === currentIdx;
            return (
              <div
                key={i}
                className={`qg-irpef-indicator__chip${isCurrent ? " qg-irpef-indicator__chip--current" : ""}`}
              >
                <span className="qg-irpef-indicator__rate">{formatPercentage(b.rate)}</span>
                <span className="qg-irpef-indicator__range">
                  {b.max === null ? (
                    <FormattedMessage
                      id="employee.irpefBracket.rangeOpen"
                      values={{ min: <Money amount={b.min} whole /> }}
                    />
                  ) : (
                    <FormattedMessage
                      id="employee.irpefBracket.range"
                      values={{
                        min: <Money amount={b.min} whole />,
                        max: <Money amount={b.max} whole />,
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {current.max !== null && (
          <div className="qg-irpef-indicator__progress" aria-hidden="true">
            <div
              className="qg-irpef-indicator__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {distanceToNext !== null && nextBracket && (
          <p className="qg-irpef-indicator__hint">
            <FormattedMessage
              id="employee.irpefBracket.distanceToNext"
              values={{
                distance: <Money amount={distanceToNext} whole />,
                nextRate: formatPercentage(nextBracket.rate),
              }}
            />
          </p>
        )}
        {distanceToNext === null && (
          <p className="qg-irpef-indicator__hint">
            <FormattedMessage id="employee.irpefBracket.topBracket" />
          </p>
        )}
      </div>
    </details>
  );
}
