import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Ledger, LedgerCells, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import { calculateSalaryBreakdown, type ApprenticeshipBreakdown } from "@/domain/calc";

interface ApprenticeshipResultsProps {
  readonly result: ApprenticeshipBreakdown;
}

const ESTIMATE_TAX_YEAR = 2026 as const;
const ESTIMATE_REGION = "lombardia" as const;
const ESTIMATE_MUNICIPAL = 0.008;

function estimateMonthlyNet(grossAnnual: number): number {
  const breakdown = calculateSalaryBreakdown({
    grossAnnual,
    taxYear: ESTIMATE_TAX_YEAR,
    regionCode: ESTIMATE_REGION,
    municipalTaxRate: ESTIMATE_MUNICIPAL,
    contractType: "apprendistato",
    paymentFrequency: 12,
  });
  return breakdown.netMonthly;
}

const label = (id: string) => <FormattedMessage id={id} />;

export function ApprenticeshipResults({ result }: ApprenticeshipResultsProps) {
  const intl = useIntl();
  const first = result.schedule[0];
  const last = result.schedule[result.schedule.length - 1];

  return (
    <div className="qg-result">
      {first !== undefined && last !== undefined && (
        <ResultFigure
          label={label("apprenticeship.result.firstYear")}
          value={<Money amount={estimateMonthlyNet(first.grossAnnual)} whole />}
          settleKey={first.grossAnnual}
          secondary={
            <FormattedMessage
              id="apprenticeship.result.lastYear"
              values={{
                amount: <Money amount={estimateMonthlyNet(last.grossAnnual)} whole />,
                year: last.year,
              }}
            />
          }
          note={label("apprenticeship.results.footnote")}
        />
      )}

      <div className="qg-ledger-scroll">
        <Ledger
          caption={label("apprenticeship.schedule.title")}
          columns={[
            label("apprenticeship.col.year"),
            label("apprenticeship.col.percent"),
            label("apprenticeship.col.gross"),
            label("apprenticeship.col.net"),
          ]}
        >
          {result.schedule.map((row) => {
            const params = new URLSearchParams({
              lordo: String(row.grossAnnual),
              contratto: "apprendistato",
            });
            return (
              <LedgerCells
                key={row.year}
                header={
                  <Link
                    to={`/calcola-stipendio?${params}`}
                    className="qg-ledger__link"
                    aria-label={intl.formatMessage(
                      { id: "apprenticeship.row.openLink" },
                      { year: row.year },
                    )}
                  >
                    {row.year}
                  </Link>
                }
                cells={[
                  <FormattedNumber
                    key="pct"
                    value={row.percentageOfTarget}
                    style="percent"
                    minimumFractionDigits={0}
                  />,
                  <Money key="gross" amount={row.grossAnnual} whole />,
                  <Money key="net" amount={estimateMonthlyNet(row.grossAnnual)} whole />,
                ]}
              />
            );
          })}
        </Ledger>
      </div>
    </div>
  );
}
