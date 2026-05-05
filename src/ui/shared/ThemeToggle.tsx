import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

type Theme = "light" | "dark";

const STORAGE_KEY = "qg.theme";

const readStored = (): Theme | null => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};

const detect = (): Theme => {
  const stored = readStored();
  if (stored) return stored;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const apply = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(detect);
  const intl = useIntl();

  useEffect(() => {
    apply(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore quota or privacy mode
    }
  }, [theme]);

  const next: Theme = theme === "light" ? "dark" : "light";
  const label = intl.formatMessage(
    { id: "theme.toggle.label" },
    { mode: intl.formatMessage({ id: theme === "light" ? "theme.dark" : "theme.light" }) },
  );

  return (
    <button
      type="button"
      className="qg-theme-toggle"
      aria-label={label}
      onClick={() => setTheme(next)}
    >
      <span aria-hidden="true">{theme === "light" ? "◐" : "◑"}</span>
    </button>
  );
}
