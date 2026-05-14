import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Field } from "@/ui/design-system/primitives";
import { SUPPORTED_YEARS } from "@/domain/data";
import {
  YearSelector,
  ContractTypeSelect,
  PaymentFrequencySelector,
  RegionSelector,
  DependentsInput,
  ExpenseDeductionsInput,
  SpecialConditionsInput,
  PremioRisultatoInput,
  FringeBenefitsInput,
} from "./components/index.ts";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

type OptionKey = "dependents" | "expenses" | "conditions" | "premio" | "benefits";

interface TabDef {
  readonly key: OptionKey;
  readonly labelId: string;
}

const TABS: ReadonlyArray<TabDef> = [
  { key: "dependents", labelId: "employee.extras.tab.dependents" },
  { key: "expenses", labelId: "employee.extras.tab.expenses" },
  { key: "conditions", labelId: "employee.extras.tab.specialConditions" },
  { key: "premio", labelId: "employee.extras.tab.premio" },
  { key: "benefits", labelId: "employee.extras.tab.fringe" },
];

interface EmployeeExtrasProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeExtras({ calc }: EmployeeExtrasProps) {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState<OptionKey | null>(null);

  const { state } = calc;

  const isActive: Record<OptionKey, boolean> = {
    dependents: state.dependents !== null,
    expenses: state.expenseDeductions !== null,
    conditions: state.specialConditions !== null,
    premio: state.premioRisultato !== null,
    benefits: state.fringeBenefits !== null,
  };

  const municipalPercent = state.municipalTaxRate * 100;

  return (
    <details className="qg-extras-panel">
      <summary>
        <FormattedMessage id="employee.extras.title" />
      </summary>

      <div className="qg-extras-panel__body">
        <div className="qg-extras-panel__row">
          <YearSelector
            value={state.taxYear}
            supportedYears={SUPPORTED_YEARS}
            onChange={calc.setTaxYear}
          />
          <ContractTypeSelect value={state.contractType} onChange={calc.setContractType} />
          <PaymentFrequencySelector
            value={state.paymentFrequency}
            onChange={calc.setPaymentFrequency}
          />
        </div>

        <div className="qg-extras-panel__row">
          <div className="qg-extras-panel__region">
            <RegionSelector value={state.regionCode} onChange={calc.setRegionCode} />
          </div>
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
            onChange={(e) => calc.setMunicipalTaxRate(Number(e.target.value) / 100)}
            trailing="%"
            inputMode="decimal"
          />
        </div>

        <div
          role="tablist"
          aria-label={intl.formatMessage({ id: "employee.extras.tabs.label" })}
          className="qg-tabs"
        >
          {TABS.map((tab) => {
            const selected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`tabpanel-${tab.key}`}
                onClick={() => setActiveTab(selected ? null : tab.key)}
                className={["qg-tabs__tab", isActive[tab.key] ? "qg-tabs__tab--active" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <FormattedMessage id={tab.labelId} />
              </button>
            );
          })}
        </div>

        {TABS.map((tab) => (
          <div
            key={tab.key}
            id={`tabpanel-${tab.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.key}`}
            className="qg-tabpanel"
            hidden={activeTab !== tab.key}
          >
            {tab.key === "dependents" && (
              <DependentsInput value={state.dependents} onChange={calc.setDependents} />
            )}
            {tab.key === "expenses" && (
              <ExpenseDeductionsInput
                value={state.expenseDeductions}
                onChange={calc.setExpenseDeductions}
              />
            )}
            {tab.key === "conditions" && (
              <SpecialConditionsInput
                value={state.specialConditions}
                onChange={calc.setSpecialConditions}
              />
            )}
            {tab.key === "premio" && (
              <PremioRisultatoInput
                value={state.premioRisultato}
                onChange={calc.setPremioRisultato}
                taxYear={state.taxYear}
              />
            )}
            {tab.key === "benefits" && (
              <FringeBenefitsInput
                value={state.fringeBenefits}
                onChange={calc.setFringeBenefits}
                taxYear={state.taxYear}
              />
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
