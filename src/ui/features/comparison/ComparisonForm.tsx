import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS, REGIONS_LIST, type RegionCode } from "@/domain/data";
import type { PaymentFrequency } from "@/domain/calc";
import type { ComparisonCalculator, ComparisonFormState } from "./useComparisonCalculator.ts";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_RAL = 500_000;

const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14, 15, 16];

interface ComparisonFormProps {
  readonly calc: ComparisonCalculator;
}

export function ComparisonForm({ calc }: ComparisonFormProps) {
  const { state, update } = calc;
  const intl = useIntl();
  const municipalPercent = state.municipalTaxRate * 100;

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <Field
        label={<FormattedMessage id="comparison.form.ralA" />}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={formatThousands(state.ralA)}
        onChange={(e) => update({ ralA: Math.min(parseDigits(e.target.value), MAX_RAL) })}
        trailing="€"
      />

      <Field
        label={<FormattedMessage id="comparison.form.ralB" />}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={formatThousands(state.ralB)}
        onChange={(e) => update({ ralB: Math.min(parseDigits(e.target.value), MAX_RAL) })}
        trailing="€"
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
        onChange={(e) => update({ municipalTaxRate: Math.max(0, Number(e.target.value)) / 100 })}
        trailing={intl.formatMessage({ id: "inverse.form.municipal.percent" })}
        inputMode="decimal"
      />
    </form>
  );
}
