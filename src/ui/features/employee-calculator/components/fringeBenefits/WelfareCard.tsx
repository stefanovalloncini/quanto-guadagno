import { FormattedMessage, useIntl } from "react-intl";
import type { WelfareInput } from "@/domain/data";
import { Field, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT, formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_WELFARE = 20_000;

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
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={formatThousands(value.annualAmount)}
        onChange={(e) =>
          onChange({ ...value, annualAmount: Math.min(parseDigits(e.target.value), MAX_WELFARE) })
        }
        trailing="€"
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
