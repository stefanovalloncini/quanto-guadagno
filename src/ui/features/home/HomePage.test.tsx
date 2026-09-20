import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { HomePage } from "./HomePage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("HomePage", () => {
  it("opens on the salary calculator, not on a headline about the product", () => {
    renderWithIntl(<HomePage />);
    expect(screen.getByLabelText(/Stipendio lordo annuo/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Stipendio netto/);
  });

  it("lists the other tools under a single index heading", () => {
    renderWithIntl(<HomePage />);
    const index = screen.getByRole("region", { name: /Altri strumenti/ });
    expect(within(index).getByRole("link", { name: "Forfettario" })).toHaveAttribute(
      "href",
      "/partita-iva-forfettario",
    );
    expect(within(index).getByRole("link", { name: "NASpI" })).toHaveAttribute(
      "href",
      "/calcolo-naspi",
    );
    expect(within(index).getByRole("link", { name: "Fonti" })).toHaveAttribute("href", "/fonti");
  });

  it("groups the tools and gives each one a single sentence", () => {
    const { container } = renderWithIntl(<HomePage />);
    const groups = container.querySelectorAll(".qg-tools__group");
    expect(groups).toHaveLength(5);
    expect(container.querySelectorAll(".qg-tools__entry")).toHaveLength(15);
    expect(screen.getByText("Le norme e i documenti da cui arrivano le aliquote.")).toBeVisible();
  });

  it("advertises nothing that is not built", () => {
    renderWithIntl(<HomePage />);
    expect(screen.queryByText(/In arrivo/)).toBeNull();
    expect(screen.queryByText(/Disponibile/)).toBeNull();
  });
});
