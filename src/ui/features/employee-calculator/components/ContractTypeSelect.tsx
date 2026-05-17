import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Select } from "@/ui/design-system/primitives";
import type { ContractType } from "@/domain/calc";

const CONTRACT_TYPES: ReadonlyArray<ContractType> = [
  "indeterminato",
  "determinato",
  "apprendistato",
];

interface ContractTypeSelectProps {
  readonly value: ContractType;
  readonly onChange: (value: ContractType) => void;
  readonly grossAnnual?: number;
}

function buildProgressionHref(grossAnnual: number | undefined): string {
  if (grossAnnual === undefined || !Number.isFinite(grossAnnual) || grossAnnual <= 0) {
    return "/progressione-apprendistato";
  }
  return `/progressione-apprendistato?lordo=${Math.round(grossAnnual)}`;
}

export function ContractTypeSelect({ value, onChange, grossAnnual }: ContractTypeSelectProps) {
  const intl = useIntl();

  return (
    <div>
      <Select
        label={<FormattedMessage id="employee.form.contractType" />}
        value={value}
        onChange={(e) => onChange(e.target.value as ContractType)}
      >
        {CONTRACT_TYPES.map((type) => (
          <option key={type} value={type}>
            {intl.formatMessage({ id: `employee.form.contractType.${type}` })}
          </option>
        ))}
      </Select>
      {value === "apprendistato" && (
        <p className="qg-field__hint">
          <Link to={buildProgressionHref(grossAnnual)} className="qg-btn--link">
            <FormattedMessage id="employee.form.contractType.apprenticeshipLink" />
            {" →"}
          </Link>
        </p>
      )}
    </div>
  );
}
