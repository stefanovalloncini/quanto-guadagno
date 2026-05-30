import { FormattedMessage } from "react-intl";
import { Field, Stack } from "@/ui/design-system/primitives";
import type { TfrCalculator } from "./useTfrCalculator.ts";

interface TfrFormProps {
  readonly calc: TfrCalculator;
}

export function TfrForm({ calc }: TfrFormProps) {
  const { state, update } = calc;
  const inflationPercent = state.inflationRate * 100;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="employee.form.salary" />}
          type="number"
          min={0}
          max={500_000}
          step={500}
          value={state.ral}
          onChange={(e) => update({ ral: Math.max(0, Number(e.target.value)) })}
          trailing="€"
          inputMode="numeric"
        />

        <Field
          label={<FormattedMessage id="tfr.form.years" />}
          hint={<FormattedMessage id="tfr.form.years.hint" />}
          type="number"
          min={1}
          max={50}
          step={1}
          value={state.years}
          onChange={(e) => update({ years: Math.max(1, Math.min(50, Number(e.target.value))) })}
          inputMode="numeric"
        />

        <Field
          label={<FormattedMessage id="tfr.form.inflation" />}
          hint={<FormattedMessage id="tfr.form.inflation.hint" />}
          type="number"
          min={0}
          max={20}
          step={0.1}
          value={inflationPercent}
          onChange={(e) => update({ inflationRate: Math.max(0, Number(e.target.value)) / 100 })}
          trailing="%"
          inputMode="decimal"
        />
      </Stack>
    </form>
  );
}
