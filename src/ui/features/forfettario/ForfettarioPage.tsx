import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { SHARED_FORFETTARIO } from "@/domain/data";
import { formatCurrencyWhole } from "@/domain/format.ts";
import { ForfettarioForm } from "./ForfettarioForm.tsx";
import { ForfettarioResults } from "./ForfettarioResults.tsx";
import { ForfettarioFaq } from "./ForfettarioFaq.tsx";
import { useForfettarioCalculator } from "./useForfettarioCalculator.ts";

export function ForfettarioPage() {
  const calc = useForfettarioCalculator();
  return (
    <CalculatorLayout
      titleId="forfettario.title"
      ledeId="forfettario.lede"
      ledeValues={{ limit: formatCurrencyWhole(SHARED_FORFETTARIO.maxRevenue) }}
      form={<ForfettarioForm calc={calc} />}
      results={<ForfettarioResults result={calc.result} />}
      footer={<ForfettarioFaq />}
    />
  );
}
