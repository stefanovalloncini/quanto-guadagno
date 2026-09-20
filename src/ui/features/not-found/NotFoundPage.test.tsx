import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { NotFoundPage } from "./NotFoundPage.tsx";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";

describe("NotFoundPage", () => {
  it("renders the heading, the body and a link home", () => {
    renderWithIntl(<NotFoundPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/pagina/i);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
