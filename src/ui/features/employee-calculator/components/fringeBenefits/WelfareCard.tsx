import { FormattedMessage, useIntl } from "react-intl";
import type { WelfareInput } from "@/domain/data";
import { Field, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT } from "@/ui/shared/numeric.ts";

interface WelfareCardProps {
  readonly value: WelfareInput;
  readonly onChange: (next: WelfareInput) => void;
  readonly generalThreshold: number;
  readonly childrenThreshold: number;
}

export function WelfareCard({
  value,
  onChange,
  generalThreshold,
  childrenThreshold,
}: WelfareCardProps) {
  const intl = useIntl();
  return (
    <Stack gap="md">
      <Field
        label={<FormattedMessage id="employee.fringe.welfare.annualAmount" />}
        hint={
          value.hasDependentChildren ? (
            <FormattedMessage
              id="employee.fringe.welfare.annualAmount.hintWithChildren"
              values={{ amount: intl.formatNumber(childrenThreshold, EUR_AMOUNT_FORMAT) }}
            />
          ) : (
            <FormattedMessage
              id="employee.fringe.welfare.annualAmount.hint"
              values={{ amount: intl.formatNumber(generalThreshold, EUR_AMOUNT_FORMAT) }}
            />
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
          checked={value.hasDependentChildren}
          onChange={(e) => onChange({ ...value, hasDependentChildren: e.target.checked })}
        />
        <span className="qg-toggle__label">
          <FormattedMessage id="employee.fringe.welfare.hasChildren" />
        </span>
      </label>
    </Stack>
  );
}
