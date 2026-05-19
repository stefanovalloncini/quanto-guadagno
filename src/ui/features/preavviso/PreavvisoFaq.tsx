import { FaqAccordion, type FaqItem } from "@/ui/shared/FaqAccordion";

const ITEMS: ReadonlyArray<FaqItem> = [
  { questionId: "preavviso.faq.obbligatorio.q", answerId: "preavviso.faq.obbligatorio.a" },
  { questionId: "preavviso.faq.mancato.q", answerId: "preavviso.faq.mancato.a" },
  { questionId: "preavviso.faq.calendarOrWork.q", answerId: "preavviso.faq.calendarOrWork.a" },
  { questionId: "preavviso.faq.ferie.q", answerId: "preavviso.faq.ferie.a" },
  { questionId: "preavviso.faq.malattia.q", answerId: "preavviso.faq.malattia.a" },
  { questionId: "preavviso.faq.prova.q", answerId: "preavviso.faq.prova.a" },
];

export function PreavvisoFaq() {
  return <FaqAccordion items={ITEMS} titleId="preavviso.faq.title" />;
}
