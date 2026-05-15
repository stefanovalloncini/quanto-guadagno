import { FormattedMessage } from "react-intl";
import { BreakdownRow, MetricBlock, Stack } from "@/ui/design-system/primitives";
import type { ForfettarioBreakdown, ForfettarioIneligibilityReason } from "@/domain/calc";
import { SHARED_FORFETTARIO } from "@/domain/data";
import { formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";

interface ForfettarioResultsProps {
  readonly result: ForfettarioBreakdown;
}

export function ForfettarioResults({ result }: ForfettarioResultsProps) {
  const revenueLimit = formatCurrencyWhole(SHARED_FORFETTARIO.maxRevenue);
  const employeeCostLimit = formatCurrencyWhole(SHARED_FORFETTARIO.maxEmployeeCosts);

  const inpsRate = formatPercentage(result.aliquotaInps);
  const sostitutivaRate = formatPercentage(result.aliquotaSostitutiva);
  const phaseId = `forfettario.summary.regimeType.${result.phase}`;

  return (
    <Stack gap="md">
      <EligibilityNotice
        eligibility={result.eligibility}
        revenueLimit={revenueLimit}
        employeeCostLimit={employeeCostLimit}
      />

      <MetricBlock
        label={<FormattedMessage id="forfettario.summary.monthlyNet" />}
        amount={result.nettoMensile}
        sublabel={
          <FormattedMessage
            id="forfettario.summary.regimeType"
            values={{ rate: sostitutivaRate, phase: <FormattedMessage id={phaseId} /> }}
          />
        }
      />

      <BreakdownRow labelId="forfettario.breakdown.revenue" amount={result.revenue} />
      <BreakdownRow
        labelId="forfettario.breakdown.imponibileLordo"
        amount={result.imponibileLordo}
        extra={
          <span className="qg-breakdown-row__rate">
            <FormattedMessage id="forfettario.breakdown.coefficient" />{" "}
            {formatPercentage(result.coefficient)}
          </span>
        }
      />
      <BreakdownRow
        labelId="forfettario.breakdown.inps"
        labelValues={{ rate: inpsRate }}
        amount={result.contributoInps}
        subtract
      />
      <BreakdownRow
        labelId="forfettario.breakdown.imponibileNetto"
        amount={result.imponibileNetto}
      />
      <BreakdownRow
        labelId="forfettario.breakdown.impostaSostitutiva"
        labelValues={{ rate: sostitutivaRate }}
        amount={result.impostaSostitutiva}
        subtract
      />
      <BreakdownRow
        labelId="forfettario.breakdown.totalTaxes"
        amount={result.totaleImposte}
        total
      />
      <BreakdownRow labelId="forfettario.breakdown.net" amount={result.nettoAnnuale} highlight />
    </Stack>
  );
}

interface EligibilityNoticeProps {
  readonly eligibility: ForfettarioBreakdown["eligibility"];
  readonly revenueLimit: string;
  readonly employeeCostLimit: string;
}

const REASON_MESSAGE_ID: Record<ForfettarioIneligibilityReason, string> = {
  "revenue-exceeds-limit": "forfettario.eligibility.revenueExceeded",
  "employee-costs-exceed-limit": "forfettario.eligibility.employeeCostsExceeded",
};

function EligibilityNotice({
  eligibility,
  revenueLimit,
  employeeCostLimit,
}: EligibilityNoticeProps) {
  if (!eligibility.eligible) {
    return (
      <ul className="qg-notice qg-notice--blocked" aria-live="polite">
        {eligibility.reasons.map((reason) => (
          <li key={reason}>
            <FormattedMessage
              id={REASON_MESSAGE_ID[reason]}
              values={{
                limit: reason === "revenue-exceeds-limit" ? revenueLimit : employeeCostLimit,
              }}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (eligibility.warning) {
    return (
      <p className="qg-notice qg-notice--warning" aria-live="polite">
        <FormattedMessage
          id="forfettario.eligibility.warning"
          values={{
            percent: Math.round(eligibility.revenueLimitPercentage),
            limit: revenueLimit,
          }}
        />
      </p>
    );
  }

  return null;
}
