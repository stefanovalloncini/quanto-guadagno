import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { EmployerCostPage } from "./EmployerCostPage.tsx";

describe("EmployerCostPage", () => {
  it("renders the hero with the italicised accent", () => {
    renderWithIntl(<EmployerCostPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("shows the employer cost breakdown and total", () => {
    renderWithIntl(<EmployerCostPage />);
    expect(screen.getByText("Lato datore di lavoro")).toBeTruthy();
    expect(screen.getByText("Il datore paga")).toBeTruthy();
    expect(screen.getByText("Costo totale azienda")).toBeTruthy();
  });

  it("recomputes when the contract type changes", async () => {
    const user = userEvent.setup();
    renderWithIntl(<EmployerCostPage />);
    await user.selectOptions(screen.getByLabelText("Tipo di contratto"), "apprendistato");
    expect(screen.getByText("Costo totale azienda")).toBeTruthy();
  });
});
