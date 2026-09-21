import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Ledger, LedgerCells, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import { ShareButton } from "@/ui/shared/ShareButton.tsx";
import type { CompoundInterestBreakdown } from "@/domain/calc";

interface CompoundInterestResultsProps {
  readonly result: CompoundInterestBreakdown;
}

const VISIBLE_YEARS = 10;

const label = (id: string) => <FormattedMessage id={id} />;

export function CompoundInterestResults({ result }: CompoundInterestResultsProps) {
  const [showAll, setShowAll] = useState(false);
  const years = showAll ? result.schedule : result.schedule.slice(0, VISIBLE_YEARS);
  const hasMore = result.schedule.length > years.length;

  return (
    <div className="qg-result">
      <ResultFigure
        label={label("compoundInterest.result.finalNominal")}
        value={<Money amount={result.finalNominal} whole />}
        settleKey={result.finalNominal}
        secondary={
          <FormattedMessage
            id="compoundInterest.result.finalReal"
            values={{ amount: <Money amount={result.finalReal} whole /> }}
          />
        }
        note={
          <FormattedMessage
            id="compoundInterest.result.split"
            values={{
              contributions: <Money amount={result.totalContributions} whole />,
              interest: <Money amount={result.totalInterest} whole />,
            }}
          />
        }
      />

      <div className="qg-ledger-scroll">
        <Ledger
          dense
          caption={label("compoundInterest.schedule.title")}
          columns={[
            label("compoundInterest.schedule.year"),
            label("compoundInterest.schedule.balance"),
            label("compoundInterest.schedule.real"),
            label("compoundInterest.schedule.contributions"),
            label("compoundInterest.schedule.interest"),
          ]}
        >
          {years.map((row) => (
            <LedgerCells
              key={row.year}
              header={row.year}
              cells={[
                <Money key="nominal" amount={row.nominalBalance} whole />,
                <Money key="real" amount={row.realBalance} whole />,
                <Money key="contributed" amount={row.contributedSoFar} whole />,
                <Money key="interest" amount={row.interestSoFar} whole />,
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

      <p className="qg-result__actions">
        <ShareButton />
      </p>
    </div>
  );
}
