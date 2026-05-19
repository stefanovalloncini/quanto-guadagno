import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { it as italianMessages } from "@/ui/i18n/messages/it";
import { EmployeeFaq } from "./EmployeeFaq";

function renderFaq() {
  return render(
    <IntlProvider locale="it-IT" messages={italianMessages}>
      <EmployeeFaq />
    </IntlProvider>,
  );
}

describe("EmployeeFaq", () => {
  it("renders an h2 heading in Italian", () => {
    renderFaq();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Domande/i);
  });

  it("renders five or more <details> elements, all closed by default", () => {
    const { container } = renderFaq();
    const details = container.querySelectorAll("details");
    expect(details.length).toBeGreaterThanOrEqual(5);
    for (const d of Array.from(details)) {
      expect(d).not.toHaveAttribute("open");
    }
  });

  it("each <details> has a <summary>", () => {
    const { container } = renderFaq();
    for (const d of Array.from(container.querySelectorAll("details"))) {
      expect(d.querySelector("summary")).toBeTruthy();
    }
  });

  it("at least one answer mentions IRPEF (the core topic)", () => {
    const { container } = renderFaq();
    expect(container.textContent).toMatch(/IRPEF/);
  });
});
