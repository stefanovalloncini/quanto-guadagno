import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Money } from "./Money.tsx";
import { formatPercentage } from "@/domain/format.ts";
import type { MessageValues } from "@/ui/shared/intl-types.ts";
import type { MessageKey } from "@/ui/i18n/messages/it.ts";

interface BreakdownRowProps {
  readonly labelId: MessageKey;
  readonly labelValues?: MessageValues;
  readonly amount: number;
  readonly rate?: number;
  readonly extra?: ReactNode;
  readonly subtract?: boolean;
  readonly add?: boolean;
  readonly total?: boolean;
  readonly highlight?: boolean;
}

export function BreakdownRow({
  labelId,
  labelValues,
  amount,
  rate,
  extra,
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
        <FormattedMessage id={labelId} {...(labelValues && { values: labelValues })} />
        {rate !== undefined && rate > 0 && (
          <span className="qg-breakdown-row__rate">{formatPercentage(rate)}</span>
        )}
        {extra}
      </span>
      <span className="qg-breakdown-row__amount">
        <Money amount={displayAmount} whole />
      </span>
    </div>
  );
}
