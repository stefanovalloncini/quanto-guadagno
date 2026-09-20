import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ApprenticeshipPage } from "./ApprenticeshipPage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

describe("ApprenticeshipPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<ApprenticeshipPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Progressione/);
    expect(h1.querySelector("em")).toBeNull();
  });

  it("renders three years of progression by default", () => {
    renderWithIntl(<ApprenticeshipPage />);
    const rows = document.querySelectorAll(".qg-progression__row");
    expect(rows).toHaveLength(3);
  });

  it("changes the schedule when years is changed to 5", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ApprenticeshipPage />);
    const yearSelect = screen.getByLabelText(/Durata in anni/);
    await user.selectOptions(yearSelect, "5");
    expect(document.querySelectorAll(".qg-progression__row")).toHaveLength(5);
  });

  it("each row links to the calculator with the year's gross", () => {
    renderWithIntl(<ApprenticeshipPage />);
    const links = document.querySelectorAll<HTMLAnchorElement>("a.qg-progression__row");
    expect(links.length).toBe(3);
    links.forEach((a) => {
      expect(a.getAttribute("href")).toMatch(
        /\/calcola-stipendio\?lordo=\d+&contratto=apprendistato/,
      );
    });
  });

  it("uses the ?lordo= query param as the starting target salary", () => {
    render(
      <IntlProvider locale="it-IT" messages={itMessages}>
        <MemoryRouter initialEntries={["/progressione-apprendistato?lordo=35000"]}>
          <ApprenticeshipPage />
        </MemoryRouter>
      </IntlProvider>,
    );
    const targetField = screen.getByLabelText(/Retribuzione di destinazione/);
    expect((targetField as HTMLInputElement).value).toBe("35000");
  });
});
