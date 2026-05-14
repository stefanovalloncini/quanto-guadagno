import { FormattedMessage } from "react-intl";

export function SkipLink() {
  return (
    <a className="qg-skip-link" href="#main">
      <FormattedMessage id="a11y.skipToMain" />
    </a>
  );
}
