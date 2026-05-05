import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle.tsx";

interface NavEntry {
  readonly to: string;
  readonly id: string;
  readonly available: boolean;
}

const navEntries: ReadonlyArray<NavEntry> = [
  { to: "/", id: "nav.home", available: true },
  { to: "/calcola-stipendio", id: "nav.employee", available: true },
];

export function AppHeader() {
  return (
    <header className="qg-app-header">
      <div className="qg-app-header__inner">
        <NavLink to="/" className="qg-app-header__brand">
          <span className="qg-app-header__brand-mark">QG</span>
          <span className="qg-app-header__brand-name">
            <FormattedMessage id="app.title" />
          </span>
        </NavLink>
        <nav aria-label="primary">
          <ul className="qg-app-header__nav">
            {navEntries.map((entry) => (
              <li key={entry.to}>
                <NavLink
                  to={entry.to}
                  className={({ isActive }) =>
                    isActive
                      ? "qg-app-header__link qg-app-header__link--active"
                      : "qg-app-header__link"
                  }
                  end={entry.to === "/"}
                >
                  <FormattedMessage id={entry.id} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
