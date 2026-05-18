import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { NaspiForm } from "./NaspiForm.tsx";
import { NaspiResults } from "./NaspiResults.tsx";
import { useNaspiCalculator } from "./useNaspiCalculator.ts";
import "./naspi.css";

export function NaspiPage() {
  const calc = useNaspiCalculator();
  return (
    <CalculatorLayout
      eyebrowId="naspi.eyebrow"
      titleId="naspi.title"
      ledeId="naspi.lede"
      form={<NaspiForm calc={calc} />}
      results={<NaspiResults result={calc.result} year={calc.state.year} />}
    />
  );
}
