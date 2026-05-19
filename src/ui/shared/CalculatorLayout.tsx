import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import type { MessageValues } from "./intl-types.ts";

interface CalculatorLayoutProps {
  readonly eyebrowId: string;
  readonly titleId: string;
  readonly ledeId: string;
  readonly ledeValues?: MessageValues;
  readonly form: ReactNode;
  readonly results: ReactNode;
  readonly footer?: ReactNode;
}

export function CalculatorLayout({
  eyebrowId,
  titleId,
  ledeId,
  ledeValues,
  form,
  results,
  footer,
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

      {footer ? <div className="qg-calc__footer">{footer}</div> : null}
    </section>
  );
}
