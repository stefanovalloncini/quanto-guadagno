import { FormattedMessage } from "react-intl";
import { Money } from "@/ui/design-system/primitives";

interface BreakdownRowProps {
  readonly labelId: string;
  readonly amount: number;
  readonly rate?: number;
  /** Treat the row as a subtraction (negative contribution to net). */
  readonly subtract?: boolean;
  /** Treat the row as an addition (positive credit). */
  readonly add?: boolean;
  readonly total?: boolean;
  readonly highlight?: boolean;
}

export function BreakdownRow({
  labelId,
  amount,
  rate,
  subtract,
  add,
  total,
  highlight,
}: BreakdownRowProps) {
  const cls = [
    "qg-breakdown-row",
    total && "qg-breakdown-row--total",
    highlight && "qg-breakdown-row--highlight",
    subtract && "qg-breakdown-row--subtract",
    add && "qg-breakdown-row--add",
  ]
    .filter(Boolean)
    .join(" ");

  const displayAmount = subtract ? -Math.abs(amount) : Math.abs(amount);

  return (
    <div className={cls}>
      <span className="qg-breakdown-row__label">
        <FormattedMessage id={labelId} />
        {rate !== undefined && rate > 0 && (
          <span className="qg-breakdown-row__rate">{(rate * 100).toFixed(2)}%</span>
        )}
      </span>
      <span className="qg-breakdown-row__amount">
        <Money amount={displayAmount} whole />
      </span>
    </div>
  );
}
