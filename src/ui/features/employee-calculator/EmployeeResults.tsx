import { FormattedMessage } from "react-intl";
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import type { SalaryBreakdown } from "@/domain/calc";

interface EmployeeResultsProps {
  readonly result: SalaryBreakdown;
}

export function EmployeeResults({ result }: EmployeeResultsProps) {
  const effectiveRate = result.effectiveTaxRate * 100;

  return (
    <Stack gap="md">
      <MetricBlock
        label={<FormattedMessage id="employee.results.monthly" />}
        amount={result.netMonthly}
        announce
      />
      <MetricBlock
        label={<FormattedMessage id="employee.results.annual" />}
        amount={result.netAnnual}
        sublabel={<FormattedMessage id="employee.results.annual.sub" />}
        whole
      />

      <details className="qg-breakdown">
        <summary>
          <FormattedMessage id="employee.results.detail" />
        </summary>
        <table className="qg-breakdown__table">
          <tbody>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.gross" />
              </th>
              <td>
                <Money amount={result.grossAnnual} whole />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.inps" />
              </th>
              <td>
                <Money amount={-result.inps} whole />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.irpefNet" />
              </th>
              <td>
                <Money amount={-result.irpefNet} whole />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.regional" />
              </th>
              <td>
                <Money amount={-result.regionalAddizionale} whole />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.municipal" />
              </th>
              <td>
                <Money amount={-result.municipalAddizionale} whole />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.deductions" />
              </th>
              <td>
                <Money amount={result.workDeduction + result.detrazioneAggiuntiva} whole />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <FormattedMessage id="employee.breakdown.trattamento" />
              </th>
              <td>
                <Money amount={result.trattamentoIntegrativo + result.sommaAggiuntiva} whole />
              </td>
            </tr>
            <tr className="qg-breakdown__total">
              <th scope="row">
                <FormattedMessage id="employee.breakdown.net" />
              </th>
              <td>
                <Money amount={result.netAnnual} whole />
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <p className="qg-effective">
        <FormattedMessage id="employee.results.effective" />{" "}
        <span className="qg-effective__rate">{effectiveRate.toFixed(1)}%</span>
      </p>
    </Stack>
  );
}
