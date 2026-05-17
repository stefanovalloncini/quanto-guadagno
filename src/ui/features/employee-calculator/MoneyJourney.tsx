import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { SalaryBreakdown } from "@/domain/calc";
import { computeMoneyJourney, type JourneyNode, type NodeRole } from "./moneyJourneyLayout.ts";

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

const CURRENCY = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface LabelPos {
  readonly nodeId: string;
  readonly x: number;
  readonly y: number;
  readonly anchor: "start" | "end";
}

const MIN_LABEL_SPACING = 32;

function initialLabelPositions(nodes: ReadonlyArray<JourneyNode>): LabelPos[] {
  return nodes.map((n) => ({
    nodeId: n.id,
    x: n.x + n.width + 10,
    y: n.y + n.height / 2,
    anchor: "start",
  }));
}

// Stagger labels within a column so two adjacent small bars don't pile their
// text on top of each other. We sort by y, then push later labels down until
// they clear the previous one by MIN_LABEL_SPACING.
function deconflict(positions: LabelPos[]): LabelPos[] {
  const sorted = [...positions].sort((a, b) => a.y - b.y);
  const out: LabelPos[] = [];
  let lastY = -Infinity;
  for (const pos of sorted) {
    const y = Math.max(pos.y, lastY + MIN_LABEL_SPACING);
    out.push({ ...pos, y });
    lastY = y;
  }
  return out;
}

function applyAntiOverlap(nodes: ReadonlyArray<JourneyNode>): Map<string, LabelPos> {
  const byColumn = new Map<number, LabelPos[]>();
  for (const pos of initialLabelPositions(nodes)) {
    const node = nodes.find((n) => n.id === pos.nodeId);
    if (!node) continue;
    const list = byColumn.get(node.column) ?? [];
    list.push(pos);
    byColumn.set(node.column, list);
  }
  const result = new Map<string, LabelPos>();
  for (const list of byColumn.values()) {
    for (const pos of deconflict(list)) result.set(pos.nodeId, pos);
  }
  return result;
}

export function MoneyJourney({ breakdown }: MoneyJourneyProps) {
  const intl = useIntl();
  const layout = useMemo(() => computeMoneyJourney(breakdown), [breakdown]);
  const labelPositions = useMemo(() => applyAntiOverlap(layout.nodes), [layout.nodes]);

  if (layout.nodes.length === 0) return null;

  const labelFor = (node: JourneyNode): string =>
    intl.formatMessage({ id: node.labelKey, defaultMessage: node.id });

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
          viewBox={`0 -8 ${layout.width} ${layout.height + 48}`}
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
          <g className="qg-journey__labels">
            {layout.nodes.map((node) => {
              const pos = labelPositions.get(node.id);
              if (!pos) return null;
              return (
                <g
                  key={node.id}
                  className={`qg-journey__label qg-journey__label--${node.role}`}
                  transform={`translate(${pos.x} ${pos.y})`}
                >
                  <text className="qg-journey__label-name" textAnchor={pos.anchor} y={-2}>
                    {labelFor(node)}
                  </text>
                  <text className="qg-journey__label-amount" textAnchor={pos.anchor} y={14}>
                    {CURRENCY.format(node.amount)}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <figcaption className="qg-visually-hidden">
          <FormattedMessage id="moneyJourney.title" />:
          <ul>
            {layout.nodes.map((node) => (
              <li key={node.id}>
                {labelFor(node)}: {CURRENCY.format(node.amount)}
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </section>
  );
}
