import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { ApprenticeshipForm } from "./ApprenticeshipForm.tsx";
import { ApprenticeshipResults } from "./ApprenticeshipResults.tsx";
import { useApprenticeshipCalculator } from "./useApprenticeshipCalculator.ts";

export function ApprenticeshipPage() {
  const calc = useApprenticeshipCalculator();
  return (
    <CalculatorLayout
      titleId="apprenticeship.title"
      form={<ApprenticeshipForm calc={calc} />}
      results={<ApprenticeshipResults result={calc.result} />}
    />
  );
}
