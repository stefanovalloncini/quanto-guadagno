import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="qg-notfound qg-prose">
      <h1>
        <FormattedMessage id="notFound.title" />
      </h1>
      <p>
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
