import { createContext, useContext } from "react";

export type Locale = "it" | "en";

export interface LocaleApi {
  readonly locale: Locale;
  readonly setLocale: (next: Locale) => void;
  readonly toggle: () => void;
}

export const LocaleContext = createContext<LocaleApi | null>(null);

export function useLocale(): LocaleApi {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within IntlProvider");
  return ctx;
}
