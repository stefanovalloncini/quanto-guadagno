import type { ReactNode } from "react";
import { Money } from "./Money.tsx";

interface MetricBlockProps {
  readonly label: ReactNode;
  readonly amount: number;
  readonly sublabel?: ReactNode;
  readonly whole?: boolean;
  readonly announce?: boolean;
}

export function MetricBlock({ label, amount, sublabel, whole, announce }: MetricBlockProps) {
  return (
    <div className="qg-metric" aria-live={announce ? "polite" : undefined}>
      <div className="qg-metric__label">{label}</div>
      <div className="qg-metric__amount">
        <Money amount={amount} {...(whole !== undefined && { whole })} />
      </div>
      {sublabel !== undefined && <div className="qg-metric__sub">{sublabel}</div>}
    </div>
  );
}
