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
  const apply = (ccnl: CcnlId) => {
    const preset = CCNL_PRESETS[ccnl];
    calc.update({ paymentFrequency: preset.paymentFrequency });
  };

  return (
    <div className="qg-ccnl-preset">
      <span className="qg-ccnl-preset__label">
        <FormattedMessage id="employee.ccnlPreset.title" />
      </span>
      <div className="qg-ccnl-preset__buttons" role="group" aria-label="CCNL">
        {CCNL_PRESET_IDS.map((id) => {
          const preset = CCNL_PRESETS[id];
          return (
            <button
              key={id}
              type="button"
              className="qg-ccnl-preset__chip"
              onClick={() => apply(id)}
            >
              <span className="qg-ccnl-preset__chip-label">
                <FormattedMessage id={labelKey[id]} />
              </span>
              <span className="qg-ccnl-preset__chip-mensilita">
                <FormattedMessage
                  id="employee.ccnlPreset.mensilitaFmt"
                  values={{ n: preset.paymentFrequency }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
