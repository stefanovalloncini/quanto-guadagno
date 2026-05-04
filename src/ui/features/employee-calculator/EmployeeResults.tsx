import { FormattedMessage } from "react-intl";
import { Stack } from "@/ui/design-system";
import { formatCurrency, formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";
import type { SalaryBreakdown } from "@/domain/calc";

interface BreakdownRow {
  readonly id: string;
  readonly value: number;
  readonly emphasis?: "muted" | "total";
}

function buildRows(result: SalaryBreakdown): ReadonlyArray<BreakdownRow> {
  const rows: BreakdownRow[] = [
    { id: "breakdown.gross", value: result.grossAnnual },
    { id: "breakdown.inps", value: -result.inps },
    { id: "breakdown.taxable", value: result.taxableIncome, emphasis: "muted" },
    { id: "breakdown.irpefNet", value: -result.irpefNet },
    { id: "breakdown.regional", value: -result.regionalAddizionale },
    { id: "breakdown.municipal", value: -result.municipalAddizionale },
  ];
  if (result.trattamentoIntegrativo > 0) {
    rows.push({ id: "breakdown.trattamentoIntegrativo", value: result.trattamentoIntegrativo });
  }
  if (result.sommaAggiuntiva > 0) {
    rows.push({ id: "breakdown.sommaAggiuntiva", value: result.sommaAggiuntiva });
  }
  rows.push({ id: "breakdown.netAnnual", value: result.netAnnual, emphasis: "total" });
  return rows;
}

export function EmployeeResults({ result }: { readonly result: SalaryBreakdown }) {
  const rows = buildRows(result);

  return (
    <section className="qg-results" aria-live="polite">
      <h2 className="qg-results__title">
        <FormattedMessage id="results.section.title" />
      </h2>

      <Stack gap="lg">
        <dl className="qg-result-card">
          <div className="qg-result-card__primary">
            <dt>
              <FormattedMessage id="results.netAnnual" />
            </dt>
            <dd className="qg-result-card__primary-value">
              {formatCurrencyWhole(result.netAnnual)}
            </dd>
          </div>
          <div className="qg-result-card__secondary">
            <div>
              <dt>
                <FormattedMessage id="results.netMonthly" />
              </dt>
              <dd>{formatCurrency(result.netMonthly)}</dd>
            </div>
            <div>
              <dt>
                <FormattedMessage id="results.effectiveRate" />
              </dt>
              <dd>{formatPercentage(result.effectiveTaxRate)}</dd>
            </div>
          </div>
        </dl>

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
