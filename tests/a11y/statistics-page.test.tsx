import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { IntlProvider } from "@/ui/i18n";
import { StatisticsPage } from "@/ui/features/statistics";

expect.extend(toHaveNoViolations);

describe("StatisticsPage accessibility", () => {
  it("has no axe violations on initial render", async () => {
    const { container } = render(
      <IntlProvider>
        <StatisticsPage />
      </IntlProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
