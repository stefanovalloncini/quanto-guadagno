import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { calculateSalaryBreakdown, type SalaryBreakdown } from "@/domain/calc";
import type {
  ContractType,
  PaymentFrequency,
  CompanySize,
  InpsRateOverride,
  DependentsInput,
  ExpenseDeductionsInput,
  FringeBenefitsInput,
  SpecialConditionsInput,
  PremioRisultatoInput,
} from "@/domain/calc";
import { LATEST_SUPPORTED_YEAR, type SupportedYear, type RegionCode } from "@/domain/data";
import { usePatchState } from "@/ui/shared/usePatchState.ts";
import { parseUrlState, writeUrlState } from "./urlState.ts";

interface FormState {
  readonly grossAnnual: number;
  readonly taxYear: SupportedYear;
  readonly regionCode: RegionCode;
  readonly municipalTaxRate: number;
  readonly contractType: ContractType;
  readonly paymentFrequency: PaymentFrequency;
  readonly companySize: CompanySize;
  readonly isPublicEmployee: boolean;
  readonly inpsOverride: InpsRateOverride | null;
  readonly dependents: DependentsInput | null;
  readonly expenseDeductions: ExpenseDeductionsInput | null;
  readonly fringeBenefits: FringeBenefitsInput | null;
  readonly specialConditions: SpecialConditionsInput | null;
  readonly premioRisultato: PremioRisultatoInput | null;
}

const DEFAULTS: FormState = {
  grossAnnual: 30_000,
  taxYear: LATEST_SUPPORTED_YEAR,
  regionCode: "lombardia",
  municipalTaxRate: 0.008,
  contractType: "indeterminato",
  paymentFrequency: 13,
  companySize: "small",
  isPublicEmployee: false,
  inpsOverride: null,
  dependents: null,
  expenseDeductions: null,
  fringeBenefits: null,
  specialConditions: null,
  premioRisultato: null,
};

export interface EmployeeCalculator {
  readonly state: FormState;
  readonly update: (patch: Partial<FormState>) => void;
  readonly result: SalaryBreakdown;
}

export function useEmployeeCalculator(): EmployeeCalculator {
  const [params, setParams] = useSearchParams();
  const [state, update] = usePatchState<FormState>(() => ({
    ...DEFAULTS,
    ...parseUrlState(params),
  }));

  useEffect(() => {
    setParams(
      (current) =>
        writeUrlState(
          current,
          {
            grossAnnual: state.grossAnnual,
            taxYear: state.taxYear,
            regionCode: state.regionCode,
            municipalTaxRate: state.municipalTaxRate,
            contractType: state.contractType,
            paymentFrequency: state.paymentFrequency,
            companySize: state.companySize,
            isPublicEmployee: state.isPublicEmployee,
            inpsOverride: state.inpsOverride,
          },
          DEFAULTS,
        ),
      { replace: true },
    );
  }, [
    state.grossAnnual,
    state.taxYear,
    state.regionCode,
    state.municipalTaxRate,
    state.contractType,
    state.paymentFrequency,
    state.companySize,
    state.isPublicEmployee,
    state.inpsOverride,
    setParams,
  ]);

  const result = useMemo(() => calculateSalaryBreakdown(state), [state]);

  return { state, update, result };
}
