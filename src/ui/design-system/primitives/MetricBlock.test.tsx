import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricBlock } from "./MetricBlock.tsx";

describe("MetricBlock", () => {
  it("renders label and a formatted money amount", () => {
    render(<MetricBlock label="Netto mensile" amount={1847.32} />);
    expect(screen.getByText("Netto mensile")).toBeInTheDocument();
    expect(screen.getByText(/€/)).toHaveTextContent("1.847,32");
  });

  it("renders the optional sublabel", () => {
    render(
      <MetricBlock label="Netto annuo" amount={25800} sublabel="su 14 mensilità" />,
    );
    expect(screen.getByText("su 14 mensilità")).toBeInTheDocument();
  });

  it("accepts ReactNode labels (not just strings)", () => {
    render(
      <MetricBlock
        label={<span data-testid="custom-label">Custom</span>}
        amount={100}
      />,
    );
    expect(screen.getByTestId("custom-label")).toHaveTextContent("Custom");
  });

  it("sets aria-live=polite when announce=true", () => {
    render(<MetricBlock label="Netto" amount={100} announce />);
    const root = screen.getByText("Netto").closest(".qg-metric");
    expect(root).toHaveAttribute("aria-live", "polite");
  });

  it("omits aria-live when announce is false / default", () => {
    render(<MetricBlock label="Netto" amount={100} />);
    const root = screen.getByText("Netto").closest(".qg-metric");
    expect(root).not.toHaveAttribute("aria-live");
  });

  it("passes whole prop through to Money", () => {
    render(<MetricBlock label="L" amount={1847.32} whole />);
    const money = screen.getByText(/€/);
    expect(money.textContent).not.toMatch(/,/);
  });
});
