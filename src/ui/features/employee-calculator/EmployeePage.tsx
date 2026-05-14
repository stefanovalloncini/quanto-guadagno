import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { TaxBreakdownCard } from "./components/TaxBreakdownCard.tsx";
import { ResultsBreakdown } from "./components/ResultsBreakdown.tsx";
import { EmployerCostView } from "./components/EmployerCostView.tsx";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";
import { EmployeeFormPrimary } from "./EmployeeFormPrimary.tsx";
import { EmployeeOverview } from "./EmployeeOverview.tsx";
import { EmployeeAdvancedSettings } from "./EmployeeAdvancedSettings.tsx";

export function EmployeePage() {
  const calc = useEmployeeCalculator();

  return (
    <>
      <CalculatorLayout
        eyebrowId="employee.eyebrow"
        titleId="employee.title"
        ledeId="employee.lede"
        form={<EmployeeFormPrimary calc={calc} />}
        results={<EmployeeOverview calc={calc} />}
      />

      <section className="qg-employee-detail">
        <EmployeeAdvancedSettings calc={calc} />

        <TaxBreakdownCard breakdown={calc.result} paymentFrequency={calc.state.paymentFrequency} />

        <ResultsBreakdown breakdown={calc.result} paymentFrequency={calc.state.paymentFrequency} />

        <EmployerCostView breakdown={calc.result} />
      </section>
    </>
  );
}
