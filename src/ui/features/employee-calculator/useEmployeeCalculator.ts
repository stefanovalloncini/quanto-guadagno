import { useMemo, useState } from "react";
import { calculateSalaryBreakdown, type SalaryBreakdown } from "@/domain/calc";
import type {
  ContractType,
  PaymentFrequency,
  DependentsInput,
  ExpenseDeductionsInput,
  FringeBenefitsInput,
  SpecialConditionsInput,
  PremioRisultatoInput,
} from "@/domain/calc";
import { type SupportedYear, type RegionCode } from "@/domain/data";

interface FormState {
  readonly grossAnnual: number;
  readonly taxYear: SupportedYear;
  readonly regionCode: RegionCode;
  readonly municipalTaxRate: number;
  readonly contractType: ContractType;
  readonly paymentFrequency: PaymentFrequency;
  readonly dependents: DependentsInput | null;
  readonly expenseDeductions: ExpenseDeductionsInput | null;
  readonly fringeBenefits: FringeBenefitsInput | null;
  readonly specialConditions: SpecialConditionsInput | null;
  readonly premioRisultato: PremioRisultatoInput | null;
}

const DEFAULTS: FormState = {
  grossAnnual: 30_000,
  taxYear: 2026,
  regionCode: "lombardia",
  municipalTaxRate: 0.008,
  contractType: "indeterminato",
  paymentFrequency: 12,
  dependents: null,
  expenseDeductions: null,
  fringeBenefits: null,
  specialConditions: null,
  premioRisultato: null,
};

export interface EmployeeCalculator {
  readonly state: FormState;
  readonly setGross: (n: number) => void;
  readonly setTaxYear: (year: SupportedYear) => void;
  readonly setRegionCode: (code: RegionCode) => void;
  readonly setMunicipalTaxRate: (rate: number) => void;
  readonly setContractType: (type: ContractType) => void;
  readonly setPaymentFrequency: (freq: PaymentFrequency) => void;
  readonly setDependents: (value: DependentsInput | null) => void;
  readonly setExpenseDeductions: (value: ExpenseDeductionsInput | null) => void;
  readonly setFringeBenefits: (value: FringeBenefitsInput | null) => void;
  readonly setSpecialConditions: (value: SpecialConditionsInput | null) => void;
  readonly setPremioRisultato: (value: PremioRisultatoInput | null) => void;
  readonly result: SalaryBreakdown;
}

export function useEmployeeCalculator(): EmployeeCalculator {
  const [state, setState] = useState<FormState>(DEFAULTS);

  const result = useMemo(
    () =>
      calculateSalaryBreakdown({
        grossAnnual: state.grossAnnual,
        taxYear: state.taxYear,
        regionCode: state.regionCode,
        municipalTaxRate: state.municipalTaxRate,
        contractType: state.contractType,
        paymentFrequency: state.paymentFrequency,
        dependents: state.dependents,
        expenseDeductions: state.expenseDeductions,
        fringeBenefits: state.fringeBenefits,
        specialConditions: state.specialConditions,
        premioRisultato: state.premioRisultato,
      }),
    [state],
  );

  return {
    state,
    setGross: (grossAnnual) => setState((s) => ({ ...s, grossAnnual })),
    setTaxYear: (taxYear) => setState((s) => ({ ...s, taxYear })),
    setRegionCode: (regionCode) => setState((s) => ({ ...s, regionCode })),
    setMunicipalTaxRate: (municipalTaxRate) => setState((s) => ({ ...s, municipalTaxRate })),
    setContractType: (contractType) => setState((s) => ({ ...s, contractType })),
    setPaymentFrequency: (paymentFrequency) => setState((s) => ({ ...s, paymentFrequency })),
    setDependents: (dependents) => setState((s) => ({ ...s, dependents })),
    setExpenseDeductions: (expenseDeductions) => setState((s) => ({ ...s, expenseDeductions })),
    setFringeBenefits: (fringeBenefits) => setState((s) => ({ ...s, fringeBenefits })),
    setSpecialConditions: (specialConditions) => setState((s) => ({ ...s, specialConditions })),
    setPremioRisultato: (premioRisultato) => setState((s) => ({ ...s, premioRisultato })),
    result,
  };
}
