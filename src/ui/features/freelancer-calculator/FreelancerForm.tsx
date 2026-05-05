import { FormattedMessage, useIntl } from "react-intl";
import { Field, Select, Stack } from "@/ui/design-system";
import { FREELANCER_YEARS, type FreelancerYear } from "@/domain/data";
import type { GestioneSeparataKind } from "@/domain/calc";

const yearOptions = FREELANCER_YEARS.map((y) => ({ value: y, label: String(y) }));

export interface FreelancerFormProps {
  readonly revenue: number;
  readonly profitabilityCoefficientPercent: number;
  readonly isStartup: boolean;
  readonly inpsKind: GestioneSeparataKind;
  readonly taxYear: FreelancerYear;
  readonly onRevenueChange: (n: number) => void;
  readonly onCoefficientChange: (n: number) => void;
  readonly onStartupChange: (v: boolean) => void;
  readonly onInpsKindChange: (v: GestioneSeparataKind) => void;
  readonly onTaxYearChange: (year: FreelancerYear) => void;
}

export function FreelancerForm(props: FreelancerFormProps) {
  const intl = useIntl();
  const inpsOptions: ReadonlyArray<{ value: GestioneSeparataKind; label: string }> = [
    {
      value: "full",
      label: intl.formatMessage({ id: "freelancer.form.inps.full" }),
    },
    {
      value: "reduced",
      label: intl.formatMessage({ id: "freelancer.form.inps.reduced" }),
    },
  ];

  const regimeOptions = [
    {
      value: "standard" as const,
      label: intl.formatMessage({ id: "freelancer.form.regime.standard" }),
    },
    {
      value: "startup" as const,
      label: intl.formatMessage({ id: "freelancer.form.regime.startup" }),
    },
  ];

  return (
    <section className="qg-form" aria-labelledby="qg-freelancer-form-title">
      <h2 id="qg-freelancer-form-title" className="qg-form__title">
        <FormattedMessage id="form.section.title" />
      </h2>

      <Stack gap="lg">
        <Field
          type="currency"
          label={<FormattedMessage id="freelancer.form.revenue.label" />}
          hint={<FormattedMessage id="freelancer.form.revenue.hint" />}
          value={props.revenue}
          onChange={props.onRevenueChange}
        />
        <Select<FreelancerYear>
          label={<FormattedMessage id="form.year.label" />}
          hint={<FormattedMessage id="freelancer.form.year.hint" />}
          value={props.taxYear}
          options={yearOptions}
          onChange={props.onTaxYearChange}
        />
        <Field
          type="percentage"
          label={<FormattedMessage id="freelancer.form.coefficient.label" />}
          hint={<FormattedMessage id="freelancer.form.coefficient.hint" />}
          value={props.profitabilityCoefficientPercent}
          onChange={props.onCoefficientChange}
          max={100}
        />
        <Select<"standard" | "startup">
          label={<FormattedMessage id="freelancer.form.regime.label" />}
          hint={<FormattedMessage id="freelancer.form.regime.hint" />}
          value={props.isStartup ? "startup" : "standard"}
          options={regimeOptions}
          onChange={(v) => props.onStartupChange(v === "startup")}
        />
        <Select<GestioneSeparataKind>
          label={<FormattedMessage id="freelancer.form.inps.label" />}
          hint={<FormattedMessage id="freelancer.form.inps.hint" />}
          value={props.inpsKind}
          options={inpsOptions}
          onChange={props.onInpsKindChange}
        />
      </Stack>
    </section>
  );
}
