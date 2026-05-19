import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { it as italianMessages } from "@/ui/i18n/messages/it";
import { PrintPayslipPage } from "./PrintPayslipPage";

function renderAtUrl(search: string) {
  return render(
    <IntlProvider locale="it-IT" messages={italianMessages}>
      <MemoryRouter initialEntries={[`/${search}`]}>
        <PrintPayslipPage />
      </MemoryRouter>
    </IntlProvider>,
  );
}

describe("PrintPayslipPage", () => {
  it("renders the page title", () => {
    renderAtUrl("");
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Busta paga/i);
  });

  it("shows the gross annual decoded from URL", () => {
    const { container } = renderAtUrl("?l=40000&y=2026");
    expect(container.textContent).toMatch(/40\.000/);
  });

  it("uses DEFAULTS when no params are provided", () => {
    const { container } = renderAtUrl("");
    expect(container.textContent).toMatch(/30\.000/);
  });

  it("renders the region name from the region code", () => {
    renderAtUrl("?r=toscana");
    expect(screen.getByText(/Toscana/)).toBeInTheDocument();
  });

  it("shows a print-specific footer disclaimer", () => {
    renderAtUrl("");
    expect(screen.getByText(/uso indicativo/i)).toBeInTheDocument();
  });
});
