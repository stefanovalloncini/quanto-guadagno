import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { SalaryBreakdown } from "@/domain/calc";
import { Money } from "@/ui/design-system/primitives";
import { computeMoneyJourney, type NodeRole } from "./moneyJourneyLayout.ts";

interface MoneyJourneyProps {
  readonly breakdown: SalaryBreakdown;
}

const FLOW_CLASS_BY_ROLE: Record<NodeRole, string> = {
  source: "qg-journey__flow",
  passthrough: "qg-journey__flow qg-journey__flow--kept",
  kept: "qg-journey__flow qg-journey__flow--kept",
  "employee-cost": "qg-journey__flow qg-journey__flow--cost",
  "employer-cost": "qg-journey__flow qg-journey__flow--employer",
};

const NODE_CLASS_BY_ROLE: Record<NodeRole, string> = {
  source: "qg-journey__node qg-journey__node--source",
  passthrough: "qg-journey__node qg-journey__node--kept",
  kept: "qg-journey__node qg-journey__node--kept",
  "employee-cost": "qg-journey__node qg-journey__node--cost",
  "employer-cost": "qg-journey__node qg-journey__node--employer",
};

export function MoneyJourney({ breakdown }: MoneyJourneyProps) {
  const intl = useIntl();
  const layout = useMemo(() => computeMoneyJourney(breakdown), [breakdown]);

  if (layout.nodes.length === 0) return null;

  const labelFor = (id: string, key: string): string =>
    intl.formatMessage({ id: key, defaultMessage: id });

  // Lookup the target node for each flow so we can colour the flow by destination role.
  const nodeById = new Map(layout.nodes.map((n) => [n.id, n]));

  return (
    <section className="qg-journey" aria-labelledby="qg-journey-title">
      <header className="qg-journey__header">
        <h2 id="qg-journey-title" className="qg-subhead qg-subhead--lg">
          <FormattedMessage id="moneyJourney.title" />
        </h2>
        <p className="qg-journey__lede">
          <FormattedMessage id="moneyJourney.lede" />
        </p>
      </header>

      <figure className="qg-journey__figure">
        <svg
          className="qg-journey__svg"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={intl.formatMessage({ id: "moneyJourney.title" })}
        >
          <title>
            <FormattedMessage id="moneyJourney.title" />
          </title>
          <g className="qg-journey__flows">
            {layout.flows.map((flow) => {
              const target = nodeById.get(flow.targetId);
              const role = target?.role ?? "source";
              return (
                <path
                  key={`${flow.sourceId}-${flow.targetId}`}
                  className={FLOW_CLASS_BY_ROLE[role]}
                  d={flow.path}
                />
              );
            })}
          </g>
          <g className="qg-journey__nodes">
            {layout.nodes.map((node) => (
              <rect
                key={node.id}
                className={NODE_CLASS_BY_ROLE[node.role]}
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx={2}
              />
            ))}
          </g>
        </svg>

        <figcaption className="qg-journey__legend">
          <ul className="qg-journey__legend-list">
            {layout.nodes.map((node) => (
              <li
                key={node.id}
                className={`qg-journey__legend-item qg-journey__legend-item--${node.role}`}
              >
                <span className="qg-journey__legend-label">{labelFor(node.id, node.labelKey)}</span>
                <Money amount={node.amount} whole className="qg-journey__legend-amount" />
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </section>
  );
}
