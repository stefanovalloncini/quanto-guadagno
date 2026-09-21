import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { InverseForm } from "./InverseForm.tsx";
import { InverseResults } from "./InverseResults.tsx";
import { useInverseCalculator } from "./useInverseCalculator.ts";

export function InversePage() {
  const calc = useInverseCalculator();
  return (
    <CalculatorLayout
      titleId="inverse.title"
      form={<InverseForm calc={calc} />}
      results={<InverseResults result={calc.result} />}
    />
  );
}
