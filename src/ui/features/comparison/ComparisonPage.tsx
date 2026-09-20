import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { ComparisonForm } from "./ComparisonForm.tsx";
import { ComparisonResults } from "./ComparisonResults.tsx";
import { useComparisonCalculator } from "./useComparisonCalculator.ts";

export function ComparisonPage() {
  const calc = useComparisonCalculator();
  return (
    <CalculatorLayout
      titleId="comparison.title"
      ledeId="comparison.lede"
      form={<ComparisonForm calc={calc} />}
      results={<ComparisonResults result={calc.result} />}
    />
  );
}
