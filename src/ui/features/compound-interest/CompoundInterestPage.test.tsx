import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { CompoundInterestPage } from "./CompoundInterestPage.tsx";

describe("CompoundInterestPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<CompoundInterestPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("caps the schedule at ten years until the reader asks for the rest", async () => {
    const user = userEvent.setup();
    renderWithIntl(<CompoundInterestPage />);
    expect(document.querySelectorAll(".qg-ledger tbody tr")).toHaveLength(10);
    await user.click(screen.getByRole("button", { name: /Mostra tutti gli anni/ }));
    expect(document.querySelectorAll(".qg-ledger tbody tr")).toHaveLength(21);
  });

  it("recalculates when the principal is changed", async () => {
    const user = userEvent.setup();
    renderWithIntl(<CompoundInterestPage />);
    const principalInput = screen.getByLabelText(/Capitale iniziale/);
    await user.clear(principalInput);
    await user.type(principalInput, "0");
    const note = document.querySelector(".qg-figure__note");
    expect(note?.textContent ?? "").toMatch(/interessi maturati .*€/);
  });

  it("falls back to a sensible nominal when contributions are set to 'none'", async () => {
    const user = userEvent.setup();
    renderWithIntl(<CompoundInterestPage />);
    const freqSelect = screen.getByLabelText(/Frequenza versamento/);
    await user.selectOptions(freqSelect, "none");
    const note = document.querySelector(".qg-figure__note");
    expect(note?.textContent ?? "").toMatch(/Versato 0\s*€/);
  });
});
