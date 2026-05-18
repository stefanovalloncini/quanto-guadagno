import { FormattedDate, FormattedMessage } from "react-intl";
import { Stack } from "@/ui/design-system/primitives";
import type { PreavvisoBreakdown } from "@/domain/calc";
import type { SeniorityBand } from "@/domain/data";

interface PreavvisoResultsProps {
  readonly result: PreavvisoBreakdown | null;
  readonly invalidDates: boolean;
}

const BAND_KEYS: Record<SeniorityBand, string> = {
  "lt-5y": "preavviso.result.band.lt-5y",
  "5-10y": "preavviso.result.band.5-10y",
  "gt-10y": "preavviso.result.band.gt-10y",
  "lte-3y": "preavviso.result.band.lte-3y",
  "gt-3y": "preavviso.result.band.gt-3y",
};

export function PreavvisoResults({ result, invalidDates }: PreavvisoResultsProps) {
  if (invalidDates || !result) {
    return (
      <div className="qg-alert" role="alert">
        <p>
          <FormattedMessage id="preavviso.form.error.invalidDates" />
        </p>
      </div>
    );
  }

  return (
    <Stack gap="md">
      <div className="qg-metric" aria-live="polite">
        <div className="qg-metric__label">
          <FormattedMessage id="preavviso.result.noticeDays" />
        </div>
        <div className="qg-metric__amount">
          <FormattedMessage
            id="preavviso.result.noticeDays.value"
            values={{ days: result.noticeDays }}
          />
        </div>
        <div className="qg-metric__sub">
          <FormattedMessage
            id={
              result.workingDays
                ? "preavviso.result.workingDays.note"
                : "preavviso.result.calendarDays.note"
            }
          />
        </div>
      </div>

      <div className="qg-metric">
        <div className="qg-metric__label">
          <FormattedMessage id="preavviso.result.exitDate" />
        </div>
        <div className="qg-metric__amount">
          <FormattedDate value={result.exitDate} day="2-digit" month="long" year="numeric" />
        </div>
      </div>

      <div className="qg-metric">
        <div className="qg-metric__label">
          <FormattedMessage id="preavviso.result.band" />
        </div>
        <div className="qg-metric__amount qg-metric__amount--text">
          <FormattedMessage id={BAND_KEYS[result.band]} />
        </div>
        <div className="qg-metric__sub">{result.livelloLabel}</div>
      </div>
    </Stack>
  );
}
