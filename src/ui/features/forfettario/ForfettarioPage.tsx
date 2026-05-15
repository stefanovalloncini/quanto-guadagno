import { useIntl } from "react-intl";
import { CalculatorLayout } from "@/ui/shared/CalculatorLayout.tsx";
import { ForfettarioForm } from "./ForfettarioForm.tsx";
import { ForfettarioResults } from "./ForfettarioResults.tsx";
import { useForfettarioCalculator } from "./useForfettarioCalculator.ts";

const FORFETTARIO_REVENUE_LIMIT = 85_000;

export function ForfettarioPage() {
  const intl = useIntl();
  const calc = useForfettarioCalculator();
  const limit = intl.formatNumber(FORFETTARIO_REVENUE_LIMIT, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  return (
    <CalculatorLayout
      eyebrowId="forfettario.eyebrow"
      titleId="forfettario.title"
      ledeId="forfettario.lede"
      ledeValues={{ limit }}
      form={<ForfettarioForm calc={calc} />}
      results={<ForfettarioResults result={calc.result} />}
    />
  );
}
