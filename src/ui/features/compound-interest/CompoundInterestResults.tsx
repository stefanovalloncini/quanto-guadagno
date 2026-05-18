import { FormattedMessage } from "react-intl";
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import { ShareButton } from "@/ui/shared/ShareButton.tsx";
import type { CompoundInterestBreakdown } from "@/domain/calc";

interface CompoundInterestResultsProps {
  readonly result: CompoundInterestBreakdown;
}

export function CompoundInterestResults({ result }: CompoundInterestResultsProps) {
  return (
    <Stack gap="md">
      <MetricBlock
        label={<FormattedMessage id="compoundInterest.result.finalNominal" />}
        amount={result.finalNominal}
        whole
        announce
      />
      <div className="qg-employee__overview-actions">
        <ShareButton />
      </div>
      <MetricBlock
        label={<FormattedMessage id="compoundInterest.result.finalReal" />}
        amount={result.finalReal}
        sublabel={<FormattedMessage id="compoundInterest.result.finalReal.sub" />}
        whole
      />
      <Stack direction="row" gap="md" wrap>
        <MetricBlock
          label={<FormattedMessage id="compoundInterest.result.totalContributions" />}
          amount={result.totalContributions}
          whole
        />
        <MetricBlock
          label={<FormattedMessage id="compoundInterest.result.totalInterest" />}
          amount={result.totalInterest}
          whole
        />
      </Stack>

      <section className="qg-schedule" aria-labelledby="qg-schedule-title">
        <h2 id="qg-schedule-title" className="qg-subhead qg-subhead--md">
          <FormattedMessage id="compoundInterest.schedule.title" />
        </h2>
        <div className="qg-schedule__scroll">
          <table className="qg-schedule__table">
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage id="compoundInterest.schedule.year" />
                </th>
                <th scope="col">
                  <FormattedMessage id="compoundInterest.schedule.balance" />
                </th>
                <th scope="col">
                  <FormattedMessage id="compoundInterest.schedule.real" />
                </th>
                <th scope="col">
                  <FormattedMessage id="compoundInterest.schedule.contributions" />
                </th>
                <th scope="col">
                  <FormattedMessage id="compoundInterest.schedule.interest" />
                </th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((row) => (
                <tr key={row.year}>
                  <th scope="row">{row.year}</th>
                  <td>
                    <Money amount={row.nominalBalance} whole />
                  </td>
                  <td>
                    <Money amount={row.realBalance} whole />
                  </td>
                  <td>
                    <Money amount={row.contributedSoFar} whole />
                  </td>
                  <td>
                    <Money amount={row.interestSoFar} whole />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  );
}
