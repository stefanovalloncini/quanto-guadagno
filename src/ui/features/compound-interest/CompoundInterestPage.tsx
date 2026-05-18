import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { CompoundInterestForm } from "./CompoundInterestForm.tsx";
import { CompoundInterestResults } from "./CompoundInterestResults.tsx";
import { useCompoundInterestCalculator } from "./useCompoundInterestCalculator.ts";
import "./compoundInterest.css";

export function CompoundInterestPage() {
  const calc = useCompoundInterestCalculator();
  return (
    <CalculatorLayout
      eyebrowId="compoundInterest.eyebrow"
      titleId="compoundInterest.title"
      ledeId="compoundInterest.lede"
      form={<CompoundInterestForm calc={calc} />}
      results={<CompoundInterestResults result={calc.result} />}
    />
  );
}
