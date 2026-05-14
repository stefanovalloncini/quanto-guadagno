import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { Tile } from "./Tile.tsx";

const wrap = (node: ReactNode) => <MemoryRouter>{node}</MemoryRouter>;

describe("Tile", () => {
  it("renders feature variant as a Link with correct href and class", () => {
    render(
      wrap(
        <Tile variant="feature" to="/calcola-stipendio" title="Stipendio netto" badge="Disponibile">
          <p>Descrizione</p>
        </Tile>,
      ),
    );
    const link = screen.getByRole("link", { name: /Stipendio netto/ });
    expect(link).toHaveAttribute("href", "/calcola-stipendio");
    expect(link.className).toContain("qg-tile--feature");
  });

  it("renders available variant as a Link too", () => {
    render(
      wrap(
        <Tile variant="available" to="/foo" title="Foo" badge="Disponibile">
          <p>x</p>
        </Tile>,
      ),
    );
    const link = screen.getByRole("link", { name: /Foo/ });
    expect(link).toHaveAttribute("href", "/foo");
    expect(link.className).toContain("qg-tile--available");
  });

  it("renders soon variant as a non-interactive div (no link)", () => {
    render(
      wrap(
        <Tile variant="soon" title="Partita IVA" badge="In arrivo">
          <p>Descrizione</p>
        </Tile>,
      ),
    );
    expect(screen.queryByRole("link")).toBeNull();
    const root = screen.getByText("Partita IVA").closest(".qg-tile");
    expect(root?.className).toContain("qg-tile--soon");
  });

  it("renders the badge and title text", () => {
    render(
      wrap(
        <Tile variant="soon" title="TFR" badge="In arrivo">
          <p>x</p>
        </Tile>,
      ),
    );
    expect(screen.getByText("In arrivo")).toBeInTheDocument();
    expect(screen.getByText("TFR")).toBeInTheDocument();
  });

  it("renders cta when provided on a Link variant", () => {
    render(
      wrap(
        <Tile variant="feature" to="/foo" title="Foo" badge="b" cta="Apri →">
          <p>x</p>
        </Tile>,
      ),
    );
    expect(screen.getByText("Apri →")).toBeInTheDocument();
  });

  it("accepts ReactNode title and badge", () => {
    render(
      wrap(
        <Tile
          variant="soon"
          title={<span data-testid="t">x-title</span>}
          badge={<span data-testid="b">x-badge</span>}
        >
          <p>x</p>
        </Tile>,
      ),
    );
    expect(screen.getByTestId("t")).toBeInTheDocument();
    expect(screen.getByTestId("b")).toBeInTheDocument();
  });
});
