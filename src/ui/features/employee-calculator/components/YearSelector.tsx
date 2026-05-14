import { FormattedMessage } from "react-intl";
import { Select } from "@/ui/design-system/primitives";
import type { SupportedYear } from "@/domain/data";

interface YearSelectorProps {
  readonly value: SupportedYear;
  readonly supportedYears: ReadonlyArray<SupportedYear>;
  readonly onChange: (year: SupportedYear) => void;
}

export function YearSelector({ value, supportedYears, onChange }: YearSelectorProps) {
  return (
    <Select
      label={<FormattedMessage id="employee.form.year" />}
      hint={<FormattedMessage id="employee.form.year.hint" />}
      value={value}
      onChange={(e) => onChange(Number(e.target.value) as SupportedYear)}
    >
      {supportedYears.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </Select>
  );
}
