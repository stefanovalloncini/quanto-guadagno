import { FormattedMessage } from "react-intl";
import type { DependentsInput as DependentsInputType } from "@/domain/calc";
import { Field, Money, Stack } from "@/ui/design-system/primitives";

// Income limit for spouse dependent deduction (Art. 12 TUIR).
// Matches the value in domain config (shared across all years).
const SPOUSE_INCOME_LIMIT = 2_840.51;
const MAX_CHILDREN = 10;
const MAX_OTHER = 10;

interface DependentsInputProps {
  readonly value: DependentsInputType | null;
  readonly onChange: (next: DependentsInputType | null) => void;
}

const DEFAULT_VALUE: DependentsInputType = {
  hasSpouse: false,
  childrenOver21: 0,
  otherDependents: 0,
};

function clampInt(raw: string, min: number, max: number): number {
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export function DependentsInput({ value, onChange }: DependentsInputProps) {
  const current = value ?? DEFAULT_VALUE;
  const enabled = value !== null;

  const toggle = (checked: boolean) => onChange(checked ? DEFAULT_VALUE : null);

  const spouseExceedsLimit = current.hasSpouse && (current.spouseIncome ?? 0) > SPOUSE_INCOME_LIMIT;

  return (
    <Stack gap="md">
      <label className="qg-toggle">
        <input
          type="checkbox"
          className="qg-toggle__input"
          checked={enabled}
          onChange={(e) => toggle(e.target.checked)}
        />
        <span className="qg-toggle__label">
          <FormattedMessage id="employee.extras.toggle.enable" />
        </span>
      </label>

      {enabled && (
        <Stack gap="md">
          <label className="qg-toggle">
            <input
              type="checkbox"
              className="qg-toggle__input"
              checked={current.hasSpouse}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  onChange({ ...current, hasSpouse: true, spouseIncome: 0 });
                } else {
                  // Drop spouseIncome key entirely (exactOptionalPropertyTypes)
                  onChange({
                    hasSpouse: false,
                    childrenOver21: current.childrenOver21,
                    otherDependents: current.otherDependents,
                  });
                }
              }}
            />
            <span className="qg-toggle__label">
              <FormattedMessage id="employee.dependents.spouse" />
            </span>
          </label>

          {current.hasSpouse && (
            <div className="qg-extras__indent">
              <Field
                label={<FormattedMessage id="employee.dependents.spouseIncome" />}
                hint={
                  spouseExceedsLimit ? undefined : (
                    <FormattedMessage
                      id="employee.dependents.spouseIncome.hint"
                      values={{ limit: <Money amount={SPOUSE_INCOME_LIMIT} /> }}
                    />
                  )
                }
                error={
                  spouseExceedsLimit ? (
                    <FormattedMessage
                      id="employee.dependents.spouseIncome.warningDetails"
                      values={{ limit: <Money amount={SPOUSE_INCOME_LIMIT} /> }}
                    />
                  ) : undefined
                }
                type="number"
                min={0}
                max={100_000}
                step={100}
                value={current.spouseIncome ?? 0}
                onChange={(e) => {
                  const spouseIncome = Math.max(0, Number(e.target.value));
                  onChange({ ...current, spouseIncome });
                }}
                trailing="€"
                inputMode="numeric"
              />
            </div>
          )}

          <Field
            label={<FormattedMessage id="employee.dependents.childrenOver21" />}
            hint={<FormattedMessage id="employee.dependents.childrenOver21.hint" />}
            type="number"
            min={0}
            max={MAX_CHILDREN}
            value={current.childrenOver21}
            onChange={(e) =>
              onChange({ ...current, childrenOver21: clampInt(e.target.value, 0, MAX_CHILDREN) })
            }
            inputMode="numeric"
          />

          <Field
            label={<FormattedMessage id="employee.dependents.otherDependents" />}
            hint={<FormattedMessage id="employee.dependents.otherDependents.hint" />}
            type="number"
            min={0}
            max={MAX_OTHER}
            value={current.otherDependents}
            onChange={(e) =>
              onChange({
                ...current,
                otherDependents: clampInt(e.target.value, 0, MAX_OTHER),
              })
            }
            inputMode="numeric"
          />
        </Stack>
      )}
    </Stack>
  );
}
