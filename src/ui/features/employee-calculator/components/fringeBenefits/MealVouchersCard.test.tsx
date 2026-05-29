import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { MealVouchersCard } from "./MealVouchersCard.tsx";

const VALUE = { dailyValue: 8, workingDaysPerMonth: 22 };

describe("MealVouchersCard", () => {
  it("shows the year's exemption threshold in the hint", () => {
    renderWithIntl(<MealVouchersCard value={VALUE} onChange={() => {}} dailyThreshold={10} />);
    expect(screen.getByText(/Esente fino a 10\s*€\/giorno/)).toBeInTheDocument();
  });

  it("reflects a different threshold", () => {
    renderWithIntl(<MealVouchersCard value={VALUE} onChange={() => {}} dailyThreshold={8} />);
    expect(screen.getByText(/Esente fino a 8\s*€\/giorno/)).toBeInTheDocument();
  });
});
