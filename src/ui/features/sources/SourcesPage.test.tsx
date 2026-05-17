import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { SourcesPage } from "./SourcesPage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("SourcesPage", () => {
  it("lists the six verification topics", () => {
    renderWithIntl(<SourcesPage />);
    expect(screen.getByText(/Scaglioni IRPEF/)).toBeInTheDocument();
    expect(screen.getByText(/Contributi INPS/)).toBeInTheDocument();
    expect(screen.getByText(/Detrazione/)).toBeInTheDocument();
    expect(screen.getByText(/Trattamento integrativo/)).toBeInTheDocument();
    expect(screen.getAllByText(/cuneo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Esonero/).length).toBeGreaterThan(0);
  });

  it("renders citations with at least one external link per topic", () => {
    renderWithIntl(<SourcesPage />);
    const links = document.querySelectorAll(".qg-sources__cite-link");
    expect(links.length).toBeGreaterThan(0);
  });
});
