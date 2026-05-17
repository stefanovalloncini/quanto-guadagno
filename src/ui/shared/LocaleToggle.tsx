import { useIntl } from "react-intl";
import { useLocale } from "@/ui/i18n/locale.ts";

export function LocaleToggle() {
  const { locale, toggle } = useLocale();
  const intl = useIntl();
  const next = locale === "it" ? "en" : "it";

  return (
    <button
      type="button"
      className="qg-locale-toggle"
      onClick={toggle}
      aria-label={intl.formatMessage({ id: "locale.aria.switch" }, { next })}
    >
      <span className="qg-locale-toggle__current">{locale.toUpperCase()}</span>
      <span className="qg-locale-toggle__sep" aria-hidden="true">
        /
      </span>
      <span className="qg-locale-toggle__alt">{next.toUpperCase()}</span>
    </button>
  );
}
