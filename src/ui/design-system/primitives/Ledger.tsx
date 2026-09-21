import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { Money } from "./Money.tsx";
import { formatPercentage } from "@/domain/format.ts";

interface LedgerProps {
  readonly caption?: ReactNode;
  readonly labelledBy?: string;
  readonly columns?: ReadonlyArray<ReactNode>;
  readonly dense?: boolean;
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
  readonly span?: number;
}

interface LedgerTotalProps {
  readonly label: ReactNode;
  readonly amount: number;
  readonly subtract?: boolean;
  readonly whole?: boolean;
}

interface LedgerCellsProps {
  readonly header: ReactNode;
  readonly cells: ReadonlyArray<ReactNode>;
  readonly strong?: boolean;
  readonly zebra?: boolean;
}

function amountOf(amount: number, subtract: boolean | undefined): number {
  return subtract ? -Math.abs(amount) : amount;
}

function rowClass(zebra: boolean | undefined, strong: boolean | undefined): string {
  return ["qg-ledger__row", zebra && "qg-ledger__row--zebra", strong && "qg-ledger__row--strong"]
    .filter(Boolean)
    .join(" ");
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
  return (
    <tr className={rowClass(zebra, strong)}>
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

/** A row of a multi-column schedule: a row header plus already-formatted cells. */
export function LedgerCells({ header, cells, strong, zebra }: LedgerCellsProps) {
  return (
    <tr className={rowClass(zebra, strong)}>
      <th scope="row" className="qg-ledger__label">
        {header}
      </th>
      {cells.map((cell, index) => (
        <td key={index} className="qg-ledger__amount">
          {cell}
        </td>
      ))}
    </tr>
  );
}

export function LedgerGroup({ label, span = 2 }: LedgerGroupProps) {
  return (
    <tr className="qg-ledger__group">
      <th scope="colgroup" colSpan={span}>
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
    if (!isValidElement(child)) return child;
    if (child.type !== LedgerRow && child.type !== LedgerCells) return child;
    const row = child as ReactElement<{ zebra?: boolean }>;
    const zebra = index % 2 === 1;
    index += 1;
    return cloneElement(row, { zebra });
  });
}

export function Ledger({ caption, labelledBy, columns, dense, children }: LedgerProps) {
  return (
    <table
      className={dense ? "qg-ledger qg-ledger--dense" : "qg-ledger"}
      {...(labelledBy !== undefined && { "aria-labelledby": labelledBy })}
    >
      {caption !== undefined && <caption>{caption}</caption>}
      {columns !== undefined && (
        <thead className="qg-ledger__head">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={index === 0 ? "qg-ledger__label" : "qg-ledger__amount"}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>{withZebra(children)}</tbody>
    </table>
  );
}
