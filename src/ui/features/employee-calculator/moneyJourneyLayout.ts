import type { SalaryBreakdown } from "@/domain/calc";

export type NodeId =
  | "costo"
  | "ral"
  | "inpsAzienda"
  | "tfr"
  | "oneri"
  | "netto"
  | "inpsDip"
  | "tasse";

export type NodeRole = "source" | "passthrough" | "kept" | "employee-cost" | "employer-cost";

export interface JourneyNode {
  readonly id: NodeId;
  readonly labelKey: string;
  readonly amount: number;
  readonly role: NodeRole;
  readonly column: 0 | 1 | 2;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface JourneyFlow {
  readonly sourceId: NodeId;
  readonly targetId: NodeId;
  readonly path: string;
}

export interface JourneyLayout {
  readonly nodes: ReadonlyArray<JourneyNode>;
  readonly flows: ReadonlyArray<JourneyFlow>;
  readonly width: number;
  readonly height: number;
}

interface LayoutOptions {
  readonly width: number;
  readonly height: number;
  readonly nodeWidth: number;
  readonly gap: number;
}

const DEFAULTS: LayoutOptions = {
  width: 800,
  height: 400,
  nodeWidth: 18,
  gap: 4,
};

function flowPath(
  x1: number,
  y1Top: number,
  y1Bot: number,
  x2: number,
  y2Top: number,
  y2Bot: number,
): string {
  const cx = (x1 + x2) / 2;
  return [
    `M ${x1} ${y1Top}`,
    `C ${cx} ${y1Top}, ${cx} ${y2Top}, ${x2} ${y2Top}`,
    `L ${x2} ${y2Bot}`,
    `C ${cx} ${y2Bot}, ${cx} ${y1Bot}, ${x1} ${y1Bot}`,
    "Z",
  ].join(" ");
}

export function computeMoneyJourney(
  breakdown: SalaryBreakdown,
  opts: Partial<LayoutOptions> = {},
): JourneyLayout {
  const { width, height, nodeWidth, gap } = { ...DEFAULTS, ...opts };
  const costo = breakdown.totalEmployerCost;
  const ral = breakdown.grossAnnual;
  const netto = breakdown.netAnnual;
  const inpsDip = breakdown.inpsContribution;
  // tasse balances stage 2: ral = netto + inpsDip + tasse. Any cash credits are
  // already baked into netAnnual, so this stays exact.
  const tasse = Math.max(0, ral - netto - inpsDip);
  const inpsAzienda = breakdown.employerInps;
  const tfr = breakdown.tfrAnnual;
  const oneri = breakdown.totalOtherEmployerCosts;

  if (costo <= 0) {
    return { nodes: [], flows: [], width, height };
  }

  const stage1Total = ral + inpsAzienda + tfr + oneri;
  const stage1Available = height - 3 * gap;
  const stage1Scale = stage1Available / stage1Total;

  const x0 = 0;
  const x1 = (width - nodeWidth) / 2;
  const x2 = width - nodeWidth;

  // Stage 0: Costo, full column height
  const costoNode: JourneyNode = {
    id: "costo",
    labelKey: "moneyJourney.node.costo",
    amount: costo,
    role: "source",
    column: 0,
    x: x0,
    y: 0,
    width: nodeWidth,
    height: stage1Available,
  };

  // Stage 1: RAL, INPS azienda, TFR, Oneri stacked top-to-bottom
  const ralHeight = ral * stage1Scale;
  const inpsAzHeight = inpsAzienda * stage1Scale;
  const tfrHeight = tfr * stage1Scale;
  const oneriHeight = oneri * stage1Scale;

  let yCursor = 0;
  const ralNode: JourneyNode = {
    id: "ral",
    labelKey: "moneyJourney.node.ral",
    amount: ral,
    role: "passthrough",
    column: 1,
    x: x1,
    y: yCursor,
    width: nodeWidth,
    height: ralHeight,
  };
  yCursor += ralHeight + gap;
  const inpsAzNode: JourneyNode = {
    id: "inpsAzienda",
    labelKey: "moneyJourney.node.inpsAzienda",
    amount: inpsAzienda,
    role: "employer-cost",
    column: 1,
    x: x1,
    y: yCursor,
    width: nodeWidth,
    height: inpsAzHeight,
  };
  yCursor += inpsAzHeight + gap;
  const tfrNode: JourneyNode = {
    id: "tfr",
    labelKey: "moneyJourney.node.tfr",
    amount: tfr,
    role: "employer-cost",
    column: 1,
    x: x1,
    y: yCursor,
    width: nodeWidth,
    height: tfrHeight,
  };
  yCursor += tfrHeight + gap;
  const oneriNode: JourneyNode = {
    id: "oneri",
    labelKey: "moneyJourney.node.oneri",
    amount: oneri,
    role: "employer-cost",
    column: 1,
    x: x1,
    y: yCursor,
    width: nodeWidth,
    height: oneriHeight,
  };

  // Stage 2: derived from RAL, vertically aligned within RAL's height range.
  const stage2Scale = ralHeight / ral;
  const nettoHeight = netto * stage2Scale;
  const inpsDipHeight = inpsDip * stage2Scale;
  const tasseHeight = tasse * stage2Scale;

  yCursor = 0;
  const nettoNode: JourneyNode = {
    id: "netto",
    labelKey: "moneyJourney.node.netto",
    amount: netto,
    role: "kept",
    column: 2,
    x: x2,
    y: yCursor,
    width: nodeWidth,
    height: nettoHeight,
  };
  yCursor += nettoHeight;
  const inpsDipNode: JourneyNode = {
    id: "inpsDip",
    labelKey: "moneyJourney.node.inpsDip",
    amount: inpsDip,
    role: "employee-cost",
    column: 2,
    x: x2,
    y: yCursor,
    width: nodeWidth,
    height: inpsDipHeight,
  };
  yCursor += inpsDipHeight;
  const tasseNode: JourneyNode = {
    id: "tasse",
    labelKey: "moneyJourney.node.tasse",
    amount: tasse,
    role: "employee-cost",
    column: 2,
    x: x2,
    y: yCursor,
    width: nodeWidth,
    height: tasseHeight,
  };

  const nodes: ReadonlyArray<JourneyNode> = [
    costoNode,
    ralNode,
    inpsAzNode,
    tfrNode,
    oneriNode,
    nettoNode,
    inpsDipNode,
    tasseNode,
  ];

  // Costo → 4 stage-1 children, stacked along Costo's right edge in source order.
  let costoYCursor = 0;
  const stage1Children: ReadonlyArray<JourneyNode> = [ralNode, inpsAzNode, tfrNode, oneriNode];
  const stage1Flows: ReadonlyArray<JourneyFlow> = stage1Children.map((child) => {
    const sourceTop = costoYCursor;
    const sourceBot = costoYCursor + child.height;
    costoYCursor = sourceBot;
    return {
      sourceId: "costo",
      targetId: child.id,
      path: flowPath(
        costoNode.x + nodeWidth,
        sourceTop,
        sourceBot,
        child.x,
        child.y,
        child.y + child.height,
      ),
    };
  });

  // RAL → 3 stage-2 children, stacked along RAL's right edge in source order.
  let ralYCursor = ralNode.y;
  const stage2Children: ReadonlyArray<JourneyNode> = [nettoNode, inpsDipNode, tasseNode];
  const stage2Flows: ReadonlyArray<JourneyFlow> = stage2Children.map((child) => {
    const sourceTop = ralYCursor;
    const sourceBot = ralYCursor + child.height;
    ralYCursor = sourceBot;
    return {
      sourceId: "ral",
      targetId: child.id,
      path: flowPath(
        ralNode.x + nodeWidth,
        sourceTop,
        sourceBot,
        child.x,
        child.y,
        child.y + child.height,
      ),
    };
  });

  return {
    nodes,
    flows: [...stage1Flows, ...stage2Flows],
    width,
    height,
  };
}
