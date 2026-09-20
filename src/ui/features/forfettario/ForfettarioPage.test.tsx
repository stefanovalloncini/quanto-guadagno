import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { ForfettarioPage } from "./ForfettarioPage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("ForfettarioPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<ForfettarioPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Partita IVA/);
    expect(h1.querySelector("em")).toBeNull();
  });

  it("renders all primary form fields", () => {
    renderWithIntl(<ForfettarioPage />);
    expect(screen.getByLabelText(/Fatturato annuo previsto/i)).toBeTruthy();
    expect(screen.getByLabelText(/Attività esercitata/i)).toBeTruthy();
    expect(screen.getByLabelText(/Anno fiscale/i)).toBeTruthy();
    expect(screen.getByLabelText(/Anni dall'apertura/i)).toBeTruthy();
    expect(screen.getByLabelText(/Spese annue per personale dipendente/i)).toBeTruthy();
  });

  it("shows the monthly net summary for the default inputs", () => {
    renderWithIntl(<ForfettarioPage />);
    expect(screen.getByText(/Netto mensile/i)).toBeTruthy();
  });
});
