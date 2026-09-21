import { FormattedMessage } from "react-intl";
import { Ledger, LedgerRow } from "@/ui/design-system/primitives";
import type { RaiseToKeepPace } from "@/domain/calc";

interface KeepPaceBlockProps {
  readonly keepPace: RaiseToKeepPace;
}

export function KeepPaceBlock({ keepPace }: KeepPaceBlockProps) {
  return (
    <details className="qg-disclosure qg-keep-pace">
      <summary>
        <FormattedMessage id="inflation.keepPace.title" />
      </summary>

      <div className="qg-keep-pace__body">
        <Ledger>
          <LedgerRow
            label={
              <FormattedMessage
                id="inflation.keepPace.needed"
                values={{ year: String(keepPace.toYear) }}
              />
            }
            amount={keepPace.grossNeeded}
          />
          <LedgerRow
            label={<FormattedMessage id="inflation.keepPace.raise" />}
            amount={keepPace.raiseAmount}
            rate={keepPace.raisePercent}
            strong
          />
        </Ledger>

        <p className="qg-note">
          <FormattedMessage
            id="inflation.keepPace.note"
            values={{ from: String(keepPace.fromYear), to: String(keepPace.toYear) }}
          />
        </p>
      </div>
    </details>
  );
}
