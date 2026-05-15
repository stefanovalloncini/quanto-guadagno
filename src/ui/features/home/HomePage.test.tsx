import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { HomePage } from "./HomePage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

const wrap = (node: React.ReactNode) => (
  <IntlProvider locale="it-IT" messages={itMessages}>
    <MemoryRouter>{node}</MemoryRouter>
  </IntlProvider>
);

describe("HomePage", () => {
  it("renders the hero with an italic accent word inside the heading", () => {
    render(wrap(<HomePage />));
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Quanto guadagno/);
    expect(h1).toHaveTextContent(/davvero/);
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders the featured tile linking to the employee calc", () => {
    render(wrap(<HomePage />));
    const tile = screen.getByRole("link", { name: /Stipendio netto da lordo/i });
    expect(tile).toHaveAttribute("href", "/calcola-stipendio");
  });

  it("renders the available forfettario tile with the correct route", () => {
    render(wrap(<HomePage />));
    const tile = screen.getByRole("link", { name: /Partita IVA forfettario/i });
    expect(tile).toHaveAttribute("href", "/partita-iva-forfettario");
  });

  it("renders the upcoming list with six items under an 'In arrivo' subhead", () => {
    const { container } = render(wrap(<HomePage />));
    const subhead = screen.getByRole("heading", { name: /In arrivo/i });
    expect(subhead).toBeInTheDocument();
    const items = container.querySelectorAll(".qg-home__upcoming-list li");
    expect(items).toHaveLength(6);
  });

  it("renders the open-source shimmer span in the footnote", () => {
    const { container } = render(wrap(<HomePage />));
    expect(container.querySelector(".qg-shimmer")).toBeInTheDocument();
  });
});
