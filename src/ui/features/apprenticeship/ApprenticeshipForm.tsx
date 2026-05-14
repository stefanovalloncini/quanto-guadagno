import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import type { ApprenticeshipCalculator } from "./useApprenticeshipCalculator.ts";

const YEAR_OPTIONS: ReadonlyArray<number> = [1, 2, 3, 4, 5];

interface ApprenticeshipFormProps {
  readonly calc: ApprenticeshipCalculator;
}

export function ApprenticeshipForm({ calc }: ApprenticeshipFormProps) {
  const { state, setTarget, setYears } = calc;
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="apprenticeship.form.target" />}
          hint={<FormattedMessage id="apprenticeship.form.target.hint" />}
          type="number"
          min={1}
          max={1_000_000}
          step={100}
          value={state.targetGrossAnnual}
          onChange={(e) => setTarget(Number(e.target.value))}
          trailing="€"
          inputMode="numeric"
        />
        <Select
          label={<FormattedMessage id="apprenticeship.form.years" />}
          hint={<FormattedMessage id="apprenticeship.form.years.hint" />}
          value={state.years}
          onChange={(e) => setYears(Number(e.target.value))}
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Stack>
    </form>
  );
}
