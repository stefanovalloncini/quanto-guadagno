import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "@/ui/i18n";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { ApprenticeshipPage } from "@/ui/features/apprenticeship";
import { HomePage } from "@/ui/features/home";
import { AboutPage } from "@/ui/features/about";
import { SourcesPage } from "@/ui/features/sources";
import { NotFoundPage } from "@/ui/features/not-found";
import { SalaryHistoryPage } from "@/ui/features/salary-history";
import { TredicesimaPage } from "@/ui/features/tredicesima";
import { InflationPage } from "@/ui/features/inflation";
import { ComparisonPage } from "@/ui/features/comparison";
import { EmployerCostPage } from "@/ui/features/employer-cost";
import { TfrPage } from "@/ui/features/tfr";
import { InversePage } from "@/ui/features/inverse";
import { ForfettarioPage } from "@/ui/features/forfettario";
import { NaspiPage } from "@/ui/features/naspi";
import { PreavvisoPage } from "@/ui/features/preavviso";
import { CompoundInterestPage } from "@/ui/features/compound-interest";
import { GlossarioPage } from "@/ui/features/glossario";

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

  it("ApprenticeshipPage has no axe violations", async () => {
    const { container } = render(wrap(<ApprenticeshipPage />));
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

  it("SalaryHistoryPage has no axe violations", async () => {
    const { container } = render(wrap(<SalaryHistoryPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("TredicesimaPage has no axe violations", async () => {
    const { container } = render(wrap(<TredicesimaPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("InflationPage has no axe violations", async () => {
    const { container } = render(wrap(<InflationPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ComparisonPage has no axe violations", async () => {
    const { container } = render(wrap(<ComparisonPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("EmployerCostPage has no axe violations", async () => {
    const { container } = render(wrap(<EmployerCostPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("TfrPage has no axe violations", async () => {
    const { container } = render(wrap(<TfrPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("InversePage has no axe violations", async () => {
    const { container } = render(wrap(<InversePage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("ForfettarioPage has no axe violations", async () => {
    const { container } = render(wrap(<ForfettarioPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("NaspiPage has no axe violations", async () => {
    const { container } = render(wrap(<NaspiPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("PreavvisoPage has no axe violations", async () => {
    const { container } = render(wrap(<PreavvisoPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("CompoundInterestPage has no axe violations", async () => {
    const { container } = render(wrap(<CompoundInterestPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("GlossarioPage has no axe violations", async () => {
    const { container } = render(wrap(<GlossarioPage />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
