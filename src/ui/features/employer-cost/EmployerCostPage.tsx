import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { EmployerCostForm } from "./EmployerCostForm.tsx";
import { EmployerCostResults } from "./EmployerCostResults.tsx";
import { useEmployerCostCalculator } from "./useEmployerCostCalculator.ts";

export function EmployerCostPage() {
  const calc = useEmployerCostCalculator();
  return (
    <CalculatorLayout
      titleId="employerCost.title"
      form={<EmployerCostForm calc={calc} />}
      results={<EmployerCostResults breakdown={calc.result} />}
    />
  );
}
