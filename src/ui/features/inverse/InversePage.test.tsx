import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { InversePage } from "./InversePage.tsx";

describe("InversePage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<InversePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("shows the corresponding gross and the net achieved for the default target", () => {
    renderWithIntl(<InversePage />);
    expect(screen.getByText("RAL lorda corrispondente")).toBeTruthy();
    expect(screen.getByText("Netto annuo raggiunto")).toBeTruthy();
  });

  it("updates the target-net field as the user types", async () => {
    const user = userEvent.setup();
    renderWithIntl(<InversePage />);
    const field = screen.getByLabelText("Netto annuo desiderato");
    expect(field).toHaveValue("24.000");
    await user.clear(field);
    await user.type(field, "40000");
    expect(field).toHaveValue("40.000");
  });
});
