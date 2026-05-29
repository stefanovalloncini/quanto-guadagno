import { FormattedMessage, useIntl } from "react-intl";
import type { MealVouchersInput, MealVoucherType } from "@/domain/data";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT } from "@/ui/shared/numeric.ts";

interface MealVouchersCardProps {
  readonly value: MealVouchersInput;
  readonly onChange: (next: MealVouchersInput) => void;
  readonly electronicThreshold: number;
  readonly paperThreshold: number;
}

const TYPES: ReadonlyArray<MealVoucherType> = ["electronic", "paper"];

export function MealVouchersCard({
  value,
  onChange,
  electronicThreshold,
  paperThreshold,
}: MealVouchersCardProps) {
  const intl = useIntl();
  const threshold = value.type === "paper" ? paperThreshold : electronicThreshold;

  return (
    <Stack gap="md">
      <Select
        label={<FormattedMessage id="employee.fringe.mealVouchers.type" />}
        value={value.type ?? "electronic"}
        onChange={(e) => onChange({ ...value, type: e.target.value as MealVoucherType })}
      >
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {intl.formatMessage({ id: `employee.fringe.mealVouchers.type.${t}` })}
          </option>
        ))}
      </Select>

      <Field
        label={<FormattedMessage id="employee.fringe.mealVouchers.dailyValue" />}
        hint={
          <FormattedMessage
            id="employee.fringe.mealVouchers.dailyValue.hint"
            values={{ amount: intl.formatNumber(threshold, EUR_AMOUNT_FORMAT) }}
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
