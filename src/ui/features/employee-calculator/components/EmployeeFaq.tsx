import { FaqAccordion, type FaqItem } from "@/ui/shared/FaqAccordion";

const ITEMS: ReadonlyArray<FaqItem> = [
  { questionId: "employee.faq.gross.q", answerId: "employee.faq.gross.a" },
  { questionId: "employee.faq.brackets.q", answerId: "employee.faq.brackets.a" },
  { questionId: "employee.faq.trattamento.q", answerId: "employee.faq.trattamento.a" },
  { questionId: "employee.faq.region.q", answerId: "employee.faq.region.a" },
  { questionId: "employee.faq.cuneo.q", answerId: "employee.faq.cuneo.a" },
  { questionId: "employee.faq.estimate.q", answerId: "employee.faq.estimate.a" },
  { questionId: "employee.faq.sources.q", answerId: "employee.faq.sources.a" },
];

export function EmployeeFaq() {
  return <FaqAccordion items={ITEMS} titleId="employee.faq.title" />;
}
