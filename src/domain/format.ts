// it-IT groups only from five digits by default; the Money primitive groups from four,
// and prose amounts sit next to it.
const currencyFormatterWhole = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  useGrouping: true,
});

const percentFormatter = new Intl.NumberFormat("it-IT", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export function formatCurrencyWhole(value: number): string {
  return currencyFormatterWhole.format(value);
}

export function formatPercentage(value: number): string {
  return percentFormatter.format(value);
}
