import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { IntlProvider } from "@/ui/i18n";
import { FreelancerPage } from "@/ui/features/freelancer-calculator";

expect.extend(toHaveNoViolations);

describe("FreelancerPage accessibility", () => {
  it("has no axe violations on initial render", async () => {
    const { container } = render(
      <IntlProvider>
        <FreelancerPage />
      </IntlProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
