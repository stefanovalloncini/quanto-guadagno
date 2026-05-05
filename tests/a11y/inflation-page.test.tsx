import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { IntlProvider } from "@/ui/i18n";
import { InflationPage } from "@/ui/features/inflation";

expect.extend(toHaveNoViolations);

describe("InflationPage accessibility", () => {
  it("has no axe violations on initial render", async () => {
    const { container } = render(
      <IntlProvider>
        <InflationPage />
      </IntlProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
