import { FormattedMessage } from "react-intl";

export function SkipLink({ targetId }: { readonly targetId: string }) {
  return (
    <a href={`#${targetId}`} className="qg-skip-link">
      <FormattedMessage id="a11y.skipLink" defaultMessage="Salta al contenuto" />
    </a>
  );
}
