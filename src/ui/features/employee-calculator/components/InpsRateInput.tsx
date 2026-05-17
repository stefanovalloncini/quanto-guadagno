import { FormattedMessage } from "react-intl";
import type { CompanySize, InpsRateOverride } from "@/domain/calc";
import { Field, OptionToggle, Stack } from "@/ui/design-system/primitives";

export interface InpsRateInputValue {
  readonly companySize: CompanySize;
  readonly isPublicEmployee: boolean;
  readonly inpsOverride: InpsRateOverride | null;
}

interface InpsRateInputProps {
  readonly value: InpsRateInputValue;
  readonly onChange: (next: InpsRateInputValue) => void;
}

const DEFAULT_OVERRIDE: InpsRateOverride = { employeeRate: 0.0919, employerRate: 0.2381 };

export function InpsRateInput({ value, onChange }: InpsRateInputProps) {
  const override = value.inpsOverride;

  return (
    <Stack gap="md">
      <OptionToggle
        checked={value.companySize === "large"}
        onChange={(checked) => onChange({ ...value, companySize: checked ? "large" : "small" })}
        label={<FormattedMessage id="employee.inpsRates.largeCompany.label" />}
        hint={<FormattedMessage id="employee.inpsRates.largeCompany.hint" />}
      />

      <OptionToggle
        checked={value.isPublicEmployee}
        onChange={(checked) => onChange({ ...value, isPublicEmployee: checked })}
        label={<FormattedMessage id="employee.inpsRates.publicEmployee.label" />}
        hint={<FormattedMessage id="employee.inpsRates.publicEmployee.hint" />}
      />

      <OptionToggle
        checked={override !== null}
        onChange={(checked) =>
          onChange({ ...value, inpsOverride: checked ? DEFAULT_OVERRIDE : null })
        }
        label={<FormattedMessage id="employee.inpsRates.override.label" />}
        hint={<FormattedMessage id="employee.inpsRates.override.hint" />}
      >
        {override && (
          <Stack gap="md">
            <Field
              compact
              label={<FormattedMessage id="employee.inpsRates.override.employee" />}
              type="number"
              min={0}
              max={50}
              step={0.01}
              value={(override.employeeRate * 100).toFixed(2)}
              onChange={(e) =>
                onChange({
                  ...value,
                  inpsOverride: { ...override, employeeRate: Number(e.target.value) / 100 },
                })
              }
              trailing="%"
              inputMode="decimal"
            />
            <Field
              compact
              label={<FormattedMessage id="employee.inpsRates.override.employer" />}
              type="number"
              min={0}
              max={50}
              step={0.01}
              value={(override.employerRate * 100).toFixed(2)}
              onChange={(e) =>
                onChange({
                  ...value,
                  inpsOverride: { ...override, employerRate: Number(e.target.value) / 100 },
                })
              }
              trailing="%"
              inputMode="decimal"
            />
          </Stack>
        )}
      </OptionToggle>
    </Stack>
  );
}
