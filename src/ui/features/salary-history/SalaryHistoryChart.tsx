import { useCallback, useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { formatWholeEuro } from "@/ui/shared/numeric.ts";
import { CHART, PLOT_W, PLOT_H, BASELINE, computeGeometry } from "./chartScales.ts";
import { smoothAreaPath, smoothBandPath, smoothPath, nearestIndex } from "./chartGeometry.ts";
import { SalaryHistoryChartPopover } from "./SalaryHistoryChartPopover.tsx";
import type { AdjustedEntry } from "./useSalaryHistory.ts";
import type { ProjectionBundle } from "./useSalaryProjection.ts";

interface SalaryHistoryChartProps {
  readonly rows: ReadonlyArray<AdjustedEntry>;
  readonly projection: ProjectionBundle;
  readonly targetYear: number;
}

export function SalaryHistoryChart({ rows, projection, targetYear }: SalaryHistoryChartProps) {
  const intl = useIntl();
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const geometry = useMemo(
    () => computeGeometry(rows, projection.expected, projection.high, projection.low),
    [rows, projection],
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<SVGRectElement>) => {
      if (geometry === null) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width === 0) return;
      const svgX = ((e.clientX - rect.left) / rect.width) * CHART.W;
      const i = nearestIndex(
        geometry.timeline.map((p) => ({ x: p.x, y: p.y })),
        svgX,
      );
      const p = geometry.timeline[i];
      setHoverYear(p ? p.year : null);
    },
    [geometry],
  );

  const handlePointerLeave = useCallback(() => setHoverYear(null), []);

  if (geometry === null) {
    return (
      <p className="qg-history-chart__empty">
        <FormattedMessage id="history.chart.empty" />
      </p>
    );
  }

  const { scales, timeline, nominalPoints, netPoints, projectionPoints, bandUpper, bandLower } =
    geometry;

  // Stitch the last historical net point into the projection so the dashed line
  // visually continues from the solid line.
  const lastNet = netPoints[netPoints.length - 1];
  const projectionWithAnchor = lastNet ? [lastNet, ...projectionPoints] : projectionPoints;

  const grossPath = smoothPath(nominalPoints.map((p) => ({ x: p.x, y: p.y })));
  const netPath = smoothPath(netPoints.map((p) => ({ x: p.x, y: p.y })));
  const netAreaPath = smoothAreaPath(
    netPoints.map((p) => ({ x: p.x, y: p.y })),
    BASELINE,
  );
  const projectionPath = smoothPath(projectionWithAnchor.map((p) => ({ x: p.x, y: p.y })));
  const bandUpperAnchored = lastNet ? [{ x: lastNet.x, y: lastNet.y }, ...bandUpper] : bandUpper;
  const bandLowerAnchored = lastNet ? [{ x: lastNet.x, y: lastNet.y }, ...bandLower] : bandLower;
  const bandPath = smoothBandPath(bandUpperAnchored, bandLowerAnchored);

  const hoverPoint =
    hoverYear !== null ? (timeline.find((p) => p.year === hoverYear) ?? null) : null;
  const previousPoint = hoverPoint
    ? (timeline.filter((p) => p.year < hoverPoint.year).sort((a, b) => b.year - a.year)[0] ?? null)
    : null;

  return (
    <figure className="qg-history-chart">
      <div className="qg-history-chart__stage">
        <svg
          className="qg-history-chart__svg"
          viewBox={`0 0 ${CHART.W} ${CHART.H}`}
          role="img"
          aria-label={intl.formatMessage({ id: "history.chart.aria" }, { year: targetYear })}
        >
          <defs>
            <linearGradient id="qgChartNetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="qg-history-chart__grid" aria-hidden="true">
            {scales.ticks.map((v) => {
              const y = scales.yForValue(v);
              return (
                <g key={v}>
                  <line x1={CHART.PAD_LEFT} x2={CHART.W - CHART.PAD_RIGHT} y1={y} y2={y} />
                  <text x={CHART.PAD_LEFT - 10} y={y} textAnchor="end" dominantBaseline="middle">
                    {formatWholeEuro(v)}
                  </text>
                </g>
              );
            })}
          </g>

          <g className="qg-history-chart__axis" aria-hidden="true">
            {scales.years.map((y) => (
              <text
                key={y}
                x={scales.xForYear(y)}
                y={CHART.H - CHART.PAD_BOTTOM + 22}
                textAnchor="middle"
              >
                {y}
              </text>
            ))}
          </g>

          {bandPath ? <path className="qg-history-chart__band" d={bandPath} /> : null}

          {netAreaPath ? (
            <path
              className="qg-history-chart__area"
              d={netAreaPath}
              fill="url(#qgChartNetGradient)"
            />
          ) : null}

          {grossPath ? (
            <path
              className="qg-history-chart__line qg-history-chart__line--gross"
              d={grossPath}
              pathLength={1}
              fill="none"
            />
          ) : null}

          {netPath ? (
            <path
              className="qg-history-chart__line qg-history-chart__line--net"
              d={netPath}
              pathLength={1}
              fill="none"
            />
          ) : null}

          {projectionPath ? (
            <path
              className="qg-history-chart__line qg-history-chart__line--projection"
              d={projectionPath}
              pathLength={1}
              fill="none"
            />
          ) : null}

          <g className="qg-history-chart__dots" aria-hidden="true">
            {timeline.map((p) => (
              <circle
                key={`${p.year}-${p.isProjected ? "p" : "h"}`}
                className={[
                  "qg-history-chart__dot",
                  p.isProjected
                    ? "qg-history-chart__dot--projected"
                    : p.netAnnual !== null
                      ? "qg-history-chart__dot--net"
                      : "qg-history-chart__dot--gross",
                  hoverYear === p.year ? "qg-history-chart__dot--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                cx={p.x}
                cy={p.y}
                r={hoverYear === p.year ? 5 : 3.25}
              />
            ))}
          </g>

          <rect
            className="qg-history-chart__brush"
            x={CHART.PAD_LEFT}
            y={CHART.PAD_TOP}
            width={PLOT_W}
            height={PLOT_H}
            fill="transparent"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          />
        </svg>

        <div className="qg-history-chart__hit-layer" aria-hidden="false">
          {timeline.map((p) => {
            const label = intl.formatMessage(
              { id: "history.chart.hit.aria" },
              {
                year: p.year,
                gross: formatWholeEuro(p.grossAnnual),
                net: p.netAnnual !== null ? formatWholeEuro(p.netAnnual) : "n/d",
                projected: p.isProjected ? 1 : 0,
              },
            );
            return (
              <button
                key={`hit-${p.year}-${p.isProjected ? "p" : "h"}`}
                type="button"
                className="qg-history-chart__hit"
                style={{
                  left: `${(p.x / CHART.W) * 100}%`,
                  top: `${(p.y / CHART.H) * 100}%`,
                }}
                aria-label={label}
                onPointerEnter={() => setHoverYear(p.year)}
                onPointerLeave={() => setHoverYear((c) => (c === p.year ? null : c))}
                onFocus={() => setHoverYear(p.year)}
                onBlur={() => setHoverYear((c) => (c === p.year ? null : c))}
                onClick={() => setHoverYear(p.year)}
              />
            );
          })}
        </div>

        {hoverPoint ? (
          <SalaryHistoryChartPopover
            point={hoverPoint}
            previous={previousPoint}
            leftPct={(hoverPoint.x / CHART.W) * 100}
            topPct={(hoverPoint.y / CHART.H) * 100}
          />
        ) : null}
      </div>

      <figcaption className="qg-history-chart__legend">
        <span className="qg-history-chart__swatch qg-history-chart__swatch--net" />
        <span>
          <FormattedMessage id="history.chart.legend.net" />
        </span>
        <span className="qg-history-chart__swatch qg-history-chart__swatch--gross" />
        <span>
          <FormattedMessage id="history.chart.legend.gross" />
        </span>
        {projectionPoints.length > 0 ? (
          <>
            <span className="qg-history-chart__swatch qg-history-chart__swatch--projection" />
            <span>
              <FormattedMessage id="history.chart.legend.projection" />
            </span>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
