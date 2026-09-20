import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { EmployerCostPage } from "./EmployerCostPage.tsx";

describe("EmployerCostPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<EmployerCostPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("shows the employer cost breakdown and total", () => {
    renderWithIntl(<EmployerCostPage />);
    expect(screen.getByText("Costo per l'azienda")).toBeTruthy();
    expect(screen.getByRole("rowheader", { name: /Contributi INPS/ })).toBeTruthy();
    expect(screen.getByRole("rowheader", { name: "Costo totale azienda" })).toBeTruthy();
  });

  it("recomputes when the contract type changes", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployerCostPage />);
    await user.selectOptions(screen.getByLabelText("Tipo di contratto"), "apprendistato");
    expect(screen.getByRole("rowheader", { name: "Costo totale azienda" })).toBeTruthy();
  });
});
