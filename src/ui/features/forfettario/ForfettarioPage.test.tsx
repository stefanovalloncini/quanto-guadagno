import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ForfettarioPage } from "./ForfettarioPage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

const wrap = (node: ReactNode) => (
  <IntlProvider locale="it-IT" messages={itMessages}>
    <MemoryRouter>{node}</MemoryRouter>
  </IntlProvider>
);

describe("ForfettarioPage", () => {
  it("renders the hero with italic accent on 'forfettario'", () => {
    render(wrap(<ForfettarioPage />));
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Partita IVA/);
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders all primary form fields", () => {
    render(wrap(<ForfettarioPage />));
    expect(screen.getByLabelText(/Fatturato annuo previsto/i)).toBeTruthy();
    expect(screen.getByLabelText(/Attività esercitata/i)).toBeTruthy();
    expect(screen.getByLabelText(/Anno fiscale/i)).toBeTruthy();
    expect(screen.getByLabelText(/Anni dall'apertura/i)).toBeTruthy();
    expect(screen.getByLabelText(/Spese annue per personale dipendente/i)).toBeTruthy();
  });

  it("shows the monthly net summary for the default inputs", () => {
    render(wrap(<ForfettarioPage />));
    expect(screen.getByText(/Netto mensile/i)).toBeTruthy();
  });
});
