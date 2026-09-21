import { FormattedMessage, useIntl } from "react-intl";
import { getTaxConfig } from "@/domain/data";
import type {
  FringeBenefitsInput as FringeBenefitsInputType,
  CompanyCarInput,
  MealVouchersInput,
  HealthInsuranceInput,
  WelfareInput,
} from "@/domain/data";
import { EnableToggle, Field, OptionToggle, Stack } from "@/ui/design-system/primitives";
import { EUR_AMOUNT_FORMAT, formatThousands, parseDigits } from "@/ui/shared/numeric.ts";
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
const MAX_PREMIUM = 50_000;

const DEFAULT_HEALTH: HealthInsuranceInput = { annualPremium: 0 };
const DEFAULT_WELFARE: WelfareInput = { annualAmount: 0, hasDependentChildren: false };
const EMPTY: FringeBenefitsInputType = {};

function without<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const copy = { ...obj };
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete copy[key];
  return copy;
}

export function FringeBenefitsInput({ value, onChange, taxYear }: FringeBenefitsInputProps) {
  const intl = useIntl();
  const fb = getTaxConfig(taxYear).fringeBenefits;
  const current = value ?? EMPTY;
  const enabled = value !== null;

  return (
    <Stack gap="md">
      <EnableToggle checked={enabled} onChange={(c) => onChange(c ? EMPTY : null)} />

      {enabled && (
        <div className="qg-options">
          <OptionToggle
            checked={!!current.companyCar}
            onChange={(c) =>
              onChange(c ? { ...current, companyCar: DEFAULT_CAR } : without(current, "companyCar"))
            }
            label={<FormattedMessage id="employee.fringe.companyCar.title" />}
            hint={<FormattedMessage id="employee.fringe.companyCar.subtitle" />}
          >
            {current.companyCar && (
              <CompanyCarSection
                value={current.companyCar}
                onChange={(v) => onChange({ ...current, companyCar: v })}
                taxYear={taxYear}
              />
            )}
          </OptionToggle>

          <OptionToggle
            checked={!!current.mealVouchers}
            onChange={(c) =>
              onChange(
                c
                  ? { ...current, mealVouchers: DEFAULT_VOUCHERS }
                  : without(current, "mealVouchers"),
              )
            }
            label={<FormattedMessage id="employee.fringe.mealVouchers.title" />}
            hint={
              <FormattedMessage
                id="employee.fringe.mealVouchers.subtitle"
                values={{
                  amount: intl.formatNumber(fb.mealVouchersDailyThreshold, EUR_AMOUNT_FORMAT),
                  paper: intl.formatNumber(fb.mealVouchersPaperThreshold, EUR_AMOUNT_FORMAT),
                }}
              />
            }
          >
            {current.mealVouchers && (
              <MealVouchersCard
                value={current.mealVouchers}
                onChange={(v) => onChange({ ...current, mealVouchers: v })}
                electronicThreshold={fb.mealVouchersDailyThreshold}
                paperThreshold={fb.mealVouchersPaperThreshold}
              />
            )}
          </OptionToggle>

          <OptionToggle
            checked={!!current.healthInsurance}
            onChange={(c) =>
              onChange(
                c
                  ? { ...current, healthInsurance: DEFAULT_HEALTH }
                  : without(current, "healthInsurance"),
              )
            }
            label={<FormattedMessage id="employee.fringe.healthInsurance.title" />}
            hint={<FormattedMessage id="employee.fringe.healthInsurance.subtitle" />}
          >
            {current.healthInsurance && (
              <Field
                label={<FormattedMessage id="employee.fringe.healthInsurance.annualPremium" />}
                hint={<FormattedMessage id="employee.fringe.healthInsurance.annualPremium.hint" />}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={formatThousands(current.healthInsurance.annualPremium)}
                onChange={(e) =>
                  onChange({
                    ...current,
                    healthInsurance: {
                      annualPremium: Math.min(parseDigits(e.target.value), MAX_PREMIUM),
                    },
                  })
                }
                trailing="€"
              />
            )}
          </OptionToggle>

          <OptionToggle
            checked={!!current.welfare}
            onChange={(c) =>
              onChange(c ? { ...current, welfare: DEFAULT_WELFARE } : without(current, "welfare"))
            }
            label={<FormattedMessage id="employee.fringe.welfare.title" />}
            hint={
              <FormattedMessage
                id="employee.fringe.welfare.subtitle"
                values={{
                  amount: intl.formatNumber(fb.welfareThresholdGeneral, EUR_AMOUNT_FORMAT),
                  amountChildren: intl.formatNumber(
                    fb.welfareThresholdWithChildren,
                    EUR_AMOUNT_FORMAT,
                  ),
                }}
              />
            }
          >
            {current.welfare && (
              <WelfareCard
                value={current.welfare}
                onChange={(v) => onChange({ ...current, welfare: v })}
                generalThreshold={fb.welfareThresholdGeneral}
                childrenThreshold={fb.welfareThresholdWithChildren}
              />
            )}
          </OptionToggle>
        </div>
      )}
    </Stack>
  );
}
