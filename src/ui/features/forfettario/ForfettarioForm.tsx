import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import {
  ACTIVITY_COEFFICIENTS,
  ACTIVITY_CATEGORIES,
  SHARED_FORFETTARIO,
  SUPPORTED_YEARS,
} from "@/domain/data";
import { formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";
import type { Gestion } from "@/domain/calc";
import type { ForfettarioCalculator, ForfettarioFormState } from "./useForfettarioCalculator.ts";

const GESTION_OPTIONS: ReadonlyArray<Gestion> = [
  "gestione-separata",
  "artigiani",
  "commercianti",
  "cassa-professionale",
];

interface ForfettarioFormProps {
  readonly calc: ForfettarioCalculator;
}

export function ForfettarioForm({ calc }: ForfettarioFormProps) {
  const { state, update } = calc;
  const intl = useIntl();
  const employeeCostLimit = formatCurrencyWhole(SHARED_FORFETTARIO.maxEmployeeCosts);
  const isArtCom = state.gestion === "artigiani" || state.gestion === "commercianti";
  const isCassaManual = state.gestion === "cassa-professionale";

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
          onChange={(e) => update({ activity: e.target.value as ForfettarioFormState["activity"] })}
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
          onChange={(e) => update({ year: Number(e.target.value) as ForfettarioFormState["year"] })}
        >
          {SUPPORTED_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Select
          label={<FormattedMessage id="forfettario.form.gestion" />}
          hint={<FormattedMessage id="forfettario.form.gestion.hint" />}
          value={state.gestion}
          onChange={(e) => update({ gestion: e.target.value as Gestion })}
        >
          {GESTION_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {intl.formatMessage({ id: `forfettario.form.gestion.${g}` })}
            </option>
          ))}
        </Select>

        {isCassaManual && (
          <Field
            label={<FormattedMessage id="forfettario.form.cassaManualAmount" />}
            hint={<FormattedMessage id="forfettario.form.cassaManualAmount.hint" />}
            type="number"
            min={0}
            step={100}
            value={state.cassaManualAmount === 0 ? "" : state.cassaManualAmount}
            placeholder="0"
            onChange={(e) => update({ cassaManualAmount: Number(e.target.value) })}
            trailing="€"
            inputMode="numeric"
          />
        )}

        {isArtCom && (
          <Field
            label={<FormattedMessage id="forfettario.form.mesiAttivita" />}
            hint={<FormattedMessage id="forfettario.form.mesiAttivita.hint" />}
            type="number"
            min={1}
            max={12}
            step={1}
            value={state.mesiAttivita}
            onChange={(e) => update({ mesiAttivita: Number(e.target.value) })}
            inputMode="numeric"
          />
        )}

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

        <label className="qg-toggle">
          <input
            type="checkbox"
            className="qg-toggle__input"
            checked={state.isConcurrentFullTimeEmployee}
            onChange={(e) => update({ isConcurrentFullTimeEmployee: e.target.checked })}
          />
          <span className="qg-toggle__label">
            <FormattedMessage id="forfettario.form.isConcurrentFullTimeEmployee" />
          </span>
        </label>

        {state.isConcurrentFullTimeEmployee && (
          <Field
            label={<FormattedMessage id="forfettario.form.concurrentEmployeeRal" />}
            hint={<FormattedMessage id="forfettario.form.concurrentEmployeeRal.hint" />}
            type="number"
            min={0}
            step={500}
            value={state.concurrentEmployeeRal === 0 ? "" : state.concurrentEmployeeRal}
            placeholder="0"
            onChange={(e) => update({ concurrentEmployeeRal: Number(e.target.value) })}
            trailing="€"
            inputMode="numeric"
          />
        )}

        {isArtCom && (
          <>
            <label className="qg-toggle">
              <input
                type="checkbox"
                className="qg-toggle__input"
                checked={state.forfettarioDiscount35}
                disabled={state.newRegistrantDiscount50}
                onChange={(e) => update({ forfettarioDiscount35: e.target.checked })}
              />
              <span className="qg-toggle__label">
                <FormattedMessage id="forfettario.form.forfettarioDiscount35" />
              </span>
            </label>

            <label className="qg-toggle">
              <input
                type="checkbox"
                className="qg-toggle__input"
                checked={state.newRegistrantDiscount50}
                disabled={state.forfettarioDiscount35}
                onChange={(e) => update({ newRegistrantDiscount50: e.target.checked })}
              />
              <span className="qg-toggle__label">
                <FormattedMessage id="forfettario.form.newRegistrantDiscount50" />
              </span>
            </label>
          </>
        )}

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
