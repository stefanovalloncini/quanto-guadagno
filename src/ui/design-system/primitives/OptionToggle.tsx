import type { ReactNode } from "react";

interface OptionToggleProps {
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly label: ReactNode;
  readonly hint?: ReactNode;
  readonly children?: ReactNode;
}

export function OptionToggle({ checked, onChange, label, hint, children }: OptionToggleProps) {
  return (
    <div className="qg-option">
      <label className="qg-toggle">
        <input
          type="checkbox"
          className="qg-toggle__input"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="qg-toggle__label">{label}</span>
      </label>
      {hint !== undefined && <p className="qg-option__hint">{hint}</p>}
      {checked && children !== undefined && <div className="qg-option__body">{children}</div>}
    </div>
  );
}
