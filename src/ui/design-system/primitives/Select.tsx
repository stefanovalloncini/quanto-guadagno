import { useId, type ChangeEvent, type ReactNode } from "react";

export interface SelectOption<T extends string | number> {
  readonly value: T;
  readonly label: ReactNode;
}

export interface SelectProps<T extends string | number> {
  readonly label: ReactNode;
  readonly hint?: ReactNode;
  readonly value: T;
  readonly options: ReadonlyArray<SelectOption<T>>;
  readonly onChange: (value: T) => void;
}

export function Select<T extends string | number>({
  label,
  hint,
  value,
  options,
  onChange,
}: SelectProps<T>) {
  const inputId = useId();
  const hintId = useId();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const raw = e.target.value;
    const sample = options[0]?.value;
    const next = (typeof sample === "number" ? Number(raw) : raw) as T;
    onChange(next);
  };

  return (
    <div className="qg-field">
      <label htmlFor={inputId} className="qg-field__label">
        {label}
      </label>
      <select
        id={inputId}
        className="qg-field__input qg-field__input--select"
        value={value}
        aria-describedby={hint ? hintId : undefined}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={hintId} className="qg-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
