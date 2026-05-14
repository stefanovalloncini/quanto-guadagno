import { NetSalarySummary } from "./components/NetSalarySummary.tsx";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface EmployeeOverviewProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeOverview({ calc }: EmployeeOverviewProps) {
  return (
    <NetSalarySummary breakdown={calc.result} paymentFrequency={calc.state.paymentFrequency} />
  );
}
