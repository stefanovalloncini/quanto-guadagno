import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import type {
  CompoundInterestCalculator,
  CompoundInterestFormState,
} from "./useCompoundInterestCalculator.ts";

interface CompoundInterestFormProps {
  readonly calc: CompoundInterestCalculator;
}

export function CompoundInterestForm({ calc }: CompoundInterestFormProps) {
  const { state, update } = calc;
  const intl = useIntl();
  const ratePct = Number((state.annualRate * 100).toFixed(2));
  const inflationPct = Number((state.inflationRate * 100).toFixed(2));

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="compoundInterest.form.principal" />}
          hint={<FormattedMessage id="compoundInterest.form.principal.hint" />}
          type="number"
          min={0}
          step={100}
          value={state.principal}
          onChange={(e) => update({ principal: Number(e.target.value) })}
          trailing="€"
          inputMode="numeric"
        />

        <Field
          label={<FormattedMessage id="compoundInterest.form.annualRate" />}
          hint={<FormattedMessage id="compoundInterest.form.annualRate.hint" />}
          type="number"
          min={0}
          max={50}
          step={0.1}
          value={ratePct}
          onChange={(e) => update({ annualRate: Number(e.target.value) / 100 })}
          trailing="%"
          inputMode="decimal"
        />

        <Field
          label={<FormattedMessage id="compoundInterest.form.years" />}
          type="number"
          min={1}
          max={60}
          step={1}
          value={state.years}
          onChange={(e) => update({ years: Number(e.target.value) })}
          trailing={intl.formatMessage({ id: "compoundInterest.form.years.unit" })}
          inputMode="numeric"
        />

        <Field
          label={<FormattedMessage id="compoundInterest.form.contribution" />}
          hint={<FormattedMessage id="compoundInterest.form.contribution.hint" />}
          type="number"
          min={0}
          step={50}
          value={state.contribution === 0 ? "" : state.contribution}
          placeholder="0"
          onChange={(e) => update({ contribution: Number(e.target.value) })}
          trailing="€"
          inputMode="numeric"
        />

        <Select
          label={<FormattedMessage id="compoundInterest.form.contributionFrequency" />}
          value={state.contributionFrequency}
          onChange={(e) =>
            update({
              contributionFrequency: e.target
                .value as CompoundInterestFormState["contributionFrequency"],
            })
          }
        >
          <option value="monthly">
            {intl.formatMessage({ id: "compoundInterest.form.contributionFrequency.monthly" })}
          </option>
          <option value="yearly">
            {intl.formatMessage({ id: "compoundInterest.form.contributionFrequency.yearly" })}
          </option>
          <option value="none">
            {intl.formatMessage({ id: "compoundInterest.form.contributionFrequency.none" })}
          </option>
        </Select>

        <Select
          label={<FormattedMessage id="compoundInterest.form.compoundingFrequency" />}
          value={state.compoundingFrequency}
          onChange={(e) =>
            update({
              compoundingFrequency: e.target
                .value as CompoundInterestFormState["compoundingFrequency"],
            })
          }
        >
          <option value="annually">
            {intl.formatMessage({ id: "compoundInterest.form.compoundingFrequency.annually" })}
          </option>
          <option value="monthly">
            {intl.formatMessage({ id: "compoundInterest.form.compoundingFrequency.monthly" })}
          </option>
          <option value="daily">
            {intl.formatMessage({ id: "compoundInterest.form.compoundingFrequency.daily" })}
          </option>
        </Select>

        <Field
          label={<FormattedMessage id="compoundInterest.form.inflationRate" />}
          hint={<FormattedMessage id="compoundInterest.form.inflationRate.hint" />}
          type="number"
          min={0}
          max={20}
          step={0.1}
          value={inflationPct}
          onChange={(e) => update({ inflationRate: Number(e.target.value) / 100 })}
          trailing="%"
          inputMode="decimal"
        />
      </Stack>
    </form>
  );
}
