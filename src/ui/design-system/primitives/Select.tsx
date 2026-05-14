import {
  forwardRef,
  type ReactNode,
  type SelectHTMLAttributes,
  useId,
} from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly label: ReactNode;
  readonly hint?: ReactNode;
  readonly error?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, id, children, ...rest },
  ref,
) {
  const autoId = useId();
  const selId = id ?? autoId;
  const hintId = hint ? `${selId}-hint` : undefined;
  const errorId = error ? `${selId}-err` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="qg-field">
      <label className="qg-field__label" htmlFor={selId}>
        {label}
      </label>
      <select
        ref={ref}
        id={selId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className="qg-field__select"
        {...rest}
      >
        {children}
      </select>
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
