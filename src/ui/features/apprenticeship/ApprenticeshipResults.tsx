import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Money } from "@/ui/design-system/primitives";
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

export function ApprenticeshipResults({ result }: ApprenticeshipResultsProps) {
  const intl = useIntl();

  return (
    <div className="qg-progression">
      <div className="qg-progression__head" aria-hidden="true">
        <span>
          <FormattedMessage id="apprenticeship.col.year" />
        </span>
        <span>
          <FormattedMessage id="apprenticeship.col.percent" />
        </span>
        <span>
          <FormattedMessage id="apprenticeship.col.gross" />
        </span>
        <span>
          <FormattedMessage id="apprenticeship.col.net" />
        </span>
      </div>

      <ul className="qg-progression__list">
        {result.schedule.map((row) => {
          const netMonthly = estimateMonthlyNet(row.grossAnnual);
          const params = new URLSearchParams({
            lordo: String(row.grossAnnual),
            contratto: "apprendistato",
          });
          const ariaLabel = intl.formatMessage(
            { id: "apprenticeship.row.openLink" },
            { year: row.year },
          );
          return (
            <li key={row.year}>
              <Link
                to={`/calcola-stipendio?${params}`}
                className="qg-progression__row"
                aria-label={ariaLabel}
              >
                <span className="qg-progression__year">{row.year}</span>
                <span className="qg-progression__pct">
                  <FormattedNumber
                    value={row.percentageOfTarget}
                    style="percent"
                    minimumFractionDigits={0}
                  />
                </span>
                <span className="qg-progression__gross">
                  <Money amount={row.grossAnnual} whole />
                </span>
                <span className="qg-progression__net">
                  <Money amount={netMonthly} whole />
                  <span className="qg-progression__net-unit">
                    <FormattedMessage id="apprenticeship.row.netUnit" />
                  </span>
                </span>
                <span className="qg-progression__cta" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="qg-progression__footnote">
        <FormattedMessage id="apprenticeship.results.footnote" />
      </p>
    </div>
  );
}
