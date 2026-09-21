import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { ComparisonPage } from "./ComparisonPage.tsx";

describe("ComparisonPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<ComparisonPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("shows both offers and flags the higher one (B by default)", () => {
    renderWithIntl(<ComparisonPage />);
    expect(screen.getByRole("columnheader", { name: "Offerta A" })).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Offerta B" })).toBeTruthy();
    expect(screen.getByText(/L.offerta B rende/)).toBeTruthy();
  });

  it("re-flags the winner when offer A is raised above B", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ComparisonPage />);
    const ralA = screen.getByLabelText("Offerta A: lordo annuo");
    await user.clear(ralA);
    await user.type(ralA, "60000");
    expect(screen.getByText(/L.offerta A rende/)).toBeTruthy();
  });
});
