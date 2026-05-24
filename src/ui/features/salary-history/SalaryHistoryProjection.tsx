import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { Field, Money, Select, Stack } from "@/ui/design-system/primitives";
import type { SalaryEntry } from "./salaryHistory.ts";
import type { ProjectionBundle } from "./useSalaryProjection.ts";

interface SalaryHistoryProjectionProps {
  readonly baseEntry: SalaryEntry | null;
  readonly projection: ProjectionBundle;
  readonly horizon: number;
  readonly growthPct: number;
  readonly onHorizonChange: (value: number) => void;
  readonly onGrowthPctChange: (value: number) => void;
}

const HORIZON_OPTIONS: ReadonlyArray<number> = [1, 2, 3, 5, 7, 10];
const MIN_GROWTH = -50;
const MAX_GROWTH = 50;

export function SalaryHistoryProjection({
  baseEntry,
  projection,
  horizon,
  growthPct,
  onHorizonChange,
  onGrowthPctChange,
}: SalaryHistoryProjectionProps) {
  const intl = useIntl();

  if (baseEntry === null) {
    return (
      <p className="qg-history-projection__empty">
        <FormattedMessage id="history.projection.emptyHint" />
      </p>
    );
  }

  const last = projection.expected[projection.expected.length - 1] ?? null;

  return (
    <Stack gap="md">
      <p className="qg-history-projection__lede">
        <FormattedMessage
          id="history.projection.lede"
          values={{ year: baseEntry.year, gross: baseEntry.grossAnnual }}
        />
      </p>

      <div className="qg-history-form__row">
        <Select
          label={<FormattedMessage id="history.projection.horizonLabel" />}
          value={horizon}
          onChange={(e) => onHorizonChange(Number(e.target.value))}
        >
          {HORIZON_OPTIONS.map((y) => (
            <option key={y} value={y}>
              {intl.formatMessage({ id: "history.projection.horizonYears" }, { years: y })}
            </option>
          ))}
        </Select>

        <Field
          label={<FormattedMessage id="history.projection.growthRateLabel" />}
          type="number"
          min={MIN_GROWTH}
          max={MAX_GROWTH}
          step={0.1}
          value={growthPct}
          onChange={(e) => {
            const raw = Number(e.target.value);
            const clamped = Math.max(MIN_GROWTH, Math.min(MAX_GROWTH, raw));
            onGrowthPctChange(clamped);
          }}
          trailing="%"
          inputMode="decimal"
        />
      </div>

      {last !== null ? (
        <div className="qg-history-projection__result">
          <p>
            <FormattedMessage
              id="history.projection.summary"
              values={{
                year: last.year,
                growth: (
                  <FormattedNumber
                    value={growthPct / 100}
                    style="percent"
                    maximumFractionDigits={2}
                  />
                ),
                gross: <Money amount={last.grossAnnual} whole />,
                net:
                  last.net !== null ? <Money amount={last.net.netAnnual} whole /> : <span>—</span>,
                netMonthly:
                  last.net !== null ? (
                    <Money amount={Math.round(last.net.netMonthly)} whole />
                  ) : (
                    <span>—</span>
                  ),
              }}
            />
          </p>
        </div>
      ) : null}
    </Stack>
  );
}
