import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { EmployerCostView } from "@/ui/shared/EmployerCostView.tsx";
import { EmployerCostForm } from "./EmployerCostForm.tsx";
import { useEmployerCostCalculator } from "./useEmployerCostCalculator.ts";

export function EmployerCostPage() {
  const calc = useEmployerCostCalculator();
  return (
    <CalculatorLayout
      titleId="employerCost.title"
      ledeId="employerCost.lede"
      form={<EmployerCostForm calc={calc} />}
      results={<EmployerCostView breakdown={calc.result} defaultOpen />}
    />
  );
}
