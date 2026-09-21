import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS, REGIONS_LIST, type RegionCode } from "@/domain/data";
import type { PaymentFrequency } from "@/domain/calc";
import type { InverseCalculator, InverseFormState } from "./useInverseCalculator.ts";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_TARGET_NET = 500_000;

const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14, 15, 16];

interface InverseFormProps {
  readonly calc: InverseCalculator;
}

export function InverseForm({ calc }: InverseFormProps) {
  const { state, update } = calc;
  const intl = useIntl();
  const municipalPercent = state.municipalTaxRate * 100;

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <Field
        label={<FormattedMessage id="inverse.form.targetNetAnnual" />}
        hint={<FormattedMessage id="inverse.form.targetNetAnnual.hint" />}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={formatThousands(state.targetNetAnnual)}
        onChange={(e) =>
          update({ targetNetAnnual: Math.min(parseDigits(e.target.value), MAX_TARGET_NET) })
        }
        trailing="€"
      />

      <Select
        label={<FormattedMessage id="employee.form.year" />}
        value={state.taxYear}
        onChange={(e) => update({ taxYear: Number(e.target.value) as InverseFormState["taxYear"] })}
      >
        {SUPPORTED_YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>

      <Select
        label={<FormattedMessage id="employee.form.paymentFrequency" />}
        hint={
          <FormattedMessage id={`employee.form.paymentFrequency.option${state.paymentFrequency}`} />
        }
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
    </form>
  );
}
