import {
  SalaryInput,
  YearSelector,
  PaymentFrequencySelector,
  ContractTypeSelect,
  RegionSelector,
  CcnlPreset,
} from "./components/index.ts";
import { SUPPORTED_YEARS } from "@/domain/data";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface EmployeeFormPrimaryProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeFormPrimary({ calc }: EmployeeFormPrimaryProps) {
  const { state, update } = calc;

  return (
    <form className="qg-calc__form-stack" onSubmit={(e) => e.preventDefault()}>
      <SalaryInput calc={calc} />

      <div className="qg-calc__form-row">
        <YearSelector
          value={state.taxYear}
          supportedYears={SUPPORTED_YEARS}
          onChange={(taxYear) => update({ taxYear })}
        />
        <PaymentFrequencySelector
          value={state.paymentFrequency}
          onChange={(paymentFrequency) => update({ paymentFrequency })}
        />
      </div>

      <CcnlPreset calc={calc} />

      <ContractTypeSelect
        value={state.contractType}
        onChange={(contractType) => update({ contractType })}
        grossAnnual={calc.input.grossAnnual}
      />

      <RegionSelector value={state.regionCode} onChange={(regionCode) => update({ regionCode })} />
    </form>
  );
}
