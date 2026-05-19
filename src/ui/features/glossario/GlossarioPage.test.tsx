import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { it as italianMessages } from "@/ui/i18n/messages/it";
import { GlossarioPage } from "./GlossarioPage";

function renderPage() {
  return render(
    <IntlProvider locale="it-IT" messages={italianMessages}>
      <GlossarioPage />
    </IntlProvider>,
  );
}

describe("GlossarioPage", () => {
  it("renders the page title", () => {
    renderPage();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent ?? "").toMatch(/Glossario|Termini/i);
  });

  it("renders at least 8 glossary terms as <dt> elements", () => {
    const { container } = renderPage();
    const terms = container.querySelectorAll("dt");
    expect(terms.length).toBeGreaterThanOrEqual(8);
  });

  it("each <dt> has an associated <dd>", () => {
    const { container } = renderPage();
    const items = container.querySelectorAll(".qg-glossario__item");
    for (const item of Array.from(items)) {
      expect(item.querySelector("dt")).toBeTruthy();
      expect(item.querySelector("dd")).toBeTruthy();
    }
  });

  it("includes IRPEF and INPS as expected core terms", () => {
    const { container } = renderPage();
    const text = container.textContent ?? "";
    expect(text).toMatch(/IRPEF/);
    expect(text).toMatch(/INPS/);
  });
});
