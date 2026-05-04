const currencyFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyFormatterRounded = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("it-IT", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatCurrencyWhole(value: number): string {
  return currencyFormatterRounded.format(value);
}

export function formatPercentage(value: number): string {
  return percentFormatter.format(value);
}
