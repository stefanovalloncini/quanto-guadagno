import { useCallback, useEffect, useState, type ReactNode } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { it } from "./messages/it.ts";
import { en } from "./messages/en.ts";
import { LocaleContext, type Locale } from "./locale.ts";

const catalogs = { it, en } as const;

const STORAGE_KEY = "qg.locale";

function isLocale(v: unknown): v is Locale {
  return v === "it" || v === "en";
}

function detectInitial(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // storage may be unavailable
  }
  if (typeof navigator === "undefined") return "it";
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "it";
}

export function IntlProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitial);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((current) => {
      const next: Locale = current === "it" ? "en" : "it";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      <ReactIntlProvider locale={locale} defaultLocale="it" messages={catalogs[locale]}>
        {children}
      </ReactIntlProvider>
    </LocaleContext.Provider>
  );
}
