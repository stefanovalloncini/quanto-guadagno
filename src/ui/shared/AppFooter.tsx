import { FormattedMessage } from "react-intl";
import { LocaleToggle } from "./LocaleToggle.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";

export function AppFooter() {
  return (
    <footer className="qg-footer">
      <div className="qg-footer__inner">
        <span className="qg-footer__copy">
          <FormattedMessage id="brand.name" />
        </span>
        <span>
          <FormattedMessage id="footer.use" />
        </span>
        <a
          className="qg-footer__link"
          href="https://github.com/stefanovalloncini/quanto-guadagno"
          rel="noreferrer"
        >
          <FormattedMessage id="footer.repo" />
        </a>
        <div className="qg-footer__controls">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
