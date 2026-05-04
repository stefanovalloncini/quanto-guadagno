import { FormattedMessage } from "react-intl";
import { Stack } from "@/ui/design-system";
import { EmployeeForm } from "./EmployeeForm.tsx";
import { EmployeeResults } from "./EmployeeResults.tsx";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";

export function EmployeePage() {
  const calc = useEmployeeCalculator();

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="page.employee.eyebrow" values={{ year: calc.state.taxYear }} />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="page.employee.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="page.employee.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <EmployeeForm
            grossAnnual={calc.state.grossAnnual}
            regionalRatePercent={calc.state.regionalRatePercent}
            municipalRatePercent={calc.state.municipalRatePercent}
            taxYear={calc.state.taxYear}
            onGrossChange={calc.setGross}
            onRegionalChange={calc.setRegionalPercent}
            onMunicipalChange={calc.setMunicipalPercent}
            onTaxYearChange={calc.setTaxYear}
          />
          <EmployeeResults result={calc.result} />
        </div>

        <aside className="qg-scope-note" aria-labelledby="qg-scope-title">
          <h3 id="qg-scope-title" className="qg-scope-note__title">
            <FormattedMessage id="scope.title" />
          </h3>
          <p>
            <FormattedMessage id="scope.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
