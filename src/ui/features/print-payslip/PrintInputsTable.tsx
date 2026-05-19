import { FormattedMessage } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import { formatPercentage } from "@/domain/format.ts";
import type { FormState } from "@/ui/features/employee-calculator/useEmployeeCalculator";
import type { MessageKey } from "@/ui/i18n/messages/it";

interface PrintInputsTableProps {
  readonly state: FormState;
  readonly regionName: string;
}

const CONTRACT_LABEL: Record<FormState["contractType"], MessageKey> = {
  indeterminato: "print.input.contract.indeterminato",
  determinato: "print.input.contract.determinato",
  apprendistato: "print.input.contract.apprendistato",
};

export function PrintInputsTable({ state, regionName }: PrintInputsTableProps) {
  const inpsOverride = state.inpsOverride;

  return (
    <dl className="qg-print-payslip__inputs-grid">
      <Row labelId="print.input.gross">
        <Money amount={state.grossAnnual} whole />
      </Row>
      <Row labelId="print.input.year">
        <span>{state.taxYear}</span>
      </Row>
      <Row labelId="print.input.region">
        <span>{regionName}</span>
      </Row>
      <Row labelId="print.input.municipality">
        <span>{formatPercentage(state.municipalTaxRate)}</span>
      </Row>
      <Row labelId="print.input.contract">
        <FormattedMessage id={CONTRACT_LABEL[state.contractType]} />
      </Row>
      <Row labelId="print.input.frequency">
        <span>{state.paymentFrequency}</span>
      </Row>
      <Row labelId="print.input.companySize">
        <FormattedMessage
          id={
            state.companySize === "large"
              ? "print.input.companySize.large"
              : "print.input.companySize.small"
          }
        />
      </Row>
      {state.isPublicEmployee && (
        <Row labelId="print.input.publicEmployee">
          <FormattedMessage id="print.input.yes" />
        </Row>
      )}
      {inpsOverride !== null && (
        <Row labelId="print.input.inpsOverride">
          <span>
            {formatPercentage(inpsOverride.employeeRate)}
            {" / "}
            {formatPercentage(inpsOverride.employerRate)}
          </span>
        </Row>
      )}
    </dl>
  );
}

interface RowProps {
  readonly labelId: MessageKey;
  readonly children: React.ReactNode;
}

function Row({ labelId, children }: RowProps) {
  return (
    <div className="qg-print-payslip__inputs-row">
      <dt>
        <FormattedMessage id={labelId} />
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
