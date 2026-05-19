import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { REGIONS } from "@/domain/data";
import { BreakdownRow, Money } from "@/ui/design-system/primitives";
import { formStateFromUrl } from "./formStateFromUrl";
import { PrintInputsTable } from "./PrintInputsTable";

export function PrintPayslipPage() {
  const [params] = useSearchParams();
  const state = useMemo(() => formStateFromUrl(params), [params]);
  const breakdown = useMemo(() => calculateSalaryBreakdown(state), [state]);
  const regionName = REGIONS[state.regionCode].name;

  return (
    <article className="qg-print-payslip" lang="it">
      <header className="qg-print-payslip__header">
        <h1 className="qg-print-payslip__title">
          <FormattedMessage id="print.title" />
        </h1>
        <p className="qg-print-payslip__subtitle">
          <FormattedMessage id="print.subtitle" values={{ year: state.taxYear }} />
        </p>
      </header>

      <section className="qg-print-payslip__summary" aria-labelledby="qg-print-summary-heading">
        <h2 id="qg-print-summary-heading" className="qg-print-payslip__section-title">
          <FormattedMessage id="print.section.summary" />
        </h2>
        <dl className="qg-print-payslip__summary-grid">
          <div className="qg-print-payslip__metric">
            <dt>
              <FormattedMessage id="print.summary.netAnnual" />
            </dt>
            <dd>
              <Money amount={breakdown.netAnnual} whole />
            </dd>
          </div>
          <div className="qg-print-payslip__metric">
            <dt>
              <FormattedMessage id="print.summary.netMonthly" />
            </dt>
            <dd>
              <Money amount={breakdown.netMonthly} whole />
            </dd>
          </div>
        </dl>
      </section>

      <section className="qg-print-payslip__inputs" aria-labelledby="qg-print-inputs-heading">
        <h2 id="qg-print-inputs-heading" className="qg-print-payslip__section-title">
          <FormattedMessage id="print.section.inputs" />
        </h2>
        <PrintInputsTable state={state} regionName={regionName} />
      </section>

      <section className="qg-print-payslip__breakdown" aria-labelledby="qg-print-breakdown-heading">
        <h2 id="qg-print-breakdown-heading" className="qg-print-payslip__section-title">
          <FormattedMessage id="print.section.breakdown" />
        </h2>
        <div className="qg-print-payslip__breakdown-flow">
          <BreakdownRow labelId="print.breakdown.gross" amount={breakdown.grossAnnual} />
          <BreakdownRow
            labelId="print.breakdown.inps"
            amount={breakdown.inpsContribution}
            rate={breakdown.inpsRate}
            subtract
          />
          <BreakdownRow
            labelId="print.breakdown.taxableIncome"
            amount={breakdown.taxableIncome}
            total
          />
          <BreakdownRow
            labelId="print.breakdown.irpefGross"
            amount={breakdown.irpefGross}
            subtract
          />
          {breakdown.totalDeductions > 0 && (
            <BreakdownRow
              labelId="print.breakdown.totalDeductions"
              amount={breakdown.totalDeductions}
              add
            />
          )}
          <BreakdownRow
            labelId="print.breakdown.irpefNet"
            amount={breakdown.irpefNet}
            total
            subtract
          />
          <BreakdownRow
            labelId="print.breakdown.regional"
            amount={breakdown.regionalTax}
            rate={breakdown.regionalTaxRate}
            subtract
          />
          <BreakdownRow
            labelId="print.breakdown.municipal"
            amount={breakdown.municipalTax}
            rate={breakdown.municipalTaxRate}
            subtract
          />
          {breakdown.trattamentoIntegrativo > 0 && (
            <BreakdownRow
              labelId="print.breakdown.trattamento"
              amount={breakdown.trattamentoIntegrativo}
              add
            />
          )}
          {breakdown.sommaAggiuntiva > 0 && (
            <BreakdownRow
              labelId="print.breakdown.sommaAggiuntiva"
              amount={breakdown.sommaAggiuntiva}
              add
            />
          )}
          {breakdown.pdrNet > 0 && (
            <BreakdownRow labelId="print.breakdown.pdrNet" amount={breakdown.pdrNet} add />
          )}
          <BreakdownRow
            labelId="print.breakdown.netAnnual"
            amount={breakdown.netAnnual}
            highlight
            total
          />
        </div>
      </section>

      <footer className="qg-print-payslip__footer">
        <p>
          <FormattedMessage id="print.footer.note" />
        </p>
        <p className="qg-print-payslip__source">
          <FormattedMessage id="print.footer.sourceLink" />
        </p>
      </footer>
    </article>
  );
}
