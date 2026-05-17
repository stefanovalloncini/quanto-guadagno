import { FormattedMessage, useIntl } from "react-intl";
import type { PremioRisultatoInput as PremioRisultatoInputType } from "@/domain/calc";
import { getTaxConfig, type SupportedYear } from "@/domain/data";
import { EnableToggle, Field, Money, Stack } from "@/ui/design-system/primitives";

interface PremioRisultatoInputProps {
  readonly value: PremioRisultatoInputType | null;
  readonly onChange: (next: PremioRisultatoInputType | null) => void;
  readonly taxYear: SupportedYear;
}

const DEFAULT_VALUE: PremioRisultatoInputType = { amount: 0 };

export function PremioRisultatoInput({ value, onChange, taxYear }: PremioRisultatoInputProps) {
  const intl = useIntl();
  const { pdrSostitutiva } = getTaxConfig(taxYear);
  const current = value ?? DEFAULT_VALUE;
  const enabled = value !== null;

  const toggle = (checked: boolean) => onChange(checked ? DEFAULT_VALUE : null);

  const rateFormatted = intl.formatNumber(pdrSostitutiva.rate, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Stack gap="md">
      <EnableToggle checked={enabled} onChange={toggle} />

      {enabled && (
        <Field
          label={
            <FormattedMessage
              id="employee.premio.amount"
              values={{ max: <Money amount={pdrSostitutiva.maxAmount} whole /> }}
            />
          }
          hint={<FormattedMessage id="employee.premio.hint" values={{ rate: rateFormatted }} />}
          type="number"
          min={0}
          max={pdrSostitutiva.maxAmount}
          step={100}
          value={current.amount}
          onChange={(e) => onChange({ amount: Math.max(0, Number(e.target.value)) })}
          trailing="€"
          inputMode="numeric"
        />
      )}
    </Stack>
  );
}
