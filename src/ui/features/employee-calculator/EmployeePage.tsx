import { FormattedMessage } from "react-intl";
import { ResultsBreakdown } from "./components/ResultsBreakdown.tsx";
import { EmployeeFaq } from "./components/EmployeeFaq.tsx";
import { EsempioGuidato } from "./components/EsempioGuidato.tsx";
import { EmployerCostView } from "@/ui/shared/EmployerCostView.tsx";
import { IrpefBracketIndicator } from "./components/IrpefBracketIndicator.tsx";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";
import { EmployeeFormPrimary } from "./EmployeeFormPrimary.tsx";
import { EmployeeOverview } from "./EmployeeOverview.tsx";
import { EmployeeExtras } from "./EmployeeExtras.tsx";
import { MoneyJourney } from "./MoneyJourney.tsx";

export function EmployeePage() {
  const calc = useEmployeeCalculator();

  return (
    <section className="qg-employee">
      <header className="qg-calc__hero">
        <h1>
          <FormattedMessage id="employee.title" />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id="employee.lede" />
        </p>
      </header>

      <div className="qg-employee__grid">
        <div className="qg-employee__main">
          <EmployeeFormPrimary calc={calc} />
          <EmployeeExtras calc={calc} />
          <ResultsBreakdown breakdown={calc.result} />
          <EsempioGuidato breakdown={calc.result} taxYear={calc.state.taxYear} />
          <IrpefBracketIndicator
            taxableIncome={calc.result.taxableIncome}
            taxYear={calc.state.taxYear}
          />
          <MoneyJourney breakdown={calc.result} />
          <EmployerCostView breakdown={calc.result} />
          <EmployeeFaq />
        </div>
        <aside className="qg-employee__aside">
          <div className="qg-calc__result">
            <EmployeeOverview calc={calc} />
          </div>
        </aside>
      </div>
    </section>
  );
}
