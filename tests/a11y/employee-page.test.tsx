import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { IntlProvider } from "@/ui/i18n";
import { EmployeePage } from "@/ui/features/employee-calculator";

expect.extend(toHaveNoViolations);

describe("EmployeePage accessibility", () => {
  it("has no axe violations on initial render", async () => {
    const { container } = render(
      <IntlProvider>
        <EmployeePage />
      </IntlProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
