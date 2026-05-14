import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { SourcesPage } from "./SourcesPage.tsx";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

describe("SourcesPage", () => {
  it("lists the six verification topics", () => {
    render(
      <IntlProvider locale="it-IT" messages={itMessages}>
        <MemoryRouter>
          <SourcesPage />
        </MemoryRouter>
      </IntlProvider>
    );
    expect(screen.getByText(/Scaglioni IRPEF/)).toBeInTheDocument();
    expect(screen.getByText(/Contributi INPS/)).toBeInTheDocument();
    expect(screen.getByText(/Detrazione/)).toBeInTheDocument();
    expect(screen.getByText(/Trattamento integrativo/)).toBeInTheDocument();
    expect(screen.getByText(/cuneo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Esonero/).length).toBeGreaterThan(0);
  });
});
