import { FormattedMessage } from "react-intl";
import type { SalaryBreakdown } from "@/domain/calc";
import { Ledger, LedgerGroup, LedgerRow, LedgerTotal } from "@/ui/design-system/primitives";

interface ResultsBreakdownProps {
  readonly breakdown: SalaryBreakdown;
}

const label = (id: string) => <FormattedMessage id={id} />;

export function ResultsBreakdown({ breakdown }: ResultsBreakdownProps) {
  const hasCredits = breakdown.trattamentoIntegrativo > 0 || breakdown.sommaAggiuntiva > 0;
  const hasPdr = breakdown.pdrNet > 0;

  return (
    <div className="qg-results-breakdown">
      <Ledger caption={label("employee.results.detail")}>
        <LedgerRow label={label("employee.breakdown.gross")} amount={breakdown.grossAnnual} />

        <LedgerGroup label={label("employee.breakdown.section.contributions")} />
        <LedgerRow
          label={label("employee.breakdown.inps")}
          amount={breakdown.inpsContribution}
          rate={breakdown.inpsRate}
          subtract
        />
        {breakdown.inpsExemption > 0 && (
          <LedgerRow
            label={label("employee.breakdown.inpsExemption")}
            amount={breakdown.inpsExemption}
          />
        )}
        {breakdown.madreLavoratriceExemption > 0 && (
          <LedgerRow
            label={label("employee.breakdown.madreLavoratrice")}
            amount={breakdown.madreLavoratriceExemption}
          />
        )}
        {breakdown.pensionFundDeduction > 0 && (
          <LedgerRow
            label={label("employee.breakdown.pensionFund")}
            amount={breakdown.pensionFundDeduction}
            subtract
          />
        )}
        <LedgerTotal
          label={label("employee.breakdown.taxableIncome")}
          amount={breakdown.taxableIncome}
        />

        <LedgerGroup label={label("employee.breakdown.section.taxes")} />
        <LedgerRow
          label={label("employee.breakdown.irpefGross")}
          amount={breakdown.irpefGross}
          subtract
        />
        <LedgerRow
          label={label("employee.breakdown.workDeduction")}
          amount={breakdown.irpefDeduction}
        />
        {breakdown.dependentsDeduction > 0 && (
          <LedgerRow
            label={label("employee.breakdown.dependents")}
            amount={breakdown.dependentsDeduction}
          />
        )}
        {breakdown.expenseDeduction > 0 && (
          <LedgerRow
            label={label("employee.breakdown.expenses")}
            amount={breakdown.expenseDeduction}
          />
        )}
        {breakdown.detrazioneAggiuntiva > 0 && (
          <LedgerRow
            label={label("employee.breakdown.detrazioneAggiuntiva")}
            amount={breakdown.detrazioneAggiuntiva}
          />
        )}
        {breakdown.regimeImpatriatiSavings > 0 && (
          <LedgerRow
            label={label("employee.breakdown.impatriati")}
            amount={breakdown.regimeImpatriatiSavings}
          />
        )}
        <LedgerTotal
          label={label("employee.breakdown.irpefNet")}
          amount={breakdown.irpefNet}
          subtract
        />
        <LedgerRow
          label={label("employee.breakdown.regional")}
          amount={breakdown.regionalTax}
          rate={breakdown.regionalTaxRate}
          subtract
        />
        <LedgerRow
          label={label("employee.breakdown.municipal")}
          amount={breakdown.municipalTax}
          rate={breakdown.municipalTaxRate}
          subtract
        />

        {hasCredits && <LedgerGroup label={label("employee.breakdown.section.credits")} />}
        {breakdown.trattamentoIntegrativo > 0 && (
          <LedgerRow
            label={label("employee.breakdown.trattamento")}
            amount={breakdown.trattamentoIntegrativo}
          />
        )}
        {breakdown.sommaAggiuntiva > 0 && (
          <LedgerRow
            label={label("employee.breakdown.sommaAggiuntiva")}
            amount={breakdown.sommaAggiuntiva}
          />
        )}

        {hasPdr && <LedgerGroup label={label("employee.breakdown.section.pdr")} />}
        {hasPdr && (
          <LedgerRow label={label("employee.breakdown.pdrGross")} amount={breakdown.pdrGross} />
        )}
        {hasPdr && (
          <LedgerRow
            label={label("employee.breakdown.pdrInps")}
            amount={breakdown.pdrInps}
            subtract
          />
        )}
        {hasPdr && (
          <LedgerRow
            label={label("employee.breakdown.pdrTax")}
            amount={breakdown.pdrTax}
            subtract
          />
        )}
        {hasPdr && (
          <LedgerTotal label={label("employee.breakdown.pdrNet")} amount={breakdown.pdrNet} />
        )}

        <LedgerTotal
          label={label("employee.breakdown.totalTaxes")}
          amount={breakdown.totalTaxes}
          subtract
        />
        <LedgerTotal label={label("employee.breakdown.netAnnual")} amount={breakdown.netAnnual} />

        <LedgerGroup label={label("employee.breakdown.section.tfr")} />
        <LedgerRow
          label={label("employee.breakdown.tfr")}
          amount={breakdown.tfrAnnual}
          rate={breakdown.tfrRate}
        />
      </Ledger>
    </div>
  );
}
