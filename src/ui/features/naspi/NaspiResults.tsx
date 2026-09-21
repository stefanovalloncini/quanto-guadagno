import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Ledger, LedgerCells, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import type { NaspiBreakdown, NaspiIneligibilityReason } from "@/domain/calc";

interface NaspiResultsProps {
  readonly result: NaspiBreakdown;
  readonly year: number;
}

const REASON_KEYS: Record<NaspiIneligibilityReason, string> = {
  "insufficient-weeks": "naspi.ineligible.insufficient-weeks",
  "voluntary-resignation-lockout": "naspi.ineligible.voluntary-resignation-lockout",
};

const VISIBLE_MONTHS = 12;

const label = (id: string) => <FormattedMessage id={id} />;

export function NaspiResults({ result, year }: NaspiResultsProps) {
  const [showAll, setShowAll] = useState(false);

  if (!result.eligible) {
    return (
      <div className="qg-result">
        {result.reasons.map((reason) => (
          <p key={reason} className="qg-result__alert" role="alert">
            <span className="qg-result__alert-term">
              <FormattedMessage id="naspi.ineligible.title" />
            </span>{" "}
            <FormattedMessage id={REASON_KEYS[reason]} />
          </p>
        ))}
      </div>
    );
  }

  const months = showAll ? result.schedule : result.schedule.slice(0, VISIBLE_MONTHS);
  const hasMore = result.schedule.length > months.length;

  return (
    <div className="qg-result">
      <ResultFigure
        label={label("naspi.result.monthlyAmountNet")}
        value={<Money amount={result.monthlyAmountNet} whole />}
        settleKey={result.monthlyAmountNet}
        secondary={
          <FormattedMessage
            id="naspi.result.summaryLine"
            values={{
              gross: <Money amount={result.monthlyAmount} whole />,
              months: result.durationMonths,
            }}
          />
        }
        note={
          <FormattedMessage
            id="naspi.result.totalLine"
            values={{
              net: <Money amount={result.totalNet} whole />,
              gross: <Money amount={result.totalGross} whole />,
              reference: <Money amount={result.referenceMonthlyPay} whole />,
            }}
          />
        }
      />

      <div className="qg-ledger-scroll">
        <Ledger
          caption={label("naspi.schedule.title")}
          columns={[
            label("naspi.schedule.month"),
            label("naspi.schedule.amount"),
            label("naspi.schedule.amountNet"),
          ]}
        >
          {months.map((row) => (
            <LedgerCells
              key={row.month}
              header={row.month}
              cells={[
                <Money key="gross" amount={row.amount} whole />,
                <Money key="net" amount={row.amountNet} whole />,
              ]}
            />
          ))}
        </Ledger>
      </div>

      {hasMore && (
        <p className="qg-result__more">
          <Button variant="quiet" type="button" onClick={() => setShowAll(true)}>
            <FormattedMessage id="schedule.showAllMonths" />
          </Button>
        </p>
      )}

      <p className="qg-figure__note">
        <FormattedMessage id="naspi.decalage.note" values={{ month: result.decalageStartMonth }} />{" "}
        {result.capped && (
          <FormattedMessage id="naspi.result.monthlyAmount.capped" values={{ year }} />
        )}{" "}
        <FormattedMessage id="naspi.irpef.note" />
      </p>
    </div>
  );
}
