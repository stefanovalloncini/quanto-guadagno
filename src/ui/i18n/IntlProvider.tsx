import { useCallback, useEffect, useState, type ReactNode } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { it, type MessageKey } from "./messages/it.ts";
import { LocaleContext, type Locale } from "./locale.ts";

type Catalog = Record<MessageKey, string>;

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
  const [english, setEnglish] = useState<Catalog | null>(null);

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

  // The English catalog is its own chunk: Italian is the default and must not
  // wait on it. Until the import resolves, Italian stays on screen.
  useEffect(() => {
    if (locale !== "en" || english !== null) return;
    let active = true;
    void import("./messages/en.ts").then(({ en }) => {
      if (active) setEnglish(en);
    });
    return () => {
      active = false;
    };
  }, [locale, english]);

  const messages = locale === "en" ? english : null;
  const active: Locale = messages === null ? "it" : "en";

  useEffect(() => {
    document.documentElement.lang = active;
  }, [active]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      <ReactIntlProvider locale={active} defaultLocale="it" messages={messages ?? it}>
        {children}
      </ReactIntlProvider>
    </LocaleContext.Provider>
  );
}
