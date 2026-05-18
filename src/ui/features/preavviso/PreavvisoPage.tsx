import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { PreavvisoForm } from "./PreavvisoForm.tsx";
import { PreavvisoResults } from "./PreavvisoResults.tsx";
import { usePreavvisoCalculator } from "./usePreavvisoCalculator.ts";
import "./preavviso.css";

export function PreavvisoPage() {
  const calc = usePreavvisoCalculator();
  return (
    <CalculatorLayout
      eyebrowId="preavviso.eyebrow"
      titleId="preavviso.title"
      ledeId="preavviso.lede"
      form={<PreavvisoForm calc={calc} />}
      results={<PreavvisoResults result={calc.result} invalidDates={calc.invalidDates} />}
    />
  );
}
