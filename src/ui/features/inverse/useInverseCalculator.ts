import { useCallback, useMemo, useState } from "react";
import { calculateInverseSalary, type InverseSalaryResult } from "@/domain/calc";
import type { ContractType, PaymentFrequency, CompanySize } from "@/domain/calc";
import { type SupportedYear, type RegionCode } from "@/domain/data";

export interface InverseFormState {
  readonly targetNetAnnual: number;
  readonly taxYear: SupportedYear;
  readonly regionCode: RegionCode;
  readonly municipalTaxRate: number;
  readonly contractType: ContractType;
  readonly paymentFrequency: PaymentFrequency;
  readonly companySize: CompanySize;
  readonly isPublicEmployee: boolean;
}

const DEFAULTS: InverseFormState = {
  targetNetAnnual: 24_000,
  taxYear: 2026,
  regionCode: "lombardia",
  municipalTaxRate: 0.008,
  contractType: "indeterminato",
  paymentFrequency: 13,
  companySize: "small",
  isPublicEmployee: false,
};

export interface InverseCalculator {
  readonly state: InverseFormState;
  readonly update: (patch: Partial<InverseFormState>) => void;
  readonly result: InverseSalaryResult;
}

export function useInverseCalculator(): InverseCalculator {
  const [state, setState] = useState<InverseFormState>(DEFAULTS);

  const update = useCallback((patch: Partial<InverseFormState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const result = useMemo(
    () =>
      calculateInverseSalary({
        targetNetAnnual: state.targetNetAnnual,
        other: {
          taxYear: state.taxYear,
          regionCode: state.regionCode,
          municipalTaxRate: state.municipalTaxRate,
          contractType: state.contractType,
          paymentFrequency: state.paymentFrequency,
          companySize: state.companySize,
          isPublicEmployee: state.isPublicEmployee,
        },
      }),
    [state],
  );

  return { state, update, result };
}
