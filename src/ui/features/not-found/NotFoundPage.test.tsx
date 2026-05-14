import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { NotFoundPage } from "./NotFoundPage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

describe("NotFoundPage", () => {
  it("renders the 404 eyebrow, heading, body and a link home", () => {
    render(
      <IntlProvider locale="it-IT" messages={itMessages}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/pagina/i);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
