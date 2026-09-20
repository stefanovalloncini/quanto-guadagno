import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { TfrPage } from "./TfrPage.tsx";

describe("TfrPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<TfrPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("shows the accumulated TFR and its breakdown", () => {
    renderWithIntl(<TfrPage />);
    expect(screen.getAllByText("TFR accumulato").length).toBeGreaterThan(0);
    expect(screen.getByText("Quote versate")).toBeTruthy();
    expect(screen.getByText("Rivalutazione netta")).toBeTruthy();
  });

  it("recomputes the annual quota from the RAL (RAL/13,5)", async () => {
    const user = userEvent.setup();
    renderWithIntl(<TfrPage />);
    const ral = screen.getByLabelText("Stipendio lordo annuo");
    await user.clear(ral);
    await user.type(ral, "13500");
    expect(screen.getByText(/Quota annua 1\.000\s*€/)).toBeInTheDocument();
  });
});
