import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import {
  ACTIVITY_COEFFICIENTS,
  ACTIVITY_CATEGORIES,
  SHARED_FORFETTARIO,
  SUPPORTED_YEARS,
} from "@/domain/data";
import { formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";
import type { ForfettarioCalculator } from "./useForfettarioCalculator.ts";

interface ForfettarioFormProps {
  readonly calc: ForfettarioCalculator;
}

export function ForfettarioForm({ calc }: ForfettarioFormProps) {
  const { state, update } = calc;
  const employeeCostLimit = formatCurrencyWhole(SHARED_FORFETTARIO.maxEmployeeCosts);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="forfettario.form.revenue" />}
          hint={<FormattedMessage id="forfettario.form.revenue.hint" />}
          type="number"
          min={0}
          max={500_000}
          step={1000}
          value={state.revenue}
          onChange={(e) => update({ revenue: Number(e.target.value) })}
          trailing="€"
          inputMode="numeric"
        />

        <Select
          label={<FormattedMessage id="forfettario.form.activity" />}
          hint={<FormattedMessage id="forfettario.form.activity.hint" />}
          value={state.activity}
          onChange={(e) => update({ activity: e.target.value as typeof state.activity })}
        >
          {ACTIVITY_CATEGORIES.map((cat) => {
            const def = ACTIVITY_COEFFICIENTS[cat];
            return (
              <option key={cat} value={cat}>
                {def.label} ({formatPercentage(def.coefficient)})
              </option>
            );
          })}
        </Select>

        <Select
          label={<FormattedMessage id="forfettario.form.year" />}
          hint={<FormattedMessage id="forfettario.form.year.hint" />}
          value={state.year}
          onChange={(e) => update({ year: Number(e.target.value) as typeof state.year })}
        >
          {SUPPORTED_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Field
          label={<FormattedMessage id="forfettario.form.yearsOfActivity" />}
          hint={<FormattedMessage id="forfettario.form.yearsOfActivity.hint" />}
          type="number"
          min={1}
          max={50}
          step={1}
          value={state.yearsOfActivity}
          onChange={(e) => update({ yearsOfActivity: Number(e.target.value) })}
          inputMode="numeric"
        />

        <label className="qg-toggle">
          <input
            type="checkbox"
            className="qg-toggle__input"
            checked={state.hasOtherPension}
            onChange={(e) => update({ hasOtherPension: e.target.checked })}
          />
          <span className="qg-toggle__label">
            <FormattedMessage id="forfettario.form.hasOtherPension" />
          </span>
        </label>

        <Field
          label={<FormattedMessage id="forfettario.form.employeeCosts" />}
          hint={
            <FormattedMessage
              id="forfettario.form.employeeCosts.hint"
              values={{ limit: employeeCostLimit }}
            />
          }
          type="number"
          min={0}
          max={100_000}
          step={500}
          value={state.employeeCosts === 0 ? "" : state.employeeCosts}
          placeholder="0"
          onChange={(e) => update({ employeeCosts: Number(e.target.value) })}
          trailing="€"
          inputMode="numeric"
        />
      </Stack>
    </form>
  );
}
