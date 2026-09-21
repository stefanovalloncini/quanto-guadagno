import { FormattedMessage, useIntl } from "react-intl";
import { EnableToggle, Field, Select } from "@/ui/design-system/primitives";
import type { CompanySize, DependentsInput } from "@/domain/calc";
import type { SalaryEntrySettings } from "./salaryHistory.ts";

interface SalaryHistoryAdvancedFieldsProps {
  readonly settings: SalaryEntrySettings;
  readonly onSettingsChange: (next: SalaryEntrySettings) => void;
}

function emptyDependents(): DependentsInput {
  return { hasSpouse: false, childrenOver21: 0, otherDependents: 0 };
}

function isEmptyDependents(d: DependentsInput): boolean {
  return (
    !d.hasSpouse &&
    d.childrenOver21 === 0 &&
    d.otherDependents === 0 &&
    (d.spouseIncome === undefined || d.spouseIncome === 0)
  );
}

function baseSettings(settings: SalaryEntrySettings): SalaryEntrySettings {
  return {
    contractType: settings.contractType,
    regionCode: settings.regionCode,
    municipalTaxRate: settings.municipalTaxRate,
    paymentFrequency: settings.paymentFrequency,
  };
}

function withDependents(settings: SalaryEntrySettings, next: DependentsInput): SalaryEntrySettings {
  const base = baseSettings(settings);
  return {
    ...base,
    ...(settings.companySize !== undefined ? { companySize: settings.companySize } : {}),
    ...(isEmptyDependents(next) ? {} : { dependents: next }),
  };
}

function withCompanySize(
  settings: SalaryEntrySettings,
  next: CompanySize | undefined,
): SalaryEntrySettings {
  const base = baseSettings(settings);
  return {
    ...base,
    ...(settings.dependents !== undefined ? { dependents: settings.dependents } : {}),
    ...(next !== undefined ? { companySize: next } : {}),
  };
}

export function SalaryHistoryAdvancedFields({
  settings,
  onSettingsChange,
}: SalaryHistoryAdvancedFieldsProps) {
  const intl = useIntl();
  const dependents = settings.dependents ?? emptyDependents();

  const updateDependents = (patch: Partial<DependentsInput>) => {
    onSettingsChange(withDependents(settings, { ...dependents, ...patch }));
  };

  return (
    <div className="qg-calc__form-stack">
      <EnableToggle
        checked={dependents.hasSpouse}
        onChange={(hasSpouse) => updateDependents({ hasSpouse })}
        labelId="history.form.dependents.hasSpouse"
      />
      {dependents.hasSpouse ? (
        <Field
          label={<FormattedMessage id="history.form.dependents.spouseIncome" />}
          type="number"
          min={0}
          max={1_000_000}
          step={100}
          value={dependents.spouseIncome ?? 0}
          onChange={(e) => updateDependents({ spouseIncome: Math.max(0, Number(e.target.value)) })}
          trailing="€"
          inputMode="numeric"
        />
      ) : null}

      <div className="qg-history-form__row">
        <Field
          label={<FormattedMessage id="history.form.dependents.childrenOver21" />}
          type="number"
          min={0}
          max={20}
          step={1}
          value={dependents.childrenOver21}
          onChange={(e) =>
            updateDependents({
              childrenOver21: Math.max(0, Math.floor(Number(e.target.value))),
            })
          }
          inputMode="numeric"
        />
        <Field
          label={<FormattedMessage id="history.form.dependents.otherDependents" />}
          type="number"
          min={0}
          max={20}
          step={1}
          value={dependents.otherDependents}
          onChange={(e) =>
            updateDependents({
              otherDependents: Math.max(0, Math.floor(Number(e.target.value))),
            })
          }
          inputMode="numeric"
        />
      </div>

      <Select
        label={<FormattedMessage id="history.form.companySize" />}
        value={settings.companySize ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          onSettingsChange(withCompanySize(settings, v === "" ? undefined : (v as CompanySize)));
        }}
      >
        <option value="">
          {intl.formatMessage({ id: "history.form.companySize.unspecified" })}
        </option>
        <option value="small">
          {intl.formatMessage({ id: "history.form.companySize.small" })}
        </option>
        <option value="large">
          {intl.formatMessage({ id: "history.form.companySize.large" })}
        </option>
      </Select>
    </div>
  );
}
