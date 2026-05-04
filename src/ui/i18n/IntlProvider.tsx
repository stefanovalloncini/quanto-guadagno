import { IntlProvider as ReactIntlProvider } from "react-intl";
import type { ReactNode } from "react";
import { it } from "./messages/it.ts";
import { en } from "./messages/en.ts";

const catalogs = { it, en } as const;

export type Locale = keyof typeof catalogs;

const detect = (): Locale => {
  if (typeof navigator === "undefined") return "it";
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("en") ? "en" : "it";
};

export function IntlProvider({ children }: { readonly children: ReactNode }) {
  const locale = detect();
  return (
    <ReactIntlProvider locale={locale} defaultLocale="it" messages={catalogs[locale]}>
      {children}
    </ReactIntlProvider>
  );
}
