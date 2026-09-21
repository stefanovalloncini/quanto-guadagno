import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeePage } from "./EmployeePage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";
import { formatCurrencyWhole } from "@/domain/format.ts";

function hintOf(control: HTMLElement): string {
  const id = control.getAttribute("aria-describedby") ?? "";
  return document.getElementById(id)?.textContent ?? "";
}

describe("EmployeePage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<EmployeePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Stipendio netto/);
    expect(h1.querySelector("em")).toBeNull();
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

  it("shows the effective and marginal rates on one quiet line", () => {
    renderWithIntl(<EmployeePage />);
    const rates = document.querySelector(".qg-cedolino__rates") as HTMLElement;
    expect(rates.textContent).toMatch(/Aliquota effettiva/);
    expect(rates.textContent).toMatch(/marginale/);
  });

  it("sets the monthly net as the one large figure", () => {
    renderWithIntl(<EmployeePage />);
    const figure = document.querySelector(".qg-cifra") as HTMLElement;
    expect(figure).toBeTruthy();
    expect(figure.textContent).toMatch(/€/);
  });

  it("puts the estimate disclaimer under the ledger", () => {
    renderWithIntl(<EmployeePage />);
    expect(screen.getByText(/la busta paga resta il riferimento/)).toBeInTheDocument();
  });

  it("shows TFR maturando in the employee's results breakdown", () => {
    renderWithIntl(<EmployeePage />);
    expect(screen.getByText(/TFR maturando/)).toBeInTheDocument();
  });

  it("compares the same gross across the supported years", () => {
    renderWithIntl(<EmployeePage />);
    expect(screen.getByText(/Stesso lordo, altri anni/)).toBeInTheDocument();
    const panel = document.querySelector(".qg-year-compare") as HTMLElement;
    expect(panel).toBeTruthy();
    expect(panel.textContent).toMatch(/2024/);
    expect(panel.textContent).toMatch(/2025/);
    expect(panel.textContent).toMatch(/2026/);
    expect(panel.querySelectorAll("tbody tr")).toHaveLength(3);
    expect(panel.querySelector(".qg-ledger__row--strong")).toBeTruthy();
  });

  it("CCNL preset 'Cooperative Sociali' sets payment frequency to 13", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);
    const chip = screen.getByRole("button", { name: /Cooperative Sociali/ });
    await user.click(chip);
    const frequencySelect = screen.getByLabelText(/Mensilità/);
    expect((frequencySelect as HTMLSelectElement).value).toBe("13");
  });

  it("renders the IRPEF bracket indicator with the three current brackets", () => {
    renderWithIntl(<EmployeePage />);
    const indicator = document.querySelector(".qg-irpef-indicator") as HTMLElement;
    expect(indicator).toBeTruthy();
    expect(indicator.querySelectorAll(".qg-irpef-indicator__chip")).toHaveLength(3);
    expect(indicator.querySelector(".qg-irpef-indicator__chip--current")).toBeTruthy();
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

  it("the apprenticeship-progression link carries the current RAL", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const ral = screen.getByLabelText(/Stipendio lordo annuo/);
    await user.clear(ral);
    await user.type(ral, "42000");

    const contractSelect = screen.getByLabelText(/Tipo di contratto/);
    await user.selectOptions(contractSelect, "apprendistato");

    const link = document.querySelector<HTMLAnchorElement>(
      'a[href^="/progressione-apprendistato"]',
    );
    expect(link?.getAttribute("href")).toBe("/progressione-apprendistato?lordo=42000");
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

  it("builds the region bracket hint out of the catalog", () => {
    expect(itMessages["employee.form.region.hint.progressive"]).toBe("progressivo {rates}");
    renderWithIntl(<EmployeePage />);
    const region = screen.getByLabelText(/Regione di residenza/);
    expect(hintOf(region)).toBe("progressivo 1,23%, 1,58%, 1,72%, 1,73%");
  });

  it("names the exemption and the flat rate in the region hint", async () => {
    const user = userEvent.setup();
    expect(itMessages["employee.form.region.hint.exempt"]).toBe("esente fino a {amount}");
    expect(itMessages["employee.form.region.hint.flat"]).toBe("aliquota unica {rate}");

    renderWithIntl(<EmployeePage />);
    const region = screen.getByLabelText(/Regione di residenza/);
    await user.selectOptions(region, "valle-daosta");
    expect(hintOf(region)).toBe(
      `esente fino a ${formatCurrencyWhole(15_000)}, aliquota unica 1,23%`,
    );
  });

  it("puts the raise block straight after the IRPEF bracket", () => {
    renderWithIntl(<EmployeePage />);
    const disclosures = document.querySelector(".qg-employee__disclosures") as HTMLElement;
    const order = Array.from(disclosures.children).map((el) => el.className);
    expect(order.indexOf("qg-disclosure qg-raise")).toBe(order.indexOf("qg-irpef-indicator") + 1);
  });

  it("lists the four raise steps with the share kept and the marginal rate", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    const block = document.querySelector(".qg-raise") as HTMLElement;
    expect(block).not.toHaveAttribute("open");
    await user.click(screen.getByText("Se il lordo aumenta"));

    const rows = block.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(4);
    expect(rows[0]?.textContent).toMatch(/\+1\.000/);
    expect(rows[0]?.textContent).toMatch(/57,99%/);
    expect(rows[0]?.textContent).toMatch(/35,52%/);
    expect(rows[3]?.textContent).toMatch(/\+10\.000/);
    expect(block.textContent).toMatch(/Nessuna fonte nuova/);
  });

  it("offers the two starting points as a pressed pair", () => {
    renderWithIntl(<EmployeePage />);
    const gross = screen.getByRole("button", { name: "Parto dal lordo" });
    const net = screen.getByRole("button", { name: "Parto dal netto" });
    expect(gross).toHaveAttribute("aria-pressed", "true");
    expect(net).toHaveAttribute("aria-pressed", "false");
  });

  it("asks for the wanted net and reports the gross it needs", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    await user.click(screen.getByRole("button", { name: "Parto dal netto" }));

    expect(screen.getByRole("button", { name: "Parto dal netto" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByLabelText(/Netto al mese che vuoi/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Stipendio lordo annuo/)).toBeNull();
    expect(screen.getByText(/Lordo annuo necessario/)).toBeInTheDocument();
  });

  it("solves a new gross when the wanted net changes", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployeePage />);

    await user.click(screen.getByRole("button", { name: "Parto dal netto" }));
    const field = screen.getByLabelText(/Netto al mese che vuoi/);
    const firstRow = document.querySelector(".qg-ledger__amount") as HTMLElement;
    const before = firstRow.textContent;

    await user.clear(field);
    await user.type(field, "2500");

    expect((document.querySelector(".qg-ledger__amount") as HTMLElement).textContent).not.toBe(
      before,
    );
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
