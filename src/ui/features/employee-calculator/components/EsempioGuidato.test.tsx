import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { it as italianMessages } from "@/ui/i18n/messages/it";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { EsempioGuidato } from "./EsempioGuidato";

function renderEsempio(year: 2024 | 2025 | 2026 = 2026, grossAnnual = 30000) {
  const breakdown = calculateSalaryBreakdown({
    grossAnnual,
    taxYear: year,
    regionCode: "lombardia",
    municipalTaxRate: 0.008,
  });
  return render(
    <IntlProvider locale="it-IT" messages={italianMessages}>
      <EsempioGuidato breakdown={breakdown} taxYear={year} />
    </IntlProvider>,
  );
}

describe("EsempioGuidato", () => {
  it("renders a closed <details> with the expected summary", () => {
    renderEsempio();
    const summary = screen.getByText(/Come si arriva al netto/);
    const details = summary.closest("details");
    expect(details).toBeTruthy();
    expect(details).not.toHaveAttribute("open");
  });

  it("renders all six step titles inside the block", () => {
    const { container } = renderEsempio();
    const text = container.textContent ?? "";
    expect(text).toMatch(/1\.\s*Lordo annuo/);
    expect(text).toMatch(/2\.\s*Contributi/);
    expect(text).toMatch(/3\.\s*IRPEF/);
    expect(text).toMatch(/4\.\s*Detrazioni/);
    expect(text).toMatch(/5\.\s*Addizionali/);
    expect(text).toMatch(/6\.\s*Crediti/);
  });

  it("includes the current gross amount in step 1", () => {
    const { container } = renderEsempio(2026, 30000);
    expect(container.textContent).toMatch(/30\.000/);
  });

  it("uses the 2026 IRPEF brackets at 23/33/43 when year is 2026", () => {
    const { container } = renderEsempio(2026);
    const text = container.textContent ?? "";
    expect(text).toMatch(/23/);
    expect(text).toMatch(/33/);
    expect(text).toMatch(/43/);
  });

  it("uses the 2024 IRPEF brackets at 23/35/43 when year is 2024", () => {
    const { container } = renderEsempio(2024);
    const text = container.textContent ?? "";
    expect(text).toMatch(/35/);
  });

  it("names the credits in step 6 when the breakdown pays them", () => {
    const { container } = renderEsempio(2026, 12000);
    const text = container.textContent ?? "";
    expect(text).toMatch(/trattamento integrativo/);
    expect(text).toMatch(/somma aggiuntiva/);
  });

  it("says there are no credits when the breakdown pays none", () => {
    const { container } = renderEsempio(2026, 60000);
    const text = container.textContent ?? "";
    expect(text).toMatch(/non ci sono crediti/);
    expect(text).not.toMatch(/trattamento integrativo/);
  });
});
