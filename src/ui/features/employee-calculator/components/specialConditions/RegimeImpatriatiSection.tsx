import { FormattedMessage } from "react-intl";
import type { RegimeImpatriatiInput } from "@/domain/calc";
import { OptionToggle } from "@/ui/design-system/primitives";

interface RegimeImpatriatiSectionProps {
  readonly value: RegimeImpatriatiInput | undefined;
  readonly onChange: (next: RegimeImpatriatiInput | undefined) => void;
}

export function RegimeImpatriatiSection({ value, onChange }: RegimeImpatriatiSectionProps) {
  const enabled = value?.enabled ?? false;

  return (
    <OptionToggle
      checked={enabled}
      onChange={(c) => onChange(c ? { enabled: true, hasMinorChildren: false } : undefined)}
      label={<FormattedMessage id="employee.specialConditions.regimeImpatriati.label" />}
      hint={<FormattedMessage id="employee.specialConditions.regimeImpatriati.hint" />}
    >
      {value && (
        <OptionToggle
          checked={value.hasMinorChildren}
          onChange={(c) => onChange({ ...value, hasMinorChildren: c })}
          label={
            <FormattedMessage id="employee.specialConditions.regimeImpatriati.minorChildren" />
          }
          hint={
            <FormattedMessage id="employee.specialConditions.regimeImpatriati.minorChildren.hint" />
          }
        />
      )}
    </OptionToggle>
  );
}
