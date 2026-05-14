import { SalaryInput } from "./components/SalaryInput.tsx";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface EmployeeFormPrimaryProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeFormPrimary({ calc }: EmployeeFormPrimaryProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <SalaryInput
        value={calc.state.grossAnnual}
        onChange={calc.setGross}
        grossMonthly={calc.result.grossMonthly}
      />
    </form>
  );
}
