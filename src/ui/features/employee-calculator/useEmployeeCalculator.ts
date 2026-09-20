import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  calculateInverseSalary,
  calculateSalaryBreakdown,
  type SalaryBreakdown,
  type SalaryInput,
} from "@/domain/calc";
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
import { parseUrlState, writeUrlState, type SalaryMode } from "./urlState.ts";

export type { SalaryMode };

export interface FormState {
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
  readonly salaryMode: SalaryMode;
  readonly targetNetMonthly: number;
}

export const DEFAULTS: FormState = {
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
  salaryMode: "gross",
  targetNetMonthly: 1_800,
};

export interface EmployeeCalculator {
  readonly state: FormState;
  readonly update: (patch: Partial<FormState>) => void;
  readonly setSalaryMode: (mode: SalaryMode) => void;
  /** What the engine was actually fed: in "net" mode the gross is solved, not typed. */
  readonly input: SalaryInput;
  readonly result: SalaryBreakdown;
}

function resolveInput(state: FormState): SalaryInput {
  const { salaryMode, targetNetMonthly, grossAnnual, ...rest } = state;
  if (salaryMode === "gross") return { ...rest, grossAnnual };

  const solved = calculateInverseSalary({
    targetNetAnnual: targetNetMonthly * state.paymentFrequency,
    other: rest,
  });
  // Round before the breakdown runs, so the ledger, the note and the share
  // link all quote the same gross.
  return { ...rest, grossAnnual: Math.round(solved.grossAnnual) };
}

export function useEmployeeCalculator(): EmployeeCalculator {
  const [params, setParams] = useSearchParams();
  const [state, update] = usePatchState<FormState>(() => ({
    ...DEFAULTS,
    ...parseUrlState(params),
  }));

  const input = useMemo(() => resolveInput(state), [state]);
  const result = useMemo(() => calculateSalaryBreakdown(input), [input]);

  useEffect(() => {
    setParams(
      (current) =>
        writeUrlState(
          current,
          {
            grossAnnual: input.grossAnnual,
            taxYear: state.taxYear,
            regionCode: state.regionCode,
            municipalTaxRate: state.municipalTaxRate,
            contractType: state.contractType,
            paymentFrequency: state.paymentFrequency,
            companySize: state.companySize,
            isPublicEmployee: state.isPublicEmployee,
            inpsOverride: state.inpsOverride,
            salaryMode: state.salaryMode,
            targetNetMonthly: state.targetNetMonthly,
          },
          DEFAULTS,
        ),
      { replace: true },
    );
  }, [
    input.grossAnnual,
    state.taxYear,
    state.regionCode,
    state.municipalTaxRate,
    state.contractType,
    state.paymentFrequency,
    state.companySize,
    state.isPublicEmployee,
    state.inpsOverride,
    state.salaryMode,
    state.targetNetMonthly,
    setParams,
  ]);

  const setSalaryMode = useCallback(
    (mode: SalaryMode) => {
      if (mode === state.salaryMode) return;
      if (mode === "net") {
        update({ salaryMode: "net", targetNetMonthly: Math.round(result.netMonthly) });
        return;
      }
      update({ salaryMode: "gross", grossAnnual: input.grossAnnual });
    },
    [state.salaryMode, result.netMonthly, input.grossAnnual, update],
  );

  return { state, update, setSalaryMode, input, result };
}
