import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { CompoundInterestForm } from "./CompoundInterestForm.tsx";
import { CompoundInterestResults } from "./CompoundInterestResults.tsx";
import { useCompoundInterestCalculator } from "./useCompoundInterestCalculator.ts";

export function CompoundInterestPage() {
  const calc = useCompoundInterestCalculator();
  return (
    <CalculatorLayout
      titleId="compoundInterest.title"
      form={<CompoundInterestForm calc={calc} />}
      results={<CompoundInterestResults result={calc.result} />}
    />
  );
}
