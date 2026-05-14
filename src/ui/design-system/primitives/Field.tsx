import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: ReactNode;
  readonly hint?: ReactNode;
  readonly error?: ReactNode;
  readonly trailing?: ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, trailing, id, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-err` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="qg-field">
      <label className="qg-field__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="qg-field__row">
        <input
          ref={ref}
          id={inputId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className="qg-field__input"
          {...rest}
        />
        {trailing ? <span className="qg-field__trailing">{trailing}</span> : null}
      </div>
      {hint && !error ? (
        <p id={hintId} className="qg-field__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="qg-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
