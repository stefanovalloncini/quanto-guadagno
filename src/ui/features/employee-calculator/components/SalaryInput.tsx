import { FormattedMessage } from "react-intl";
import { Field, Money } from "@/ui/design-system/primitives";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

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
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={formatThousands(value)}
      onChange={(e) => {
        const n = Math.min(parseDigits(e.target.value), MAX_GROSS);
        onChange(n);
      }}
      trailing="€"
    />
  );
}
