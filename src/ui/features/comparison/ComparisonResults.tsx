import { FormattedMessage } from "react-intl";
import { Ledger, LedgerCells, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import type { SalaryComparison } from "@/domain/calc";

interface ComparisonResultsProps {
  readonly result: SalaryComparison;
}

const label = (id: string) => <FormattedMessage id={id} />;

export function ComparisonResults({ result }: ComparisonResultsProps) {
  const { a, b, winner, netAnnualDelta, netMonthlyDelta } = result;

  const row = (labelId: string, valueA: number, valueB: number) => (
    <LedgerCells
      header={label(labelId)}
      cells={[<Money key="a" amount={valueA} whole />, <Money key="b" amount={valueB} whole />]}
    />
  );

  return (
    <div className="qg-result">
      <ResultFigure
        label={label("comparison.result.delta")}
        value={<Money amount={Math.abs(netAnnualDelta)} whole />}
        settleKey={netAnnualDelta}
        secondary={
          <FormattedMessage
            id="comparison.result.winner"
            values={{ winner, amount: <Money amount={Math.abs(netMonthlyDelta)} whole /> }}
          />
        }
        note={label("comparison.result.note")}
      />

      <Ledger
        columns={[
          <span key="item" className="qg-visually-hidden">
            {label("comparison.result.column.item")}
          </span>,
          label("comparison.result.offerA"),
          label("comparison.result.offerB"),
        ]}
      >
        {row("comparison.result.row.grossAnnual", a.grossAnnual, b.grossAnnual)}
        {row("comparison.result.row.netAnnual", a.netAnnual, b.netAnnual)}
        {row("comparison.result.row.netMonthly", a.netMonthly, b.netMonthly)}
      </Ledger>
    </div>
  );
}
