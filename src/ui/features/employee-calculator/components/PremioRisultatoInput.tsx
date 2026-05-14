import { FormattedMessage, useIntl } from "react-intl";
import type { PremioRisultatoInput as PremioRisultatoInputType } from "@/domain/calc";
import { getTaxConfig, type SupportedYear } from "@/domain/data";
import { Field, Money, Stack } from "@/ui/design-system/primitives";

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
    <details className="qg-advanced">
      <summary>
        <FormattedMessage id="employee.premio.title" />
      </summary>
      <div className="qg-advanced__body">
        <label className="qg-toggle">
          <input
            type="checkbox"
            className="qg-toggle__input"
            checked={enabled}
            onChange={(e) => toggle(e.target.checked)}
          />
          <span className="qg-toggle__label">
            <FormattedMessage id="employee.premio.title" />
          </span>
        </label>

        {enabled && (
          <Stack gap="md">
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
          </Stack>
        )}
      </div>
    </details>
  );
}
