import type { IrpefBracket } from "./irpef.ts";
import { calculateIrpefGross } from "./irpef.ts";
import type { InpsConfig } from "./inps.ts";
import { calculateInps } from "./inps.ts";
import type { WorkDeductionConfig } from "./workDeduction.ts";
import { calculateWorkDeduction } from "./workDeduction.ts";
import type { TrattamentoIntegrativoConfig } from "./trattamentoIntegrativo.ts";
import { calculateTrattamentoIntegrativo } from "./trattamentoIntegrativo.ts";
import type { TaxWedgeCutConfig } from "./taxWedgeCut.ts";
import { calculateTaxWedgeCut } from "./taxWedgeCut.ts";
import type { InpsExemption2024Config } from "./inpsExemption2024.ts";
import { calculateInpsExemption2024 } from "./inpsExemption2024.ts";
import { round } from "./_math.ts";

export interface YearTaxConfig {
  readonly year: number;
  readonly inps: InpsConfig;
  readonly irpefBrackets: ReadonlyArray<IrpefBracket>;
  readonly workDeduction: WorkDeductionConfig;
  readonly trattamentoIntegrativo: TrattamentoIntegrativoConfig;
  readonly taxWedgeCut: TaxWedgeCutConfig | null;
  readonly inpsExemption2024: InpsExemption2024Config | null;
}

export interface SalaryInput {
  readonly grossAnnual: number;
  readonly regionalRate: number;
  readonly municipalRate: number;
}

export interface SalaryBreakdown {
  readonly grossAnnual: number;
  readonly inps: number;
  readonly inpsExemption: number;
  readonly taxableIncome: number;
  readonly irpefGross: number;
  readonly workDeduction: number;
  readonly trattamentoIntegrativo: number;
  readonly sommaAggiuntiva: number;
  readonly detrazioneAggiuntiva: number;
  readonly totalDeductions: number;
  readonly irpefNet: number;
  readonly regionalAddizionale: number;
  readonly municipalAddizionale: number;
  readonly netAnnual: number;
  readonly netMonthly: number;
  readonly effectiveTaxRate: number;
}

export function calculateSalaryBreakdown(input: SalaryInput, cfg: YearTaxConfig): SalaryBreakdown {
  const grossAnnual = Math.max(0, input.grossAnnual);
  const inpsGross = calculateInps(grossAnnual, cfg.inps);
  const inpsExemption = cfg.inpsExemption2024
    ? calculateInpsExemption2024(grossAnnual, cfg.inpsExemption2024)
    : 0;
  const inps = Math.max(0, inpsGross.contribution - inpsExemption);
  const taxableIncome = Math.max(0, grossAnnual - inps);

  const irpefGross = calculateIrpefGross(taxableIncome, cfg.irpefBrackets);
  const workDeduction = calculateWorkDeduction(taxableIncome, cfg.workDeduction);

  const wedge = cfg.taxWedgeCut
    ? calculateTaxWedgeCut(taxableIncome, irpefGross, cfg.taxWedgeCut)
    : { sommaAggiuntiva: 0, detrazioneAggiuntiva: 0, total: 0 };

  const totalDeductions = workDeduction + wedge.detrazioneAggiuntiva;

  const trattamentoIntegrativo = calculateTrattamentoIntegrativo(
    taxableIncome,
    irpefGross,
    totalDeductions,
    cfg.trattamentoIntegrativo,
  );

  const irpefNet = Math.max(0, irpefGross - totalDeductions);
  const regionalAddizionale = taxableIncome * input.regionalRate;
  const municipalAddizionale = taxableIncome * input.municipalRate;

  const netAnnual =
    grossAnnual -
    inps -
    irpefNet -
    regionalAddizionale -
    municipalAddizionale +
    trattamentoIntegrativo +
    wedge.sommaAggiuntiva;

  const effectiveTaxRate = grossAnnual > 0 ? 1 - netAnnual / grossAnnual : 0;

  return {
    grossAnnual: round(grossAnnual),
    inps: round(inps),
    inpsExemption: round(inpsExemption),
    taxableIncome: round(taxableIncome),
    irpefGross: round(irpefGross),
    workDeduction: round(workDeduction),
    trattamentoIntegrativo: round(trattamentoIntegrativo),
    sommaAggiuntiva: round(wedge.sommaAggiuntiva),
    detrazioneAggiuntiva: round(wedge.detrazioneAggiuntiva),
    totalDeductions: round(totalDeductions),
    irpefNet: round(irpefNet),
    regionalAddizionale: round(regionalAddizionale),
    municipalAddizionale: round(municipalAddizionale),
    netAnnual: round(netAnnual),
    netMonthly: round(netAnnual / 12),
    effectiveTaxRate: round(effectiveTaxRate, 4),
  };
}
