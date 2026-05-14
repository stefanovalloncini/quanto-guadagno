import { FormattedMessage } from "react-intl";
import type {
  SpecialConditionsInput as SpecialConditionsInputType,
  RegimeImpatriatiInput,
  MadreLavoratriceInput,
} from "@/domain/calc";
import { Stack } from "@/ui/design-system/primitives";
import { RegimeImpatriatiSection } from "./specialConditions/RegimeImpatriatiSection.tsx";
import { MadreLavoratriceSection } from "./specialConditions/MadreLavoratriceSection.tsx";

// The old UI had a separate "sector" selector (private/public) here.
// In our model ContractType already captures this distinction, so sector
// is derived in the hook and never surfaced as a user input.

function withImpatriati(
  current: SpecialConditionsInputType,
  next: RegimeImpatriatiInput | undefined,
): SpecialConditionsInputType {
  if (next === undefined) {
    const { madreLavoratrice } = current;
    if (madreLavoratrice !== undefined) {
      return { sector: current.sector, madreLavoratrice };
    }
    return { sector: current.sector };
  }
  const { madreLavoratrice } = current;
  if (madreLavoratrice !== undefined) {
    return { sector: current.sector, regimeImpatriati: next, madreLavoratrice };
  }
  return { sector: current.sector, regimeImpatriati: next };
}

function withMadre(
  current: SpecialConditionsInputType,
  next: MadreLavoratriceInput | undefined,
): SpecialConditionsInputType {
  if (next === undefined) {
    const { regimeImpatriati } = current;
    if (regimeImpatriati !== undefined) {
      return { sector: current.sector, regimeImpatriati };
    }
    return { sector: current.sector };
  }
  const { regimeImpatriati } = current;
  if (regimeImpatriati !== undefined) {
    return { sector: current.sector, regimeImpatriati, madreLavoratrice: next };
  }
  return { sector: current.sector, madreLavoratrice: next };
}

interface SpecialConditionsInputProps {
  readonly value: SpecialConditionsInputType | null;
  readonly onChange: (next: SpecialConditionsInputType | null) => void;
}

const DEFAULT_VALUE: SpecialConditionsInputType = { sector: "private" };

export function SpecialConditionsInput({ value, onChange }: SpecialConditionsInputProps) {
  const current = value ?? DEFAULT_VALUE;
  const enabled = value !== null;

  const toggle = (checked: boolean) => onChange(checked ? DEFAULT_VALUE : null);

  return (
    <details className="qg-extras">
      <summary>
        <FormattedMessage id="employee.specialConditions.title" />
      </summary>
      <div className="qg-extras__body">
        <label className="qg-toggle">
          <input
            type="checkbox"
            className="qg-toggle__input"
            checked={enabled}
            onChange={(e) => toggle(e.target.checked)}
          />
          <span className="qg-toggle__label">
            <FormattedMessage id="employee.specialConditions.title" />
          </span>
        </label>

        {enabled && (
          <Stack gap="md">
            <RegimeImpatriatiSection
              value={current.regimeImpatriati}
              onChange={(next) => onChange(withImpatriati(current, next))}
            />

            <MadreLavoratriceSection
              value={current.madreLavoratrice}
              onChange={(next) => onChange(withMadre(current, next))}
            />
          </Stack>
        )}
      </div>
    </details>
  );
}
