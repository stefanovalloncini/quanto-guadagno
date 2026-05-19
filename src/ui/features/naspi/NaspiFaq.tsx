import { FaqAccordion, type FaqItem } from "@/ui/shared/FaqAccordion";

const ITEMS: ReadonlyArray<FaqItem> = [
  { questionId: "naspi.faq.what.q", answerId: "naspi.faq.what.a" },
  { questionId: "naspi.faq.duration.q", answerId: "naspi.faq.duration.a" },
  { questionId: "naspi.faq.amount.q", answerId: "naspi.faq.amount.a" },
  { questionId: "naspi.faq.decalage.q", answerId: "naspi.faq.decalage.a" },
  { questionId: "naspi.faq.tax.q", answerId: "naspi.faq.tax.a" },
  { questionId: "naspi.faq.work.q", answerId: "naspi.faq.work.a" },
];

export function NaspiFaq() {
  return <FaqAccordion items={ITEMS} titleId="naspi.faq.title" />;
}
