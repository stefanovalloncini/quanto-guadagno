import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { TfrForm } from "./TfrForm.tsx";
import { TfrResults } from "./TfrResults.tsx";
import { useTfrCalculator } from "./useTfrCalculator.ts";

export function TfrPage() {
  const calc = useTfrCalculator();
  return (
    <CalculatorLayout
      titleId="tfr.title"
      form={<TfrForm calc={calc} />}
      results={<TfrResults result={calc.result} />}
    />
  );
}
