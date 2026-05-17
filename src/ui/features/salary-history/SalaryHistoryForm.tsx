import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Field, Select, Stack } from "@/ui/design-system/primitives";
import type { ContractType } from "@/domain/calc";
import { FOI_INDEX } from "@/domain/data";
import type { NewEntryInput } from "./useSalaryHistory.ts";

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

interface SalaryHistoryFormProps {
  readonly onSubmit: (entry: NewEntryInput) => void;
}

interface FormState {
  readonly year: number;
  readonly grossAnnual: number;
  readonly contractType: ContractType;
  readonly note: string;
}

const YEAR_OPTIONS = FOI_INDEX.map((p) => p.year);
const DEFAULT_YEAR = YEAR_OPTIONS[YEAR_OPTIONS.length - 1] ?? 2026;

const DEFAULTS: FormState = {
  year: DEFAULT_YEAR,
  grossAnnual: 30_000,
  contractType: "indeterminato",
  note: "",
};

export function SalaryHistoryForm({ onSubmit }: SalaryHistoryFormProps) {
  const intl = useIntl();
  const [state, setState] = useState<FormState>(DEFAULTS);

  return (
    <form
      className="qg-history-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (state.grossAnnual <= 0) return;
        onSubmit({
          year: state.year,
          grossAnnual: state.grossAnnual,
          contractType: state.contractType,
          ...(state.note.length > 0 ? { note: state.note } : {}),
        });
        setState((s) => ({ ...DEFAULTS, year: s.year, contractType: s.contractType }));
      }}
    >
      <Stack gap="md">
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
            type="number"
            min={1}
            max={1_000_000}
            step={100}
            value={state.grossAnnual}
            onChange={(e) =>
              setState((s) => ({ ...s, grossAnnual: Math.max(0, Number(e.target.value)) }))
            }
            trailing="€"
            inputMode="numeric"
          />
        </div>

        <Select
          label={<FormattedMessage id="history.form.contractType" />}
          value={state.contractType}
          onChange={(e) =>
            setState((s) => ({ ...s, contractType: e.target.value as ContractType }))
          }
        >
          {CONTRACT_TYPES.map((c) => (
            <option key={c} value={c}>
              {intl.formatMessage({ id: `employee.form.contractType.${c}` })}
            </option>
          ))}
        </Select>

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
      </Stack>
    </form>
  );
}
