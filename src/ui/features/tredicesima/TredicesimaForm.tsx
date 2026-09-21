import { FormattedMessage } from "react-intl";
import { Field, Select } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS } from "@/domain/data";
import type { TredicesimaCalculator, TredicesimaFormState } from "./useTredicesimaCalculator.ts";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_RAL = 500_000;

const MENSILITA_OPTIONS: ReadonlyArray<13 | 14> = [13, 14];

interface TredicesimaFormProps {
  readonly calc: TredicesimaCalculator;
}

export function TredicesimaForm({ calc }: TredicesimaFormProps) {
  const { state, update } = calc;

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <Field
        label={<FormattedMessage id="tredicesima.form.ral" />}
        hint={<FormattedMessage id="tredicesima.form.ral.hint" />}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={formatThousands(state.ral)}
        onChange={(e) => update({ ral: Math.min(parseDigits(e.target.value), MAX_RAL) })}
        trailing="€"
      />

      <Select
        label={<FormattedMessage id="tredicesima.form.mensilita" />}
        hint={<FormattedMessage id="tredicesima.form.mensilita.hint" />}
        value={state.mensilita}
        onChange={(e) => update({ mensilita: Number(e.target.value) as 13 | 14 })}
      >
        {MENSILITA_OPTIONS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>

      <Select
        label={<FormattedMessage id="employee.form.year" />}
        value={state.taxYear}
        onChange={(e) =>
          update({ taxYear: Number(e.target.value) as TredicesimaFormState["taxYear"] })
        }
      >
        {SUPPORTED_YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>
    </form>
  );
}
