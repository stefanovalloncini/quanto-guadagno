import { FormattedMessage, useIntl, type IntlShape } from "react-intl";
import { Select } from "@/ui/design-system/primitives";
import { REGIONS, REGIONS_LIST } from "@/domain/data";
import { formatCurrencyCents, formatCurrencyWhole, formatPercentage } from "@/domain/format.ts";
import type { RegionCode } from "@/domain/data";

interface RegionSelectorProps {
  readonly value: RegionCode;
  readonly onChange: (value: RegionCode) => void;
}

function describeBrackets(code: RegionCode, intl: IntlShape): string {
  const region = REGIONS[code];
  const parts: string[] = [];

  if (region.exemptionThreshold !== undefined) {
    parts.push(
      intl.formatMessage(
        { id: "employee.form.region.hint.exempt" },
        { amount: formatCurrencyWhole(region.exemptionThreshold) },
      ),
    );
  }

  if (region.taxDeduction !== undefined) {
    parts.push(
      intl.formatMessage(
        { id: "employee.form.region.hint.deduction" },
        {
          amount: formatCurrencyCents(region.taxDeduction.amount),
          ceiling: formatCurrencyWhole(region.taxDeduction.incomeCeiling),
        },
      ),
    );
  }

  const only = region.taxBrackets.length === 1 ? region.taxBrackets[0] : undefined;
  if (only) {
    parts.push(
      intl.formatMessage(
        { id: "employee.form.region.hint.flat" },
        { rate: formatPercentage(only.rate) },
      ),
    );
  } else {
    parts.push(
      intl.formatMessage(
        { id: "employee.form.region.hint.progressive" },
        { rates: region.taxBrackets.map((b) => formatPercentage(b.rate)).join(", ") },
      ),
    );
  }

  return parts.join(", ");
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  const intl = useIntl();
  const description = describeBrackets(value, intl);

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
