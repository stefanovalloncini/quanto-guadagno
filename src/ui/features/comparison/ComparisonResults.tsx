import { FormattedMessage, useIntl } from "react-intl";
import { MetricBlock, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT } from "@/ui/shared/numeric.ts";
import type { SalaryComparison } from "@/domain/calc";

interface ComparisonResultsProps {
  readonly result: SalaryComparison;
}

export function ComparisonResults({ result }: ComparisonResultsProps) {
  const intl = useIntl();
  const { a, b, winner, netAnnualDelta, netMonthlyDelta } = result;

  const perMonth = (monthly: number) => (
    <FormattedMessage
      id="comparison.result.perMonth"
      values={{ amount: intl.formatNumber(monthly, EUR_AMOUNT_FORMAT) }}
    />
  );

  return (
    <Stack gap="md">
      <Stack direction="row" gap="md" wrap>
        <MetricBlock
          label={<FormattedMessage id="comparison.result.offerA" />}
          amount={a.netAnnual}
          sublabel={perMonth(a.netMonthly)}
          whole
        />
        <MetricBlock
          label={<FormattedMessage id="comparison.result.offerB" />}
          amount={b.netAnnual}
          sublabel={perMonth(b.netMonthly)}
          whole
        />
      </Stack>

      <MetricBlock
        label={<FormattedMessage id="comparison.result.winner" values={{ winner }} />}
        amount={Math.abs(netAnnualDelta)}
        sublabel={perMonth(Math.abs(netMonthlyDelta))}
        whole
        announce
      />

      <p className="qg-note">
        <FormattedMessage id="comparison.result.note" />
      </p>
    </Stack>
  );
}
