import { useId } from "react";
import { FormattedMessage } from "react-intl";
import type { MadreLavoratriceInput } from "@/domain/calc";
import { OptionToggle, Stack } from "@/ui/design-system/primitives";

interface MadreLavoratriceSectionProps {
  readonly value: MadreLavoratriceInput | undefined;
  readonly onChange: (next: MadreLavoratriceInput | undefined) => void;
}

const DEFAULT: MadreLavoratriceInput = { enabled: true, numberOfChildren: 3, youngestChildAge: 5 };

function clampInt(raw: string, min: number, max: number): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export function MadreLavoratriceSection({ value, onChange }: MadreLavoratriceSectionProps) {
  const countId = useId();
  const ageId = useId();
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
          <div className="qg-field">
            <label className="qg-field__label" htmlFor={countId}>
              <FormattedMessage id="employee.specialConditions.madreLavoratrice.numberOfChildren" />
            </label>
            <div className="qg-field__row">
              <input
                id={countId}
                type="number"
                min={1}
                max={10}
                value={value.numberOfChildren}
                onChange={(e) =>
                  onChange({ ...value, numberOfChildren: clampInt(e.target.value, 1, 10) })
                }
                className="qg-field__input"
                style={{ maxWidth: "6rem" }}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="qg-field">
            <label className="qg-field__label" htmlFor={ageId}>
              <FormattedMessage id="employee.specialConditions.madreLavoratrice.youngestChildAge" />
            </label>
            <div className="qg-field__row">
              <input
                id={ageId}
                type="number"
                min={0}
                max={17}
                value={value.youngestChildAge}
                onChange={(e) =>
                  onChange({ ...value, youngestChildAge: clampInt(e.target.value, 0, 17) })
                }
                className="qg-field__input"
                style={{ maxWidth: "6rem" }}
                inputMode="numeric"
              />
              <span
                className="qg-field__trailing"
                style={{ position: "static", marginLeft: "var(--space-2)" }}
              >
                <FormattedMessage id="employee.specialConditions.madreLavoratrice.years" />
              </span>
            </div>
          </div>

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
