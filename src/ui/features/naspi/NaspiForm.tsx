import { FormattedMessage } from "react-intl";
import { Field, Select } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS, type SupportedYear } from "@/domain/data";
import type { NaspiCalculator } from "./useNaspiCalculator.ts";

interface NaspiFormProps {
  readonly calc: NaspiCalculator;
}

export function NaspiForm({ calc }: NaspiFormProps) {
  const { state, update } = calc;

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <Select
        label={<FormattedMessage id="naspi.form.year" />}
        value={state.year}
        onChange={(e) => update({ year: Number(e.target.value) as SupportedYear })}
      >
        {SUPPORTED_YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>

      <Field
        label={<FormattedMessage id="naspi.form.grossPay4Years" />}
        hint={<FormattedMessage id="naspi.form.grossPay4Years.hint" />}
        type="number"
        min={0}
        step={1000}
        value={state.grossPay4Years}
        onChange={(e) => update({ grossPay4Years: Number(e.target.value) })}
        trailing="€"
        inputMode="numeric"
      />

      <Field
        label={<FormattedMessage id="naspi.form.weeksContribution4Years" />}
        hint={<FormattedMessage id="naspi.form.weeksContribution4Years.hint" />}
        type="number"
        min={0}
        max={208}
        step={1}
        value={state.weeksContribution4Years}
        onChange={(e) => update({ weeksContribution4Years: Number(e.target.value) })}
        inputMode="numeric"
      />

      <Field
        label={<FormattedMessage id="naspi.form.age" />}
        type="number"
        min={18}
        max={80}
        step={1}
        value={state.age}
        onChange={(e) => update({ age: Number(e.target.value) })}
        inputMode="numeric"
      />

      <label className="qg-toggle">
        <input
          type="checkbox"
          className="qg-toggle__input"
          checked={state.voluntaryResignationInLast12Months}
          onChange={(e) => update({ voluntaryResignationInLast12Months: e.target.checked })}
        />
        <span className="qg-toggle__label">
          <FormattedMessage id="naspi.form.voluntaryToggle" />
        </span>
      </label>

      {state.voluntaryResignationInLast12Months && (
        <Field
          label={<FormattedMessage id="naspi.form.weeksAfterVoluntaryResignation" />}
          hint={<FormattedMessage id="naspi.form.weeksAfterVoluntaryResignation.hint" />}
          type="number"
          min={0}
          max={52}
          step={1}
          value={state.weeksAfterVoluntaryResignation}
          onChange={(e) => update({ weeksAfterVoluntaryResignation: Number(e.target.value) })}
          inputMode="numeric"
        />
      )}
    </form>
  );
}
