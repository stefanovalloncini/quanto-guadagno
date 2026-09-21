import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Button,
  Ledger,
  LedgerCells,
  LedgerRow,
  LedgerTotal,
  Money,
} from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import { EUR_AMOUNT_FORMAT } from "@/ui/shared/numeric.ts";
import type { TfrProjection } from "@/domain/calc";

interface TfrResultsProps {
  readonly result: TfrProjection;
}

const VISIBLE_YEARS = 10;

const label = (id: string) => <FormattedMessage id={id} />;

export function TfrResults({ result }: TfrResultsProps) {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const years = showAll ? result.schedule : result.schedule.slice(0, VISIBLE_YEARS);
  const hasMore = result.schedule.length > years.length;

  return (
    <div className="qg-result">
      <ResultFigure
        label={label("tfr.result.stock")}
        value={<Money amount={result.finalStock} whole />}
        settleKey={result.finalStock}
        secondary={
          <FormattedMessage
            id="tfr.result.stock.sub"
            values={{ amount: intl.formatNumber(result.annualQuota, EUR_AMOUNT_FORMAT) }}
          />
        }
      />

      <Ledger>
        <LedgerRow label={label("tfr.breakdown.quote")} amount={result.totalQuote} />
        <LedgerRow label={label("tfr.breakdown.revaluation")} amount={result.totalRevaluation} />
        <LedgerTotal label={label("tfr.result.stock")} amount={result.finalStock} />
      </Ledger>

      <div className="qg-ledger-scroll">
        <Ledger
          caption={label("tfr.schedule.title")}
          columns={[
            label("tfr.schedule.year"),
            label("tfr.schedule.quota"),
            label("tfr.schedule.revaluation"),
            label("tfr.schedule.stock"),
          ]}
        >
          {years.map((row) => (
            <LedgerCells
              key={row.year}
              header={row.year}
              cells={[
                <Money key="quota" amount={row.quota} whole />,
                <Money key="rev" amount={row.revaluation} whole />,
                <Money key="stock" amount={row.stock} whole />,
              ]}
            />
          ))}
        </Ledger>
      </div>

      {hasMore && (
        <p className="qg-result__more">
          <Button variant="quiet" type="button" onClick={() => setShowAll(true)}>
            <FormattedMessage id="schedule.showAllYears" />
          </Button>
        </p>
      )}

      <p className="qg-figure__note">
        <FormattedMessage id="tfr.result.note" />
      </p>
    </div>
  );
}
