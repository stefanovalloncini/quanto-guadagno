import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { InflationForm } from "./InflationForm.tsx";
import { InflationResults } from "./InflationResults.tsx";
import { useInflationCalculator } from "./useInflationCalculator.ts";

export function InflationPage() {
  const calc = useInflationCalculator();
  return (
    <CalculatorLayout
      titleId="inflation.title"
      ledeId="inflation.lede"
      form={<InflationForm calc={calc} />}
      results={<InflationResults result={calc.result} />}
    />
  );
}
