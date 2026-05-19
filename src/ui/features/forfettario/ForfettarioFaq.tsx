import { FaqAccordion, type FaqItem } from "@/ui/shared/FaqAccordion";

const ITEMS: ReadonlyArray<FaqItem> = [
  { questionId: "forfettario.faq.what.q", answerId: "forfettario.faq.what.a" },
  { questionId: "forfettario.faq.rates.q", answerId: "forfettario.faq.rates.a" },
  { questionId: "forfettario.faq.contributi.q", answerId: "forfettario.faq.contributi.a" },
  { questionId: "forfettario.faq.combined.q", answerId: "forfettario.faq.combined.a" },
  { questionId: "forfettario.faq.startup.q", answerId: "forfettario.faq.startup.a" },
  { questionId: "forfettario.faq.exit.q", answerId: "forfettario.faq.exit.a" },
];

export function ForfettarioFaq() {
  return <FaqAccordion items={ITEMS} titleId="forfettario.faq.title" />;
}
