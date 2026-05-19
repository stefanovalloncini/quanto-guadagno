import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { PreavvisoPage } from "./PreavvisoPage.tsx";

describe("PreavvisoPage", () => {
  it("renders the hero with the italicised accent", () => {
    renderWithIntl(<PreavvisoPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("computes notice days and exit date for the default Commercio selection", () => {
    renderWithIntl(<PreavvisoPage />);
    expect(screen.getByText(/Giorni di preavviso/)).toBeTruthy();
    expect(screen.getByText(/Ultimo giorno di lavoro/)).toBeTruthy();
  });

  it("updates the livello options when CCNL changes", async () => {
    const user = userEvent.setup();
    renderWithIntl(<PreavvisoPage />);
    const ccnlSelect = screen.getByLabelText(/CCNL applicato/);
    await user.selectOptions(ccnlSelect, "cooperative-sociali");
    expect(screen.getByRole("option", { name: /A1 \/ A2 \/ B1 \/ C1/ })).toBeTruthy();
  });

  it("shows the working-days note when logistica operai is picked", async () => {
    const user = userEvent.setup();
    renderWithIntl(<PreavvisoPage />);
    const ccnlSelect = screen.getByLabelText(/CCNL applicato/);
    await user.selectOptions(ccnlSelect, "logistica");
    const livelloSelect = screen.getByLabelText(/Livello di inquadramento/);
    await user.selectOptions(livelloSelect, "operai");
    const result = document.querySelector(".qg-calc__result");
    expect(result?.textContent ?? "").toMatch(/giorni lavorativi/);
  });

  it("shows the error alert when resignation precedes hire", async () => {
    const user = userEvent.setup();
    renderWithIntl(<PreavvisoPage />);
    const resign = screen.getByLabelText(/Data di comunicazione dimissioni/);
    await user.clear(resign);
    await user.type(resign, "2010-01-01");
    expect(screen.getByRole("alert")).toBeTruthy();
  });
});
