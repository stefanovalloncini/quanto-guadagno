import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";
import type { InflationCalculator } from "./useInflationCalculator.ts";

const MAX_AMOUNT = 10_000_000;

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
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={formatThousands(state.amount)}
          onChange={(e) => update({ amount: Math.min(parseDigits(e.target.value), MAX_AMOUNT) })}
          trailing="€"
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
