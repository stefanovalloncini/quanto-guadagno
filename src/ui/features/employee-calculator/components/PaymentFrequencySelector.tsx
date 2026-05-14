import { FormattedMessage } from "react-intl";
import { Select } from "@/ui/design-system/primitives";
import type { PaymentFrequency } from "@/domain/calc";

const PAYMENT_FREQUENCIES: ReadonlyArray<PaymentFrequency> = [12, 13, 14];

interface PaymentFrequencySelectorProps {
  readonly value: PaymentFrequency;
  readonly onChange: (value: PaymentFrequency) => void;
}

export function PaymentFrequencySelector({ value, onChange }: PaymentFrequencySelectorProps) {
  return (
    <Select
      label={<FormattedMessage id="employee.form.paymentFrequency" />}
      hint={<FormattedMessage id={`employee.form.paymentFrequency.option${value}`} />}
      value={value}
      onChange={(e) => onChange(Number(e.target.value) as PaymentFrequency)}
    >
      {PAYMENT_FREQUENCIES.map((freq) => (
        <option key={freq} value={freq}>
          {freq}
        </option>
      ))}
    </Select>
  );
}
