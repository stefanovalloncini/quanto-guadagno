import { Link, useSearchParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { NetSalarySummary } from "./components/NetSalarySummary.tsx";
import { YearComparison } from "./components/YearComparison.tsx";
import { ResultsBreakdown } from "./components/ResultsBreakdown.tsx";
import { ShareButton } from "@/ui/shared/ShareButton.tsx";
import type { EmployeeCalculator } from "./useEmployeeCalculator.ts";

interface EmployeeOverviewProps {
  readonly calc: EmployeeCalculator;
}

export function EmployeeOverview({ calc }: EmployeeOverviewProps) {
  const [params] = useSearchParams();
  const search = params.toString();
  const printHref = search.length > 0 ? `/stampa-busta-paga?${search}` : "/stampa-busta-paga";

  return (
    <div className="qg-cedolino">
      <NetSalarySummary breakdown={calc.result} paymentFrequency={calc.state.paymentFrequency} />
      <ResultsBreakdown breakdown={calc.result} />
      <p className="qg-cedolino__disclaimer">
        <FormattedMessage id="employee.disclaimer" />
      </p>
      <YearComparison calc={calc} />
      <div className="qg-cedolino__actions">
        <ShareButton />
        <Link to={printHref} target="_blank" rel="noopener" className="qg-share-button">
          <FormattedMessage id="share.button.print" />
        </Link>
      </div>
    </div>
  );
}
