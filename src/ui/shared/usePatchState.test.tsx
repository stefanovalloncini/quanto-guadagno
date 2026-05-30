import { describe, it, expect } from "vitest";
import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePatchState } from "./usePatchState.ts";

interface Form {
  readonly count: number;
  readonly label: string;
}

type Patch = (patch: Partial<Form>) => void;

function Probe({
  initial,
  capture,
}: {
  readonly initial: Form | (() => Form);
  readonly capture?: (patch: Patch) => void;
}) {
  const [state, patch] = usePatchState<Form>(initial);
  useEffect(() => {
    capture?.(patch);
  });
  return (
    <div>
      <span data-testid="count">{state.count}</span>
      <span data-testid="label">{state.label}</span>
      <button onClick={() => patch({ count: state.count + 1 })}>inc</button>
      <button onClick={() => patch({ label: "changed" })}>relabel</button>
    </div>
  );
}

describe("usePatchState", () => {
  it("exposes the initial state", () => {
    render(<Probe initial={{ count: 1, label: "start" }} />);
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("label")).toHaveTextContent("start");
  });

  it("accepts a lazy initializer", () => {
    render(<Probe initial={() => ({ count: 7, label: "lazy" })} />);
    expect(screen.getByTestId("count")).toHaveTextContent("7");
    expect(screen.getByTestId("label")).toHaveTextContent("lazy");
  });

  it("merges a partial patch, leaving untouched keys intact", async () => {
    const user = userEvent.setup();
    render(<Probe initial={{ count: 1, label: "start" }} />);
    await user.click(screen.getByText("relabel"));
    expect(screen.getByTestId("label")).toHaveTextContent("changed");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("keeps a stable patch reference across re-renders", async () => {
    const seen: Patch[] = [];
    const user = userEvent.setup();
    render(<Probe initial={{ count: 1, label: "start" }} capture={(p) => seen.push(p)} />);
    await user.click(screen.getByText("inc"));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    expect(seen.length).toBeGreaterThanOrEqual(2);
    expect(seen.every((p) => p === seen[0])).toBe(true);
  });
});
