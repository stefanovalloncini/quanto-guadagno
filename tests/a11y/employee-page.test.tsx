import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "@/ui/i18n";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { HomePage } from "@/ui/features/home";
import { AboutPage } from "@/ui/features/about";
import { SourcesPage } from "@/ui/features/sources";
import { NotFoundPage } from "@/ui/features/not-found";

expect.extend(toHaveNoViolations);

const wrap = (node: React.ReactNode) => (
  <IntlProvider>
    <MemoryRouter>{node}</MemoryRouter>
  </IntlProvider>
);

describe("accessibility", () => {
  it("EmployeePage has no axe violations", async () => {
    const { container } = render(wrap(<EmployeePage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("HomePage has no axe violations", async () => {
    const { container } = render(wrap(<HomePage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("AboutPage has no axe violations", async () => {
    const { container } = render(wrap(<AboutPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("SourcesPage has no axe violations", async () => {
    const { container } = render(wrap(<SourcesPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("NotFoundPage has no axe violations", async () => {
    const { container } = render(wrap(<NotFoundPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
