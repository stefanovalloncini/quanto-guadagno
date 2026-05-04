import { FormattedMessage } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system";
import { SUPPORTED_YEARS, type SupportedYear } from "@/domain/data";

const yearOptions = SUPPORTED_YEARS.map((y) => ({ value: y, label: String(y) }));

export interface EmployeeFormProps {
  readonly grossAnnual: number;
  readonly regionalRatePercent: number;
  readonly municipalRatePercent: number;
  readonly taxYear: SupportedYear;
  readonly onGrossChange: (n: number) => void;
  readonly onRegionalChange: (n: number) => void;
  readonly onMunicipalChange: (n: number) => void;
  readonly onTaxYearChange: (year: SupportedYear) => void;
}

export function EmployeeForm(props: EmployeeFormProps) {
  return (
    <section className="qg-form" aria-labelledby="qg-form-title">
      <h2 id="qg-form-title" className="qg-form__title">
        <FormattedMessage id="form.section.title" />
      </h2>

      <Stack gap="lg">
        <Field
          type="currency"
          label={<FormattedMessage id="form.gross.label" />}
          hint={<FormattedMessage id="form.gross.hint" />}
          value={props.grossAnnual}
          onChange={props.onGrossChange}
        />
        <Select<SupportedYear>
          label={<FormattedMessage id="form.year.label" />}
          hint={<FormattedMessage id="form.year.hint" />}
          value={props.taxYear}
          options={yearOptions}
          onChange={props.onTaxYearChange}
        />
        <Field
          type="percentage"
          label={<FormattedMessage id="form.regional.label" />}
          hint={<FormattedMessage id="form.regional.hint" />}
          value={props.regionalRatePercent}
          onChange={props.onRegionalChange}
          max={10}
        />
        <Field
          type="percentage"
          label={<FormattedMessage id="form.municipal.label" />}
          hint={<FormattedMessage id="form.municipal.hint" />}
          value={props.municipalRatePercent}
          onChange={props.onMunicipalChange}
          max={1}
        />
      </Stack>
    </section>
  );
}
