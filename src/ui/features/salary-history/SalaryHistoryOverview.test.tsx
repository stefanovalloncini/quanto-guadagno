import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { SalaryHistoryOverview } from "./SalaryHistoryOverview.tsx";
import { DEFAULT_ENTRY_SETTINGS } from "./salaryHistory.ts";
import { adjustValueAcrossYears } from "@/domain/calc";
import { computeHistoryNet } from "./historyNet.ts";
import type { AdjustedEntry } from "./useSalaryHistory.ts";
import type { ProjectionBundle } from "./useSalaryProjection.ts";

const TARGET_YEAR = 2026;

function row(id: string, year: number, grossAnnual: number): AdjustedEntry {
  const entry = {
    id,
    year,
    grossAnnual,
    createdAt: "2026-01-01T00:00:00.000Z",
    settings: DEFAULT_ENTRY_SETTINGS,
  };
  return {
    entry,
    adjusted: adjustValueAcrossYears(grossAnnual, year, TARGET_YEAR),
    net: computeHistoryNet(entry),
  };
}

const emptyProjection: ProjectionBundle = {
  expected: [],
  low: [],
  high: [],
  growthRate: 0,
  horizonYears: 0,
};

const rows = [row("a", 2022, 25_000), row("b", 2026, 32_000)];

describe("SalaryHistoryOverview", () => {
  it("leads with the latest gross restated in target-year money", () => {
    renderWithIntl(
      <SalaryHistoryOverview rows={rows} projection={emptyProjection} targetYear={TARGET_YEAR} />,
    );
    expect(screen.getByText(/RAL 2026 a valori 2026/)).toBeTruthy();
    expect(screen.getByText(/Nominale/)).toBeTruthy();
  });

  it("swaps the chart for a table and back", async () => {
    const user = userEvent.setup();
    renderWithIntl(
      <SalaryHistoryOverview rows={rows} projection={emptyProjection} targetYear={TARGET_YEAR} />,
    );
    expect(document.querySelector(".qg-history-chart")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Mostra come tabella" }));
    expect(document.querySelector(".qg-history-chart")).toBeNull();
    expect(document.querySelectorAll(".qg-ledger tbody tr")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: "Mostra come grafico" }));
    expect(document.querySelector(".qg-history-chart")).toBeTruthy();
  });

  it("keeps the numbers readable while the chart is shown", () => {
    renderWithIntl(
      <SalaryHistoryOverview rows={rows} projection={emptyProjection} targetYear={TARGET_YEAR} />,
    );
    const hidden = document.querySelector(".qg-visually-hidden .qg-ledger");
    expect(hidden).toBeTruthy();
    expect(hidden?.querySelectorAll("tbody tr")).toHaveLength(2);
  });
});
