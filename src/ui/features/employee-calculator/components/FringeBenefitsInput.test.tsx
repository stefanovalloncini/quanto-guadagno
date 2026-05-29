import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { FringeBenefitsInput } from "./FringeBenefitsInput.tsx";

// The exemption thresholds shown in the hints must follow the selected tax
// year, not a hardcoded value: welfare €1.000/€2.000 (2025/2026), meal
// vouchers €8/day (2024–2025) rising to €10/day (2026).
describe("FringeBenefitsInput exemption hints by tax year", () => {
  it("uses 2026 thresholds (meal €10, welfare €1.000/€2.000)", () => {
    renderWithIntl(<FringeBenefitsInput value={{}} onChange={() => {}} taxYear={2026} />);
    expect(screen.getByText(/Esenti fino a 10\s*€\/giorno/)).toBeInTheDocument();
    expect(screen.getByText(/Esente fino a 1\.000\s*€\/anno \(2\.000\s*€/)).toBeInTheDocument();
  });

  it("uses 2024 thresholds (meal €8, welfare €258,23)", () => {
    renderWithIntl(<FringeBenefitsInput value={{}} onChange={() => {}} taxYear={2024} />);
    expect(screen.getByText(/Esenti fino a 8\s*€\/giorno/)).toBeInTheDocument();
    expect(screen.getByText(/Esente fino a 258,23\s*€\/anno/)).toBeInTheDocument();
  });
});
