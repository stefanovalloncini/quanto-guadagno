import { FormattedMessage } from "react-intl";
import { Select } from "@/ui/design-system/primitives";
import { REGIONS_LIST } from "@/domain/data";
import type { RegionCode } from "@/domain/data";

interface RegionSelectorProps {
  readonly value: RegionCode;
  readonly onChange: (value: RegionCode) => void;
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  return (
    <Select
      label={<FormattedMessage id="employee.form.region" />}
      value={value}
      onChange={(e) => onChange(e.target.value as RegionCode)}
    >
      {REGIONS_LIST.map((region) => (
        <option key={region.code} value={region.code}>
          {region.name}
        </option>
      ))}
    </Select>
  );
}
