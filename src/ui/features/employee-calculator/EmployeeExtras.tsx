import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Field } from "@/ui/design-system/primitives";
import {
  DependentsInput,
  ExpenseDeductionsInput,
  SpecialConditionsInput,
  PremioRisultatoInput,
  FringeBenefitsInput,
  InpsRateInput,
} from "./components/index.ts";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface SectionDef {
  readonly key: string;
  readonly titleId: string;
  readonly ledeId: string;
  readonly active: boolean;
  readonly render: () => ReactNode;
}

interface GroupDef {
  readonly titleId: string;
  readonly sections: ReadonlyArray<SectionDef>;
}

interface EmployeeExtrasProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeExtras({ calc }: EmployeeExtrasProps) {
  const { state, update } = calc;
  const municipalPercent = state.municipalTaxRate * 100;

  const inpsRatesActive =
    state.companySize === "large" || state.isPublicEmployee || state.inpsOverride !== null;

  const groups: ReadonlyArray<GroupDef> = [
    {
      titleId: "employee.extras.group.contract",
      sections: [
        {
          key: "inpsRates",
          titleId: "employee.extras.section.inpsRates",
          ledeId: "employee.extras.section.inpsRates.lede",
          active: inpsRatesActive,
          render: () => (
            <InpsRateInput
              value={{
                companySize: state.companySize,
                isPublicEmployee: state.isPublicEmployee,
                inpsOverride: state.inpsOverride,
              }}
              onChange={(next) => update(next)}
            />
          ),
        },
      ],
    },
    {
      titleId: "employee.extras.group.deductions",
      sections: [
        {
          key: "dependents",
          titleId: "employee.extras.section.dependents",
          ledeId: "employee.extras.section.dependents.lede",
          active: state.dependents !== null,
          render: () => (
            <DependentsInput
              value={state.dependents}
              onChange={(dependents) => update({ dependents })}
            />
          ),
        },
        {
          key: "expenses",
          titleId: "employee.extras.section.expenses",
          ledeId: "employee.extras.section.expenses.lede",
          active: state.expenseDeductions !== null,
          render: () => (
            <ExpenseDeductionsInput
              value={state.expenseDeductions}
              onChange={(expenseDeductions) => update({ expenseDeductions })}
            />
          ),
        },
        {
          key: "specialConditions",
          titleId: "employee.extras.section.specialConditions",
          ledeId: "employee.extras.section.specialConditions.lede",
          active: state.specialConditions !== null,
          render: () => (
            <SpecialConditionsInput
              value={state.specialConditions}
              onChange={(specialConditions) => update({ specialConditions })}
            />
          ),
        },
      ],
    },
    {
      titleId: "employee.extras.group.compensation",
      sections: [
        {
          key: "premio",
          titleId: "employee.extras.section.premio",
          ledeId: "employee.extras.section.premio.lede",
          active: state.premioRisultato !== null,
          render: () => (
            <PremioRisultatoInput
              value={state.premioRisultato}
              onChange={(premioRisultato) => update({ premioRisultato })}
              taxYear={state.taxYear}
            />
          ),
        },
        {
          key: "fringe",
          titleId: "employee.extras.section.fringe",
          ledeId: "employee.extras.section.fringe.lede",
          active: state.fringeBenefits !== null,
          render: () => (
            <FringeBenefitsInput
              value={state.fringeBenefits}
              onChange={(fringeBenefits) => update({ fringeBenefits })}
              taxYear={state.taxYear}
            />
          ),
        },
      ],
    },
  ];

  return (
    <details className="qg-extras-panel">
      <summary>
        <FormattedMessage id="employee.extras.title" />
      </summary>

      <div className="qg-extras-panel__body">
        <div className="qg-extras-panel__row qg-extras-panel__row--single">
          <Field
            label={<FormattedMessage id="employee.extras.municipal" />}
            hint={
              <a
                href="https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/nuova_addcomirpef/sceltaregione.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="qg-extras-panel__lookup"
              >
                <FormattedMessage id="employee.extras.municipal.lookup" />
              </a>
            }
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={municipalPercent}
            onChange={(e) => update({ municipalTaxRate: Number(e.target.value) / 100 })}
            trailing="%"
            inputMode="decimal"
          />
        </div>

        {groups.map((group) => (
          <section key={group.titleId} className="qg-extras-panel__group">
            <h3 className="qg-subhead qg-subhead--md">
              <FormattedMessage id={group.titleId} />
            </h3>
            <div className="qg-extras-panel__sections">
              {group.sections.map((section) => (
                <details key={section.key} className="qg-extras-section">
                  <summary className="qg-extras-section__summary">
                    <div className="qg-extras-section__main">
                      <div className="qg-extras-section__heading">
                        <span className="qg-extras-section__title">
                          <FormattedMessage id={section.titleId} />
                        </span>
                        {section.active && (
                          <span className="qg-extras-section__status">
                            <FormattedMessage id="employee.extras.status.set" />
                          </span>
                        )}
                      </div>
                      <span className="qg-extras-section__lede">
                        <FormattedMessage id={section.ledeId} />
                      </span>
                    </div>
                  </summary>
                  <div className="qg-extras-section__body">{section.render()}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </details>
  );
}
