import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { ComparisonPage } from "./ComparisonPage.tsx";

describe("ComparisonPage", () => {
  it("renders the hero with the italicised accent", () => {
    renderWithIntl(<ComparisonPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeTruthy();
  });

  it("shows both offers and flags the higher one (B by default)", () => {
    renderWithIntl(<ComparisonPage />);
    expect(screen.getByText("Netto offerta A")).toBeTruthy();
    expect(screen.getByText("Netto offerta B")).toBeTruthy();
    expect(screen.getByText("Offerta B più alta")).toBeTruthy();
  });

  it("re-flags the winner when offer A is raised above B", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ComparisonPage />);
    const ralA = screen.getByLabelText("Offerta A: lordo annuo");
    await user.clear(ralA);
    await user.type(ralA, "60000");
    expect(screen.getByText("Offerta A più alta")).toBeTruthy();
  });
});
