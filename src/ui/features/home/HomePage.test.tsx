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

  it("renders exactly seven coming-soon tiles (badge text 'In arrivo')", () => {
    render(wrap(<HomePage />));
    const soon = screen.getAllByText(/In arrivo/i);
    expect(soon).toHaveLength(7);
  });

  it("renders the open-source shimmer span in the footnote", () => {
    const { container } = render(wrap(<HomePage />));
    expect(container.querySelector(".qg-shimmer")).toBeInTheDocument();
  });
});
