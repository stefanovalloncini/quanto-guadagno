import { FormattedMessage } from "react-intl";

export function AboutPage() {
  return (
    <section className="qg-about">
      <h1>
        <FormattedMessage id="about.title" />
      </h1>
      <p className="qg-lede">
        <FormattedMessage id="about.lede" />
      </p>
      <div className="qg-prose">
        <p>
          <FormattedMessage id="about.body1" />
        </p>
        <p>
          <FormattedMessage id="about.body2" />
        </p>
      </div>
      <p>
        <a href="https://github.com/stefanovalloncini/quanto-guadagno" rel="noreferrer">
          <FormattedMessage id="about.github" />
        </a>
      </p>
    </section>
  );
}
