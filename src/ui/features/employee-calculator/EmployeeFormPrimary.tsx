import {
  SalaryInput,
  YearSelector,
  PaymentFrequencySelector,
  ContractTypeSelect,
  RegionSelector,
} from "./components/index.ts";
import { SUPPORTED_YEARS } from "@/domain/data";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface EmployeeFormPrimaryProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeFormPrimary({ calc }: EmployeeFormPrimaryProps) {
  const { state } = calc;

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <SalaryInput
        value={state.grossAnnual}
        onChange={calc.setGross}
        grossMonthly={calc.result.grossMonthly}
      />

      <div className="qg-calc__form-row">
        <YearSelector
          value={state.taxYear}
          supportedYears={SUPPORTED_YEARS}
          onChange={calc.setTaxYear}
        />
        <PaymentFrequencySelector
          value={state.paymentFrequency}
          onChange={calc.setPaymentFrequency}
        />
      </div>

      <ContractTypeSelect value={state.contractType} onChange={calc.setContractType} />

      <RegionSelector value={state.regionCode} onChange={calc.setRegionCode} />
    </form>
  );
}
