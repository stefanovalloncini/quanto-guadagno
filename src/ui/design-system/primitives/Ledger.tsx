import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { Money } from "./Money.tsx";
import { formatPercentage } from "@/domain/format.ts";

interface LedgerProps {
  readonly caption?: ReactNode;
  readonly labelledBy?: string;
  readonly children: ReactNode;
}

interface LedgerRowProps {
  readonly label: ReactNode;
  readonly amount: number;
  readonly rate?: number;
  readonly subtract?: boolean;
  readonly whole?: boolean;
  readonly strong?: boolean;
  readonly zebra?: boolean;
}

interface LedgerGroupProps {
  readonly label: ReactNode;
}

interface LedgerTotalProps {
  readonly label: ReactNode;
  readonly amount: number;
  readonly subtract?: boolean;
  readonly whole?: boolean;
}

function amountOf(amount: number, subtract: boolean | undefined): number {
  return subtract ? -Math.abs(amount) : amount;
}

export function LedgerRow({
  label,
  amount,
  rate,
  subtract,
  whole = true,
  strong,
  zebra,
}: LedgerRowProps) {
  const cls = [
    "qg-ledger__row",
    zebra && "qg-ledger__row--zebra",
    strong && "qg-ledger__row--strong",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <tr className={cls}>
      <th scope="row" className="qg-ledger__label">
        {label}
        {rate !== undefined && rate > 0 && (
          <span className="qg-ledger__rate">{formatPercentage(rate)}</span>
        )}
      </th>
      <td className="qg-ledger__amount">
        <Money amount={amountOf(amount, subtract)} whole={whole} />
      </td>
    </tr>
  );
}

export function LedgerGroup({ label }: LedgerGroupProps) {
  return (
    <tr className="qg-ledger__group">
      <th scope="colgroup" colSpan={2}>
        {label}
      </th>
    </tr>
  );
}

export function LedgerTotal({ label, amount, subtract, whole = true }: LedgerTotalProps) {
  return (
    <tr className="qg-ledger__total">
      <th scope="row" className="qg-ledger__label">
        {label}
      </th>
      <td className="qg-ledger__amount">
        <Money amount={amountOf(amount, subtract)} whole={whole} />
      </td>
    </tr>
  );
}

// Zebra belongs to ordinary rows only, so the stripe keeps its rhythm across
// group headings and totals.
function withZebra(children: ReactNode): ReactNode {
  let index = 0;
  return Children.map(children, (child) => {
    if (!isValidElement(child) || child.type !== LedgerRow) return child;
    const row = child as ReactElement<LedgerRowProps>;
    const zebra = index % 2 === 1;
    index += 1;
    return cloneElement(row, { zebra });
  });
}

export function Ledger({ caption, labelledBy, children }: LedgerProps) {
  return (
    <table
      className="qg-ledger"
      {...(labelledBy !== undefined && { "aria-labelledby": labelledBy })}
    >
      {caption !== undefined && <caption>{caption}</caption>}
      <tbody>{withZebra(children)}</tbody>
    </table>
  );
}
