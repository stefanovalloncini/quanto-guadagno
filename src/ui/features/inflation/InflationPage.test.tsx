import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { InflationPage } from "./InflationPage.tsx";

describe("InflationPage", () => {
  it("renders the hero with the italicised accent", () => {
    renderWithIntl(<InflationPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("shows the equivalent value and cumulative inflation for the defaults", () => {
    renderWithIntl(<InflationPage />);
    expect(screen.getByText("Equivalente nel 2026")).toBeTruthy();
    expect(screen.getByText("Inflazione cumulata")).toBeTruthy();
    expect(screen.getByText("Stesso potere d'acquisto del 2015")).toBeTruthy();
  });

  it("reacts to changing the starting year", async () => {
    const user = userEvent.setup();
    renderWithIntl(<InflationPage />);
    await user.selectOptions(screen.getByLabelText("Anno di partenza"), "2020");
    expect(screen.getByText("Stesso potere d'acquisto del 2020")).toBeTruthy();
  });
});
