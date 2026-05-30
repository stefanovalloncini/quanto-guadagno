import type { YearlyTaxConfig } from "@/domain/data/types.ts";
import { getTaxConfig } from "@/domain/data/index.ts";
import { applyProgressiveBrackets, getMarginalRate } from "./irpef.ts";
import { calculateWorkDeduction } from "./workDeduction.ts";
import { calculateTrattamentoIntegrativo } from "./trattamentoIntegrativo.ts";
import { calculateTaxWedgeCut } from "./taxWedgeCut.ts";
import { calculateLocalTaxes } from "./regionalTaxCalculations.ts";
import {
  calculateDependentsDeduction,
  calculateExpenseDeduction,
  calculatePensionFundDeduction,
} from "./deductionCalculations.ts";
import { calculatePremioRisultato } from "./bonusCalculations.ts";
import { calculateFringeBenefits, hasFringeBenefits } from "./fringeBenefitsCalculations.ts";
import {
  calculateRegimeImpatriatiAdjustment,
  calculateRegimeImpatriatiSavings,
} from "./specialConditionsCalculations.ts";
import { calculateEmployeeInps } from "./inpsContribution.ts";
import {
  calculateTFR,
  calculateOtherEmployerCosts,
  calculateEmployerInps,
} from "./employerCostCalculations.ts";
import { round } from "./_math.ts";
import type { SalaryInput, SalaryBreakdown } from "./composerTypes.ts";

export type { YearlyTaxConfig };
export type { SalaryInput, SalaryBreakdown, PaymentFrequency } from "./composerTypes.ts";
export type {
  ContractType,
  DependentsInput,
  ExpenseDeductionsInput,
  PremioRisultatoInput,
  SpecialConditionsInput,
  FringeBenefitsInput,
} from "./composerTypes.ts";

export function calculateSalaryBreakdown(input: SalaryInput): SalaryBreakdown {
  const cfg = getTaxConfig(input.taxYear);
  const grossAnnual = Math.max(0, input.grossAnnual);
  const municipalTaxRate = Math.max(0, input.municipalTaxRate);
  const contractType = input.contractType ?? "indeterminato";
  const paymentFrequency = input.paymentFrequency ?? 12;
  const dependents = input.dependents ?? undefined;
  const expenseDeductions = input.expenseDeductions ?? undefined;
  const fringeBenefitsInput = input.fringeBenefits ?? undefined;
  const premioRisultato = input.premioRisultato ?? undefined;
  const fringeBenefitsBreakdown = calculateFringeBenefits(fringeBenefitsInput, cfg.fringeBenefits);
  const hasBenefits = hasFringeBenefits(fringeBenefitsInput);

  const inpsBase = grossAnnual + fringeBenefitsBreakdown.taxableAmount;
  const {
    contribution: inpsContribution,
    effectiveRate: inpsRate,
    exemption: inpsExemption,
    madreLavoratriceExemption,
    standardRate: pdrInpsRate,
  } = calculateEmployeeInps(inpsBase, input, cfg);

  const pensionFundDeduction = calculatePensionFundDeduction(
    expenseDeductions,
    cfg.expenseDeductions,
  );
  const taxableIncome = Math.max(0, inpsBase - inpsContribution - pensionFundDeduction);

  const regimeImpatriati = calculateRegimeImpatriatiAdjustment(
    taxableIncome,
    input.specialConditions?.regimeImpatriati,
    cfg.regimeImpatriati,
  );

  const irpefGross = applyProgressiveBrackets(
    regimeImpatriati.adjustedTaxableIncome,
    cfg.irpefBrackets,
  );
  const irpefGrossFullIncome = applyProgressiveBrackets(taxableIncome, cfg.irpefBrackets);
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

  const { regionalTax, regionalTaxRate, regionalMarginalRate, municipalTax } = calculateLocalTaxes(
    taxableIncome,
    input.regionCode,
    municipalTaxRate,
  );

  const totalTaxes = inpsContribution + irpefNet + regionalTax + municipalTax;

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
  const irpefMarginalRate = getMarginalRate(taxableIncome, cfg.irpefBrackets);
  const marginalTaxRate = irpefMarginalRate + regionalMarginalRate + municipalTaxRate;
  const netToGrossRatio = grossAnnual > 0 ? netAnnual / grossAnnual : 0;

  const totalGrossForEmployer = grossAnnual + pdr.pdrGross;
  const employerInpsResult = calculateEmployerInps(
    totalGrossForEmployer,
    contractType,
    cfg.employerInps,
    input.inpsOverride ?? undefined,
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
    pensionFundDeduction: round(pensionFundDeduction),

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
    marginalTaxRate: round(marginalTaxRate, 4),
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
