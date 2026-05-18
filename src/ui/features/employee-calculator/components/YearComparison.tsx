import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { calculateSalaryBreakdown } from "@/domain/calc";
import { SUPPORTED_YEARS } from "@/domain/data";
import { Money } from "@/ui/design-system/primitives";
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
      <ul className="qg-year-compare__list">
        {breakdowns.map(({ year, breakdown }) => {
          const isCurrent = year === calc.state.taxYear;
          const delta = breakdown.netAnnual - current.breakdown.netAnnual;
          const deltaClass = delta >= 0 ? "is-positive" : "is-negative";
          return (
            <li
              key={year}
              className={`qg-year-compare__row${isCurrent ? " qg-year-compare__row--current" : ""}`}
            >
              <span className="qg-year-compare__year">{year}</span>
              <span className="qg-year-compare__net">
                <Money amount={breakdown.netMonthly} whole />
                <span className="qg-year-compare__unit">
                  /<FormattedMessage id="employee.yearCompare.perMonth" />
                </span>
              </span>
              {isCurrent ? (
                <span className="qg-year-compare__badge">
                  <FormattedMessage id="employee.yearCompare.currentBadge" />
                </span>
              ) : (
                <span className={`qg-year-compare__delta ${deltaClass}`}>
                  {delta >= 0 ? "+" : ""}
                  <Money amount={delta} whole />
                  <span className="qg-year-compare__unit">
                    /<FormattedMessage id="employee.yearCompare.perYear" />
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
