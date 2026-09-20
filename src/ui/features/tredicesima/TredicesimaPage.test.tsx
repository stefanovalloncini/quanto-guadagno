import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { TredicesimaPage } from "./TredicesimaPage.tsx";

describe("TredicesimaPage", () => {
  it("renders the page heading", () => {
    renderWithIntl(<TredicesimaPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.querySelector("em")).toBeNull();
  });

  it("shows the net metric and the breakdown for the default inputs", () => {
    renderWithIntl(<TredicesimaPage />);
    expect(screen.getByText("Netto della tredicesima")).toBeTruthy();
    expect(screen.getByText("Lordo tredicesima")).toBeTruthy();
  });

  it("reveals the combined total only when 14 instalments are chosen", async () => {
    const user = userEvent.setup();
    renderWithIntl(<TredicesimaPage />);
    expect(screen.queryByText("Netto di tredicesima e quattordicesima")).toBeNull();
    await user.selectOptions(screen.getByLabelText("Mensilità"), "14");
    expect(screen.getByText("Netto di tredicesima e quattordicesima")).toBeTruthy();
  });
});
