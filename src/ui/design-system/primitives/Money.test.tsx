import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Money } from "./Money.tsx";

describe("Money", () => {
  it("renders an Italian-formatted euro amount with the qg-money class", () => {
    render(<Money amount={1847.32} />);
    const el = screen.getByText(/€/);
    expect(el).toHaveTextContent("1.847,32");
    expect(el.className).toContain("qg-money");
  });

  it("rounds to whole euros when whole=true", () => {
    render(<Money amount={1847.32} whole />);
    const el = screen.getByText(/€/);
    expect(el.textContent).not.toMatch(/,/);
    expect(el).toHaveTextContent("1.847");
  });

  it("formats larger amounts with the Italian thousand-separator (dot)", () => {
    render(<Money amount={28000} whole />);
    expect(screen.getByText(/€/)).toHaveTextContent("28.000");
  });

  it("accepts an additional className that appears alongside qg-money", () => {
    render(<Money amount={10} className="custom" />);
    const el = screen.getByText(/€/);
    expect(el.className).toContain("qg-money");
    expect(el.className).toContain("custom");
  });

  it("handles negative amounts", () => {
    render(<Money amount={-500.5} />);
    expect(screen.getByText(/-?500/)).toHaveTextContent(/-/);
  });
});
