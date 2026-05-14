import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeApi {
  readonly theme: Theme;
  readonly setTheme: (t: Theme) => void;
  readonly cycle: () => void;
}

const STORAGE_KEY = "qg.theme";

const CYCLE_ORDER: readonly Theme[] = ["light", "dark", "system"];

function readStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    // storage may be unavailable
  }
  return "system";
}

function systemPreferred(): "light" | "dark" {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function applyDataTheme(resolved: "light" | "dark") {
  document.documentElement.dataset.theme = resolved;
}

export function useTheme(): ThemeApi {
  const [theme, setThemeState] = useState<Theme>(() => readStored());

  const setTheme = (t: Theme) => {
    if (t === "system") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      applyDataTheme(systemPreferred());
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {
        // ignore
      }
      applyDataTheme(t);
    }
    setThemeState(t);
  };

  const cycle = () => {
    setThemeState((current) => {
      const idx = CYCLE_ORDER.indexOf(current);
      const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length] as Theme;
      if (next === "system") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        applyDataTheme(systemPreferred());
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore
        }
        applyDataTheme(next);
      }
      return next;
    });
  };

  // When theme is "system", mirror matchMedia changes to data-theme.
  useEffect(() => {
    if (theme !== "system") return;

    applyDataTheme(systemPreferred());

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      applyDataTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [theme]);

  return { theme, setTheme, cycle };
}
