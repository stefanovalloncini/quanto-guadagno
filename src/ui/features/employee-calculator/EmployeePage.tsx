import { FormattedMessage } from "react-intl";
import { EmployeeFaq } from "./components/EmployeeFaq.tsx";
import { EsempioGuidato } from "./components/EsempioGuidato.tsx";
import { EmployerCostView } from "@/ui/shared/EmployerCostView.tsx";
import { IrpefBracketIndicator } from "./components/IrpefBracketIndicator.tsx";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";
import { EmployeeFormPrimary } from "./EmployeeFormPrimary.tsx";
import { EmployeeOverview } from "./EmployeeOverview.tsx";
import { EmployeeExtras } from "./EmployeeExtras.tsx";

export function EmployeePage() {
  const calc = useEmployeeCalculator();

  return (
    <section className="qg-employee">
      <header className="qg-employee__hero">
        <h1>
          <FormattedMessage id="employee.title" />
        </h1>
      </header>

      <div className="qg-employee__grid">
        <div className="qg-employee__form">
          <EmployeeFormPrimary calc={calc} />
          <EmployeeExtras calc={calc} />
        </div>
        <aside className="qg-employee__aside">
          <EmployeeOverview calc={calc} />
        </aside>
      </div>

      <div className="qg-employee__disclosures">
        <EsempioGuidato breakdown={calc.result} taxYear={calc.state.taxYear} />
        <IrpefBracketIndicator
          taxableIncome={calc.result.taxableIncome}
          taxYear={calc.state.taxYear}
        />
        <EmployerCostView breakdown={calc.result} />
        <EmployeeFaq />
      </div>
    </section>
  );
}
