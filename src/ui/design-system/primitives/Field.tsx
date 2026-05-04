import { useId, type ChangeEvent, type ReactNode } from "react";

export interface FieldProps {
  readonly label: ReactNode;
  readonly hint?: ReactNode;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly type?: "currency" | "percentage";
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}

const config = {
  currency: { step: 100, suffix: undefined, mono: true },
  percentage: { step: 0.01, suffix: "%", mono: false },
} as const;

export function Field({
  label,
  hint,
  value,
  onChange,
  type = "currency",
  min = 0,
  max,
  step,
}: FieldProps) {
  const inputId = useId();
  const hintId = useId();
  const c = config[type];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = Number.parseFloat(e.target.value);
    if (!Number.isFinite(next)) return;
    onChange(next);
  };

  const wrapperClass = c.suffix ? "qg-field__suffix-wrap" : undefined;
  const inputClass = ["qg-field__input", c.mono ? "qg-field__input--mono" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="qg-field">
      <label htmlFor={inputId} className="qg-field__label">
        {label}
      </label>
      <div className={wrapperClass}>
        <input
          id={inputId}
          type="number"
          inputMode={type === "currency" ? "numeric" : "decimal"}
          className={inputClass}
          value={value}
          min={min}
          max={max}
          step={step ?? c.step}
          aria-describedby={hint ? hintId : undefined}
          onChange={handleChange}
        />
        {c.suffix ? (
          <span className="qg-field__suffix" aria-hidden="true">
            {c.suffix}
          </span>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="qg-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
