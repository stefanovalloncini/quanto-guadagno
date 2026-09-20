import { FormattedMessage, useIntl } from "react-intl";
import { Select } from "@/ui/design-system/primitives";
import { REGIONS, REGIONS_LIST } from "@/domain/data";
import { formatPercentage } from "@/domain/format.ts";
import type { RegionCode } from "@/domain/data";

interface RegionSelectorProps {
  readonly value: RegionCode;
  readonly onChange: (value: RegionCode) => void;
}

function describeBrackets(code: RegionCode, locale: string): string {
  const region = REGIONS[code];
  const parts: string[] = [];

  if (region.exemptionThreshold !== undefined) {
    const fmt = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    parts.push(`esente fino a ${fmt.format(region.exemptionThreshold)}`);
  }

  if (region.taxBrackets.length === 1) {
    const only = region.taxBrackets[0];
    if (only) parts.push(`aliquota unica ${formatPercentage(only.rate)}`);
  } else {
    const rates = region.taxBrackets.map((b) => formatPercentage(b.rate));
    parts.push(`progressivo ${rates.join(", ")}`);
  }

  return parts.join(", ");
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  const intl = useIntl();
  const description = describeBrackets(value, intl.locale);

  return (
    <Select
      label={<FormattedMessage id="employee.form.region" />}
      hint={description}
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
