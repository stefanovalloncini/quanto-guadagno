import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { AboutPage } from "./AboutPage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("AboutPage", () => {
  it("renders heading and link to GitHub", () => {
    renderWithIntl(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toMatch(/github\.com/);
  });
});
