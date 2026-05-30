import { describe, it, expect } from "vitest";
import {
  nearestIndex,
  smoothAreaPath,
  smoothBandPath,
  smoothPath,
  type Point,
} from "./chartGeometry.ts";

describe("smoothPath", () => {
  it("returns an empty string for no points", () => {
    expect(smoothPath([])).toBe("");
  });

  it("emits a Move for a single point", () => {
    expect(smoothPath([{ x: 10, y: 20 }])).toBe("M 10 20");
  });

  it("emits a straight line for two points", () => {
    expect(
      smoothPath([
        { x: 0, y: 0 },
        { x: 10, y: 10 },
      ]),
    ).toBe("M 0 0 L 10 10");
  });

  it("emits cubic Bezier segments for three or more points", () => {
    const pts: Point[] = [
      { x: 0, y: 0 },
      { x: 10, y: 20 },
      { x: 20, y: 0 },
    ];
    const path = smoothPath(pts);
    expect(path.startsWith("M 0 0")).toBe(true);
    expect(path).toContain("C");
    // Two cubic segments (0→1 and 1→2)
    expect(path.split("C").length - 1).toBe(2);
  });

  it("starts at the first point", () => {
    const pts: Point[] = [
      { x: 7, y: 3 },
      { x: 9, y: 4 },
      { x: 11, y: 5 },
    ];
    expect(smoothPath(pts).startsWith("M 7 3")).toBe(true);
  });
});

describe("smoothAreaPath", () => {
  it("returns an empty string for empty input", () => {
    expect(smoothAreaPath([], 100)).toBe("");
  });

  it("returns an empty string for one point", () => {
    expect(smoothAreaPath([{ x: 0, y: 0 }], 100)).toBe("");
  });

  it("closes the path to the baseline at both ends", () => {
    const pts: Point[] = [
      { x: 0, y: 40 },
      { x: 50, y: 20 },
      { x: 100, y: 30 },
    ];
    const area = smoothAreaPath(pts, 100);
    expect(area.endsWith("Z")).toBe(true);
    expect(area).toContain("L 100 100");
    expect(area).toContain("L 0 100");
  });
});

describe("smoothBandPath", () => {
  it("returns an empty string when either outline is empty", () => {
    expect(smoothBandPath([], [{ x: 0, y: 0 }])).toBe("");
    expect(smoothBandPath([{ x: 0, y: 0 }], [])).toBe("");
  });

  it("joins the upper outline to the reversed lower outline and closes the band", () => {
    const band = smoothBandPath(
      [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ],
      [
        { x: 0, y: 20 },
        { x: 10, y: 20 },
      ],
    );
    expect(band.startsWith("M 0 0 L 10 0")).toBe(true);
    expect(band.endsWith("Z")).toBe(true);
    expect(band).toContain("L 0 20");
  });
});

describe("nearestIndex", () => {
  const points: Point[] = [
    { x: 0, y: 0 },
    { x: 10, y: 5 },
    { x: 25, y: 9 },
    { x: 40, y: 2 },
  ];

  it("returns -1 for an empty list", () => {
    expect(nearestIndex([], 5)).toBe(-1);
  });

  it("finds the closest point by x", () => {
    expect(nearestIndex(points, 0)).toBe(0);
    expect(nearestIndex(points, 11)).toBe(1);
    expect(nearestIndex(points, 30)).toBe(2);
    expect(nearestIndex(points, 100)).toBe(3);
  });

  it("breaks ties toward the lower index", () => {
    expect(nearestIndex(points, 5)).toBe(0);
  });
});
