import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { getTaxConfig, SUPPORTED_YEARS, type SupportedYear } from "@/domain/data";
import { formatCurrency, formatCurrencyWhole } from "@/domain/format.ts";

const yearOptions = SUPPORTED_YEARS.map((y) => ({ value: y, label: String(y) }));

interface PayslipRow {
  readonly id: string;
  readonly amount: number;
  readonly kind: "addition" | "deduction" | "subtotal";
}

export function PayslipPage() {
  const [grossAnnual, setGrossAnnual] = useState(30_000);
  const [taxYear, setTaxYear] = useState<SupportedYear>(2026);
  const [regionalRatePercent, setRegionalRatePercent] = useState(1.73);
  const [municipalRatePercent, setMunicipalRatePercent] = useState(0.8);

  const result = calculateSalaryBreakdown(
    {
      grossAnnual,
      regionalRate: regionalRatePercent / 100,
      municipalRate: municipalRatePercent / 100,
    },
    getTaxConfig(taxYear),
  );

  const grossMonthly = result.grossAnnual / 12;
  const inpsMonthly = result.inps / 12;
  const taxableMonthly = result.taxableIncome / 12;
  const irpefMonthly = result.irpefNet / 12;
  const regionalMonthly = result.regionalAddizionale / 12;
  const municipalMonthly = result.municipalAddizionale / 12;
  const integrativoMonthly = result.trattamentoIntegrativo / 12;
  const wedgeMonthly = result.sommaAggiuntiva / 12;

  const rows: ReadonlyArray<PayslipRow> = [
    { id: "payslip.row.gross", amount: grossMonthly, kind: "addition" },
    { id: "payslip.row.inps", amount: inpsMonthly, kind: "deduction" },
    { id: "payslip.row.taxable", amount: taxableMonthly, kind: "subtotal" },
    { id: "payslip.row.irpef", amount: irpefMonthly, kind: "deduction" },
    { id: "payslip.row.regional", amount: regionalMonthly, kind: "deduction" },
    { id: "payslip.row.municipal", amount: municipalMonthly, kind: "deduction" },
    ...(integrativoMonthly > 0
      ? [
          {
            id: "payslip.row.integrativo",
            amount: integrativoMonthly,
            kind: "addition" as const,
          },
        ]
      : []),
    ...(wedgeMonthly > 0
      ? [
          {
            id: "payslip.row.wedge",
            amount: wedgeMonthly,
            kind: "addition" as const,
          },
        ]
      : []),
  ];

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header qg-print-hide">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="payslip.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="payslip.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="payslip.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout qg-print-hide">
          <section className="qg-form" aria-labelledby="qg-payslip-form">
            <h2 id="qg-payslip-form" className="qg-form__title">
              <FormattedMessage id="payslip.form.title" />
            </h2>
            <Stack gap="md">
              <Field
                type="currency"
                label={<FormattedMessage id="form.gross.label" />}
                value={grossAnnual}
                onChange={setGrossAnnual}
              />
              <Select<SupportedYear>
                label={<FormattedMessage id="form.year.label" />}
                value={taxYear}
                options={yearOptions}
                onChange={setTaxYear}
              />
              <Field
                type="percentage"
                label={<FormattedMessage id="form.regional.label" />}
                value={regionalRatePercent}
                onChange={setRegionalRatePercent}
                max={10}
              />
              <Field
                type="percentage"
                label={<FormattedMessage id="form.municipal.label" />}
                value={municipalRatePercent}
                onChange={setMunicipalRatePercent}
                max={1}
              />
              <button
                type="button"
                className="qg-btn qg-btn--primary"
                onClick={() => window.print()}
              >
                <FormattedMessage id="payslip.action.print" />
              </button>
            </Stack>
          </section>
          <p className="qg-scope-note">
            <FormattedMessage id="payslip.note" />
          </p>
        </div>

        <article className="qg-payslip" aria-labelledby="qg-payslip-doc-title">
          <header className="qg-payslip__header">
            <h2 id="qg-payslip-doc-title" className="qg-payslip__title">
              <FormattedMessage id="payslip.doc.title" />
            </h2>
            <p className="qg-payslip__meta">
              <FormattedMessage id="payslip.doc.year" values={{ year: taxYear }} />
            </p>
          </header>

          <table className="qg-payslip__table">
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={`qg-payslip__row qg-payslip__row--${row.kind}`}>
                  <th scope="row">
                    <FormattedMessage id={row.id} />
                  </th>
                  <td>
                    {row.kind === "deduction"
                      ? `−${formatCurrency(row.amount)}`
                      : formatCurrency(row.amount)}
                  </td>
                </tr>
              ))}
              <tr className="qg-payslip__row qg-payslip__row--total">
                <th scope="row">
                  <FormattedMessage id="payslip.row.net" />
                </th>
                <td>{formatCurrencyWhole(result.netMonthly)}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </Stack>
    </main>
  );
}
