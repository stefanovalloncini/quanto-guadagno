export interface Point {
  readonly x: number;
  readonly y: number;
}

// Catmull-Rom to Bezier conversion at tension 0.5. For each adjacent pair
// P1→P2 with neighbors P0 and P3, the cubic uses control points
// P1 + (P2 - P0) / 6 and P2 - (P3 - P1) / 6. Endpoints reuse the neighbor.
export function smoothPath(points: ReadonlyArray<Point>): string {
  if (points.length === 0) return "";
  const first = points[0];
  if (!first) return "";
  if (points.length === 1) return `M ${first.x} ${first.y}`;
  if (points.length === 2) {
    const b = points[1];
    if (!b) return "";
    return `M ${first.x} ${first.y} L ${b.x} ${b.y}`;
  }
  const parts: string[] = [`M ${first.x} ${first.y}`];
  const last = points.length - 1;
  for (let i = 0; i < last; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(last, i + 2)];
    if (!p0 || !p1 || !p2 || !p3) continue;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    parts.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return parts.join(" ");
}

export function smoothAreaPath(points: ReadonlyArray<Point>, baseline: number): string {
  if (points.length < 2) return "";
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return "";
  const linePath = smoothPath(points);
  return `${linePath} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
}

// Builds a closed band path between the upper outline and the lower outline.
// Upper goes left → right, lower comes back right → left.
export function smoothBandPath(upper: ReadonlyArray<Point>, lower: ReadonlyArray<Point>): string {
  if (upper.length === 0 || lower.length === 0) return "";
  const upperPath = smoothPath(upper);
  const lowerReversed = [...lower].reverse();
  const lowerStart = lowerReversed[0];
  if (!lowerStart) return "";
  const tail = smoothPath(lowerReversed).replace(/^M /, "L ");
  return `${upperPath} L ${lowerStart.x} ${lowerStart.y} ${tail} Z`;
}

export function nearestIndex(points: ReadonlyArray<Point>, x: number): number {
  if (points.length === 0) return -1;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    if (!p) continue;
    const dist = Math.abs(p.x - x);
    if (dist < bestDistance) {
      bestDistance = dist;
      best = i;
    }
  }
  return best;
}
