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
    const live = document.querySelector("[aria-live='polite']") as HTMLElement;
    const before = live.textContent;

    await user.clear(input);
    await user.type(input, "60000");

    expect(live.textContent).not.toBe(before);
  });

  it("extras section is collapsed by default", () => {
    render(wrap(<EmployeePage />));
    const details = document.querySelector("details.qg-extras-panel");
    expect(details).toBeTruthy();
    expect(details).not.toHaveAttribute("open");
  });

  it("opening extras section reveals the tab list", async () => {
    const user = userEvent.setup();
    render(wrap(<EmployeePage />));

    const summary = screen.getByText(/Impostazioni opzionali/);
    await user.click(summary);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab").length).toBe(5);
  });

  it("clicking a tab makes its panel visible", async () => {
    const user = userEvent.setup();
    render(wrap(<EmployeePage />));

    const summary = screen.getByText(/Impostazioni opzionali/);
    await user.click(summary);

    const dependentsTab = screen.getByRole("tab", { name: /Familiari a carico/ });
    await user.click(dependentsTab);

    expect(dependentsTab).toHaveAttribute("aria-selected", "true");
    const panel = document.getElementById("tabpanel-dependents");
    expect(panel).not.toHaveAttribute("hidden");
  });

  it("clicking the active tab again collapses the panel", async () => {
    const user = userEvent.setup();
    render(wrap(<EmployeePage />));

    const summary = screen.getByText(/Impostazioni opzionali/);
    await user.click(summary);

    const dependentsTab = screen.getByRole("tab", { name: /Familiari a carico/ });
    await user.click(dependentsTab);
    await user.click(dependentsTab);

    expect(dependentsTab).toHaveAttribute("aria-selected", "false");
    const panel = document.getElementById("tabpanel-dependents");
    expect(panel).toHaveAttribute("hidden");
  });
});
