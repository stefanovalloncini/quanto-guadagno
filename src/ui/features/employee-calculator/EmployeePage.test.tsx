import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeePage } from "./EmployeePage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("EmployeePage", () => {
  it("renders the title with italic accent", () => {
    renderWithIntl(<EmployeePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Stipendio netto/);
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders the gross salary input labelled correctly", () => {
    renderWithIntl(<EmployeePage />);
    const input = screen.getByLabelText(/Stipendio lordo annuo/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputMode", "numeric");
  });

  it("renders an aria-live region for the monthly net amount", () => {
    renderWithIntl(<EmployeePage />);
    const live = document.querySelector("[aria-live='polite']");
    expect(live).toBeTruthy();
  });

  it("recomputes the net amount when gross changes", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const input = screen.getByLabelText(/Stipendio lordo annuo/);
    const live = document.querySelector("[aria-live='polite']") as HTMLElement;
    const before = live.textContent;

    await user.clear(input);
    await user.type(input, "60000");

    expect(live.textContent).not.toBe(before);
  });

  it("extras section is collapsed by default", () => {
    renderWithIntl(<EmployeePage />);
    const details = document.querySelector("details.qg-extras-panel");
    expect(details).toBeTruthy();
    expect(details).not.toHaveAttribute("open");
  });

  it("opening extras reveals all six accordion sections plus the municipal field", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const summary = screen.getByText(/Personalizza il calcolo/);
    await user.click(summary);

    const sections = document.querySelectorAll(".qg-extras-section");
    expect(sections).toHaveLength(6);
    expect(screen.getByLabelText(/Addizionale comunale/)).toBeInTheDocument();
  });

  it("toggling 'azienda > 15' raises the employee INPS rate to 9,49%", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const summary = screen.getByText(/Personalizza il calcolo/);
    await user.click(summary);

    const inpsTitle = Array.from(document.querySelectorAll(".qg-extras-section__title")).find(
      (el) => /Aliquote INPS/.test(el.textContent ?? ""),
    ) as HTMLElement;
    await user.click(inpsTitle);

    const largeToggle = screen.getByLabelText(/Azienda con più di 15 dipendenti/);
    await user.click(largeToggle);

    expect((largeToggle as HTMLInputElement).checked).toBe(true);
  });

  it("each accordion section can be expanded independently", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const panelSummary = screen.getByText(/Personalizza il calcolo/);
    await user.click(panelSummary);

    const titles = document.querySelectorAll(".qg-extras-section__title");
    const dependentsTitle = Array.from(titles).find((el) =>
      /Familiari a carico/.test(el.textContent ?? ""),
    ) as HTMLElement;
    await user.click(dependentsTitle);

    const dependentsDetails = dependentsTitle.closest("details.qg-extras-section");
    expect(dependentsDetails).toHaveAttribute("open");
  });

  it("clicking an open section summary collapses it again", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const panelSummary = screen.getByText(/Personalizza il calcolo/);
    await user.click(panelSummary);

    const titles = document.querySelectorAll(".qg-extras-section__title");
    const dependentsTitle = Array.from(titles).find((el) =>
      /Familiari a carico/.test(el.textContent ?? ""),
    ) as HTMLElement;
    await user.click(dependentsTitle);
    await user.click(dependentsTitle);

    const dependentsDetails = dependentsTitle.closest("details.qg-extras-section");
    expect(dependentsDetails).not.toHaveAttribute("open");
  });
});
