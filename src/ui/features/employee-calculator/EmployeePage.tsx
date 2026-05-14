import { FormattedMessage } from "react-intl";
import { EmployeeForm } from "./EmployeeForm.tsx";
import { EmployeeResults } from "./EmployeeResults.tsx";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";

export function EmployeePage() {
  const calc = useEmployeeCalculator();
  return (
    <section className="qg-employee">
      <header className="qg-employee__hero">
        <p className="qg-eyebrow">
          <FormattedMessage id="employee.eyebrow" />
        </p>
        <h1>
          <FormattedMessage id="employee.title" values={{ em: (chunks) => <em>{chunks}</em> }} />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id="employee.lede" />
        </p>
      </header>

      <div className="qg-employee__grid">
        <div className="qg-employee__form">
          <EmployeeForm calc={calc} />
        </div>
        <aside className="qg-employee__result">
          <EmployeeResults result={calc.result} />
        </aside>
      </div>
    </section>
  );
}
