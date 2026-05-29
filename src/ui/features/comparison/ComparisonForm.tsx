import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS, REGIONS_LIST, type RegionCode } from "@/domain/data";
import type { PaymentFrequency } from "@/domain/calc";
import type { ComparisonCalculator, ComparisonFormState } from "./useComparisonCalculator.ts";

const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14, 15, 16];

interface ComparisonFormProps {
  readonly calc: ComparisonCalculator;
}

export function ComparisonForm({ calc }: ComparisonFormProps) {
  const { state, update } = calc;
  const intl = useIntl();
  const municipalPercent = state.municipalTaxRate * 100;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Field
          label={<FormattedMessage id="comparison.form.ralA" />}
          type="number"
          min={0}
          max={500_000}
          step={500}
          value={state.ralA}
          onChange={(e) => update({ ralA: Math.max(0, Number(e.target.value)) })}
          trailing="€"
          inputMode="numeric"
        />

        <Field
          label={<FormattedMessage id="comparison.form.ralB" />}
          type="number"
          min={0}
          max={500_000}
          step={500}
          value={state.ralB}
          onChange={(e) => update({ ralB: Math.max(0, Number(e.target.value)) })}
          trailing="€"
          inputMode="numeric"
        />

        <Select
          label={<FormattedMessage id="employee.form.year" />}
          value={state.taxYear}
          onChange={(e) =>
            update({ taxYear: Number(e.target.value) as ComparisonFormState["taxYear"] })
          }
        >
          {SUPPORTED_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Select
          label={<FormattedMessage id="employee.form.paymentFrequency" />}
          value={state.paymentFrequency}
          onChange={(e) => update({ paymentFrequency: Number(e.target.value) as PaymentFrequency })}
        >
          {PAYMENT_FREQUENCIES.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </Select>

        <Select
          label={<FormattedMessage id="employee.form.region" />}
          value={state.regionCode}
          onChange={(e) => update({ regionCode: e.target.value as RegionCode })}
        >
          {REGIONS_LIST.map((region) => (
            <option key={region.code} value={region.code}>
              {region.name}
            </option>
          ))}
        </Select>

        <Field
          label={<FormattedMessage id="employee.form.municipal" />}
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={municipalPercent}
          onChange={(e) => update({ municipalTaxRate: Number(e.target.value) / 100 })}
          trailing={intl.formatMessage({ id: "inverse.form.municipal.percent" })}
          inputMode="decimal"
        />
      </Stack>
    </form>
  );
}
