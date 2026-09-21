import type { ReactNode } from "react";

interface ResultFigureProps {
  readonly label: ReactNode;
  readonly value: ReactNode;
  /** Changing it re-runs the settle animation on the figure. */
  readonly settleKey?: string | number;
  readonly secondary?: ReactNode;
  readonly note?: ReactNode;
}

export function ResultFigure({ label, value, settleKey, secondary, note }: ResultFigureProps) {
  return (
    <div className="qg-figure">
      <div className="qg-figure__head">
        <span className="qg-figure__label">{label}</span>
        <div className="qg-figure__amount" aria-live="polite">
          <strong className="qg-cifra qg-cifra--sm" key={settleKey}>
            {value}
          </strong>
        </div>
      </div>
      {secondary !== undefined && <p className="qg-figure__secondary">{secondary}</p>}
      {note !== undefined && <p className="qg-figure__note">{note}</p>}
    </div>
  );
}
