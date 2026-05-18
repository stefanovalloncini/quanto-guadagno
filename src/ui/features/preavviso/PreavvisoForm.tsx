import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system/primitives";
import { CCNL_IDS, CCNL_TABLE, type CcnlId } from "@/domain/data";
import type { PreavvisoCalculator } from "./usePreavvisoCalculator.ts";

interface PreavvisoFormProps {
  readonly calc: PreavvisoCalculator;
}

export function PreavvisoForm({ calc }: PreavvisoFormProps) {
  const { state, update, setCcnl } = calc;
  const livelli = CCNL_TABLE[state.ccnlId].livelli;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="md">
        <Select
          label={<FormattedMessage id="preavviso.form.ccnl" />}
          value={state.ccnlId}
          onChange={(e) => setCcnl(e.target.value as CcnlId)}
        >
          {CCNL_IDS.map((id) => (
            <option key={id} value={id}>
              {CCNL_TABLE[id].label}
            </option>
          ))}
        </Select>

        <Select
          label={<FormattedMessage id="preavviso.form.livello" />}
          value={state.livelloId}
          onChange={(e) => update({ livelloId: e.target.value })}
        >
          {livelli.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </Select>

        <Field
          label={<FormattedMessage id="preavviso.form.hireDate" />}
          type="date"
          value={state.hireDate}
          onChange={(e) => update({ hireDate: e.target.value })}
          max={state.resignationDate}
        />

        <Field
          label={<FormattedMessage id="preavviso.form.resignationDate" />}
          type="date"
          value={state.resignationDate}
          onChange={(e) => update({ resignationDate: e.target.value })}
          min={state.hireDate}
        />
      </Stack>
    </form>
  );
}
