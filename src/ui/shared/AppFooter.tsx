import { FormattedMessage } from "react-intl";

export function AppFooter() {
  return (
    <footer className="qg-app-footer">
      <div className="qg-app-footer__inner">
        <p className="qg-app-footer__attribution">
          <FormattedMessage id="footer.attribution" />
        </p>
        <p className="qg-app-footer__disclaimer">
          <FormattedMessage id="footer.disclaimer" />
        </p>
      </div>
    </footer>
  );
}
