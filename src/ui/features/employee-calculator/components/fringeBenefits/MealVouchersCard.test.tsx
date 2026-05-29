import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { MealVouchersCard } from "./MealVouchersCard.tsx";

const VALUE = { dailyValue: 8, workingDaysPerMonth: 22 };

describe("MealVouchersCard", () => {
  it("shows the electronic threshold by default", () => {
    renderWithIntl(
      <MealVouchersCard
        value={VALUE}
        onChange={() => {}}
        electronicThreshold={10}
        paperThreshold={4}
      />,
    );
    expect(screen.getByText(/Esente fino a 10\s*€\/giorno/)).toBeInTheDocument();
  });

  it("switches to the paper threshold when the type is paper", () => {
    renderWithIntl(
      <MealVouchersCard
        value={{ ...VALUE, type: "paper" }}
        onChange={() => {}}
        electronicThreshold={8}
        paperThreshold={4}
      />,
    );
    expect(screen.getByText(/Esente fino a 4\s*€\/giorno/)).toBeInTheDocument();
  });

  it("lets the user pick the voucher type", async () => {
    const user = userEvent.setup();
    const changes: unknown[] = [];
    renderWithIntl(
      <MealVouchersCard
        value={VALUE}
        onChange={(next) => changes.push(next)}
        electronicThreshold={8}
        paperThreshold={4}
      />,
    );
    await user.selectOptions(screen.getByLabelText("Tipo di buono"), "paper");
    expect(changes).toContainEqual({ ...VALUE, type: "paper" });
  });
});
