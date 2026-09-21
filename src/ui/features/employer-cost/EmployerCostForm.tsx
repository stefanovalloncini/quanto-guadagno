import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS } from "@/domain/data";
import type { ContractType } from "@/domain/calc";
import type { EmployerCostCalculator, EmployerCostFormState } from "./useEmployerCostCalculator.ts";

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

interface EmployerCostFormProps {
  readonly calc: EmployerCostCalculator;
}

export function EmployerCostForm({ calc }: EmployerCostFormProps) {
  const { state, update } = calc;
  const intl = useIntl();

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <Field
        label={<FormattedMessage id="employee.form.salary" />}
        type="number"
        min={0}
        max={500_000}
        step={500}
        value={state.grossAnnual}
        onChange={(e) => update({ grossAnnual: Math.max(0, Number(e.target.value)) })}
        trailing="€"
        inputMode="numeric"
      />

      <Select
        label={<FormattedMessage id="employee.form.year" />}
        value={state.taxYear}
        onChange={(e) =>
          update({ taxYear: Number(e.target.value) as EmployerCostFormState["taxYear"] })
        }
      >
        {SUPPORTED_YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>

      <Select
        label={<FormattedMessage id="employee.form.contractType" />}
        value={state.contractType}
        onChange={(e) => update({ contractType: e.target.value as ContractType })}
      >
        {CONTRACT_TYPES.map((c) => (
          <option key={c} value={c}>
            {intl.formatMessage({ id: `employee.form.contractType.${c}` })}
          </option>
        ))}
      </Select>
    </form>
  );
}
