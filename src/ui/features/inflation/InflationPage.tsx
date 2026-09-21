import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { InflationForm } from "./InflationForm.tsx";
import { InflationResults } from "./InflationResults.tsx";
import { KeepPaceBlock } from "./KeepPaceBlock.tsx";
import { FrozenSalaryBlock } from "./FrozenSalaryBlock.tsx";
import { useInflationCalculator } from "./useInflationCalculator.ts";

export function InflationPage() {
  const calc = useInflationCalculator();
  const { keepPace, frozen } = calc.result;

  return (
    <CalculatorLayout
      titleId="inflation.title"
      form={<InflationForm calc={calc} />}
      results={<InflationResults result={calc.result} />}
      footer={
        <>
          {keepPace !== null && <KeepPaceBlock keepPace={keepPace} />}
          {frozen !== null && <FrozenSalaryBlock frozen={frozen} />}
        </>
      }
    />
  );
}
