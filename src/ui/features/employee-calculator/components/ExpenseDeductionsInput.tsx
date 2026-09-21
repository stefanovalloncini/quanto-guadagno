import { FormattedMessage } from "react-intl";
import type { ExpenseDeductionsInput as ExpenseDeductionsInputType } from "@/domain/calc";
import { EnableToggle, Field, Stack } from "@/ui/design-system/primitives";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_EXPENSE = 100_000;

interface ExpenseDeductionsInputProps {
  readonly value: ExpenseDeductionsInputType | null;
  readonly onChange: (next: ExpenseDeductionsInputType | null) => void;
}

const DEFAULT_VALUE: ExpenseDeductionsInputType = {
  mortgageInterest: 0,
  medicalExpenses: 0,
  otherDeductions: 0,
  pensionFund: 0,
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
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatThousands(current.mortgageInterest)}
            onChange={(e) =>
              onChange({
                ...current,
                mortgageInterest: Math.min(parseDigits(e.target.value), MAX_EXPENSE),
              })
            }
            trailing="€"
          />

          <Field
            label={<FormattedMessage id="employee.expenses.medicalExpenses" />}
            hint={<FormattedMessage id="employee.expenses.medicalExpenses.hint" />}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatThousands(current.medicalExpenses)}
            onChange={(e) =>
              onChange({
                ...current,
                medicalExpenses: Math.min(parseDigits(e.target.value), MAX_EXPENSE),
              })
            }
            trailing="€"
          />

          <Field
            label={<FormattedMessage id="employee.expenses.otherDeductions" />}
            hint={<FormattedMessage id="employee.expenses.otherDeductions.hint" />}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatThousands(current.otherDeductions)}
            onChange={(e) =>
              onChange({
                ...current,
                otherDeductions: Math.min(parseDigits(e.target.value), MAX_EXPENSE),
              })
            }
            trailing="€"
          />

          <Field
            label={<FormattedMessage id="employee.expenses.pensionFund" />}
            hint={<FormattedMessage id="employee.expenses.pensionFund.hint" />}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatThousands(current.pensionFund ?? 0)}
            onChange={(e) =>
              onChange({
                ...current,
                pensionFund: Math.min(parseDigits(e.target.value), MAX_EXPENSE),
              })
            }
            trailing="€"
          />
        </Stack>
      )}
    </Stack>
  );
}
