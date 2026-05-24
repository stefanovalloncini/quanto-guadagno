import { FormattedMessage, useIntl } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import { REGIONS } from "@/domain/data";
import type { ChartPoint } from "./chartScales.ts";

interface SalaryHistoryChartPopoverProps {
  readonly point: ChartPoint;
  readonly previous: ChartPoint | null;
  readonly leftPct: number;
  readonly topPct: number;
}

function deltaPct(current: number, previous: number): number {
  if (previous <= 0) return 0;
  return (current - previous) / previous;
}

export function SalaryHistoryChartPopover({
  point,
  previous,
  leftPct,
  topPct,
}: SalaryHistoryChartPopoverProps) {
  const intl = useIntl();
  const settings = point.settings;
  const regionName = settings ? REGIONS[settings.regionCode].name : null;
  const contractName = settings
    ? intl.formatMessage({ id: `employee.form.contractType.${settings.contractType}` })
    : null;
  const grossDelta = previous ? deltaPct(point.grossAnnual, previous.grossAnnual) : 0;
  const showDelta = previous !== null && Math.abs(grossDelta) > 0.0005;

  return (
    <div
      className="qg-chart-popover"
      role="tooltip"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
      }}
    >
      <div className="qg-chart-popover__head">
        <span className="qg-chart-popover__year">{point.year}</span>
        {point.isProjected ? (
          <span className="qg-chart-popover__tag qg-chart-popover__tag--projected">
            <FormattedMessage id="history.chart.popover.projectedTag" />
          </span>
        ) : null}
        {point.isMigrated ? (
          <span className="qg-chart-popover__tag qg-chart-popover__tag--migrated">
            <FormattedMessage id="history.table.migrated" />
          </span>
        ) : null}
      </div>

      <dl className="qg-chart-popover__rows">
        <div>
          <dt>
            <FormattedMessage id="history.chart.popover.gross" />
          </dt>
          <dd>
            <Money amount={point.grossAnnual} whole />
          </dd>
        </div>
        <div>
          <dt>
            <FormattedMessage id="history.chart.popover.net" />
          </dt>
          <dd>
            {point.netAnnual !== null ? (
              <Money amount={point.netAnnual} whole />
            ) : (
              <span className="qg-chart-popover__na">
                <FormattedMessage id="history.table.net.na" />
              </span>
            )}
          </dd>
        </div>
        {point.net !== null ? (
          <div>
            <dt>
              <FormattedMessage id="history.chart.popover.netMonthly" />
            </dt>
            <dd>
              <Money amount={Math.round(point.net.netMonthly)} whole />
            </dd>
          </div>
        ) : null}
      </dl>

      {showDelta ? (
        <p className="qg-chart-popover__delta">
          <FormattedMessage
            id="history.chart.popover.delta"
            values={{
              year: previous?.year ?? 0,
              pct: intl.formatNumber(grossDelta, {
                style: "percent",
                signDisplay: "always",
                maximumFractionDigits: 1,
              }),
            }}
          />
        </p>
      ) : null}

      {regionName !== null || contractName !== null ? (
        <p className="qg-chart-popover__meta">
          {[regionName, contractName].filter(Boolean).join(" · ")}
        </p>
      ) : null}

      {point.note !== undefined && point.note.length > 0 ? (
        <p className="qg-chart-popover__note">{point.note}</p>
      ) : null}
    </div>
  );
}
