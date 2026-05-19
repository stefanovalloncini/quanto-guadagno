import { parseUrlState } from "@/ui/features/employee-calculator/urlState";
import { DEFAULTS, type FormState } from "@/ui/features/employee-calculator/useEmployeeCalculator";

export function formStateFromUrl(params: URLSearchParams): FormState {
  return { ...DEFAULTS, ...parseUrlState(params) };
}
