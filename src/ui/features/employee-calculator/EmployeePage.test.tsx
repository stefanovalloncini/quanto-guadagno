import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { EmployeePage } from "./EmployeePage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

function wrap(node: React.ReactNode) {
  return (
    <IntlProvider locale="it-IT" messages={itMessages}>
      <MemoryRouter>{node}</MemoryRouter>
    </IntlProvider>
  );
}

describe("EmployeePage", () => {
  it("renders the title with italic accent", () => {
    render(wrap(<EmployeePage />));
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Stipendio netto/);
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders the gross salary input labelled correctly", () => {
    render(wrap(<EmployeePage />));
    const input = screen.getByLabelText(/Stipendio lordo annuo/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");
  });

  it("renders an aria-live region for the monthly net amount", () => {
    render(wrap(<EmployeePage />));
    const live = document.querySelector("[aria-live='polite']");
    expect(live).toBeTruthy();
  });

  it("recomputes the net amount when gross changes", async () => {
    const user = userEvent.setup();
    render(wrap(<EmployeePage />));

    const input = screen.getByLabelText(/Stipendio lordo annuo/);

    // Record the initial monthly display text
    const live = document.querySelector("[aria-live='polite']") as HTMLElement;
    const before = live.textContent;

    // Change gross to a higher value
    await user.clear(input);
    await user.type(input, "60000");

    const after = live.textContent;
    expect(after).not.toBe(before);
  });
});
