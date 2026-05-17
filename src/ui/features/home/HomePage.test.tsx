import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { HomePage } from "./HomePage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("HomePage", () => {
  it("renders the hero with an italic accent word inside the heading", () => {
    renderWithIntl(<HomePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Quanto guadagno/);
    expect(h1).toHaveTextContent(/davvero/);
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders the featured tile linking to the employee calc", () => {
    renderWithIntl(<HomePage />);
    const tile = screen.getByRole("link", { name: /Stipendio netto da lordo/i });
    expect(tile).toHaveAttribute("href", "/calcola-stipendio");
  });

  it("renders the available forfettario tile with the correct route", () => {
    renderWithIntl(<HomePage />);
    const tile = screen.getByRole("link", { name: /Partita IVA forfettario/i });
    expect(tile).toHaveAttribute("href", "/partita-iva-forfettario");
  });

  it("renders the upcoming list with six items under an 'In arrivo' subhead", () => {
    const { container } = renderWithIntl(<HomePage />);
    const subhead = screen.getByRole("heading", { name: /In arrivo/i });
    expect(subhead).toBeInTheDocument();
    const items = container.querySelectorAll(".qg-home__upcoming-list li");
    expect(items).toHaveLength(6);
  });

  it("renders the open-source shimmer accent in the lede", () => {
    const { container } = renderWithIntl(<HomePage />);
    expect(container.querySelector(".qg-shimmer")).toBeInTheDocument();
  });
});
