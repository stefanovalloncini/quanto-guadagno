import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { InflationPage } from "./InflationPage.tsx";

describe("InflationPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<InflationPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("shows the equivalent value and cumulative inflation for the defaults", () => {
    renderWithIntl(<InflationPage />);
    expect(screen.getByText("Equivalente nel 2026")).toBeTruthy();
    expect(screen.getByText("Inflazione cumulata")).toBeTruthy();
    expect(screen.getByText("Stesso potere d'acquisto del 2015")).toBeTruthy();
  });

  it("reacts to changing the starting year", async () => {
    const user = userEvent.setup();
    renderWithIntl(<InflationPage />);
    await user.selectOptions(screen.getByLabelText("Anno di partenza"), "2020");
    expect(screen.getByText("Stesso potere d'acquisto del 2020")).toBeTruthy();
  });

  it("sets the adjusted amount as the one large figure", () => {
    renderWithIntl(<InflationPage />);
    const figure = document.querySelector(".qg-cifra") as HTMLElement;
    expect(figure).toBeTruthy();
    expect(figure.className).toMatch(/qg-cifra--sm/);
    expect(figure.textContent).toMatch(/1\.252/);
  });

  it("works out the raise that keeps pace with inflation", async () => {
    const user = userEvent.setup();
    renderWithIntl(<InflationPage />);

    const block = document.querySelector(".qg-keep-pace") as HTMLElement;
    expect(block).not.toHaveAttribute("open");
    await user.click(screen.getByText("Quanto aumento serve per pareggiare l'inflazione"));

    const rows = block.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);
    expect(rows[0]?.textContent).toMatch(/1\.252/);
    expect(rows[1]?.textContent).toMatch(/252/);
    expect(rows[1]?.textContent).toMatch(/25,2%/);
  });

  it("walks a frozen salary year by year without going past the series", async () => {
    const user = userEvent.setup();
    renderWithIntl(<InflationPage />);

    const block = document.querySelector(".qg-frozen") as HTMLElement;
    await user.click(screen.getByText("Se lo stipendio resta fermo"));

    const rows = block.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(12);
    expect(rows[0]?.textContent).toMatch(/2015/);
    expect(rows[11]?.textContent).toMatch(/2026/);
    expect(block.textContent).toMatch(/La serie ISTAT FOI arriva al 2026/);
  });

  it("drops the frozen-salary block when there is no span to walk", async () => {
    const user = userEvent.setup();
    renderWithIntl(<InflationPage />);
    await user.selectOptions(screen.getByLabelText("Anno di partenza"), "2026");
    expect(document.querySelector(".qg-frozen")).toBeNull();
  });
});
