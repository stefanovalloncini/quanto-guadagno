import { FormattedMessage } from "react-intl";
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import type { NaspiBreakdown, NaspiIneligibilityReason } from "@/domain/calc";

interface NaspiResultsProps {
  readonly result: NaspiBreakdown;
  readonly year: number;
}

const REASON_KEYS: Record<NaspiIneligibilityReason, string> = {
  "insufficient-weeks": "naspi.ineligible.insufficient-weeks",
  "voluntary-resignation-lockout": "naspi.ineligible.voluntary-resignation-lockout",
};

export function NaspiResults({ result, year }: NaspiResultsProps) {
  if (!result.eligible) {
    return (
      <Stack gap="md">
        <div className="qg-alert" role="alert">
          <h2 className="qg-subhead qg-subhead--md">
            <FormattedMessage id="naspi.ineligible.title" />
          </h2>
          <ul className="qg-alert__list">
            {result.reasons.map((reason) => (
              <li key={reason}>
                <FormattedMessage id={REASON_KEYS[reason]} />
              </li>
            ))}
          </ul>
        </div>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <MetricBlock
        label={<FormattedMessage id="naspi.result.monthlyAmountNet" />}
        amount={result.monthlyAmountNet}
        sublabel={
          <FormattedMessage
            id="naspi.result.monthlyAmountGross.sub"
            values={{ gross: result.monthlyAmount }}
          />
        }
        whole
        announce
      />
      <Stack direction="row" gap="md" wrap>
        <div className="qg-metric">
          <div className="qg-metric__label">
            <FormattedMessage id="naspi.result.durationMonths" />
          </div>
          <div className="qg-metric__amount">
            <FormattedMessage
              id="naspi.result.durationMonths.value"
              values={{ months: result.durationMonths }}
            />
          </div>
        </div>
        <MetricBlock
          label={<FormattedMessage id="naspi.result.totalNet" />}
          amount={result.totalNet}
          sublabel={
            <FormattedMessage
              id="naspi.result.totalGross.sub"
              values={{ gross: result.totalGross }}
            />
          }
          whole
        />
      </Stack>
      <MetricBlock
        label={<FormattedMessage id="naspi.result.referenceMonthly" />}
        amount={result.referenceMonthlyPay}
        whole
      />

      {result.capped && (
        <p className="qg-note">
          <FormattedMessage id="naspi.result.monthlyAmount.capped" values={{ year }} />
        </p>
      )}
      <p className="qg-note">
        <FormattedMessage id="naspi.decalage.note" values={{ month: result.decalageStartMonth }} />
      </p>
      <p className="qg-note">
        <FormattedMessage id="naspi.irpef.note" />
      </p>

      <section className="qg-schedule" aria-labelledby="qg-naspi-schedule-title">
        <h2 id="qg-naspi-schedule-title" className="qg-subhead qg-subhead--md">
          <FormattedMessage id="naspi.schedule.title" />
        </h2>
        <div className="qg-schedule__scroll">
          <table className="qg-schedule__table">
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage id="naspi.schedule.month" />
                </th>
                <th scope="col">
                  <FormattedMessage id="naspi.schedule.amount" />
                </th>
                <th scope="col">
                  <FormattedMessage id="naspi.schedule.amountNet" />
                </th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((row) => (
                <tr key={row.month}>
                  <th scope="row">{row.month}</th>
                  <td>
                    <Money amount={row.amount} whole />
                  </td>
                  <td>
                    <Money amount={row.amountNet} whole />
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
