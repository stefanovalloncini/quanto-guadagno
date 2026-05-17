import type {
  SpecialConditionsInput as SpecialConditionsInputType,
  RegimeImpatriatiInput,
  MadreLavoratriceInput,
} from "@/domain/calc";
import { EnableToggle, Stack } from "@/ui/design-system/primitives";
import { RegimeImpatriatiSection } from "./specialConditions/RegimeImpatriatiSection.tsx";
import { MadreLavoratriceSection } from "./specialConditions/MadreLavoratriceSection.tsx";

function withImpatriati(
  current: SpecialConditionsInputType,
  next: RegimeImpatriatiInput | undefined,
): SpecialConditionsInputType {
  const { madreLavoratrice } = current;
  if (next === undefined) {
    return madreLavoratrice !== undefined ? { madreLavoratrice } : {};
  }
  return madreLavoratrice !== undefined
    ? { regimeImpatriati: next, madreLavoratrice }
    : { regimeImpatriati: next };
}

function withMadre(
  current: SpecialConditionsInputType,
  next: MadreLavoratriceInput | undefined,
): SpecialConditionsInputType {
  const { regimeImpatriati } = current;
  if (next === undefined) {
    return regimeImpatriati !== undefined ? { regimeImpatriati } : {};
  }
  return regimeImpatriati !== undefined
    ? { regimeImpatriati, madreLavoratrice: next }
    : { madreLavoratrice: next };
}

interface SpecialConditionsInputProps {
  readonly value: SpecialConditionsInputType | null;
  readonly onChange: (next: SpecialConditionsInputType | null) => void;
}

export function SpecialConditionsInput({ value, onChange }: SpecialConditionsInputProps) {
  const current = value ?? {};
  const enabled = value !== null;

  const toggle = (checked: boolean) => onChange(checked ? {} : null);

  return (
    <Stack gap="md">
      <EnableToggle checked={enabled} onChange={toggle} />

      {enabled && (
        <div className="qg-options">
          <RegimeImpatriatiSection
            value={current.regimeImpatriati}
            onChange={(next) => onChange(withImpatriati(current, next))}
          />

          <MadreLavoratriceSection
            value={current.madreLavoratrice}
            onChange={(next) => onChange(withMadre(current, next))}
          />
        </div>
      )}
    </Stack>
  );
}
