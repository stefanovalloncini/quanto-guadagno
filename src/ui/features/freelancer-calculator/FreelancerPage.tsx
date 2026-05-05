import { FormattedMessage } from "react-intl";
import { Stack } from "@/ui/design-system";
import { FreelancerForm } from "./FreelancerForm.tsx";
import { FreelancerResults } from "./FreelancerResults.tsx";
import { useFreelancerCalculator } from "./useFreelancerCalculator.ts";

export function FreelancerPage() {
  const calc = useFreelancerCalculator();

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="freelancer.page.eyebrow" values={{ year: calc.state.taxYear }} />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="freelancer.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="freelancer.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <FreelancerForm
            revenue={calc.state.revenue}
            profitabilityCoefficientPercent={calc.state.profitabilityCoefficientPercent}
            isStartup={calc.state.isStartup}
            inpsKind={calc.state.inpsKind}
            taxYear={calc.state.taxYear}
            onRevenueChange={calc.setRevenue}
            onCoefficientChange={calc.setCoefficient}
            onStartupChange={calc.setStartup}
            onInpsKindChange={calc.setInpsKind}
            onTaxYearChange={calc.setTaxYear}
          />
          <FreelancerResults result={calc.result} />
        </div>

        <aside className="qg-scope-note" aria-labelledby="qg-freelancer-scope">
          <h3 id="qg-freelancer-scope" className="qg-scope-note__title">
            <FormattedMessage id="freelancer.scope.title" />
          </h3>
          <p>
            <FormattedMessage id="freelancer.scope.body" />
          </p>
        </aside>
      </Stack>
    </main>
  );
}
