import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { WelfareCard } from "./WelfareCard.tsx";

describe("WelfareCard", () => {
  it("shows the general exemption threshold without children", () => {
    renderWithIntl(
      <WelfareCard
        value={{ annualAmount: 0, hasChildrenUnder18: false }}
        onChange={() => {}}
        generalThreshold={1000}
        childrenThreshold={2000}
      />,
    );
    expect(screen.getByText(/Esente fino a 1\.000\s*€\/anno/)).toBeInTheDocument();
  });

  it("shows the higher threshold with dependent children", () => {
    renderWithIntl(
      <WelfareCard
        value={{ annualAmount: 0, hasChildrenUnder18: true }}
        onChange={() => {}}
        generalThreshold={1000}
        childrenThreshold={2000}
      />,
    );
    expect(screen.getByText(/Esente fino a 2\.000\s*€\/anno/)).toBeInTheDocument();
  });
});
