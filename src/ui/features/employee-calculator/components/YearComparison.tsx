import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { SUPPORTED_YEARS } from "@/domain/data";
import { Ledger, LedgerRow, Money } from "@/ui/design-system/primitives";
import type { EmployeeCalculator } from "../useEmployeeCalculator.ts";

interface YearComparisonProps {
  readonly calc: EmployeeCalculator;
}

export function YearComparison({ calc }: YearComparisonProps) {
  const breakdowns = useMemo(
    () =>
      SUPPORTED_YEARS.map((year) => ({
        year,
        breakdown: calculateSalaryBreakdown({ ...calc.state, taxYear: year }),
      })),
    [calc.state],
  );

  const current = breakdowns.find((b) => b.year === calc.state.taxYear);
  if (!current) return null;

  return (
    <section className="qg-year-compare" aria-labelledby="qg-year-compare-title">
      <h2 id="qg-year-compare-title" className="qg-year-compare__title">
        <FormattedMessage id="employee.yearCompare.title" />
      </h2>
      <Ledger>
        {breakdowns.map(({ year, breakdown }) => {
          const isCurrent = year === calc.state.taxYear;
          const delta = breakdown.netAnnual - current.breakdown.netAnnual;
          return (
            <LedgerRow
              key={year}
              label={
                <>
                  <span className="qg-num">{year}</span>
                  <span className="qg-ledger__rate">
                    {isCurrent ? (
                      <FormattedMessage id="employee.yearCompare.currentBadge" />
                    ) : (
                      <FormattedMessage
                        id="employee.yearCompare.delta"
                        values={{
                          delta: (
                            <>
                              {delta >= 0 ? "+" : ""}
                              <Money amount={delta} whole />
                            </>
                          ),
                        }}
                      />
                    )}
                  </span>
                </>
              }
              amount={breakdown.netMonthly}
              strong={isCurrent}
            />
          );
        })}
      </Ledger>
    </section>
  );
}
