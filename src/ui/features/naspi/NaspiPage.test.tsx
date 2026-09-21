import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { NaspiPage } from "./NaspiPage.tsx";

describe("NaspiPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<NaspiPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("renders the monthly amount metric with the default inputs", () => {
    renderWithIntl(<NaspiPage />);
    expect(screen.getByText(/Importo mensile/)).toBeTruthy();
    expect(document.querySelector(".qg-ledger")).toBeTruthy();
  });

  it("shows the ineligibility alert when weeks of contribution are 0", async () => {
    const user = userEvent.setup();
    renderWithIntl(<NaspiPage />);
    const weeks = screen.getByLabelText(/Settimane di contribuzione ultimi 4 anni/);
    await user.clear(weeks);
    await user.type(weeks, "0");
    const alert = screen.getByRole("alert");
    expect(alert).toBeTruthy();
    expect(alert.textContent ?? "").toMatch(/almeno 13 settimane/);
  });

  it("reveals the after-resignation field when toggling voluntary resignation", async () => {
    const user = userEvent.setup();
    renderWithIntl(<NaspiPage />);
    const toggle = screen.getByLabelText(/Dimissioni volontarie/);
    await user.click(toggle);
    expect(screen.getByLabelText(/dopo le dimissioni/)).toBeTruthy();
  });
});
