import { FormattedMessage } from "react-intl";
import { Field, Stack } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS } from "@/domain/data";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";
import {
  SalaryInput,
  YearSelector,
  ContractTypeSelect,
  PaymentFrequencySelector,
  RegionSelector,
} from "./components/index.ts";

interface EmployeeFormProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeForm({ calc }: EmployeeFormProps) {
  const {
    state,
    setGross,
    setTaxYear,
    setContractType,
    setPaymentFrequency,
    setRegionCode,
    setMunicipalTaxRate,
  } = calc;

  const municipalRatePercent = state.municipalTaxRate * 100;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <SalaryInput
          value={state.grossAnnual}
          onChange={setGross}
          grossMonthly={calc.result.grossMonthly}
        />
        <YearSelector
          value={state.taxYear}
          supportedYears={SUPPORTED_YEARS}
          onChange={setTaxYear}
        />
        <ContractTypeSelect value={state.contractType} onChange={setContractType} />
        <PaymentFrequencySelector value={state.paymentFrequency} onChange={setPaymentFrequency} />
        <RegionSelector value={state.regionCode} onChange={setRegionCode} />
        <Field
          label={<FormattedMessage id="employee.form.municipal" />}
          hint={<FormattedMessage id="employee.form.municipal.hint" />}
          type="number"
          min={0}
          max={1}
          step={0.01}
          value={municipalRatePercent}
          onChange={(e) => setMunicipalTaxRate(Number(e.target.value) / 100)}
          trailing="%"
          inputMode="decimal"
        />
      </Stack>
    </form>
  );
}
