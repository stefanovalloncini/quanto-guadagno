import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Field, Select } from "@/ui/design-system/primitives";
import { RegionSelector } from "@/ui/features/employee-calculator/components/RegionSelector.tsx";
import { PaymentFrequencySelector } from "@/ui/features/employee-calculator/components/PaymentFrequencySelector.tsx";
import type { ContractType } from "@/domain/calc";
import { FOI_INDEX } from "@/domain/data";
import { type SalaryEntrySettings } from "./salaryHistory.ts";
import { SalaryHistoryAdvancedFields } from "./SalaryHistoryAdvancedFields.tsx";
import type { NewEntryInput } from "./useSalaryHistory.ts";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";

const MAX_GROSS = 1_000_000;

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

const YEAR_OPTIONS = FOI_INDEX.map((p) => p.year);
const DEFAULT_YEAR = YEAR_OPTIONS[YEAR_OPTIONS.length - 1] ?? 2026;

interface SalaryHistoryFormProps {
  readonly defaultSettings: SalaryEntrySettings;
  readonly onSubmit: (entry: NewEntryInput) => void;
}

interface FormState {
  readonly year: number;
  readonly grossAnnual: number;
  readonly settings: SalaryEntrySettings;
  readonly note: string;
}

function initState(defaults: SalaryEntrySettings): FormState {
  return { year: DEFAULT_YEAR, grossAnnual: 30_000, settings: defaults, note: "" };
}

export function SalaryHistoryForm({ defaultSettings, onSubmit }: SalaryHistoryFormProps) {
  const intl = useIntl();
  const [state, setState] = useState<FormState>(() => initState(defaultSettings));

  const replaceSettings = (next: SalaryEntrySettings) =>
    setState((s) => ({ ...s, settings: next }));

  const updateRequired = <
    K extends "contractType" | "regionCode" | "municipalTaxRate" | "paymentFrequency",
  >(
    key: K,
    value: SalaryEntrySettings[K],
  ) => setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } }));

  return (
    <form
      className="qg-history-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (state.grossAnnual <= 0) return;
        onSubmit({
          year: state.year,
          grossAnnual: state.grossAnnual,
          settings: state.settings,
          ...(state.note.length > 0 ? { note: state.note } : {}),
        });
        setState((s) => ({ ...initState(s.settings), year: s.year }));
      }}
    >
      <div className="qg-calc__form-stack">
        <div className="qg-history-form__row">
          <Select
            label={<FormattedMessage id="history.form.year" />}
            value={state.year}
            onChange={(e) => setState((s) => ({ ...s, year: Number(e.target.value) }))}
          >
            {[...YEAR_OPTIONS].reverse().map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>

          <Field
            label={<FormattedMessage id="history.form.gross" />}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatThousands(state.grossAnnual)}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                grossAnnual: Math.min(parseDigits(e.target.value), MAX_GROSS),
              }))
            }
            trailing="€"
          />
        </div>

        <Select
          label={<FormattedMessage id="history.form.contractType" />}
          value={state.settings.contractType}
          onChange={(e) => updateRequired("contractType", e.target.value as ContractType)}
        >
          {CONTRACT_TYPES.map((c) => (
            <option key={c} value={c}>
              {intl.formatMessage({ id: `employee.form.contractType.${c}` })}
            </option>
          ))}
        </Select>

        <RegionSelector
          value={state.settings.regionCode}
          onChange={(regionCode) => updateRequired("regionCode", regionCode)}
        />

        <div className="qg-history-form__row">
          <PaymentFrequencySelector
            value={state.settings.paymentFrequency}
            onChange={(paymentFrequency) => updateRequired("paymentFrequency", paymentFrequency)}
          />

          <Field
            label={<FormattedMessage id="history.form.municipalTaxRate" />}
            type="number"
            min={0}
            max={2}
            step={0.01}
            value={Number((state.settings.municipalTaxRate * 100).toFixed(2))}
            onChange={(e) =>
              updateRequired(
                "municipalTaxRate",
                Math.max(0, Math.min(0.02, Number(e.target.value) / 100)),
              )
            }
            trailing="%"
            inputMode="decimal"
          />
        </div>

        <details className="qg-history-form__extras">
          <summary>
            <FormattedMessage id="history.form.extras" />
          </summary>
          <SalaryHistoryAdvancedFields
            settings={state.settings}
            onSettingsChange={replaceSettings}
          />
        </details>

        <Field
          label={<FormattedMessage id="history.form.note" />}
          hint={<FormattedMessage id="history.form.note.hint" />}
          type="text"
          value={state.note}
          onChange={(e) => setState((s) => ({ ...s, note: e.target.value }))}
        />

        <div className="qg-history-form__actions">
          <Button type="submit">
            <FormattedMessage id="history.form.submit" />
          </Button>
        </div>
      </div>
    </form>
  );
}
