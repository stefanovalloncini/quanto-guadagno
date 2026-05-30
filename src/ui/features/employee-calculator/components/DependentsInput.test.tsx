import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/ui/shared/test-utils.tsx";
import { DependentsInput } from "./DependentsInput.tsx";
import type { DependentsInput as DependentsInputType } from "@/domain/calc";

const enabled: DependentsInputType = { hasSpouse: false, childrenOver21: 0, otherDependents: 0 };

describe("DependentsInput", () => {
  it("turns dependents on with default values from the master toggle", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithIntl(<DependentsInput value={null} onChange={onChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith({
      hasSpouse: false,
      childrenOver21: 0,
      otherDependents: 0,
    });
  });

  it("turns dependents off again, emitting null", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithIntl(<DependentsInput value={enabled} onChange={onChange} />);
    const master = screen
      .getAllByRole("checkbox")
      .find((c) => (c as HTMLInputElement).checked) as HTMLElement;
    await user.click(master);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("marks the spouse dependent with a zero starting income", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithIntl(<DependentsInput value={enabled} onChange={onChange} />);
    await user.click(screen.getByLabelText("Coniuge a carico"));
    expect(onChange).toHaveBeenCalledWith({
      hasSpouse: true,
      spouseIncome: 0,
      childrenOver21: 0,
      otherDependents: 0,
    });
  });

  it("reveals the spouse income field only once the spouse is marked dependent", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [value, setValue] = useState<DependentsInputType | null>(enabled);
      return <DependentsInput value={value} onChange={setValue} />;
    }
    renderWithIntl(<Harness />);
    expect(screen.queryByLabelText("Reddito annuo del coniuge")).toBeNull();
    await user.click(screen.getByLabelText("Coniuge a carico"));
    expect(screen.getByLabelText("Reddito annuo del coniuge")).toBeTruthy();
  });
});
