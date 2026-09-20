import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { TredicesimaForm } from "./TredicesimaForm.tsx";
import { TredicesimaResults } from "./TredicesimaResults.tsx";
import { useTredicesimaCalculator } from "./useTredicesimaCalculator.ts";

export function TredicesimaPage() {
  const calc = useTredicesimaCalculator();
  return (
    <CalculatorLayout
      titleId="tredicesima.title"
      ledeId="tredicesima.lede"
      form={<TredicesimaForm calc={calc} />}
      results={<TredicesimaResults result={calc.result} />}
    />
  );
}
