import { NetSalarySummary } from "./components/NetSalarySummary.tsx";
import { ShareButton } from "@/ui/shared/ShareButton.tsx";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface EmployeeOverviewProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeOverview({ calc }: EmployeeOverviewProps) {
  return (
    <div className="qg-employee__overview">
      <NetSalarySummary breakdown={calc.result} paymentFrequency={calc.state.paymentFrequency} />
      <div className="qg-employee__overview-actions">
        <ShareButton />
      </div>
    </div>
  );
}
