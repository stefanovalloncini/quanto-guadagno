import { FormattedMessage } from "react-intl";
import type { MadreLavoratriceInput } from "@/domain/calc";
import { Field, OptionToggle, Stack } from "@/ui/design-system/primitives";
import { clampInt } from "@/ui/shared/numeric.ts";

interface MadreLavoratriceSectionProps {
  readonly value: MadreLavoratriceInput | undefined;
  readonly onChange: (next: MadreLavoratriceInput | undefined) => void;
}

const DEFAULT: MadreLavoratriceInput = { enabled: true, numberOfChildren: 3, youngestChildAge: 5 };

export function MadreLavoratriceSection({ value, onChange }: MadreLavoratriceSectionProps) {
  const enabled = value?.enabled ?? false;

  const notEnoughChildren = enabled && value !== undefined && value.numberOfChildren < 3;
  const childTooOld = enabled && value !== undefined && value.youngestChildAge >= 18;
  const eligible = enabled && value !== undefined && !notEnoughChildren && !childTooOld;

  return (
    <OptionToggle
      checked={enabled}
      onChange={(c) => onChange(c ? DEFAULT : undefined)}
      label={<FormattedMessage id="employee.specialConditions.madreLavoratrice.label" />}
      hint={<FormattedMessage id="employee.specialConditions.madreLavoratrice.hint" />}
    >
      {value && (
        <Stack gap="md">
          <Field
            compact
            label={
              <FormattedMessage id="employee.specialConditions.madreLavoratrice.numberOfChildren" />
            }
            type="number"
            min={1}
            max={10}
            value={value.numberOfChildren}
            onChange={(e) =>
              onChange({ ...value, numberOfChildren: clampInt(e.target.value, 1, 10) })
            }
            inputMode="numeric"
          />

          <Field
            compact
            label={
              <FormattedMessage id="employee.specialConditions.madreLavoratrice.youngestChildAge" />
            }
            type="number"
            min={0}
            max={17}
            value={value.youngestChildAge}
            onChange={(e) =>
              onChange({ ...value, youngestChildAge: clampInt(e.target.value, 0, 17) })
            }
            trailing={<FormattedMessage id="employee.specialConditions.madreLavoratrice.years" />}
            inputMode="numeric"
          />

          {notEnoughChildren && (
            <div className="qg-note">
              <p className="qg-note__text">
                <FormattedMessage id="employee.specialConditions.madreLavoratrice.notEligible.children" />
              </p>
            </div>
          )}

          {childTooOld && (
            <div className="qg-note">
              <p className="qg-note__text">
                <FormattedMessage id="employee.specialConditions.madreLavoratrice.notEligible.age" />
              </p>
            </div>
          )}

          {eligible && (
            <div className="qg-note">
              <p className="qg-note__text">
                <FormattedMessage id="employee.specialConditions.madreLavoratrice.eligible" />
              </p>
            </div>
          )}
        </Stack>
      )}
    </OptionToggle>
  );
}
