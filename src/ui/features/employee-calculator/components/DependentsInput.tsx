import { FormattedMessage } from "react-intl";
import type { DependentsInput as DependentsInputType } from "@/domain/calc";
import { SHARED_DEPENDENTS_DEDUCTION } from "@/domain/data";
import { EnableToggle, Field, Money, Stack } from "@/ui/design-system/primitives";
import { clampInt, formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const SPOUSE_INCOME_LIMIT = SHARED_DEPENDENTS_DEDUCTION.dependentIncomeLimit;
const MAX_SPOUSE_INCOME = 100_000;
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

export function DependentsInput({ value, onChange }: DependentsInputProps) {
  const current = value ?? DEFAULT_VALUE;
  const enabled = value !== null;

  const toggle = (checked: boolean) => onChange(checked ? DEFAULT_VALUE : null);

  const spouseExceedsLimit = current.hasSpouse && (current.spouseIncome ?? 0) > SPOUSE_INCOME_LIMIT;

  return (
    <Stack gap="md">
      <EnableToggle checked={enabled} onChange={toggle} />

      {enabled && (
        <Stack gap="md">
          <EnableToggle
            checked={current.hasSpouse}
            onChange={(checked) => {
              if (checked) {
                onChange({ ...current, hasSpouse: true, spouseIncome: 0 });
              } else {
                onChange({
                  hasSpouse: false,
                  childrenOver21: current.childrenOver21,
                  otherDependents: current.otherDependents,
                });
              }
            }}
            labelId="employee.dependents.spouse"
          />

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
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={formatThousands(current.spouseIncome ?? 0)}
                onChange={(e) => {
                  const spouseIncome = Math.min(parseDigits(e.target.value), MAX_SPOUSE_INCOME);
                  onChange({ ...current, spouseIncome });
                }}
                trailing="€"
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
