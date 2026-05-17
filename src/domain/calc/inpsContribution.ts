import type { YearlyTaxConfig } from "@/domain/data/types.ts";
import { calculateInpsExemption2024 } from "./inpsExemption2024.ts";
import { calculateMadreLavoratriceExemption } from "./specialConditionsCalculations.ts";
import { resolveInpsRates } from "./inpsRates.ts";
import type { SalaryInput } from "./composerTypes.ts";

export interface EmployeeInpsResult {
  readonly contribution: number;
  readonly effectiveRate: number;
  readonly exemption: number;
  readonly madreLavoratriceExemption: number;
  readonly standardRate: number;
}

export function calculateEmployeeInps(
  grossAnnual: number,
  input: SalaryInput,
  cfg: YearlyTaxConfig,
): EmployeeInpsResult {
  const contractType = input.contractType ?? "indeterminato";
  const paymentFrequency = input.paymentFrequency ?? 12;
  const { standardRate, aboveCeilingRate } = resolveInpsRates(cfg.inps, {
    contractType,
    companySize: input.companySize,
    isPublicEmployee: input.isPublicEmployee,
    override: input.inpsOverride ?? undefined,
  });

  const cappedGross = Math.min(grossAnnual, cfg.inps.massimale);
  const belowCeiling = Math.min(cappedGross, cfg.inps.ceiling);
  const aboveCeiling = Math.max(0, cappedGross - cfg.inps.ceiling);
  const baseContribution = belowCeiling * standardRate + aboveCeiling * aboveCeilingRate;

  // The esonero contributivo 2024 is calculated on monthly income, with a 14th-month
  // adjustment because the threshold is expressed per *month worked*, not per pay slip.
  const exemption = cfg.inpsExemption2024
    ? calculateInpsExemption2024(
        (grossAnnual / paymentFrequency) * (paymentFrequency === 14 ? 12 : paymentFrequency),
        cfg.inpsExemption2024,
      )
    : 0;

  const afterExemption = Math.max(0, baseContribution - exemption);

  const madreLavoratriceExemption = cfg.madreLavoratrice
    ? calculateMadreLavoratriceExemption(
        afterExemption,
        input.specialConditions?.madreLavoratrice,
        cfg.madreLavoratrice,
      )
    : 0;

  const contribution = Math.max(0, afterExemption - madreLavoratriceExemption);
  const effectiveRate = grossAnnual > 0 ? contribution / grossAnnual : 0;

  return { contribution, effectiveRate, exemption, madreLavoratriceExemption, standardRate };
}
