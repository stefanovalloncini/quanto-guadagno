import { useCallback, useMemo, useState } from "react";
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
import { type SupportedYear, type RegionCode } from "@/domain/data";

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
  taxYear: 2026,
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

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

function isContractType(v: string | null): v is ContractType {
  return v !== null && (CONTRACT_TYPES as ReadonlyArray<string>).includes(v);
}

export interface EmployeeCalculator {
  readonly state: FormState;
  readonly update: (patch: Partial<FormState>) => void;
  readonly result: SalaryBreakdown;
}

export function useEmployeeCalculator(): EmployeeCalculator {
  const [params] = useSearchParams();
  const [state, setState] = useState<FormState>(() => {
    const lordoParam = params.get("lordo");
    const lordo = lordoParam !== null ? Number(lordoParam) : NaN;
    const contratto = params.get("contratto");
    return {
      ...DEFAULTS,
      grossAnnual: Number.isFinite(lordo) && lordo > 0 ? Math.floor(lordo) : DEFAULTS.grossAnnual,
      contractType: isContractType(contratto) ? contratto : DEFAULTS.contractType,
    };
  });

  const update = useCallback((patch: Partial<FormState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const result = useMemo(() => calculateSalaryBreakdown(state), [state]);

  return { state, update, result };
}
