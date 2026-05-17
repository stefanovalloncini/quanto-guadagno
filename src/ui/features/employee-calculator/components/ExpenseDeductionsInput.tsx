import { FormattedMessage } from "react-intl";
import type { ExpenseDeductionsInput as ExpenseDeductionsInputType } from "@/domain/calc";
import { EnableToggle, Field, Stack } from "@/ui/design-system/primitives";

interface ExpenseDeductionsInputProps {
  readonly value: ExpenseDeductionsInputType | null;
  readonly onChange: (next: ExpenseDeductionsInputType | null) => void;
}

const DEFAULT_VALUE: ExpenseDeductionsInputType = {
  mortgageInterest: 0,
  medicalExpenses: 0,
  otherDeductions: 0,
};

export function ExpenseDeductionsInput({ value, onChange }: ExpenseDeductionsInputProps) {
  const current = value ?? DEFAULT_VALUE;
  const enabled = value !== null;

  const toggle = (checked: boolean) => onChange(checked ? DEFAULT_VALUE : null);

  return (
    <Stack gap="md">
      <EnableToggle checked={enabled} onChange={toggle} />

      {enabled && (
        <Stack gap="md">
          <Field
            label={<FormattedMessage id="employee.expenses.mortgageInterest" />}
            hint={<FormattedMessage id="employee.expenses.mortgageInterest.hint" />}
            type="number"
            min={0}
            max={100_000}
            step={100}
            value={current.mortgageInterest}
            onChange={(e) =>
              onChange({ ...current, mortgageInterest: Math.max(0, Number(e.target.value)) })
            }
            trailing="€"
            inputMode="numeric"
          />

          <Field
            label={<FormattedMessage id="employee.expenses.medicalExpenses" />}
            hint={<FormattedMessage id="employee.expenses.medicalExpenses.hint" />}
            type="number"
            min={0}
            max={100_000}
            step={100}
            value={current.medicalExpenses}
            onChange={(e) =>
              onChange({ ...current, medicalExpenses: Math.max(0, Number(e.target.value)) })
            }
            trailing="€"
            inputMode="numeric"
          />

          <Field
            label={<FormattedMessage id="employee.expenses.otherDeductions" />}
            hint={<FormattedMessage id="employee.expenses.otherDeductions.hint" />}
            type="number"
            min={0}
            max={100_000}
            step={100}
            value={current.otherDeductions}
            onChange={(e) =>
              onChange({ ...current, otherDeductions: Math.max(0, Number(e.target.value)) })
            }
            trailing="€"
            inputMode="numeric"
          />
        </Stack>
      )}
    </Stack>
  );
}
