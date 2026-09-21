import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import type { MessageValues } from "./intl-types.ts";

interface CalculatorLayoutProps {
  readonly titleId: string;
  /** Only when one sentence explains an input the tools index does not cover. */
  readonly ledeId?: string;
  readonly ledeValues?: MessageValues;
  readonly form: ReactNode;
  readonly results: ReactNode;
  readonly footer?: ReactNode;
}

export function CalculatorLayout({
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
        <h1>
          <FormattedMessage id={titleId} />
        </h1>
        {ledeId !== undefined && (
          <p className="qg-lede">
            <FormattedMessage id={ledeId} {...(ledeValues && { values: ledeValues })} />
          </p>
        )}
      </header>

      <div className="qg-calc__grid">
        <div className="qg-calc__form">{form}</div>
        <aside className="qg-calc__result">{results}</aside>
      </div>

      {footer ? <div className="qg-calc__footer">{footer}</div> : null}
    </section>
  );
}
