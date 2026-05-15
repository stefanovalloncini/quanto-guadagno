import type { ReactElement, ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";

type MessageValue = string | number | bigint | boolean | ReactElement | undefined;
import { MetricBlock, Money, Stack } from "@/ui/design-system/primitives";
import type { ForfettarioBreakdown } from "@/domain/calc";

const FORFETTARIO_REVENUE_LIMIT = 85_000;
const EMPLOYEE_COST_LIMIT = 20_000;

interface ForfettarioResultsProps {
  readonly result: ForfettarioBreakdown;
}

export function ForfettarioResults({ result }: ForfettarioResultsProps) {
  const intl = useIntl();
  const revenueLimit = intl.formatNumber(FORFETTARIO_REVENUE_LIMIT, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  const employeeCostLimit = intl.formatNumber(EMPLOYEE_COST_LIMIT, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const inpsRate = intl.formatNumber(result.aliquotaInps, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  const sostitutivaRate = intl.formatNumber(result.aliquotaSostitutiva, {
    style: "percent",
  });
  const phaseId =
    result.aliquotaSostitutiva === 0.05
      ? "forfettario.summary.regimeType.startup"
      : "forfettario.summary.regimeType.standard";

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
            values={{ rate: sostitutivaRate, phase: intl.formatMessage({ id: phaseId }) }}
          />
        }
      />

      <div className="qg-forfettario-breakdown">
        <Row labelId="forfettario.breakdown.revenue" amount={result.revenue} />
        <Row
          labelId="forfettario.breakdown.imponibileLordo"
          amount={result.imponibileLordo}
          extra={
            <span className="qg-breakdown-row__rate">
              <FormattedMessage id="forfettario.breakdown.coefficient" />{" "}
              {intl.formatNumber(result.coefficient, { style: "percent" })}
            </span>
          }
        />
        <Row
          labelId="forfettario.breakdown.inps"
          labelValues={{ rate: inpsRate }}
          amount={result.contributoInps}
          subtract
        />
        <Row labelId="forfettario.breakdown.imponibileNetto" amount={result.imponibileNetto} />
        <Row
          labelId="forfettario.breakdown.impostaSostitutiva"
          labelValues={{ rate: sostitutivaRate }}
          amount={result.impostaSostitutiva}
          subtract
        />
        <Row labelId="forfettario.breakdown.totalTaxes" amount={result.totaleImposte} total />
        <Row labelId="forfettario.breakdown.net" amount={result.nettoAnnuale} highlight />
      </div>
    </Stack>
  );
}

interface RowProps {
  readonly labelId: string;
  readonly labelValues?: Record<string, MessageValue>;
  readonly amount: number;
  readonly extra?: ReactNode;
  readonly subtract?: boolean;
  readonly total?: boolean;
  readonly highlight?: boolean;
}

function Row({ labelId, labelValues, amount, extra, subtract, total, highlight }: RowProps) {
  const cls = [
    "qg-breakdown-row",
    subtract && "qg-breakdown-row--subtract",
    total && "qg-breakdown-row--total",
    highlight && "qg-breakdown-row--highlight",
  ]
    .filter(Boolean)
    .join(" ");

  const displayAmount = subtract ? -Math.abs(amount) : Math.abs(amount);

  return (
    <div className={cls}>
      <span className="qg-breakdown-row__label">
        <FormattedMessage id={labelId} {...(labelValues && { values: labelValues })} />
        {extra}
      </span>
      <span className="qg-breakdown-row__amount">
        <Money amount={displayAmount} whole />
      </span>
    </div>
  );
}

interface EligibilityNoticeProps {
  readonly eligibility: ForfettarioBreakdown["eligibility"];
  readonly revenueLimit: string;
  readonly employeeCostLimit: string;
}

function EligibilityNotice({
  eligibility,
  revenueLimit,
  employeeCostLimit,
}: EligibilityNoticeProps) {
  if (eligibility.eligible && !eligibility.warning) {
    return null;
  }

  if (!eligibility.eligible) {
    return (
      <ul className="qg-notice qg-notice--blocked" aria-live="polite">
        {eligibility.reasons.map((reason) => (
          <li key={reason}>
            {reason === "revenue-exceeds-limit" ? (
              <FormattedMessage
                id="forfettario.eligibility.revenueExceeded"
                values={{ limit: revenueLimit }}
              />
            ) : (
              <FormattedMessage
                id="forfettario.eligibility.employeeCostsExceeded"
                values={{ limit: employeeCostLimit }}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }

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
