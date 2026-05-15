import { FormattedMessage } from "react-intl";
import { BreakdownRow, Money } from "@/ui/design-system/primitives";
import type { SalaryBreakdown } from "@/domain/calc";

interface TaxBreakdownCardProps {
  readonly breakdown: SalaryBreakdown;
  readonly paymentFrequency: 12 | 13 | 14;
}

export function TaxBreakdownCard({ breakdown, paymentFrequency }: TaxBreakdownCardProps) {
  const hasInpsExemption = breakdown.inpsExemption > 0;
  const hasMadreLavoratrice = breakdown.madreLavoratriceExemption > 0;
  const hasImpatriati = breakdown.regimeImpatriatiSavings > 0;
  const hasTrattamento = breakdown.trattamentoIntegrativo > 0;
  const hasSommaAggiuntiva = breakdown.sommaAggiuntiva > 0;
  const hasDetrazioneAggiuntiva = breakdown.detrazioneAggiuntiva > 0;
  const hasDependents = breakdown.dependentsDeduction > 0;
  const hasExpenses = breakdown.expenseDeduction > 0;
  const hasPdr = breakdown.pdrNet > 0;

  return (
    <div className="qg-breakdown-card">
      <h2 className="qg-breakdown-card__title">
        <FormattedMessage id="employee.breakdown.title" />
      </h2>

      <div className="qg-breakdown-card__section">
        <p className="qg-breakdown-card__section-label">
          <FormattedMessage id="employee.breakdown.section.contributions" />
        </p>
        <BreakdownRow labelId="employee.breakdown.gross" amount={breakdown.grossAnnual} />
        <BreakdownRow
          labelId="employee.breakdown.inps"
          amount={breakdown.inpsContribution}
          rate={breakdown.inpsRate}
          subtract
        />
        {hasInpsExemption && (
          <BreakdownRow
            labelId="employee.breakdown.inpsExemption"
            amount={breakdown.inpsExemption}
            add
          />
        )}
        {hasMadreLavoratrice && (
          <BreakdownRow
            labelId="employee.breakdown.madreLavoratrice"
            amount={breakdown.madreLavoratriceExemption}
            add
          />
        )}
        <BreakdownRow
          labelId="employee.breakdown.taxableIncome"
          amount={breakdown.taxableIncome}
          total
        />
      </div>

      <div className="qg-breakdown-card__section">
        <p className="qg-breakdown-card__section-label">
          <FormattedMessage id="employee.breakdown.section.taxes" />
        </p>
        <BreakdownRow
          labelId="employee.breakdown.irpefGross"
          amount={breakdown.irpefGross}
          subtract
        />
        <BreakdownRow
          labelId="employee.breakdown.workDeduction"
          amount={breakdown.irpefDeduction}
          add
        />
        {hasDependents && (
          <BreakdownRow
            labelId="employee.breakdown.dependents"
            amount={breakdown.dependentsDeduction}
            add
          />
        )}
        {hasExpenses && (
          <BreakdownRow
            labelId="employee.breakdown.expenses"
            amount={breakdown.expenseDeduction}
            add
          />
        )}
        {hasDetrazioneAggiuntiva && (
          <BreakdownRow
            labelId="employee.breakdown.detrazioneAggiuntiva"
            amount={breakdown.detrazioneAggiuntiva}
            add
          />
        )}
        {hasImpatriati && (
          <BreakdownRow
            labelId="employee.breakdown.impatriati"
            amount={breakdown.regimeImpatriatiSavings}
            add
          />
        )}
        <BreakdownRow
          labelId="employee.breakdown.irpefNet"
          amount={breakdown.irpefNet}
          subtract
          total
        />
        <BreakdownRow
          labelId="employee.breakdown.regional"
          amount={breakdown.regionalTax}
          rate={breakdown.regionalTaxRate}
          subtract
        />
        <BreakdownRow
          labelId="employee.breakdown.municipal"
          amount={breakdown.municipalTax}
          rate={breakdown.municipalTaxRate}
          subtract
        />
      </div>

      {(hasTrattamento || hasSommaAggiuntiva) && (
        <div className="qg-breakdown-card__section">
          <p className="qg-breakdown-card__section-label">
            <FormattedMessage id="employee.breakdown.section.credits" />
          </p>
          {hasTrattamento && (
            <BreakdownRow
              labelId="employee.breakdown.trattamento"
              amount={breakdown.trattamentoIntegrativo}
              add
            />
          )}
          {hasSommaAggiuntiva && (
            <BreakdownRow
              labelId="employee.breakdown.sommaAggiuntiva"
              amount={breakdown.sommaAggiuntiva}
              add
            />
          )}
        </div>
      )}

      {hasPdr && (
        <div className="qg-breakdown-card__section">
          <p className="qg-breakdown-card__section-label">
            <FormattedMessage id="employee.breakdown.section.pdr" />
          </p>
          <BreakdownRow labelId="employee.breakdown.pdrGross" amount={breakdown.pdrGross} add />
          <BreakdownRow labelId="employee.breakdown.pdrInps" amount={breakdown.pdrInps} subtract />
          <BreakdownRow labelId="employee.breakdown.pdrTax" amount={breakdown.pdrTax} subtract />
          <BreakdownRow labelId="employee.breakdown.pdrNet" amount={breakdown.pdrNet} add total />
        </div>
      )}

      <div className="qg-breakdown-card__total">
        <BreakdownRow
          labelId="employee.breakdown.totalTaxes"
          amount={breakdown.totalTaxes}
          subtract
          total
        />
        <BreakdownRow
          labelId="employee.breakdown.net"
          amount={breakdown.netAnnual}
          total
          highlight
        />
        <p className="qg-breakdown-card__monthly">
          <FormattedMessage id="employee.breakdown.netMonthly" />{" "}
          <Money amount={breakdown.netAnnual / paymentFrequency} whole />
        </p>
      </div>
    </div>
  );
}
