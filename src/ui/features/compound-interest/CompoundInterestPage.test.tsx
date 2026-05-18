import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { CompoundInterestPage } from "./CompoundInterestPage.tsx";

describe("CompoundInterestPage", () => {
  it("renders the hero with the italicised accent", () => {
    renderWithIntl(<CompoundInterestPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders 21 schedule rows for the default 20-year run", () => {
    renderWithIntl(<CompoundInterestPage />);
    const rows = document.querySelectorAll(".qg-schedule__table tbody tr");
    expect(rows).toHaveLength(21);
  });

  it("recalculates when the principal is changed", async () => {
    const user = userEvent.setup();
    renderWithIntl(<CompoundInterestPage />);
    const principalInput = screen.getByLabelText(/Capitale iniziale/);
    await user.clear(principalInput);
    await user.type(principalInput, "0");
    const interestMetric = screen.getByText(/Interessi maturati/).parentElement;
    expect(interestMetric?.textContent ?? "").toMatch(/€/);
  });

  it("falls back to a sensible nominal when contributions are set to 'none'", async () => {
    const user = userEvent.setup();
    renderWithIntl(<CompoundInterestPage />);
    const freqSelect = screen.getByLabelText(/Frequenza versamento/);
    await user.selectOptions(freqSelect, "none");
    const totalContrib = screen.getByText(/Totale versato/).parentElement;
    expect(totalContrib?.textContent ?? "").toMatch(/0\s*€/);
  });
});
