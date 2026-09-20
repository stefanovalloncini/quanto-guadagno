interface MoneyProps {
  readonly amount: number;
  readonly whole?: boolean;
  readonly className?: string;
}

const FORMATTERS = new Map<string, Intl.NumberFormat>();

// Intl emits a hyphen-minus; a payslip sets a real minus sign.
const MINUS = "−";

function getFormatter(whole: boolean): Intl.NumberFormat {
  const key = whole ? "whole" : "cents";
  let f = FORMATTERS.get(key);
  if (!f) {
    f = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: whole ? 0 : 2,
      useGrouping: true,
    });
    FORMATTERS.set(key, f);
  }
  return f;
}

export function Money({ amount, whole = false, className }: MoneyProps) {
  const cls = ["qg-money", "qg-num", className].filter(Boolean).join(" ");
  const value = amount === 0 ? 0 : amount;
  const text = getFormatter(whole).format(value).replace("-", MINUS);
  return <span className={cls}>{text}</span>;
}
