import { FormattedMessage } from "react-intl";
import type { WelfareInput } from "@/domain/data";
import { Field, Stack } from "@/ui/design-system/primitives";

interface WelfareCardProps {
  readonly value: WelfareInput;
  readonly onChange: (next: WelfareInput) => void;
}

export function WelfareCard({ value, onChange }: WelfareCardProps) {
  return (
    <Stack gap="md">
      <Field
        label={<FormattedMessage id="employee.fringe.welfare.annualAmount" />}
        hint={
          value.hasChildrenUnder18 ? (
            <FormattedMessage id="employee.fringe.welfare.annualAmount.hintWithChildren" />
          ) : (
            <FormattedMessage id="employee.fringe.welfare.annualAmount.hint" />
          )
        }
        type="number"
        min={0}
        max={20_000}
        step={100}
        value={value.annualAmount}
        onChange={(e) => onChange({ ...value, annualAmount: Math.max(0, Number(e.target.value)) })}
        trailing="€"
        inputMode="numeric"
      />
      <label className="qg-toggle">
        <input
          type="checkbox"
          className="qg-toggle__input"
          checked={value.hasChildrenUnder18}
          onChange={(e) => onChange({ ...value, hasChildrenUnder18: e.target.checked })}
        />
        <span className="qg-toggle__label">
          <FormattedMessage id="employee.fringe.welfare.hasChildren" />
        </span>
      </label>
    </Stack>
  );
}
