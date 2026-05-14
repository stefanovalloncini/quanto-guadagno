import { FormattedMessage, FormattedNumber } from "react-intl";
import { Money, Stack } from "@/ui/design-system/primitives";
import type { ApprenticeshipBreakdown } from "@/domain/calc";

interface ApprenticeshipResultsProps {
  readonly result: ApprenticeshipBreakdown;
}

export function ApprenticeshipResults({ result }: ApprenticeshipResultsProps) {
  return (
    <Stack gap="md">
      <table className="qg-progression">
        <thead>
          <tr>
            <th scope="col">
              <FormattedMessage id="apprenticeship.col.year" />
            </th>
            <th scope="col">
              <FormattedMessage id="apprenticeship.col.percent" />
            </th>
            <th scope="col">
              <FormattedMessage id="apprenticeship.col.gross" />
            </th>
          </tr>
        </thead>
        <tbody>
          {result.schedule.map((row) => (
            <tr key={row.year}>
              <td>{row.year}</td>
              <td>
                <FormattedNumber
                  value={row.percentageOfTarget}
                  style="percent"
                  minimumFractionDigits={0}
                />
              </td>
              <td>
                <Money amount={row.grossAnnual} whole />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stack>
  );
}
