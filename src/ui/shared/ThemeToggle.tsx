import { FormattedMessage, useIntl } from "react-intl";
import { useTheme } from "./theme/useTheme.ts";

const OPTIONS = [
  { value: "light", id: "theme.label.light" },
  { value: "dark", id: "theme.label.dark" },
  { value: "system", id: "theme.label.system" },
] as const;

export function ThemeToggle() {
  const { theme, cycle } = useTheme();
  const intl = useIntl();

  return (
    <button
      type="button"
      className="qg-theme-toggle"
      onClick={cycle}
      aria-label={intl.formatMessage({ id: "theme.aria.cycle" })}
    >
      {OPTIONS.map((option, index) => (
        <span key={option.value}>
          {index > 0 && (
            <span className="qg-theme-toggle__sep" aria-hidden="true">
              /
            </span>
          )}
          <span
            className={option.value === theme ? "qg-theme-toggle__current" : "qg-theme-toggle__alt"}
          >
            <FormattedMessage id={option.id} />
          </span>
        </span>
      ))}
    </button>
  );
}
