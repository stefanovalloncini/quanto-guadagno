import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";

function Boom(): never {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("renders its children when nothing throws", () => {
    renderWithIntl(
      <ErrorBoundary>
        <p>safe content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("safe content")).toBeTruthy();
  });

  it("renders an alert fallback when a child throws", () => {
    // React logs the caught error to the console; silence it so the run stays clean.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderWithIntl(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.queryByText("safe content")).toBeNull();
    spy.mockRestore();
  });
});
