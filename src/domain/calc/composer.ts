import type { YearlyTaxConfig } from "@/domain/data/types.ts";
import { getTaxConfig } from "@/domain/data/index.ts";
import { calculateIrpefGross } from "./irpef.ts";
import { calculateWorkDeduction } from "./workDeduction.ts";
import { calculateTrattamentoIntegrativo } from "./trattamentoIntegrativo.ts";
import { calculateTaxWedgeCut } from "./taxWedgeCut.ts";
import { calculateInpsExemption2024 } from "./inpsExemption2024.ts";
import { calculateLocalTaxes } from "./regionalTaxCalculations.ts";
import {
  calculateDependentsDeduction,
  calculateExpenseDeduction,
} from "./deductionCalculations.ts";
import { calculatePremioRisultato } from "./bonusCalculations.ts";
import { calculateFringeBenefits, hasFringeBenefits } from "./fringeBenefitsCalculations.ts";
import {
  calculateRegimeImpatriatiAdjustment,
  calculateRegimeImpatriatiSavings,
  calculateMadreLavoratriceExemption,
  getSectorInpsRates,
} from "./specialConditionsCalculations.ts";
import {
  calculateTFR,
  calculateOtherEmployerCosts,
  calculateEmployerInps,
} from "./employerCostCalculations.ts";
import { round } from "./_math.ts";
import type { SalaryInput, SalaryBreakdown } from "./composerTypes.ts";

// YearTaxConfig is the name consumers already depend on. Keep it stable.
export type { YearlyTaxConfig as YearTaxConfig };
export type { SalaryInput, SalaryBreakdown, PaymentFrequency } from "./composerTypes.ts";
export type {
  ContractType,
  DependentsInput,
  ExpenseDeductionsInput,
  PremioRisultatoInput,
  SpecialConditionsInput,
  FringeBenefitsInput,
} from "./composerTypes.ts";

function calcEmployeeInps(
  grossAnnual: number,
  input: SalaryInput,
  cfg: YearlyTaxConfig,
): {
  contribution: number;
  effectiveRate: number;
  exemption: number;
  madreLavoratriceExemption: number;
} {
  const contractType = input.contractType ?? "indeterminato";
  const specialConditions = input.specialConditions ?? null;
  const paymentFrequency = input.paymentFrequency ?? 12;

  const sector = specialConditions?.sector ?? "private";
  const { standardRate, aboveCeilingRate } = getSectorInpsRates(sector, cfg.inps);
  const baseRate =
    contractType === "apprendistato" ? (cfg.inps.apprenticeshipRate ?? standardRate) : standardRate;
  const aboveRate =
    contractType === "apprendistato"
      ? (cfg.inps.apprenticeshipRate ?? aboveCeilingRate)
      : aboveCeilingRate;

  const cappedGross = Math.min(grossAnnual, cfg.inps.massimale);
  const belowCeiling = Math.min(cappedGross, cfg.inps.ceiling);
  const aboveCeiling = Math.max(0, cappedGross - cfg.inps.ceiling);
  const baseContribution = belowCeiling * baseRate + aboveCeiling * aboveRate;

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
        specialConditions?.madreLavoratrice,
        cfg.madreLavoratrice,
      )
    : 0;

  const contribution = Math.max(0, afterExemption - madreLavoratriceExemption);
  const effectiveRate = grossAnnual > 0 ? contribution / grossAnnual : 0;

  return { contribution, effectiveRate, exemption, madreLavoratriceExemption };
}

export function calculateSalaryBreakdown(input: SalaryInput): SalaryBreakdown {
  const cfg = getTaxConfig(input.taxYear);
  const grossAnnual = Math.max(0, input.grossAnnual);
  const municipalTaxRate = Math.max(0, input.municipalTaxRate);
  const contractType = input.contractType ?? "indeterminato";
  const paymentFrequency = input.paymentFrequency ?? 12;
  const dependents = input.dependents ?? undefined;
  const expenseDeductions = input.expenseDeductions ?? undefined;
  const fringeBenefitsInput = input.fringeBenefits ?? undefined;
  const specialConditions = input.specialConditions ?? undefined;
  const premioRisultato = input.premioRisultato ?? undefined;

  const fringeBenefitsBreakdown = calculateFringeBenefits(fringeBenefitsInput, cfg.fringeBenefits);
  const hasBenefits = hasFringeBenefits(fringeBenefitsInput);

  const inpsBase = grossAnnual + fringeBenefitsBreakdown.taxableAmount;
  const {
    contribution: inpsContribution,
    effectiveRate: inpsRate,
    exemption: inpsExemption,
    madreLavoratriceExemption,
  } = calcEmployeeInps(inpsBase, input, cfg);

  const taxableIncome = inpsBase - inpsContribution;

  const regimeImpatriati = calculateRegimeImpatriatiAdjustment(
    taxableIncome,
    specialConditions?.regimeImpatriati,
    cfg.regimeImpatriati,
  );

  const irpefGross = calculateIrpefGross(regimeImpatriati.adjustedTaxableIncome, cfg.irpefBrackets);
  const irpefGrossFullIncome = calculateIrpefGross(taxableIncome, cfg.irpefBrackets);
  const regimeImpatriatiSavings = calculateRegimeImpatriatiSavings(
    irpefGrossFullIncome,
    irpefGross,
  );

  const irpefDeduction = calculateWorkDeduction(taxableIncome, cfg.workDeduction);
  const dependentsDeduction = calculateDependentsDeduction(
    taxableIncome,
    dependents,
    cfg.dependentsDeduction,
  );
  const expenseDeduction = calculateExpenseDeduction(expenseDeductions, cfg.expenseDeductions);

  const wedge = cfg.taxWedgeCut
    ? calculateTaxWedgeCut(taxableIncome, irpefGross, cfg.taxWedgeCut)
    : { sommaAggiuntiva: 0, detrazioneAggiuntiva: 0, total: 0 };

  const totalDeductions =
    irpefDeduction + dependentsDeduction + expenseDeduction + wedge.detrazioneAggiuntiva;
  const irpefNet = Math.max(0, irpefGross - totalDeductions);

  const trattamentoIntegrativo = calculateTrattamentoIntegrativo(
    taxableIncome,
    irpefGross,
    totalDeductions,
    cfg.trattamentoIntegrativo,
  );

  const { regionalTax, regionalTaxRate, municipalTax } = calculateLocalTaxes(
    taxableIncome,
    input.regionCode,
    municipalTaxRate,
  );

  const totalTaxes = inpsContribution + irpefNet + regionalTax + municipalTax;

  const sector = specialConditions?.sector ?? "private";
  const { standardRate: inpsStandardRate } = getSectorInpsRates(sector, cfg.inps);
  const pdrInpsRate =
    contractType === "apprendistato"
      ? (cfg.inps.apprenticeshipRate ?? inpsStandardRate)
      : inpsStandardRate;

  const pdr = calculatePremioRisultato(
    premioRisultato,
    taxableIncome,
    pdrInpsRate,
    cfg.irpefBrackets,
    cfg.pdrSostitutiva,
  );

  const netAnnual =
    grossAnnual - totalTaxes + trattamentoIntegrativo + wedge.sommaAggiuntiva + pdr.pdrNet;

  const grossMonthly = grossAnnual / paymentFrequency;
  const netMonthly = netAnnual / paymentFrequency;
  const totalCredits = trattamentoIntegrativo + wedge.total;
  const effectiveTaxRate = grossAnnual > 0 ? (totalTaxes - totalCredits) / grossAnnual : 0;
  const netToGrossRatio = grossAnnual > 0 ? netAnnual / grossAnnual : 0;

  const totalGrossForEmployer = grossAnnual + pdr.pdrGross;
  const employerInpsResult = calculateEmployerInps(
    totalGrossForEmployer,
    contractType,
    cfg.employerInps,
  );
  const tfrResult = calculateTFR(totalGrossForEmployer, cfg.tfr);
  const otherCosts = calculateOtherEmployerCosts(
    totalGrossForEmployer,
    contractType,
    cfg.otherEmployerCosts,
  );
  const totalEmployerCost =
    totalGrossForEmployer + employerInpsResult.contribution + tfrResult.annual + otherCosts.total;

  return {
    grossAnnual: round(grossAnnual),
    grossMonthly: round(grossMonthly),

    inpsContribution: round(inpsContribution),
    inpsRate: round(inpsRate, 4),
    inpsExemption: round(inpsExemption),
    madreLavoratriceExemption: round(madreLavoratriceExemption),

    taxableIncome: round(taxableIncome),

    irpefGross: round(irpefGross),
    irpefDeduction: round(irpefDeduction),
    irpefNet: round(irpefNet),

    regimeImpatriatiSavings: round(regimeImpatriatiSavings),
    regimeImpatriatiExemptionRate: regimeImpatriati.exemptionRate,

    regionalTax: round(regionalTax),
    regionalTaxRate: round(regionalTaxRate, 4),
    municipalTax: round(municipalTax),
    municipalTaxRate: round(municipalTaxRate, 4),

    trattamentoIntegrativo: round(trattamentoIntegrativo),
    sommaAggiuntiva: round(wedge.sommaAggiuntiva),
    detrazioneAggiuntiva: round(wedge.detrazioneAggiuntiva),
    taxWedgeCutTotal: round(wedge.total),

    dependentsDeduction: round(dependentsDeduction),
    expenseDeduction: round(expenseDeduction),

    pdrGross: round(pdr.pdrGross),
    pdrInps: round(pdr.pdrInps),
    pdrTax: round(pdr.pdrTax),
    pdrNet: round(pdr.pdrNet),

    totalDeductions: round(totalDeductions),
    totalTaxes: round(totalTaxes),

    fringeBenefits: hasBenefits ? fringeBenefitsBreakdown : undefined,

    netAnnual: round(netAnnual),
    netMonthly: round(netMonthly),
    effectiveTaxRate: round(effectiveTaxRate, 4),
    netToGrossRatio: round(netToGrossRatio, 4),

    employerInps: round(employerInpsResult.contribution),
    employerInpsRate: round(employerInpsResult.rate, 4),

    tfrAnnual: round(tfrResult.annual),
    tfrMonthly: round(tfrResult.monthly),
    tfrRate: round(tfrResult.rate, 4),

    inailContribution: round(otherCosts.inail),
    maternityContribution: round(otherCosts.maternity),
    naspiContribution: round(otherCosts.naspi),
    naspiAdditionalContribution: round(otherCosts.naspiAdditional),
    cigContribution: round(otherCosts.cig),
    otherEmployerContributions: round(otherCosts.other),
    totalOtherEmployerCosts: round(otherCosts.total),

    totalEmployerCost: round(totalEmployerCost),
    totalEmployerCostMonthly: round(totalEmployerCost / 12),
    employerCostPerNetEuro: netAnnual === 0 ? 0 : round(totalEmployerCost / netAnnual, 4),
  };
}
