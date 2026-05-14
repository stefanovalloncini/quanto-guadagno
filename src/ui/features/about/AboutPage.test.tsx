import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { AboutPage } from "./AboutPage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

describe("AboutPage", () => {
  it("renders heading and link to GitHub", () => {
    render(
      <IntlProvider locale="it-IT" messages={itMessages}>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toMatch(/github\.com/);
  });
});
