import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle.tsx";

interface NavEntry {
  readonly to: string;
  readonly id: string;
}

const navEntries: ReadonlyArray<NavEntry> = [
  { to: "/calcola-stipendio", id: "nav.employee" },
  { to: "/fonti", id: "nav.sources" },
  { to: "/informazioni", id: "nav.about" },
];

export function AppHeader() {
  return (
    <header className="qg-header">
      <div className="qg-header__inner">
        <NavLink to="/" className="qg-header__brand" end>
          <span>
            <FormattedMessage id="brand.first" />{" "}
            <em>
              <FormattedMessage id="brand.second" />
            </em>
          </span>
        </NavLink>
        <nav aria-label="primary" className="qg-header__nav">
          <ul>
            {navEntries.map((entry) => (
              <li key={entry.to}>
                <NavLink
                  to={entry.to}
                  className={({ isActive }) =>
                    isActive ? "qg-header__link qg-header__link--active" : "qg-header__link"
                  }
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
