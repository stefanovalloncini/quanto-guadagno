import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Money } from "@/ui/design-system/primitives";
import type { SalaryBreakdown } from "@/domain/calc";

interface EmployerCostViewProps {
  readonly breakdown: SalaryBreakdown;
}

export function EmployerCostView({ breakdown }: EmployerCostViewProps) {
  const [open, setOpen] = useState(false);

  const costMultiplier =
    breakdown.grossAnnual > 0
      ? ((breakdown.totalEmployerCost / breakdown.grossAnnual - 1) * 100).toFixed(0)
      : "0";

  return (
    <div className="qg-employer-cost">
      <button
        type="button"
        className="qg-employer-cost__trigger"
        aria-expanded={open}
        aria-controls="employer-cost-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="qg-employer-cost__trigger-label">
          <FormattedMessage id="employee.employer.title" />
        </span>
        <span className="qg-employer-cost__trigger-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div id="employer-cost-panel" className="qg-employer-cost__panel">
          <div className="qg-employer-cost__row">
            <span>
              <FormattedMessage id="employee.breakdown.gross" />
            </span>
            <Money amount={breakdown.grossAnnual} whole />
          </div>

          <div className="qg-employer-cost__row">
            <span>
              <FormattedMessage id="employee.employer.inps" />
            </span>
            <span className="qg-employer-cost__value">
              + <Money amount={breakdown.employerInps} whole />
              <span className="qg-employer-cost__rate">
                {(breakdown.employerInpsRate * 100).toFixed(1)}%
              </span>
            </span>
          </div>

          <div className="qg-employer-cost__row">
            <span>
              <FormattedMessage id="employee.employer.tfr" />
            </span>
            <span className="qg-employer-cost__value">
              + <Money amount={breakdown.tfrAnnual} whole />
              <span className="qg-employer-cost__rate">
                {(breakdown.tfrRate * 100).toFixed(1)}%
              </span>
            </span>
          </div>

          {breakdown.totalOtherEmployerCosts > 0 && (
            <>
              <p className="qg-employer-cost__group-label">
                <FormattedMessage id="employee.employer.otherCosts" />
              </p>
              <div className="qg-employer-cost__other">
                {breakdown.inailContribution > 0 && (
                  <div className="qg-employer-cost__row qg-employer-cost__row--sub">
                    <span>
                      <FormattedMessage id="employee.employer.inail" />
                    </span>
                    <Money amount={breakdown.inailContribution} whole />
                  </div>
                )}
                {breakdown.maternityContribution > 0 && (
                  <div className="qg-employer-cost__row qg-employer-cost__row--sub">
                    <span>
                      <FormattedMessage id="employee.employer.maternity" />
                    </span>
                    <Money amount={breakdown.maternityContribution} whole />
                  </div>
                )}
                {breakdown.naspiContribution > 0 && (
                  <div className="qg-employer-cost__row qg-employer-cost__row--sub">
                    <span>
                      <FormattedMessage id="employee.employer.naspi" />
                    </span>
                    <Money amount={breakdown.naspiContribution} whole />
                  </div>
                )}
                {breakdown.naspiAdditionalContribution > 0 && (
                  <div className="qg-employer-cost__row qg-employer-cost__row--sub">
                    <span>
                      <FormattedMessage id="employee.employer.naspiAdditional" />
                    </span>
                    <Money amount={breakdown.naspiAdditionalContribution} whole />
                  </div>
                )}
                {breakdown.cigContribution > 0 && (
                  <div className="qg-employer-cost__row qg-employer-cost__row--sub">
                    <span>
                      <FormattedMessage id="employee.employer.cig" />
                    </span>
                    <Money amount={breakdown.cigContribution} whole />
                  </div>
                )}
                {breakdown.otherEmployerContributions > 0 && (
                  <div className="qg-employer-cost__row qg-employer-cost__row--sub">
                    <span>
                      <FormattedMessage id="employee.employer.other" />
                    </span>
                    <Money amount={breakdown.otherEmployerContributions} whole />
                  </div>
                )}
              </div>

              <div className="qg-employer-cost__row">
                <span>
                  <FormattedMessage id="employee.employer.totalOtherCosts" />
                </span>
                <Money amount={breakdown.totalOtherEmployerCosts} whole />
              </div>
            </>
          )}

          <div className="qg-employer-cost__row qg-employer-cost__row--total">
            <span>
              <FormattedMessage id="employee.employer.total" />
            </span>
            <Money amount={breakdown.totalEmployerCost} whole />
          </div>

          <p className="qg-employer-cost__note">
            <FormattedMessage
              id="employee.employer.multiplier"
              values={{ percent: costMultiplier }}
            />
          </p>

          <p className="qg-employer-cost__disclaimer">
            <FormattedMessage id="employee.employer.disclaimer" />
          </p>
        </div>
      )}
    </div>
  );
}
