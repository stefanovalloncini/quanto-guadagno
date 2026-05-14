import { FormattedMessage, useIntl } from "react-intl";
import { useTheme } from "./theme/useTheme.ts";

const LABEL_BY_THEME = {
  light: "theme.label.light",
  dark: "theme.label.dark",
  system: "theme.label.system",
} as const;

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
      <span className="qg-theme-toggle__label">
        <FormattedMessage id="theme.prefix" /> <FormattedMessage id={LABEL_BY_THEME[theme]} />
      </span>
    </button>
  );
}
