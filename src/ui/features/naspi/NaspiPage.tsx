import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { NaspiForm } from "./NaspiForm.tsx";
import { NaspiResults } from "./NaspiResults.tsx";
import { NaspiFaq } from "./NaspiFaq.tsx";
import { useNaspiCalculator } from "./useNaspiCalculator.ts";

export function NaspiPage() {
  const calc = useNaspiCalculator();
  return (
    <CalculatorLayout
      titleId="naspi.title"
      form={<NaspiForm calc={calc} />}
      results={<NaspiResults result={calc.result} year={calc.state.year} />}
      footer={<NaspiFaq />}
    />
  );
}
