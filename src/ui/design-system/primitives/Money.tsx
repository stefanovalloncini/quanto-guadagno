import { useMemo } from "react";

interface MoneyProps {
  readonly amount: number;
  readonly whole?: boolean;
  readonly className?: string;
}

const FORMATTERS = new Map<string, Intl.NumberFormat>();

function getFormatter(whole: boolean): Intl.NumberFormat {
  const key = whole ? "whole" : "cents";
  let f = FORMATTERS.get(key);
  if (!f) {
    f = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: whole ? 0 : 2,
      useGrouping: "always",
    });
    FORMATTERS.set(key, f);
  }
  return f;
}

export function Money({ amount, whole = false, className }: MoneyProps) {
  const formatted = useMemo(() => getFormatter(whole).format(amount), [amount, whole]);
  const cls = ["qg-money", className].filter(Boolean).join(" ");
  return <span className={cls}>{formatted}</span>;
}
