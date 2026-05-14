import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { EmployeeForm } from "./EmployeeForm.tsx";
import { EmployeeResults } from "./EmployeeResults.tsx";
import { useEmployeeCalculator } from "./useEmployeeCalculator.ts";

export function EmployeePage() {
  const calc = useEmployeeCalculator();
  return (
    <CalculatorLayout
      eyebrowId="employee.eyebrow"
      titleId="employee.title"
      ledeId="employee.lede"
      form={<EmployeeForm calc={calc} />}
      results={<EmployeeResults result={calc.result} />}
    />
  );
}
