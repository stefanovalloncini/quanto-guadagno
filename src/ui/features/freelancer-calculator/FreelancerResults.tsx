import { FormattedMessage } from "react-intl";
import { Stack } from "@/ui/design-system";
import { formatCurrency, formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";
import type { ForfettarioBreakdown } from "@/domain/calc";

interface BreakdownRow {
  readonly id: string;
  readonly value: number;
  readonly emphasis?: "muted" | "total";
}

function buildRows(result: ForfettarioBreakdown): ReadonlyArray<BreakdownRow> {
  return [
    { id: "freelancer.breakdown.revenue", value: result.revenue },
    {
      id: "freelancer.breakdown.taxableGross",
      value: result.grossTaxableIncome,
      emphasis: "muted",
    },
    { id: "freelancer.breakdown.inps", value: -result.inpsContribution },
    { id: "freelancer.breakdown.taxableNet", value: result.netTaxableIncome, emphasis: "muted" },
    { id: "freelancer.breakdown.substitute", value: -result.substituteTax },
    { id: "freelancer.breakdown.netAnnual", value: result.netAnnual, emphasis: "total" },
  ];
}

export function FreelancerResults({ result }: { readonly result: ForfettarioBreakdown }) {
  const rows = buildRows(result);

  return (
    <section className="qg-results" aria-live="polite">
      <h2 className="qg-results__title">
        <FormattedMessage id="results.section.title" />
      </h2>

      <Stack gap="lg">
        <div className="qg-result-card">
          <p className="qg-result-card__primary-label">
            <FormattedMessage id="results.netAnnual" />
          </p>
          <p className="qg-result-card__primary-value">{formatCurrencyWhole(result.netAnnual)}</p>
          <dl className="qg-result-card__secondary">
            <div className="qg-result-card__metric">
              <dt>
                <FormattedMessage id="results.netMonthly" />
              </dt>
              <dd>{formatCurrency(result.netMonthly)}</dd>
            </div>
            <div className="qg-result-card__metric">
              <dt>
                <FormattedMessage id="results.effectiveRate" />
              </dt>
              <dd>{formatPercentage(result.effectiveTaxRate)}</dd>
            </div>
          </dl>
        </div>

        {result.aboveRevenueLimit ? (
          <p className="qg-warn" role="status">
            <FormattedMessage id="freelancer.warn.aboveLimit" />
          </p>
        ) : null}

        <details className="qg-disclosure">
          <summary>
            <FormattedMessage id="breakdown.title" />
          </summary>
          <table className="qg-breakdown">
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={`qg-breakdown__row qg-breakdown__row--${row.emphasis ?? "default"}`}
                >
                  <th scope="row">
                    <FormattedMessage id={row.id} />
                  </th>
                  <td>{formatCurrency(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </Stack>
    </section>
  );
}
