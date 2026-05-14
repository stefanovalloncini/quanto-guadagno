import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import type { SupportedYear } from "@/domain/data";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

const SUPPORTED_YEARS: ReadonlyArray<SupportedYear> = [2024, 2025, 2026];

interface EmployeeFormProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeForm({ calc }: EmployeeFormProps) {
  const { state, setGross, setMunicipalTaxRate, setTaxYear } = calc;
  const municipalRatePercent = state.municipalTaxRate * 100;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="employee.form.gross" />}
          type="number"
          min={1}
          max={1_000_000}
          step={100}
          value={state.grossAnnual}
          onChange={(e) => setGross(Number(e.target.value))}
          trailing="€"
          inputMode="numeric"
        />
        <Select
          label={<FormattedMessage id="employee.form.year" />}
          value={state.taxYear}
          onChange={(e) => setTaxYear(Number(e.target.value) as SupportedYear)}
        >
          {SUPPORTED_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
        <Field
          label={<FormattedMessage id="employee.form.municipal" />}
          hint={<FormattedMessage id="employee.form.municipal.hint" />}
          type="number"
          min={0}
          max={1}
          step={0.01}
          value={municipalRatePercent}
          onChange={(e) => setMunicipalTaxRate(Number(e.target.value) / 100)}
          trailing="%"
          inputMode="decimal"
        />
      </Stack>
    </form>
  );
}
