import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CCNL_PRESETS, CCNL_PRESET_IDS, type CcnlId } from "@/domain/data";
import type { EmployeeCalculator } from "../useEmployeeCalculator.ts";

interface CcnlPresetProps {
  readonly calc: EmployeeCalculator;
}

const labelKey: Record<CcnlId, string> = {
  commercio: "employee.ccnlPreset.commercio",
  metalmeccanici: "employee.ccnlPreset.metalmeccanici",
  logistica: "employee.ccnlPreset.logistica",
  "cooperative-sociali": "employee.ccnlPreset.cooperativeSociali",
};

export function CcnlPreset({ calc }: CcnlPresetProps) {
  const [applied, setApplied] = useState<CcnlId | null>(null);

  const apply = (ccnl: CcnlId) => {
    setApplied(ccnl);
    calc.update({ paymentFrequency: CCNL_PRESETS[ccnl].paymentFrequency });
  };

  return (
    <div className="qg-ccnl-preset">
      <span className="qg-ccnl-preset__label">
        <FormattedMessage id="employee.ccnlPreset.title" />
      </span>
      <div className="qg-ccnl-preset__buttons" role="group" aria-label="CCNL">
        {CCNL_PRESET_IDS.map((id) => {
          const preset = CCNL_PRESETS[id];
          const isApplied =
            applied === id && preset.paymentFrequency === calc.state.paymentFrequency;
          return (
            <button
              key={id}
              type="button"
              className="qg-ccnl-preset__chip"
              aria-pressed={isApplied}
              onClick={() => apply(id)}
            >
              <FormattedMessage id={labelKey[id]} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
