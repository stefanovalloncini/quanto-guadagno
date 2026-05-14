import { FormattedMessage } from "react-intl";
import type {
  FringeBenefitsInput as FringeBenefitsInputType,
  CompanyCarInput,
  MealVouchersInput,
  HealthInsuranceInput,
  WelfareInput,
} from "@/domain/data";
import { Field, Stack } from "@/ui/design-system/primitives";
import { CompanyCarSection } from "./fringeBenefits/CompanyCarSection.tsx";
import { MealVouchersCard } from "./fringeBenefits/MealVouchersCard.tsx";
import { WelfareCard } from "./fringeBenefits/WelfareCard.tsx";
import type { SupportedYear } from "@/domain/data";

interface FringeBenefitsInputProps {
  readonly value: FringeBenefitsInputType | null;
  readonly onChange: (next: FringeBenefitsInputType | null) => void;
  readonly taxYear: SupportedYear;
}

const DEFAULT_CAR: CompanyCarInput = { mode: "simple", annualBenefitValue: 0 };
const DEFAULT_VOUCHERS: MealVouchersInput = { dailyValue: 8, workingDaysPerMonth: 22 };
const DEFAULT_HEALTH: HealthInsuranceInput = { annualPremium: 0 };
const DEFAULT_WELFARE: WelfareInput = { annualAmount: 0, hasChildrenUnder18: false };
const EMPTY: FringeBenefitsInputType = {};

// Returns a copy of obj without the given key.
function without<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const copy = { ...obj };
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete copy[key];
  return copy;
}

export function FringeBenefitsInput({ value, onChange, taxYear }: FringeBenefitsInputProps) {
  const current = value ?? EMPTY;
  const enabled = value !== null;

  return (
    <details className="qg-extras">
      <summary>
        <FormattedMessage id="employee.fringe.title" />
      </summary>
      <div className="qg-extras__body">
        <label className="qg-toggle">
          <input
            type="checkbox"
            className="qg-toggle__input"
            checked={enabled}
            onChange={(e) => onChange(e.target.checked ? EMPTY : null)}
          />
          <span className="qg-toggle__label">
            <FormattedMessage id="employee.fringe.title" />
          </span>
        </label>

        {enabled && (
          <Stack gap="sm">
            <div className="qg-benefit-card">
              <label className="qg-toggle">
                <input
                  type="checkbox"
                  className="qg-toggle__input"
                  checked={!!current.companyCar}
                  onChange={(e) =>
                    onChange(
                      e.target.checked
                        ? { ...current, companyCar: DEFAULT_CAR }
                        : without(current, "companyCar"),
                    )
                  }
                />
                <span className="qg-toggle__label">
                  <FormattedMessage id="employee.fringe.companyCar.title" />
                </span>
              </label>
              {current.companyCar && (
                <div className="qg-benefit-card__body">
                  <CompanyCarSection
                    value={current.companyCar}
                    onChange={(v) => onChange({ ...current, companyCar: v })}
                    taxYear={taxYear}
                  />
                </div>
              )}
            </div>

            <div className="qg-benefit-card">
              <label className="qg-toggle">
                <input
                  type="checkbox"
                  className="qg-toggle__input"
                  checked={!!current.mealVouchers}
                  onChange={(e) =>
                    onChange(
                      e.target.checked
                        ? { ...current, mealVouchers: DEFAULT_VOUCHERS }
                        : without(current, "mealVouchers"),
                    )
                  }
                />
                <span className="qg-toggle__label">
                  <FormattedMessage id="employee.fringe.mealVouchers.title" />
                </span>
              </label>
              {current.mealVouchers && (
                <div className="qg-benefit-card__body">
                  <MealVouchersCard
                    value={current.mealVouchers}
                    onChange={(v) => onChange({ ...current, mealVouchers: v })}
                  />
                </div>
              )}
            </div>

            <div className="qg-benefit-card">
              <label className="qg-toggle">
                <input
                  type="checkbox"
                  className="qg-toggle__input"
                  checked={!!current.healthInsurance}
                  onChange={(e) =>
                    onChange(
                      e.target.checked
                        ? { ...current, healthInsurance: DEFAULT_HEALTH }
                        : without(current, "healthInsurance"),
                    )
                  }
                />
                <span className="qg-toggle__label">
                  <FormattedMessage id="employee.fringe.healthInsurance.title" />
                </span>
              </label>
              {current.healthInsurance && (
                <div className="qg-benefit-card__body">
                  <Field
                    label={<FormattedMessage id="employee.fringe.healthInsurance.annualPremium" />}
                    hint={
                      <FormattedMessage id="employee.fringe.healthInsurance.annualPremium.hint" />
                    }
                    type="number"
                    min={0}
                    max={50_000}
                    step={100}
                    value={current.healthInsurance.annualPremium}
                    onChange={(e) =>
                      onChange({
                        ...current,
                        healthInsurance: { annualPremium: Math.max(0, Number(e.target.value)) },
                      })
                    }
                    trailing="€"
                    inputMode="numeric"
                  />
                </div>
              )}
            </div>

            <div className="qg-benefit-card">
              <label className="qg-toggle">
                <input
                  type="checkbox"
                  className="qg-toggle__input"
                  checked={!!current.welfare}
                  onChange={(e) =>
                    onChange(
                      e.target.checked
                        ? { ...current, welfare: DEFAULT_WELFARE }
                        : without(current, "welfare"),
                    )
                  }
                />
                <span className="qg-toggle__label">
                  <FormattedMessage id="employee.fringe.welfare.title" />
                </span>
              </label>
              {current.welfare && (
                <div className="qg-benefit-card__body">
                  <WelfareCard
                    value={current.welfare}
                    onChange={(v) => onChange({ ...current, welfare: v })}
                  />
                </div>
              )}
            </div>
          </Stack>
        )}
      </div>
    </details>
  );
}
