import { FormattedMessage } from "react-intl";
import { Field, Money } from "@/ui/design-system/primitives";

const MAX_GROSS = 1_000_000;

interface SalaryInputProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly grossMonthly: number;
}

export function SalaryInput({ value, onChange, grossMonthly }: SalaryInputProps) {
  return (
    <Field
      label={<FormattedMessage id="employee.form.salary" />}
      hint={
        <FormattedMessage
          id="employee.form.salary.monthly"
          values={{ amount: <Money amount={grossMonthly} whole /> }}
        />
      }
      type="number"
      min={1}
      max={MAX_GROSS}
      step={100}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      trailing="€"
      inputMode="numeric"
    />
  );
}
