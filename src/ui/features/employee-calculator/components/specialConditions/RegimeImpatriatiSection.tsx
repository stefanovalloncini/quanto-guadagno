import { FormattedMessage } from "react-intl";
import type { RegimeImpatriatiInput } from "@/domain/calc";

interface RegimeImpatriatiSectionProps {
  readonly value: RegimeImpatriatiInput | undefined;
  readonly onChange: (next: RegimeImpatriatiInput | undefined) => void;
}

export function RegimeImpatriatiSection({ value, onChange }: RegimeImpatriatiSectionProps) {
  const enabled = value?.enabled ?? false;

  return (
    <div>
      <label className="qg-toggle">
        <input
          type="checkbox"
          className="qg-toggle__input"
          checked={enabled}
          onChange={(e) =>
            onChange(e.target.checked ? { enabled: true, hasMinorChildren: false } : undefined)
          }
        />
        <span className="qg-toggle__label">
          <FormattedMessage id="employee.specialConditions.regimeImpatriati.label" />
        </span>
      </label>
      <p className="qg-field__hint" style={{ marginTop: "var(--space-1)" }}>
        <FormattedMessage id="employee.specialConditions.regimeImpatriati.hint" />
      </p>

      {enabled && value && (
        <div className="qg-advanced__indent" style={{ marginTop: "var(--space-3)" }}>
          <label className="qg-toggle">
            <input
              type="checkbox"
              className="qg-toggle__input"
              checked={value.hasMinorChildren}
              onChange={(e) => onChange({ ...value, hasMinorChildren: e.target.checked })}
            />
            <span className="qg-toggle__label">
              <FormattedMessage id="employee.specialConditions.regimeImpatriati.minorChildren" />
            </span>
          </label>
          <p className="qg-field__hint" style={{ marginTop: "var(--space-1)" }}>
            <FormattedMessage id="employee.specialConditions.regimeImpatriati.minorChildren.hint" />
          </p>
        </div>
      )}
    </div>
  );
}
