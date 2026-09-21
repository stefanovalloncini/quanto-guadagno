import { FormattedDate, FormattedMessage } from "react-intl";
import { ResultFigure } from "@/ui/shared/ResultFigure.tsx";
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
      <div className="qg-result">
        <p className="qg-result__alert" role="alert">
          <FormattedMessage id="preavviso.form.error.invalidDates" />
        </p>
      </div>
    );
  }

  return (
    <div className="qg-result">
      <ResultFigure
        label={<FormattedMessage id="preavviso.result.noticeDays" />}
        value={<span className="qg-num">{result.noticeDays}</span>}
        settleKey={result.noticeDays}
        secondary={
          <FormattedMessage
            id="preavviso.result.exitDate"
            values={{
              date: (
                <FormattedDate value={result.exitDate} day="2-digit" month="long" year="numeric" />
              ),
            }}
          />
        }
        note={
          <FormattedMessage
            id="preavviso.result.band"
            values={{
              band: <FormattedMessage id={BAND_KEYS[result.band]} />,
              livello: result.livelloLabel,
            }}
          />
        }
      />

      <p className="qg-figure__note">
        <FormattedMessage
          id={
            result.workingDays
              ? "preavviso.result.workingDays.note"
              : "preavviso.result.calendarDays.note"
          }
        />
      </p>
    </div>
  );
}
