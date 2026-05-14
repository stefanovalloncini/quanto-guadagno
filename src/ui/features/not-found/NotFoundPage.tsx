import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="qg-notfound">
      <p className="qg-eyebrow">404</p>
      <h1>
        <FormattedMessage id="notFound.title" />
      </h1>
      <p className="qg-lede">
        <FormattedMessage id="notFound.body" />
      </p>
      <p>
        <Link to="/">
          <FormattedMessage id="notFound.home" />
        </Link>
      </p>
    </section>
  );
}
