import { FormattedMessage, useIntl } from "react-intl";
import type { MealVouchersInput } from "@/domain/data";
import { Field, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT } from "@/ui/shared/numeric.ts";

interface MealVouchersCardProps {
  readonly value: MealVouchersInput;
  readonly onChange: (next: MealVouchersInput) => void;
  readonly dailyThreshold: number;
}

export function MealVouchersCard({ value, onChange, dailyThreshold }: MealVouchersCardProps) {
  const intl = useIntl();
  return (
    <Stack gap="md">
      <Field
        label={<FormattedMessage id="employee.fringe.mealVouchers.dailyValue" />}
        hint={
          <FormattedMessage
            id="employee.fringe.mealVouchers.dailyValue.hint"
            values={{ amount: intl.formatNumber(dailyThreshold, EUR_AMOUNT_FORMAT) }}
          />
        }
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
