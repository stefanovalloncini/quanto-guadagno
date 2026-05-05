import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { IntlProvider } from "@/ui/i18n";
import { ApprenticeshipPage } from "@/ui/features/apprenticeship";

expect.extend(toHaveNoViolations);

describe("ApprenticeshipPage accessibility", () => {
  it("has no axe violations on initial render", async () => {
    const { container } = render(
      <IntlProvider>
        <ApprenticeshipPage />
      </IntlProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
