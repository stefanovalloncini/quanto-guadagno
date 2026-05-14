import { FormattedMessage } from "react-intl";

export function AppFooter() {
  return (
    <footer className="qg-footer">
      <div className="qg-footer__inner">
        <span className="qg-footer__copy">
          <FormattedMessage id="footer.attribution" />
        </span>
        <span aria-hidden="true">·</span>
        <a
          className="qg-footer__link"
          href="https://github.com/stefanovalloncini/quanto-guadagno"
          rel="noreferrer"
        >
          <FormattedMessage id="footer.repo" />
        </a>
      </div>
    </footer>
  );
}
