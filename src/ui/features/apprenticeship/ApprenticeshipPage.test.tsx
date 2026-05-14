import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ApprenticeshipPage } from "./ApprenticeshipPage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

const wrap = (node: React.ReactNode) => (
  <IntlProvider locale="it-IT" messages={itMessages}>
    <MemoryRouter>{node}</MemoryRouter>
  </IntlProvider>
);

describe("ApprenticeshipPage", () => {
  it("renders the hero with italic accent", () => {
    render(wrap(<ApprenticeshipPage />));
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Progressione/);
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("renders three years of progression by default", () => {
    render(wrap(<ApprenticeshipPage />));
    expect(screen.getAllByRole("row")).toHaveLength(4); // 1 header + 3 rows
  });

  it("changes the schedule when years is changed to 5", async () => {
    const user = userEvent.setup();
    render(wrap(<ApprenticeshipPage />));
    const yearSelect = screen.getByLabelText(/Durata in anni/);
    await user.selectOptions(yearSelect, "5");
    expect(screen.getAllByRole("row")).toHaveLength(6); // header + 5
  });
});
