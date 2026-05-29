import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import type { InflationCalculator } from "./useInflationCalculator.ts";

interface InflationFormProps {
  readonly calc: InflationCalculator;
}

export function InflationForm({ calc }: InflationFormProps) {
  const { state, years, update } = calc;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="inflation.form.amount" />}
          hint={<FormattedMessage id="inflation.form.amount.hint" />}
          type="number"
          min={0}
          max={10_000_000}
          step={100}
          value={state.amount}
          onChange={(e) => update({ amount: Math.max(0, Number(e.target.value)) })}
          trailing="€"
          inputMode="numeric"
        />

        <Select
          label={<FormattedMessage id="inflation.form.fromYear" />}
          value={state.fromYear}
          onChange={(e) => update({ fromYear: Number(e.target.value) })}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Select
          label={<FormattedMessage id="inflation.form.toYear" />}
          value={state.toYear}
          onChange={(e) => update({ toYear: Number(e.target.value) })}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Stack>
    </form>
  );
}
