import type { ReactElement, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

type MessageValue = string | number | bigint | boolean | ReactElement | undefined;

interface CalculatorLayoutProps {
  readonly eyebrowId: string;
  readonly titleId: string;
  readonly ledeId: string;
  readonly ledeValues?: Record<string, MessageValue>;
  readonly form: ReactNode;
  readonly results: ReactNode;
}

export function CalculatorLayout({
  eyebrowId,
  titleId,
  ledeId,
  ledeValues,
  form,
  results,
}: CalculatorLayoutProps) {
  return (
    <section className="qg-calc">
      <header className="qg-calc__hero">
        <p className="qg-eyebrow">
          <FormattedMessage id={eyebrowId} />
        </p>
        <h1>
          <FormattedMessage id={titleId} values={{ em: (chunks) => <em>{chunks}</em> }} />
        </h1>
        <p className="qg-lede">
          <FormattedMessage id={ledeId} {...(ledeValues && { values: ledeValues })} />
        </p>
      </header>

      <div className="qg-calc__grid">
        <div className="qg-calc__form">{form}</div>
        <aside className="qg-calc__result">{results}</aside>
      </div>
    </section>
  );
}
