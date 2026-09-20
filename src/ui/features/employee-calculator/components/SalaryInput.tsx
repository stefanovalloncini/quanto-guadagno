import { FormattedMessage, useIntl } from "react-intl";
import { Field, Money } from "@/ui/design-system/primitives";
import { formatThousands, parseDigits } from "@/ui/shared/numeric.ts";
import type { EmployeeCalculator, SalaryMode } from "../useEmployeeCalculator.ts";
import { MAX_TARGET_NET_MONTHLY } from "../urlState.ts";

const MAX_GROSS = 1_000_000;
const MODES: ReadonlyArray<SalaryMode> = ["gross", "net"];

interface SalaryInputProps {
  readonly calc: EmployeeCalculator;
}

export function SalaryInput({ calc }: SalaryInputProps) {
  const intl = useIntl();
  const { state, update, setSalaryMode, input, result } = calc;
  const isNet = state.salaryMode === "net";

  return (
    <div className="qg-salary-input">
      <div
        className="qg-mode-selector"
        role="group"
        aria-label={intl.formatMessage({ id: "employee.mode.label" })}
      >
        {MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            className="qg-mode-selector__btn"
            aria-pressed={state.salaryMode === mode}
            onClick={() => setSalaryMode(mode)}
          >
            <FormattedMessage id={`employee.mode.${mode}`} />
          </button>
        ))}
      </div>

      {isNet ? (
        <Field
          label={<FormattedMessage id="employee.form.targetNet" />}
          hint={
            <FormattedMessage
              id="employee.form.targetNet.hint"
              values={{
                amount: <Money amount={state.targetNetMonthly * state.paymentFrequency} whole />,
                frequency: state.paymentFrequency,
              }}
            />
          }
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={formatThousands(state.targetNetMonthly)}
          onChange={(e) =>
            update({
              targetNetMonthly: Math.min(parseDigits(e.target.value), MAX_TARGET_NET_MONTHLY),
            })
          }
          trailing="€"
        />
      ) : (
        <Field
          label={<FormattedMessage id="employee.form.salary" />}
          hint={
            <FormattedMessage
              id="employee.form.salary.monthly"
              values={{ amount: <Money amount={result.grossMonthly} whole /> }}
            />
          }
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={formatThousands(input.grossAnnual)}
          onChange={(e) =>
            update({ grossAnnual: Math.min(parseDigits(e.target.value), MAX_GROSS) })
          }
          trailing="€"
        />
      )}
    </div>
  );
}
