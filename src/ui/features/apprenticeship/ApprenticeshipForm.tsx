import { FormattedMessage } from "react-intl";
import { Field, Select } from "@/ui/design-system/primitives";
import type { ApprenticeshipCalculator } from "./useApprenticeshipCalculator.ts";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_TARGET = 1_000_000;

const YEAR_OPTIONS: ReadonlyArray<number> = [1, 2, 3, 4, 5];

interface ApprenticeshipFormProps {
  readonly calc: ApprenticeshipCalculator;
}

export function ApprenticeshipForm({ calc }: ApprenticeshipFormProps) {
  const { state, setTarget, setYears } = calc;
  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <Field
        label={<FormattedMessage id="apprenticeship.form.target" />}
        hint={<FormattedMessage id="apprenticeship.form.target.hint" />}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={formatThousands(state.targetGrossAnnual)}
        onChange={(e) => setTarget(Math.min(parseDigits(e.target.value), MAX_TARGET))}
        trailing="€"
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
    </form>
  );
}
