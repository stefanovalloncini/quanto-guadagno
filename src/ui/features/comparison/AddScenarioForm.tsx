import { useId, useState, type FormEvent } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Field, Select, Stack } from "@/ui/design-system";
import { SUPPORTED_YEARS, type SupportedYear } from "@/domain/data";
import type { ScenarioPayload } from "./scenarioPayload.ts";

const yearOptions = SUPPORTED_YEARS.map((y) => ({ value: y, label: String(y) }));

export interface AddScenarioFormProps {
  readonly onAdd: (label: string, payload: ScenarioPayload) => void;
}

export function AddScenarioForm({ onAdd }: AddScenarioFormProps) {
  const intl = useIntl();
  const labelInputId = useId();
  const [label, setLabel] = useState("");
  const [grossAnnual, setGrossAnnual] = useState(30_000);
  const [taxYear, setTaxYear] = useState<SupportedYear>(2026);
  const [regionalRatePercent, setRegionalRatePercent] = useState(1.73);
  const [municipalRatePercent, setMunicipalRatePercent] = useState(0.8);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = label.trim() || intl.formatMessage({ id: "comparison.scenario.untitled" });
    onAdd(trimmed, { grossAnnual, taxYear, regionalRatePercent, municipalRatePercent });
    setLabel("");
  };

  return (
    <form className="qg-form" onSubmit={handleSubmit} aria-labelledby="qg-comparison-form-title">
      <h2 id="qg-comparison-form-title" className="qg-form__title">
        <FormattedMessage id="comparison.form.title" />
      </h2>
      <Stack gap="md">
        <div className="qg-field">
          <label htmlFor={labelInputId} className="qg-field__label">
            <FormattedMessage id="comparison.form.label.label" />
          </label>
          <input
            id={labelInputId}
            type="text"
            className="qg-field__input"
            value={label}
            placeholder={intl.formatMessage({ id: "comparison.form.label.placeholder" })}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <Field
          type="currency"
          label={<FormattedMessage id="form.gross.label" />}
          value={grossAnnual}
          onChange={setGrossAnnual}
        />
        <Select<SupportedYear>
          label={<FormattedMessage id="form.year.label" />}
          value={taxYear}
          options={yearOptions}
          onChange={setTaxYear}
        />
        <Field
          type="percentage"
          label={<FormattedMessage id="form.regional.label" />}
          value={regionalRatePercent}
          onChange={setRegionalRatePercent}
          max={10}
        />
        <Field
          type="percentage"
          label={<FormattedMessage id="form.municipal.label" />}
          value={municipalRatePercent}
          onChange={setMunicipalRatePercent}
          max={1}
        />
        <Button type="submit">
          <FormattedMessage id="comparison.form.submit" />
        </Button>
      </Stack>
    </form>
  );
}
