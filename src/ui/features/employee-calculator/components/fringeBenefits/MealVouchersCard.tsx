import { FormattedMessage } from "react-intl";
import type { MealVouchersInput } from "@/domain/data";
import { Field, Stack } from "@/ui/design-system/primitives";

interface MealVouchersCardProps {
  readonly value: MealVouchersInput;
  readonly onChange: (next: MealVouchersInput) => void;
}

export function MealVouchersCard({ value, onChange }: MealVouchersCardProps) {
  return (
    <Stack gap="md">
      <Field
        label={<FormattedMessage id="employee.fringe.mealVouchers.dailyValue" />}
        hint={<FormattedMessage id="employee.fringe.mealVouchers.dailyValue.hint" />}
        type="number"
        min={0}
        max={20}
        step={0.5}
        value={value.dailyValue}
        onChange={(e) => onChange({ ...value, dailyValue: Math.max(0, Number(e.target.value)) })}
        trailing="€"
        inputMode="decimal"
      />
      <Field
        label={<FormattedMessage id="employee.fringe.mealVouchers.workingDays" />}
        hint={<FormattedMessage id="employee.fringe.mealVouchers.workingDays.hint" />}
        type="number"
        min={1}
        max={26}
        value={value.workingDaysPerMonth}
        onChange={(e) =>
          onChange({
            ...value,
            workingDaysPerMonth: Math.max(1, Math.min(26, Number(e.target.value))),
          })
        }
        inputMode="numeric"
      />
    </Stack>
  );
}
