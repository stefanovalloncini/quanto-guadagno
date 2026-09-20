import { FormattedMessage, useIntl } from "react-intl";
import type { SalaryBreakdown } from "@/domain/calc";
import type { SupportedYear } from "@/domain/data";
import { formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";

interface EsempioGuidatoProps {
  readonly breakdown: SalaryBreakdown;
  readonly taxYear: SupportedYear;
}

// Step 6 may only name credits the breakdown actually pays out; most cases have one or none.
const CREDIT_LABELS = [
  { id: "esempio.credit.trattamento", pick: (b: SalaryBreakdown) => b.trattamentoIntegrativo },
  { id: "esempio.credit.sommaAggiuntiva", pick: (b: SalaryBreakdown) => b.sommaAggiuntiva },
  { id: "esempio.credit.pdr", pick: (b: SalaryBreakdown) => b.pdrNet },
] as const;

export function EsempioGuidato({ breakdown, taxYear }: EsempioGuidatoProps) {
  const intl = useIntl();
  const bracketsKey = taxYear === 2026 ? "esempio.brackets.2026" : "esempio.brackets.standard";
  const brackets = intl.formatMessage({ id: bracketsKey });

  const grossAmount = formatCurrencyWhole(breakdown.grossAnnual);
  const inpsAmount = formatCurrencyWhole(breakdown.inpsContribution);
  const taxableAmount = formatCurrencyWhole(breakdown.taxableIncome);
  const irpefGrossAmount = formatCurrencyWhole(breakdown.irpefGross);
  const irpefNetAmount = formatCurrencyWhole(breakdown.irpefNet);
  const regionalAmount = formatCurrencyWhole(breakdown.regionalTax);
  const municipalAmount = formatCurrencyWhole(breakdown.municipalTax);
  const netAmount = formatCurrencyWhole(breakdown.netAnnual);
  const monthlyAmount = formatCurrencyWhole(breakdown.netMonthly);

  const inpsRate = formatPercentage(breakdown.inpsRate);
  const regionalRate = formatPercentage(breakdown.regionalTaxRate);
  const municipalRate = formatPercentage(breakdown.municipalTaxRate);

  const credits = CREDIT_LABELS.filter(({ pick }) => pick(breakdown) > 0).map(({ id }) =>
    intl.formatMessage({ id }),
  );
  const creditsBodyId = credits.length > 0 ? "esempio.step6.body" : "esempio.step6.bodyNone";
  const creditsValues =
    credits.length > 0
      ? { credits: intl.formatList(credits), net: netAmount, monthly: monthlyAmount }
      : { net: netAmount, monthly: monthlyAmount };

  return (
    <details className="qg-esempio">
      <summary className="qg-esempio__summary">
        <FormattedMessage id="esempio.title" />
      </summary>
      <div className="qg-esempio__body">
        <p className="qg-esempio__intro">
          <FormattedMessage id="esempio.intro" />
        </p>
        <ol className="qg-esempio__steps">
          <Step
            titleId="esempio.step1.title"
            bodyId="esempio.step1.body"
            values={{ amount: grossAmount }}
          />
          <Step
            titleId="esempio.step2.title"
            bodyId="esempio.step2.body"
            values={{ rate: inpsRate, amount: inpsAmount, taxable: taxableAmount }}
          />
          <Step
            titleId="esempio.step3.title"
            bodyId="esempio.step3.body"
            values={{ year: taxYear, brackets, amount: irpefGrossAmount }}
          />
          <Step
            titleId="esempio.step4.title"
            bodyId="esempio.step4.body"
            values={{ amount: irpefNetAmount }}
          />
          <Step
            titleId="esempio.step5.title"
            bodyId="esempio.step5.body"
            values={{
              regionalRate,
              regional: regionalAmount,
              municipalRate,
              municipal: municipalAmount,
            }}
          />
          <Step titleId="esempio.step6.title" bodyId={creditsBodyId} values={creditsValues} />
        </ol>
      </div>
    </details>
  );
}

interface StepProps {
  readonly titleId:
    | "esempio.step1.title"
    | "esempio.step2.title"
    | "esempio.step3.title"
    | "esempio.step4.title"
    | "esempio.step5.title"
    | "esempio.step6.title";
  readonly bodyId:
    | "esempio.step1.body"
    | "esempio.step2.body"
    | "esempio.step3.body"
    | "esempio.step4.body"
    | "esempio.step5.body"
    | "esempio.step6.body"
    | "esempio.step6.bodyNone";
  readonly values: Record<string, string | number>;
}

function Step({ titleId, bodyId, values }: StepProps) {
  return (
    <li className="qg-esempio__step">
      <h3 className="qg-esempio__step-title">
        <FormattedMessage id={titleId} />
      </h3>
      <p className="qg-esempio__step-body">
        <FormattedMessage id={bodyId} values={values} />
      </p>
    </li>
  );
}
