import { FormattedMessage } from "react-intl";
import type { MessageKey } from "@/ui/i18n/messages/it";

export interface FaqItem {
  readonly questionId: MessageKey;
  readonly answerId: MessageKey;
}

interface FaqAccordionProps {
  readonly items: ReadonlyArray<FaqItem>;
  readonly titleId: MessageKey;
}

export function FaqAccordion({ items, titleId }: FaqAccordionProps) {
  return (
    <section className="qg-faq" aria-labelledby="qg-faq-title">
      <h2 id="qg-faq-title" className="qg-faq__title">
        <FormattedMessage id={titleId} />
      </h2>
      <div className="qg-faq__list">
        {items.map((item) => (
          <details key={item.questionId} className="qg-faq__item">
            <summary className="qg-faq__question">
              <FormattedMessage id={item.questionId} />
            </summary>
            <div className="qg-faq__answer">
              <FormattedMessage id={item.answerId} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
