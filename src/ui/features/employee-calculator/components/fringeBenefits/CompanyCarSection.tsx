import { useIntl, FormattedMessage } from "react-intl";
import type { CompanyCarInput, CompanyCarMode, FringePowertrainType } from "@/domain/data";
import { Field } from "@/ui/design-system/primitives";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";
import type { SupportedYear } from "@/domain/data";

interface CompanyCarSectionProps {
  readonly value: CompanyCarInput;
  readonly onChange: (next: CompanyCarInput) => void;
  readonly taxYear: SupportedYear;
}

const MAX_CAR_VALUE = 100_000;
const MODES: ReadonlyArray<CompanyCarMode> = ["simple", "detailed"];
const POWERTRAINS: ReadonlyArray<FringePowertrainType> = ["bev", "phev", "other"];

export function CompanyCarSection({ value, onChange, taxYear }: CompanyCarSectionProps) {
  const intl = useIntl();
  const usesPowertrain = taxYear >= 2025;

  return (
    <div className="qg-extras__body">
      <div
        className="qg-mode-selector"
        role="group"
        aria-label={intl.formatMessage({ id: "employee.fringe.companyCar.modeLabel" })}
      >
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            className="qg-mode-selector__btn"
            aria-pressed={value.mode === m}
            onClick={() => onChange({ ...value, mode: m })}
          >
            <FormattedMessage id={`employee.fringe.companyCar.mode.${m}`} />
          </button>
        ))}
      </div>

      {value.mode === "simple" ? (
        <Field
          label={<FormattedMessage id="employee.fringe.companyCar.annualValue" />}
          hint={<FormattedMessage id="employee.fringe.companyCar.annualValue.hint" />}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={formatThousands(value.annualBenefitValue ?? 0)}
          onChange={(e) =>
            onChange({
              ...value,
              annualBenefitValue: Math.min(parseDigits(e.target.value), MAX_CAR_VALUE),
            })
          }
          trailing="€"
        />
      ) : (
        <>
          {usesPowertrain ? (
            <div
              className="qg-mode-selector"
              role="group"
              aria-label={intl.formatMessage({ id: "employee.fringe.companyCar.powertrain.label" })}
            >
              {POWERTRAINS.map((pt) => (
                <button
                  key={pt}
                  type="button"
                  className="qg-mode-selector__btn"
                  aria-pressed={(value.powertrainType ?? "other") === pt}
                  onClick={() => onChange({ ...value, powertrainType: pt })}
                >
                  <FormattedMessage id={`employee.fringe.companyCar.powertrain.${pt}`} />
                </button>
              ))}
            </div>
          ) : (
            <Field
              label={<FormattedMessage id="employee.fringe.companyCar.co2" />}
              hint={<FormattedMessage id="employee.fringe.companyCar.co2.hint" />}
              type="number"
              min={0}
              max={500}
              value={value.co2Emissions ?? 0}
              onChange={(e) =>
                onChange({ ...value, co2Emissions: Math.max(0, Number(e.target.value)) })
              }
              inputMode="numeric"
            />
          )}

          <Field
            label={<FormattedMessage id="employee.fringe.companyCar.aciCost" />}
            hint={<FormattedMessage id="employee.fringe.companyCar.aciCost.hint" />}
            type="number"
            min={0}
            max={200}
            step={1}
            value={Math.round((value.aciCostPerKm ?? 0) * 100)}
            onChange={(e) =>
              onChange({ ...value, aciCostPerKm: Math.max(0, Number(e.target.value)) / 100 })
            }
            trailing="¢"
            inputMode="numeric"
          />

          <Field
            label={<FormattedMessage id="employee.fringe.companyCar.conventionalKm" />}
            hint={<FormattedMessage id="employee.fringe.companyCar.conventionalKm.hint" />}
            type="number"
            min={0}
            max={50_000}
            step={1000}
            value={value.conventionalKm ?? 15_000}
            onChange={(e) =>
              onChange({ ...value, conventionalKm: Math.max(0, Number(e.target.value)) })
            }
            inputMode="numeric"
          />
        </>
      )}
    </div>
  );
}
