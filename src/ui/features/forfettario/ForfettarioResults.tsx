import { FormattedMessage } from "react-intl";
import { Ledger, LedgerRow, LedgerTotal, Money } from "@/ui/design-system/primitives";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
import type { ForfettarioBreakdown, ForfettarioIneligibilityReason, Gestion } from "@/domain/calc";
import { SHARED_FORFETTARIO } from "@/domain/data";
import { formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";

const GESTION_LABEL_ID: Record<Gestion, string> = {
  "gestione-separata": "forfettario.breakdown.inps.gestione-separata",
  artigiani: "forfettario.breakdown.inps.artigiani",
  commercianti: "forfettario.breakdown.inps.commercianti",
  "cassa-professionale": "forfettario.breakdown.inps.cassa-professionale",
};

const REASON_MESSAGE_ID: Record<ForfettarioIneligibilityReason, string> = {
  "revenue-exceeds-limit": "forfettario.eligibility.revenueExceeded",
  "employee-costs-exceed-limit": "forfettario.eligibility.employeeCostsExceeded",
  "concurrent-employee-ral-too-high": "forfettario.eligibility.concurrentEmployeeRalTooHigh",
};

interface ForfettarioResultsProps {
  readonly result: ForfettarioBreakdown;
}

const label = (id: string) => <FormattedMessage id={id} />;

export function ForfettarioResults({ result }: ForfettarioResultsProps) {
  const revenueLimit = formatCurrencyWhole(SHARED_FORFETTARIO.maxRevenue);
  const employeeCostLimit = formatCurrencyWhole(SHARED_FORFETTARIO.maxEmployeeCosts);
  const sostitutivaRate = formatPercentage(result.aliquotaSostitutiva);

  return (
    <div className="qg-result">
      <EligibilityNotice
        eligibility={result.eligibility}
        revenueLimit={revenueLimit}
        employeeCostLimit={employeeCostLimit}
      />

      <ResultFigure
        label={label("forfettario.summary.monthlyNet")}
        value={<Money amount={result.nettoMensile} />}
        settleKey={result.nettoMensile}
        secondary={
          <FormattedMessage
            id="forfettario.summary.annualLine"
            values={{
              amount: <Money amount={result.nettoAnnuale} whole />,
              revenue: <Money amount={result.revenue} whole />,
            }}
          />
        }
        note={
          <FormattedMessage
            id="forfettario.summary.rates"
            values={{
              tax: sostitutivaRate,
              phase: label(`forfettario.summary.regimeType.${result.phase}`),
              inps: formatPercentage(result.aliquotaInps),
            }}
          />
        }
      />

      <Ledger>
        <LedgerRow label={label("forfettario.breakdown.revenue")} amount={result.revenue} />
        <LedgerRow
          label={label("forfettario.breakdown.imponibileLordo")}
          amount={result.imponibileLordo}
          rate={result.coefficient}
        />
        <LedgerRow
          label={label(GESTION_LABEL_ID[result.gestion])}
          amount={result.contributoInps}
          rate={result.aliquotaInps}
          subtract
        />
        <LedgerTotal
          label={label("forfettario.breakdown.imponibileNetto")}
          amount={result.imponibileNetto}
        />
        <LedgerRow
          label={label("forfettario.breakdown.impostaSostitutiva")}
          amount={result.impostaSostitutiva}
          rate={result.aliquotaSostitutiva}
          subtract
        />
        <LedgerTotal
          label={label("forfettario.breakdown.totalTaxes")}
          amount={result.totaleImposte}
          subtract
        />
        <LedgerTotal label={label("forfettario.breakdown.net")} amount={result.nettoAnnuale} />
      </Ledger>

      {result.discountApplied === 0.35 && (
        <p className="qg-figure__note">
          <FormattedMessage id="forfettario.breakdown.discount35" />
        </p>
      )}
      {result.discountApplied === 0.5 && (
        <p className="qg-figure__note">
          <FormattedMessage id="forfettario.breakdown.discount50" />
        </p>
      )}
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
  if (!eligibility.eligible) {
    return (
      <p className="qg-result__alert" role="alert">
        <span className="qg-result__alert-term">
          <FormattedMessage id="forfettario.eligibility.term" />
        </span>{" "}
        {eligibility.reasons.map((reason, index) => (
          <span key={reason}>
            {index > 0 && " "}
            <FormattedMessage
              id={REASON_MESSAGE_ID[reason]}
              values={{
                limit: reason === "revenue-exceeds-limit" ? revenueLimit : employeeCostLimit,
              }}
            />
          </span>
        ))}
      </p>
    );
  }

  if (eligibility.warning) {
    return (
      <p className="qg-result__alert" role="alert">
        <span className="qg-result__alert-term">
          <FormattedMessage id="forfettario.eligibility.warning.term" />
        </span>{" "}
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
