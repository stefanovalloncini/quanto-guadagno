import { FormattedMessage, useIntl } from "react-intl";
import { useLocale } from "@/ui/i18n/locale.ts";

export function LocaleToggle() {
  const { locale, toggle } = useLocale();
  const intl = useIntl();
  const next = locale === "it" ? "en" : "it";
  const cls = (code: string) =>
    code === locale ? "qg-locale-toggle__current" : "qg-locale-toggle__alt";

  return (
    <button
      type="button"
      className="qg-locale-toggle"
      onClick={toggle}
      aria-label={intl.formatMessage({ id: "locale.aria.switch" }, { next })}
    >
      <span className={cls("it")}>
        <FormattedMessage id="locale.it" />
      </span>
      <span className="qg-locale-toggle__sep" aria-hidden="true">
        /
      </span>
      <span className={cls("en")}>
        <FormattedMessage id="locale.en" />
      </span>
    </button>
  );
}
